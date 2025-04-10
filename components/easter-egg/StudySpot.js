'use client';

import { useState, useEffect } from 'react';

const quotes = [
  "The expert in anything was once a beginner.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The only way to do great work is to love what you do.",
  "You don't have to be great to start, but you have to start to be great.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Every accomplishment starts with the decision to try.",
  "You are capable of more than you know.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream big and dare to fail."
];

export default function StudySpot({ mood }) {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-6 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-purple/20' : 'bg-pastel-orange/20'
    }`}>
      <h2 className="text-2xl font-display mb-4">🎵 StudySpot</h2>
      
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              mood === 'chill' ? 'bg-pastel-purple' : 'bg-pastel-orange'
            }`}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <div className="flex-1">
            <div className="text-sm opacity-80">Lo-fi Study Beats</div>
            <div className="h-1 bg-white/20 rounded-full mt-1">
              <div className="h-full bg-white/40 rounded-full w-1/3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${
        mood === 'chill' ? 'bg-pastel-purple/30' : 'bg-pastel-orange/30'
      }`}>
        <p className="text-center italic">"{currentQuote}"</p>
      </div>
    </div>
  );
} 