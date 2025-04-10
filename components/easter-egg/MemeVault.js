'use client';

import { useState } from 'react';

const memes = [
  { id: 1, url: '/memes/student-life-1.jpg', alt: 'When you finally understand the lecture' },
  { id: 2, url: '/memes/student-life-2.jpg', alt: 'Me trying to explain my code to the TA' },
  { id: 3, url: '/memes/student-life-3.jpg', alt: 'When the professor says "This will be on the exam"' },
  { id: 4, url: '/memes/student-life-4.jpg', alt: 'Me after pulling an all-nighter' },
  { id: 5, url: '/memes/student-life-5.jpg', alt: 'When you find a typo in your final submission' },
  { id: 6, url: '/memes/student-life-6.jpg', alt: 'Group project dynamics' },
];

export default function MemeVault({ mood }) {
  const [shuffledMemes, setShuffledMemes] = useState([...memes]);

  const shuffleMemes = () => {
    const newMemes = [...memes];
    for (let i = newMemes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newMemes[i], newMemes[j]] = [newMemes[j], newMemes[i]];
    }
    setShuffledMemes(newMemes);
  };

  return (
    <div className={`p-6 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-green/20' : 'bg-pastel-yellow/20'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-display">😂 MemeVault</h2>
        <button
          onClick={shuffleMemes}
          className={`px-4 py-2 rounded-full transition-colors ${
            mood === 'chill' ? 'bg-pastel-green' : 'bg-pastel-yellow'
          }`}
        >
          🔀 Shuffle
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {shuffledMemes.map((meme) => (
          <div
            key={meme.id}
            className={`aspect-square rounded-lg overflow-hidden ${
              mood === 'chill' ? 'bg-pastel-green/30' : 'bg-pastel-yellow/30'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm opacity-80">{meme.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 