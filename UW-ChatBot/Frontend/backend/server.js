import express from 'express';
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

// Path to service account key file
const KEY_FILE_PATH = path.join(__dirname, 'google_secret.json');
const SHEET_ID = process.env.SHEET_ID;
const RANGES = ['Accuracy!E2', 'Completeness!E2', 'Speed!E2', 'ErrorHandling!E2'];

// Fetch Google Sheets data
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

// Google Sheets data endpoint
app.get('/api/sheet-data', async (req, res) => {
  try {
    const data = await fetchGoogleSheetData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets.' });
  }
});
/*
app.post('/generate-response', async (req, res) => {
  const { inputText } = req.body;
  const modelArn = process.env.BEDROCK_MODEL_ARN;
  const knowledgeBaseId = process.env.KNOWLEDGE_BASE_ID;

  try {
    const response = await retrieveAndGenerateResponse(inputText, modelArn, knowledgeBaseId);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});
*/
app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
