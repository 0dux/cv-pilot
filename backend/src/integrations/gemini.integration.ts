import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { env } from "../config/env.js";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

async function handleAnalysisGemini(fileBuffer: Buffer, mimeType: string) {
  const file = fileBuffer;

  const contents = [
    {
      role: "user",
      parts: [
        { text: "What do you read in this document" },
        {
          inlineData: {
            mimeType: mimeType,
            data: Buffer.from(file).toString("base64"),
          },
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    // console.log(response.text);
    return response;
  } catch (error) {
    console.error("Error generating content :::", error);
    return;
  }
}

export default handleAnalysisGemini;
