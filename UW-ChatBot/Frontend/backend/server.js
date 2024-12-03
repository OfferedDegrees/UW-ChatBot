import express from 'express';
import { retrieveAndGenerateResponse } from './bedrockService.js'; 

const app = express();
app.use(express.json());

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

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
