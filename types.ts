
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface MarketingStrategy {
  brandName: string;
  targetAudience: string[];
  keyChannels: string[];
  contentIdeas: string[];
  metricKPIs: string[];
  summary: string;
}

export interface Trend {
  topic: string;
  description: string;
  relevanceScore: number;
  sources: { title: string; uri: string }[];
}
