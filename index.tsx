
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { generateAIProduct, generateAIBlog } from './services/geminiService';
import { Product, BlogArticle } from './types';

// Global Data Context for the "Autonomous" features
interface DataContextType {
  products: Product[];
  blogs: BlogArticle[];
  quotaExceeded: boolean;
}

const DataContext = createContext<DataContextType>({ products: [], blogs: [], quotaExceeded: false });

export const useAIAssets = () => useContext(DataContext);

const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    // Initial load
    const init = async () => {
      try {
        const p = await generateAIProduct('Marketing Tool');
        setProducts([p as Product]);
      } catch (e) {}
    };
    init();

    // Slower autonomous loop with circuit breaker
    const interval = setInterval(async () => {
      if (quotaExceeded) return;

      try {
        const cat = ['Software', 'E-book', 'Template'][Math.floor(Math.random() * 3)];
        const newProd = await generateAIProduct(cat);
        setProducts(prev => [newProd as Product, ...prev].slice(0, 50));
        
        if (Math.random() > 0.8) {
          const newBlog = await generateAIBlog();
          setBlogs(prev => [newBlog, ...prev].slice(0, 10));
        }
      } catch (e: any) {
        if (e.message?.includes('429') || e.message?.includes('RESOURCE_EXHAUSTED')) {
          setQuotaExceeded(true);
          setTimeout(() => setQuotaExceeded(false), 120000); // Wait 2 mins if quota hit
        }
      }
    }, 60000); // 1 minute interval to be safe

    return () => clearInterval(interval);
  }, [quotaExceeded]);

  return (
    <DataContext.Provider value={{ products, blogs, quotaExceeded }}>
      {children}
    </DataContext.Provider>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <RootProvider>
      <App />
    </RootProvider>
  );
}
