'use client';

import { useState, useEffect } from 'react';

const messages = [
  "Let's take a study break!",
  "You're doing great!",
  "Remember to hydrate!",
  "One step at a time!",
  "You got this!",
  "Time for a snack break?",
  "Deep breaths!",
  "Don't forget to stretch!",
  "You're not alone!",
  "Keep going!",
];

export default function PixelPet({ mood }) {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [isHappy, setIsHappy] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
      setIsHappy(Math.random() > 0.3);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-4 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-blue/20' : 'bg-pastel-green/20'
    }`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          {/* Pixel Art Pet */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <div className="w-12 h-12 relative">
              {/* Eyes */}
              <div className="absolute top-4 left-2 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-4 right-2 w-2 h-2 bg-black rounded-full"></div>
              {/* Mouth */}
              <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 ${
                isHappy ? 'rounded-t-full border-b-2 border-black' : 'rounded-b-full border-t-2 border-black'
              }`}></div>
            </div>
          </div>
          {/* Thought Bubble */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs whitespace-nowrap">
            {currentMessage}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-display">Pixel Pal</h3>
          <p className="text-sm opacity-80">Your study buddy</p>
        </div>
      </div>
    </div>
  );
} 