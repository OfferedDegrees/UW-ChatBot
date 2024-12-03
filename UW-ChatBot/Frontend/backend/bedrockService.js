import pkg from '@aws-sdk/client-bedrock'; 
const { BedrockClient, RetrieveAndGenerateCommand } = pkg;
import { config } from "dotenv";

config(); 

const client = new BedrockClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

export async function retrieveAndGenerateResponse(inputText, modelArn, knowledgeBaseId) {
  try {
    const params = {
      input: {
        text: inputText
      },
      retrieveAndGenerateConfiguration: {
        knowledgeBaseConfiguration: {
          knowledgeBaseId: knowledgeBaseId,
          modelArn: modelArn
        },
        type: "KNOWLEDGE_BASE"
      }
    };

    // Create the command
    const command = new RetrieveAndGenerateCommand(params);

    // Send the request
    const response = await client.send(command);

    console.log("Full Response:", JSON.stringify(response, null, 2));

    if (response && response.output) {
      console.log("Generated Response:", response.output.text);
      return response.output.text;
    } else {
      console.error("No response output found");
      return "Sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error calling Bedrock API:", error);
    throw error;
  }
}
