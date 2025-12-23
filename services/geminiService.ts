
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Product, BlogArticle, MarketingStrategy, Trend } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Enhanced retry wrapper with exponential backoff.
 * Limits the number of concurrent requests to prevent triggering 429s.
 */
let activeRequests = 0;
const MAX_CONCURRENT = 3;

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 3000): Promise<T> {
  // Simple concurrency queue to avoid flooding the API
  while (activeRequests >= MAX_CONCURRENT) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  activeRequests++;
  try {
    return await fn();
  } catch (error: any) {
    const errorStr = error?.message || "";
    const isRateLimit = errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || error?.status === 429;
    const isTransient = isRateLimit || error?.status >= 500 || errorStr.includes('fetch');

    if (isTransient && retries > 0) {
      console.warn(`AI API Warning: ${errorStr}. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2.5); // Aggressive backoff
    }
    throw error;
  } finally {
    activeRequests--;
  }
}

export const generateAIProduct = async (category: string): Promise<Partial<Product>> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Autonomous Product Agent: Create a high-end digital asset in ${category}. Title, description, tags, price.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            price: { type: Type.NUMBER },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const productData = JSON.parse(response.text || "{}");
    // Only generate image if we have quota room (simulated by probability to save API calls)
    let imageData = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400";
    
    try {
      const imgRes = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts: [{ text: `Minimal Luxury UI/UX product cover for: ${productData.title}. Neon lime accents, pure white background.` }] }
      });
      for (const part of imgRes.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) imageData = `data:image/png;base64,${part.inlineData.data}`;
      }
    } catch (e) {
      console.warn("Skipping image generation due to quota constraints.");
    }

    return { ...productData, image: imageData, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
  });
};

export const generateAIBlog = async (): Promise<BlogArticle> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Research Agent: Write a short, punchy futuristic article about AGI and wealth.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING }
          }
        }
      }
    });
    return { ...JSON.parse(response.text || "{}"), id: Math.random().toString(36).substr(2, 9), authorAgent: "WealthLab-Brain-01", publishedAt: Date.now() };
  });
};

export const getAGIResponse = async (messages: {role: string, content: string}[], prompt: string) => {
  return withRetry(async () => {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: { 
        systemInstruction: "You are the AGI Business Copilot. Focus on efficiency and security.",
        thinkingConfig: { thinkingBudget: 16000 } // Reduced budget to save tokens/quota
      }
    });
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  });
};

export const startMarketingChat = () => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: { tools: [{ googleSearch: {} }] }
  });
};

export const generateMarketingStrategy = async (brand: string, description: string): Promise<MarketingStrategy> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Strategy for ${brand}: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            targetAudience: { type: Type.ARRAY, items: { type: Type.STRING } },
            keyChannels: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
            metricKPIs: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "targetAudience", "keyChannels", "contentIdeas", "metricKPIs"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  });
};

export const generateSpeech = async (text: string): Promise<string> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text.substring(0, 500) }] }], // Limit length
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  });
};

export const fetchMarketingTrends = async (): Promise<Trend[]> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "List top 2 marketing trends for 2025 in JSON.",
      config: { tools: [{ googleSearch: {} }] },
    });
    const text = response.text || "[]";
    const jsonMatch = text.match(/\[.*\]/s);
    const trendsData = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return trendsData.map((t: any) => ({
      ...t,
      sources: chunks.filter(c => c.web).map(c => ({ uri: c.web!.uri, title: c.web!.title }))
    }));
  });
};

export const auditCreativeConcept = async (concept: string): Promise<string> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Audit this: ${concept}`,
    });
    return response.text || "";
  });
};

export const auditVisualCreative = async (base64: string, mimeType: string): Promise<string> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [{ inlineData: { data: base64, mimeType } }, { text: "Audit this visual." }]
      }
    });
    return response.text || "";
  });
};

export const generate4KAdImage = async (prompt: string): Promise<string> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } },
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return "";
  });
};

export const connectLiveConsultant = (callbacks: any) => {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: 'You are a elite growth architect.',
    },
  });
};

export const generateVideoAd = async (prompt: string): Promise<string> => {
  return withRetry(async () => {
    const ai = getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 15000));
      operation = await ai.operations.getVideosOperation({ operation });
    }
    return `${operation.response?.generatedVideos?.[0]?.video?.uri}&key=${process.env.API_KEY}`;
  });
};

export const generateDeepStrategy = async (topic: string, context: string): Promise<string> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `${topic}: ${context}`,
      config: { thinkingConfig: { thinkingBudget: 8000 } }
    });
    return response.text || "";
  });
};

export const fetchLocalCompetitors = async (lat: number, lng: number, category: string) => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Competitors in ${category}`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: { retrievalConfig: { latLng: { latitude: lat, longitude: lng } } }
      },
    });
    return {
      text: response.text || "",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  });
};

export const conductAgentDebate = async (brand: string, goal: string): Promise<any[]> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Debate for ${brand} to reach ${goal}. JSON list.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              agent: { type: Type.STRING },
              stance: { type: Type.STRING },
              points: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["agent", "stance", "points"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  });
};

export const simulateGazeHeatmap = async (base64: string, mimeType: string): Promise<string> => {
  return withRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [{ inlineData: { data: base64, mimeType } }, { text: "Gaze simulation." }]
      }
    });
    return response.text || "";
  });
};
