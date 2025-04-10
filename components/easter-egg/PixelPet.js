'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const emotions = {
  happy: {
    eyes: "😊",
    mouth: "rounded-t-full border-b-2 border-black",
  },
  sad: {
    eyes: "😢",
    mouth: "rounded-b-full border-t-2 border-black",
  },
  surprised: {
    eyes: "😮",
    mouth: "rounded-full border-2 border-black",
  },
  neutral: {
    eyes: "😐",
    mouth: "w-4 h-1 bg-black",
  },
};

export default function PixelPet({ mood }) {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [currentEmotion, setCurrentEmotion] = useState('happy');
  const [isInteracting, setIsInteracting] = useState(false);
  const [showThought, setShowThought] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
      const emotions = ['happy', 'sad', 'surprised', 'neutral'];
      setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
      setShowThought(true);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    setIsInteracting(true);
    setShowThought(true);
    setTimeout(() => setIsInteracting(false), 1000);
  };

  return (
    <div className={`p-4 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-blue/20' : 'bg-pastel-green/20'
    }`}>
      <div className="flex items-center gap-4">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInteraction}
        >
          {/* Pixel Art Pet */}
          <motion.div 
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
            animate={{
              scale: isInteracting ? [1, 1.1, 1] : 1,
              rotate: isInteracting ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 relative">
              {/* Eyes */}
              <motion.div 
                className="absolute top-4 left-2 w-2 h-2 bg-black rounded-full"
                animate={{
                  scale: isInteracting ? [1, 1.2, 1] : 1,
                }}
              />
              <motion.div 
                className="absolute top-4 right-2 w-2 h-2 bg-black rounded-full"
                animate={{
                  scale: isInteracting ? [1, 1.2, 1] : 1,
                }}
              />
              {/* Mouth */}
              <motion.div 
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 ${
                  emotions[currentEmotion].mouth
                }`}
                animate={{
                  scale: isInteracting ? [1, 1.2, 1] : 1,
                }}
              />
            </div>
          </motion.div>
          
          {/* Thought Bubble */}
          <AnimatePresence>
            {showThought && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs whitespace-nowrap"
              >
                {currentMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div>
          <h3 className="text-lg font-display">Pixel Pal</h3>
          <p className="text-sm opacity-80">Your study buddy</p>
        </div>
      </div>
    </div>
  );
} 