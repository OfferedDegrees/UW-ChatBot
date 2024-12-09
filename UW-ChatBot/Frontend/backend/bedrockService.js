// bedrockService.js

import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from "@aws-sdk/client-bedrock-agent-runtime";
import dotenv from "dotenv";

dotenv.config();

// Initialize BedrockAgentRuntimeClient with proper configuration
const client = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

/**
 * Function to interact with AWS Bedrock using RetrieveAndGenerateCommand
 * @param {string} inputText - The user input text
 * @param {string} modelArn - The ARN of the Bedrock model
 * @param {string} knowledgeBaseId - The ID of the knowledge base
 * @param {string} [sessionId] - Optional session ID for maintaining conversational context
 * @returns {Promise<{ response: string, sessionId?: string }>} - The generated response and sessionId if newly created
 */
export async function retrieveAndGenerateResponse(inputText, modelArn, knowledgeBaseId, sessionId = undefined) {
  try {
    console.log("Calling Bedrock API with:", { inputText, modelArn, knowledgeBaseId, sessionId });

    // Define parameters for RetrieveAndGenerateCommand
    const params = {
      input: {
        text: inputText, // The user query
      },
      retrieveAndGenerateConfiguration: {
        type: "KNOWLEDGE_BASE", // Specifies using a knowledge base
        knowledgeBaseConfiguration: {
          knowledgeBaseId: knowledgeBaseId, // Your knowledge base ID
          modelArn: modelArn, // The model to use for inference
          retrievalConfiguration: {
            vectorSearchConfiguration: {
              numberOfResults: 5,
              overrideSearchType: "SEMANTIC",
              // implicitFilterConfiguration: {
              //   metadataAttributes: [
              //     {
              //       key: "source",
              //       type: "STRING",
              //       description: "Source of the document",
              //     },
              //     // Add more metadata attributes as needed
              //   ],
              //   modelArn: process.env.IMPLICIT_FILTER_MODEL_ARN,
              // },
            },
          },
          generationConfiguration: {
            promptTemplate: {
              textPromptTemplate: `
                Here are some relevant search results:\n
                $search_results$\n
                Please answer the following question based on the provided context:\n
                {{input}}
              `,
            },
            guardrailConfiguration: {
              guardrailId: process.env.GUARDRAIL_ID,
              guardrailVersion: process.env.GUARDRAIL_VERSION,
            },
            inferenceConfig: {
              textInferenceConfig: {
                temperature: 0.7,
                topP: 0.9,
                maxTokens: 400,
              },
            },
          },
        },
      },
      sessionConfiguration: {
        kmsKeyArn: process.env.KMS_KEY_ARN,
      },
    };

    // Conditionally add sessionId if provided
    if (sessionId) {
      params.sessionId = sessionId;
    }

    // Create and send the RetrieveAndGenerateCommand
    const command = new RetrieveAndGenerateCommand(params);
    const response = await client.send(command);

    console.log("Full Response:", JSON.stringify(response, null, 2));

    // Extract and return the generated response and sessionId
    if (response?.output?.text) {
      console.log("Generated Response:", response.output.text);
      return {
        response: response.output.text,
        sessionId: response.sessionId, // This will be present if a new session is created
      };
    } else {
      console.error("No response output found");
      return { response: "Sorry, I couldn't generate a response." };
    }
  } catch (error) {
    console.error("Error calling Bedrock API:", error);
    throw error;
  }
}