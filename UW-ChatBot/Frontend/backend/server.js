// server.js

import express from 'express';
import session from 'express-session'; // Import express-session
import { retrieveAndGenerateResponse } from './bedrockService.js'; 
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Configure express-session middleware
app.use(session({
  name: 'sessionId', // Name of the cookie
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Secret for signing the session ID cookie
  resave: false, // Prevents session from being saved back to the session store if not modified
  saveUninitialized: false, // Don't create session until something stored
  cookie: {
    httpOnly: true, // Mitigates XSS attacks
    secure: process.env.NODE_ENV === 'production', // Ensures the browser only sends the cookie over HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  }
}));

// Path to service account key file
const KEY_FILE_PATH = path.join(__dirname, 'google_secret.json');
const SHEET_ID = process.env.SHEET_ID;
const RANGES = ['Accuracy!E2', 'Completeness!E2', 'Speed!E2', 'ErrorHandling!E2'];

// Fetch Google Sheets data (unchanged)
async function fetchGoogleSheetData() {
  try {
    if (!SHEET_ID) throw new Error('SHEET_ID is not defined in environment variables.');

    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SHEET_ID,
      ranges: RANGES,
    });

    const values = response.data.valueRanges?.map((range) => range.values?.[0]?.[0] || 'N/A');
    const [accuracy, completeness, speed, errorHandling] = values || [];
    return { accuracy, completeness, speed, errorHandling };
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
}

// Google Sheets data endpoint (unchanged)
app.get('/api/sheet-data', async (req, res) => {
  try {
    const data = await fetchGoogleSheetData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets.' });
  }
});

// Generate response endpoint with server-side session management
app.post('/generate-response', async (req, res) => {
  const { inputText } = req.body;
  const modelArn = process.env.BEDROCK_MODEL_ARN;
  const knowledgeBaseId = process.env.KNOWLEDGE_BASE_ID;

  if (!inputText) {
    return res.status(400).json({ error: 'Missing inputText in request body.' });
  }

  try {
    // Retrieve sessionId from server-side session
    let sessionId = req.session.sessionId;

    // Call Bedrock service with or without sessionId
    const { response: generatedResponse, sessionId: newSessionId } = await retrieveAndGenerateResponse(inputText, modelArn, knowledgeBaseId, sessionId);

    // If a new sessionId is returned, store it in the server-side session
    if (newSessionId && newSessionId !== sessionId) {
      req.session.sessionId = newSessionId;
    }

    // Respond to the client
    res.json({ response: generatedResponse });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
