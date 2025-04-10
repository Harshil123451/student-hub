'use client';

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

  useEffect(() => {
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
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      mood === 'chill' ? 'bg-pastel-blue' : 'bg-pastel-pink'
    }`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-display mb-4">👻 Secret Student Lounge</h1>
          <p className="text-lg opacity-80">A cozy corner for students to relax and connect</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StudySpot mood={mood} />
          <MemeVault mood={mood} />
          <TimeCapsule mood={mood} />
          <Confessions mood={mood} />
        </div>

        <div className="mt-8 flex justify-between items-center">
          <PixelPet mood={mood} />
          <StudentTrivia mood={mood} />
        </div>

        <div className="fixed bottom-4 right-4 flex gap-4">
          <MoodToggle mood={mood} setMood={setMood} />
          <Link 
            href="/"
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            Return Home
          </Link>
        </div>

        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            {/* Confetti animation will go here */}
          </div>
        )}
      </div>
    </div>
  );
} 