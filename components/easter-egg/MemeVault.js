'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function MemeVault({ mood }) {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMemes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://meme-api.com/gimme/collegememes/6');
      if (!response.ok) throw new Error('Failed to fetch memes');
      const data = await response.json();
      if (data.memes && Array.isArray(data.memes)) {
        setMemes(data.memes);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Failed to load memes. Please try again!');
      console.error('Error fetching memes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className={`p-6 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-green/20' : 'bg-pastel-yellow/20'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-display">😂 MemeVault</h2>
        <motion.button
          onClick={fetchMemes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
            mood === 'chill' ? 'bg-pastel-green' : 'bg-pastel-yellow'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="animate-spin">🌀</span>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>🎲</span>
              <span>Shuffle Memes</span>
            </>
          )}
        </motion.button>
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <motion.button
            onClick={fetchMemes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    mood === 'chill' ? 'bg-pastel-green/30' : 'bg-pastel-yellow/30'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="animate-pulse">Loading...</span>
                  </div>
                </motion.div>
              ))
            ) : (
              memes.map((meme) => (
                <motion.div
                  key={meme.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedMeme(meme);
                    setIsExpanded(true);
                  }}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer ${
                    mood === 'chill' ? 'bg-pastel-green/30' : 'bg-pastel-yellow/30'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={meme.url}
                      alt={meme.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-end">
                      <p className="p-4 text-white text-sm font-medium">
                        {meme.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {isExpanded && selectedMeme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className={`max-w-2xl w-full p-6 rounded-2xl ${
                mood === 'chill' ? 'bg-pastel-green/90' : 'bg-pastel-yellow/90'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-display">{selectedMeme.title}</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-2xl hover:opacity-80"
                >
                  ✕
                </button>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white/20">
                <Image
                  src={selectedMeme.url}
                  alt={selectedMeme.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 