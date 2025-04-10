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
  "Great progress!",
  "You're on fire!",
  "Take a moment to relax!",
  "Your hard work is paying off!",
  "Stay focused, you're doing amazing!"
];

const emotions = {
  happy: {
    eyes: "😊",
    mouth: "rounded-t-full border-b-2 border-black",
    color: "bg-yellow-200",
  },
  sad: {
    eyes: "😢",
    mouth: "rounded-b-full border-t-2 border-black",
    color: "bg-blue-200",
  },
  surprised: {
    eyes: "😮",
    mouth: "rounded-full border-2 border-black",
    color: "bg-purple-200",
  },
  neutral: {
    eyes: "😐",
    mouth: "w-4 h-1 bg-black",
    color: "bg-gray-200",
  },
  focused: {
    eyes: "👀",
    mouth: "w-4 h-1 bg-black",
    color: "bg-green-200",
  },
  tired: {
    eyes: "😪",
    mouth: "w-4 h-1 bg-black",
    color: "bg-orange-200",
  },
};

const petStyles = [
  {
    name: "Classic",
    body: "rounded-full",
    ears: "hidden",
    tail: "hidden",
  },
  {
    name: "Cat",
    body: "rounded-full",
    ears: "triangle",
    tail: "curved",
  },
  {
    name: "Dog",
    body: "rounded-full",
    ears: "floppy",
    tail: "wagging",
  },
  {
    name: "Bunny",
    body: "rounded-full",
    ears: "long",
    tail: "puff",
  },
];

export default function PixelPet({ mood }) {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [currentEmotion, setCurrentEmotion] = useState('happy');
  const [isInteracting, setIsInteracting] = useState(false);
  const [showThought, setShowThought] = useState(true);
  const [petName, setPetName] = useState('Pixel');
  const [petStyle, setPetStyle] = useState(petStyles[0]);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [showCustomization, setShowCustomization] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
      const emotions = ['happy', 'sad', 'surprised', 'neutral', 'focused', 'tired'];
      setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
      setShowThought(true);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    setIsInteracting(true);
    setShowThought(true);
    setExperience(prev => {
      const newExp = prev + 10;
      if (newExp >= level * 100) {
        setLevel(prev => prev + 1);
        return 0;
      }
      return newExp;
    });
    setTimeout(() => setIsInteracting(false), 1000);
  };

  const handleCustomization = () => {
    setShowCustomization(!showCustomization);
  };

  return (
    <div className={`p-4 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-blue/20' : 'bg-pastel-green/20'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-display">Pixel Pal</h3>
          <p className="text-sm opacity-80">Level {level} • {petName}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCustomization}
          className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          Customize
        </motion.button>
      </div>

      <div className="flex items-center gap-4">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInteraction}
        >
          {/* Pixel Art Pet */}
          <motion.div 
            className={`w-16 h-16 ${emotions[currentEmotion].color} rounded-full flex items-center justify-center`}
            animate={{
              scale: isInteracting ? [1, 1.1, 1] : 1,
              rotate: isInteracting ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 relative">
              {/* Ears */}
              {petStyle.ears !== 'hidden' && (
                <>
                  <div className={`absolute -top-2 -left-2 w-4 h-4 ${emotions[currentEmotion].color} rounded-full`} />
                  <div className={`absolute -top-2 -right-2 w-4 h-4 ${emotions[currentEmotion].color} rounded-full`} />
                </>
              )}
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
              {/* Tail */}
              {petStyle.tail !== 'hidden' && (
                <motion.div 
                  className={`absolute -right-2 bottom-2 w-4 h-2 ${emotions[currentEmotion].color} rounded-full`}
                  animate={{
                    rotate: isInteracting ? [0, 15, -15, 0] : 0,
                  }}
                />
              )}
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

        {/* Experience Bar */}
        <div className="flex-1">
          <div className="h-1 bg-white/20 rounded-full mb-1">
            <div 
              className={`h-full rounded-full ${
                mood === 'chill' ? 'bg-pastel-blue' : 'bg-pastel-green'
              }`}
              style={{ width: `${(experience / (level * 100)) * 100}%` }}
            />
          </div>
          <p className="text-xs text-center opacity-80">
            {experience}/{level * 100} XP
          </p>
        </div>
      </div>

      {/* Customization Panel */}
      <AnimatePresence>
        {showCustomization && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-lg bg-white/10"
          >
            <h4 className="text-sm font-medium mb-2">Customize Your Pet</h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs opacity-80 mb-1 block">Pet Name</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full p-2 rounded bg-white/20 text-sm"
                  maxLength={12}
                />
              </div>
              <div>
                <label className="text-xs opacity-80 mb-1 block">Pet Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {petStyles.map((style) => (
                    <motion.button
                      key={style.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPetStyle(style)}
                      className={`p-2 rounded ${
                        petStyle.name === style.name
                          ? mood === 'chill' ? 'bg-pastel-blue/30' : 'bg-pastel-green/30'
                          : 'bg-white/10'
                      }`}
                    >
                      <span className="text-xs">{style.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 