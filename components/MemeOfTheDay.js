'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getDailyMeme } from '@/utils/getDailyMeme';

export default function MemeOfTheDay() {
  const [dailyMemes, setDailyMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadDailyMemes = async () => {
      setIsLoading(true);
      const memes = await getDailyMeme();
      setDailyMemes(memes);
      setIsLoading(false);
    };
    loadDailyMemes();
  }, [refreshKey]);

  const handleRefresh = () => {
    // Clear today's memes from localStorage to force a refresh
    const today = new Date().toDateString();
    localStorage.removeItem(`dailyMemes_${today}`);
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-16 mb-8 bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">😂 Meme of the Day</h2>
            <div className="animate-spin">🌀</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 mb-8 bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">😂 Meme of the Day</h2>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </motion.button>
            <Link 
              href="/easter-egg"
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View more memes →
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            {dailyMemes.map((meme, index) => (
              <motion.div
                key={meme.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={meme.url}
                    alt={meme.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="p-4 text-white text-sm font-medium">
                      {meme.title}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
} 