'use client';

import { useState, useEffect } from 'react';

const MemeVault = ({ isOpen, onClose }) => {
  const [unlockedMemes, setUnlockedMemes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const memes = JSON.parse(localStorage.getItem('unlockedMemes') || '[]');
    setUnlockedMemes(memes);
  }, []);

  const fetchNewMeme = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://meme-api.com/gimme/collegememes/3');
      const data = await response.json();
      
      if (data.memes && data.memes.length > 0) {
        const newMeme = {
          id: Date.now(),
          image: data.memes[0].url,
          caption: data.memes[0].title,
          timestamp: new Date().toISOString()
        };
        
        const updatedMemes = [...unlockedMemes, newMeme];
        setUnlockedMemes(updatedMemes);
        localStorage.setItem('unlockedMemes', JSON.stringify(updatedMemes));
      }
    } catch (error) {
      console.error('Error fetching meme:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
            Meme Vault 🎭
          </h2>
          <div className="flex gap-2">
            <button
              onClick={fetchNewMeme}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get New Meme'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unlockedMemes.map((meme) => (
            <div
              key={meme.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md"
            >
              <img
                src={meme.image}
                alt={meme.caption}
                className="w-full rounded-lg mb-2"
                loading="lazy"
              />
              <p className="text-gray-600 dark:text-gray-300">{meme.caption}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Unlocked: {new Date(meme.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        
        {unlockedMemes.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No memes unlocked yet! Click "Get New Meme" to start your collection! 🎯
          </p>
        )}
      </div>
    </div>
  );
};

export default MemeVault; 