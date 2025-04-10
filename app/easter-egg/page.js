'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import StudySpot from '@/components/easter-egg/StudySpot';
import MemeVault from '@/components/easter-egg/MemeVault';
import TimeCapsule from '@/components/easter-egg/TimeCapsule';
import Confessions from '@/components/easter-egg/Confessions';
import PixelPet from '@/components/easter-egg/PixelPet';
import MoodToggle from '@/components/easter-egg/MoodToggle';
import StudentTrivia from '@/components/easter-egg/StudentTrivia';
import Link from 'next/link';

export default function EasterEgg() {
  const [mood, setMood] = useState('chill');
  const [konamiCode, setKonamiCode] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleKeyDown = (e) => {
      const code = [...konamiCode, e.key];
      if (code.length > 10) code.shift();
      setKonamiCode(code);

      if (code.join('') === 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen p-8 transition-colors duration-300 ${
        mood === 'chill' ? 'bg-gradient-to-br from-pastel-blue to-pastel-blue/50' : 'bg-gradient-to-br from-pastel-pink to-pastel-pink/50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            👻 Secret Student Lounge
          </h1>
          <p className="text-xl opacity-80">A cozy corner for students to relax and connect</p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <StudySpot mood={mood} />
          <MemeVault mood={mood} />
          <TimeCapsule mood={mood} />
          <Confessions mood={mood} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <PixelPet mood={mood} />
          <StudentTrivia mood={mood} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-8 right-8 flex gap-4"
        >
          <MoodToggle mood={mood} setMood={setMood} />
          <Link 
            href="/"
            className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            Return Home
          </Link>
        </motion.div>

        {showConfetti && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none"
          >
            {/* Confetti animation will go here */}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 