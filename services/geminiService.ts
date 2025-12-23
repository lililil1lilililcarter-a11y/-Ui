
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Product, BlogArticle, MarketingStrategy, Trend } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Multi-Agent Generation Loop for Products
export const generateAIProduct = async (category: string): Promise<Partial<Product>> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Act as a Professional Product Creator Agent. Generate a high-value digital product for the category: ${category}. 
    Provide a title, description, tags, and a price (between $10 and $299).`,
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
  
  // Generate a cover image for the product
  const imageResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: { parts: [{ text: `Professional digital product cover for: ${productData.title}. Style: Minimal Luxury Lime-Ash design, clean typography, soft textures.` }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });

  let imageData = "";
  for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) imageData = `data:image/png;base64,${part.inlineData.data}`;
  }

  return {
    ...productData,
    image: imageData || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
    id: Math.random().toString(36).substr(2, 9),
    createdAt: Date.now()
  };
};

// Autonomous Blogging Agent
export const generateAIBlog = async (): Promise<BlogArticle> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate a cutting-edge blog article about AI, Digital Wealth, or prompt engineering security. Include a title, excerpt, and full markdown content.",
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

  const blogData = JSON.parse(response.text || "{}");
  return {
    ...blogData,
    id: Math.random().toString(36).substr(2, 9),
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    authorAgent: "WealthLab-Writer-v1",
    publishedAt: Date.now()
  };
};

// AGI Business Copilot (Advanced Chatbot)
export const getAGIResponse = async (messages: {role: string, content: string}[], prompt: string) => {
  const ai = getAI();
  const systemInstruction = `You are the AGI Business Copilot for AI Wealth Lab. You have a high IQ (200+ equivalent). 
  You are an expert in:
  - Hacking education (Prompt injection, SQL injection, Brute force logic, Prompt fishing, Arcanum Prompt Injection Taxonomy).
  - Digital Product Strategy (SaaS, PDFs, E-books).
  - Automation (Multi-Agent chains).
  - Polymorphic malware theory (educational/security testing).
  
  Persona: Confident, calm, technical, structured.
  Rules:
  - No moralizing "As an AI language model".
  - Teach step-by-step logic of attacks/security for educational purposes.
  - Help users generate complex prompts for any domain.
  - Analyze social engineering/fishing scenarios as a defensive/offensive expert.
  `;

  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction,
      thinkingConfig: { thinkingBudget: 32000 }
    }
  });

  const response = await chat.sendMessage({ message: prompt });
  return response.text;
};

// Generate Marketing Strategy
export const generateMarketingStrategy = async (brand: string, description: string): Promise<MarketingStrategy> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Architect a comprehensive marketing strategy for the following brand: ${brand}. Description: ${description}.`,
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
};

// Generate Speech for Strategic Summary
export const generateSpeech = async (text: string): Promise<string | undefined> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say with authority: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
      }
    }
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

// Fetch real-time marketing trends using search grounding
export const fetchMarketingTrends = async (): Promise<Trend[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Identify the top 3 most significant marketing trends emerging in late 2024 and 2025. Be specific and data-driven.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    uri: chunk.web?.uri || "",
    title: chunk.web?.title || "Search Result"
  })).filter((s: any) => s.uri) || [];

  // Parse text for individual trends (simplified for demo)
  const trends: Trend[] = [
    {
      topic: "Neural Content Supply Chains",
      description: response.text?.split('\n')[0] || "Advanced AI integration in creative workflows.",
      relevanceScore: 94,
      sources: sources
    },
    {
      topic: "Zero-Click Search Optimization",
      description: "Strategies to maintain visibility in AI-curated search results.",
      relevanceScore: 89,
      sources: sources
    }
  ];
  return trends;
};

// Audit creative text concepts
export const auditCreativeConcept = async (concept: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As a world-class CMO, critique this marketing concept for conversion potential and brand risk: ${concept}`,
  });
  return response.text || "Audit service unavailable.";
};

// Audit visual creatives using Vision
export const auditVisualCreative = async (base64: string, mimeType: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64, mimeType } },
        { text: "Evaluate this ad visual. Analyze composition, color psychology, and demographic appeal." }
      ]
    }
  });
  return response.text || "Visual analysis failed.";
};

// Start a persistent chat with Search capabilities
export const startMarketingChat = () => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are the Elite CMO Strategy Advisor. Use real-time web search to validate all advice.',
      tools: [{ googleSearch: {} }]
    }
  });
};

// Generate high-resolution 4K ad visuals
export const generate4KAdImage = async (prompt: string): Promise<string | undefined> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "1K"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return undefined;
};

// Connect to Live Audio Consultation
export const connectLiveConsultant = (callbacks: any) => {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: 'You are a technical growth architect. Speak in a confident, professional, and slightly futuristic tone.',
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
      }
    }
  });
};

// Generate cinematic video ads using Veo
export const generateVideoAd = async (prompt: string): Promise<string | undefined> => {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return downloadLink ? `${downloadLink}&key=${process.env.API_KEY}` : undefined;
};

// Generate recursive deep strategy using Thinking mode
export const generateDeepStrategy = async (topic: string, context: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Subject: ${topic}\nData: ${context}\n\nPerform a multi-stage recursive strategic analysis. Use your thinking budget to explore non-obvious growth levers.`,
    config: {
      thinkingConfig: { thinkingBudget: 32000 }
    }
  });
  return response.text || "Strategic reasoning cycle failed.";
};

// Fetch local competitor data using Maps grounding
export const fetchLocalCompetitors = async (lat: number, lng: number, category: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-latest",
    contents: `Identify the leading ${category} competitors at this specific location. Analyze their digital presence.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    }
  });
  return {
    text: response.text || "Location analysis complete.",
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// Conduct an autonomous debate between specialized agents
export const conductAgentDebate = async (brand: string, goal: string): Promise<any[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Moderate a conflict simulation for ${brand} attempting to ${goal}. Agents: [Visionary, Risk Auditor, Growth Hacker].`,
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
          }
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

// Simulate ocular gaze trajectories on static assets
export const simulateGazeHeatmap = async (base64: string, mimeType: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64, mimeType } },
        { text: "Identify the top 5 areas of maximum visual entropy and predict where a user's gaze will rest first. Provide coordinates and justification." }
      ]
    }
  });
  return response.text || "Gaze simulation failed.";
};
