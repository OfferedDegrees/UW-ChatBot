const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const port = 5000;

app.use(bodyParser.json()); // Parse JSON request bodies

// Configure AWS SDK
const bedrock = new AWS.Bedrock({
    region: 'us-east-1', // Replace with your AWS region
    credentials: new AWS.SharedIniFileCredentials({ profile: 'DeveloperRyan' }), // Replace with your profile
});

// Store session IDs in memory (for simplicity; consider Redis or a database for production)
const sessionMap = {};

app.post('/retrieveAndGenerate', async (req, res) => {
    const { userId, inputText } = req.body; // Expecting userId to identify sessions

    // Check if a session ID exists for this user; create one if not
    let sessionId = sessionMap[userId];
    if (!sessionId) {
        sessionId = null; // For first request, Bedrock generates the sessionId automatically
    }

    // Build the request payload
    const payload = {
        input: { text: inputText },
        retrieveAndGenerateConfiguration: {
            knowledgeBaseConfiguration: {
                knowledgeBaseId: "RRFMLJWOTJ", 
                modelArn: "arn:aws:bedrock:us-east-1:376129873116:inference-profile/us.meta.llama3-1-70b-instruct-v1:0", 
                generationConfiguration: {
                    inferenceConfig: {
                        textInferenceConfig: {
                            maxTokens: 100,
                            temperature: 0.7,
                            topP: 0.9,
                        },
                    },
                    promptTemplate: {
                        textPromptTemplate: "Answer the following question: {input.text}",
                    },
                },
            },
        },
        sessionId, // Use existing sessionId or let Bedrock create one
    };

    try {
        // Call Bedrock's /retrieveAndGenerate API
        const response = await bedrock.sendCommand({
            apiName: 'RetrieveAndGenerate',
            requestBody: JSON.stringify(payload),
        });

        const responseBody = JSON.parse(response.body);

        // Save sessionId for future requests
        if (!sessionId && responseBody.sessionId) {
            sessionMap[userId] = responseBody.sessionId;
        }

        // Send back the response to the client
        res.json({ response: responseBody });
    } catch (error) {
        console.error('Error invoking Bedrock API:', error);
        res.status(500).json({ error: 'Failed to retrieve response from AWS Bedrock' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
