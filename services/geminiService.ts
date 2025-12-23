
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { MarketingStrategy, Trend } from "../types";

// Standard instances use the environment key
const getAI = (apiKey?: string) => new GoogleGenAI({ apiKey: apiKey || process.env.API_KEY || '' });

export const generateMarketingStrategy = async (
  brandName: string,
  productDescription: string
): Promise<MarketingStrategy> => {
  const ai = getAI();
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
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

// --- NEW CUTTING EDGE MODELS ---

export const generateDeepStrategy = async (brandName: string, context: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Conduct a deep strategic market analysis and competitive moat evaluation for ${brandName}. Context: ${context}`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 } // Max reasoning power
    }
  });
  return response.text || "Reasoning engine failed to produce output.";
};

export const generate4KAdImage = async (prompt: string): Promise<string | undefined> => {
  const ai = getAI(); // Uses current key (Pro Image requires paid key)
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: `High-end 4K commercial photography, shot on 85mm lens, cinematic lighting, professional product styling: ${prompt}` }],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "2K"
      }
    },
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return undefined;
};

export const generateVideoAd = async (prompt: string): Promise<string | undefined> => {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Professional cinematic marketing video: ${prompt}. High production value, smooth camera motion.`,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) return undefined;

  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

// --- EXISTING SERVICES ---

export const fetchMarketingTrends = async (): Promise<Trend[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Identify the top 3 trending marketing strategies for 2025. Focus on hyper-personalization and AI-driven ops.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const text = response.text || "";
  const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources = grounding.filter((chunk: any) => chunk.web).map((chunk: any) => ({
    title: chunk.web.title || "Source",
    uri: chunk.web.uri || "#"
  }));

  return [{ topic: "Real-Time Intelligence", description: text, relevanceScore: 99, sources }];
};

export const auditCreativeConcept = async (description: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Expert creative director audit: ${description}`,
  });
  return response.text || "Audit failed.";
};

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say professionally: ${text.substring(0, 500)}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const startMarketingChat = () => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are an elite CMO consultant.',
      tools: [{ googleSearch: {} }],
    },
  });
};

export const connectLiveConsultant = (callbacks: any) => {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
      },
      systemInstruction: 'You are a world-class senior marketing strategist.',
    },
  });
};
