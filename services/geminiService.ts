
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { MarketingStrategy, Trend } from "../types";

// Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.

// 1. MULTI-AGENT DEBATE ENGINE
export const conductAgentDebate = async (brandName: string, goal: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Conduct a 3-way debate between: 
    1. The Growth Hacker (Focus on scale/virality)
    2. The Brand Guardian (Focus on longevity/reputation)
    3. The Data Scientist (Focus on attribution/math).
    Topic: Launching ${brandName} with the goal: ${goal}. 
    Each agent gives 2 short, punchy points of disagreement.`,
    config: {
      thinkingConfig: { thinkingBudget: 12000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            agent: { type: Type.STRING },
            stance: { type: Type.STRING },
            points: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

// 2. NEURAL GAZE SIMULATION (SPATIAL VISION)
export const simulateGazeHeatmap = async (base64Image: string, mimeType: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: "Predict eye-tracking behavior for this image. Where is the 'Gaze Gravity'? Identify the top 3 visual anchors and rate the 'Time-to-CTA' in seconds." }
      ]
    }
  });
  return response.text || "Gaze analysis offline.";
};

// 3. GLOBAL PULSE TRENDS (SEARCH GROUNDING)
export const fetchGlobalPulse = async (category: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze current global sentiment, search volume trends, and cultural hype for the category: ${category}. Return a breakdown for USA, Europe, and Asia.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  return {
    analysis: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// 4. CORE STRATEGY SERVICES
export const generateMarketingStrategy = async (brandName: string, productDescription: string): Promise<MarketingStrategy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Strategy for: ${brandName}. Desc: ${productDescription}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          brandName: { type: Type.STRING },
          targetAudience: { type: Type.ARRAY, items: { type: Type.STRING } },
          keyChannels: { type: Type.ARRAY, items: { type: Type.STRING } },
          contentIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
          metricKPIs: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

// Image extraction helper following part-iteration guidelines
const extractImageData = (response: any): string | undefined => {
  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) return undefined;
  
  for (const part of candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }
  return undefined;
};

export const generate4KAdImage = async (prompt: string): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: `Professional 4K commercial photography: ${prompt}` }] },
    config: { imageConfig: { aspectRatio: "16:9", imageSize: "2K" } },
  });
  const data = extractImageData(response);
  return data ? `data:image/png;base64,${data}` : undefined;
};

export const generateVideoAd = async (prompt: string): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Cinematic marketing clip: ${prompt}`,
    config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
  });
  while (!operation.done) {
    await new Promise(r => setTimeout(r, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }
  const link = operation.response?.generatedVideos?.[0]?.video?.uri;
  // Always append API key for downloads
  return link ? (await fetch(`${link}&key=${process.env.API_KEY}`).then(r => r.blob()).then(b => URL.createObjectURL(b))) : undefined;
};

export const connectLiveConsultant = (callbacks: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } },
      systemInstruction: 'You are a master pitch coach. Analyze voice and text for psychological impact.',
    },
  });
};

// 5. NEW EXPORTS TO FIX ERRORS

// Fixed: Added generateSpeech for StrategyGenerator component
export const generateSpeech = async (text: string): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read this marketing strategy summary professionally: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

// Fixed: Added fetchMarketingTrends for TrendSpotter component
export const fetchMarketingTrends = async (): Promise<Trend[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Identify the top 3 most impactful marketing trends for 2025. Use Google Search for grounding.",
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            description: { type: Type.STRING },
            relevanceScore: { type: Type.NUMBER }
          },
          required: ["topic", "description", "relevanceScore"]
        }
      }
    }
  });

  const trends: any[] = JSON.parse(response.text || "[]");
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const webSources = chunks
    .filter((c: any) => c.web)
    .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));

  return trends.map((t, i) => ({
    ...t,
    sources: webSources.slice(i * 2, (i + 1) * 2)
  }));
};

// Fixed: Added auditCreativeConcept for CreativeAudit component
export const auditCreativeConcept = async (concept: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Critique the following marketing concept for effectiveness: ${concept}`,
  });
  return response.text || "Audit failed.";
};

// Fixed: Added auditVisualCreative for CreativeAudit component
export const auditVisualCreative = async (base64Image: string, mimeType: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: "Analyze this image as a marketing creative. What are its strengths and weaknesses?" }
      ]
    }
  });
  return response.text || "Visual audit analysis unavailable.";
};

// Fixed: Added startMarketingChat for MarketingChat component
export const startMarketingChat = () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: 'You are an elite CMO strategy assistant. Use Google Search to ground your answers in real-time data.',
    },
  });
};

// Fixed: Added generateDeepStrategy for DeepStrategyLab component
export const generateDeepStrategy = async (title: string, context: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Solve this marketing challenge: ${title}\nContext: ${context}`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text || "Strategic reasoning failed to generate a response.";
};

// Fixed: Added fetchLocalCompetitors for LocalIntelligence component
export const fetchLocalCompetitors = async (lat: number, lng: number, category: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Survey the local landscape for businesses in the '${category}' category near my location.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    }
  });
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
