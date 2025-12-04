import { GoogleGenAI } from "@google/genai";
import "dotenv/config"; //remove on deployment
import { env } from "../config/env.js";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

async function handleAnalysisGemini(fileBuffer: Buffer) {
  const pdfResp = fileBuffer;

  const contents = [
    { text: "What do you read in this document" },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: Buffer.from(pdfResp).toString("base64"),
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
  console.log(response);
  
  return response;
}

export default handleAnalysisGemini