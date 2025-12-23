
export interface Product {
  id: string;
  title: string;
  category: 'E-book' | 'Template' | 'Marketing' | 'AI Pack' | 'Software';
  description: string;
  price: number;
  image: string;
  agentId: string;
  createdAt: number;
  tags: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  authorAgent: string;
  publishedAt: number;
}

export interface AIAgent {
  id: string;
  name: string;
  status: 'Idle' | 'Generating' | 'Optimizing';
  type: string;
  taskCount: number;
}

export interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
}

// Added missing MarketingStrategy interface
export interface MarketingStrategy {
  summary: string;
  targetAudience: string[];
  keyChannels: string[];
  contentIdeas: string[];
  metricKPIs: string[];
}

// Added missing Trend interface
export interface Trend {
  topic: string;
  description: string;
  relevanceScore: number;
  sources: { uri: string; title: string }[];
}
