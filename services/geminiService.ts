
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingStrategy, Trend } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMarketingStrategy = async (
  brandName: string,
  productDescription: string
): Promise<MarketingStrategy> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a professional marketing strategy for: ${brandName}. Description: ${productDescription}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          brandName: { type: Type.STRING },
          targetAudience: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of 3 primary target demographics"
          },
          keyChannels: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of 3 recommended marketing channels"
          },
          contentIdeas: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3 creative content hooks"
          },
          metricKPIs: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Primary success metrics"
          },
          summary: { type: Type.STRING }
        },
        required: ["brandName", "targetAudience", "keyChannels", "contentIdeas", "metricKPIs", "summary"]
      },
      thinkingConfig: { thinkingBudget: 0 }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const fetchMarketingTrends = async (): Promise<Trend[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Identify the top 3 trending marketing strategies or shifts in late 2024 and early 2025. Focus on digital advertising and consumer behavior.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const text = response.text || "";
  const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  // Mapping grounding chunks to the Trend interface structure
  const sources = grounding
    .filter((chunk: any) => chunk.web)
    .map((chunk: any) => ({
      title: chunk.web.title || "Source",
      uri: chunk.web.uri || "#"
    }));

  // Simplified parsing for display purposes
  return [
    {
      topic: "Search-Driven Trends",
      description: text,
      relevanceScore: 95,
      sources: sources
    }
  ];
};
