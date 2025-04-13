'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getDailyMeme } from '@/utils/getDailyMeme';

export default function MemeOfTheDay() {
  const [dailyMeme, setDailyMeme] = useState(null);

  useEffect(() => {
    const loadDailyMeme = async () => {
      const meme = await getDailyMeme();
      setDailyMeme(meme);
    };
    loadDailyMeme();
  }, []);

  if (!dailyMeme) return null;

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
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500" title="Updated daily!">🔄</span>
            <Link 
              href="/easter-egg"
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View more memes →
            </Link>
          </div>
        </div>
        <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-lg">
          <img
            src={dailyMeme.url}
            alt={dailyMeme.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <p className="mt-4 text-center text-gray-600">{dailyMeme.title}</p>
      </div>
    </motion.div>
  );
} 