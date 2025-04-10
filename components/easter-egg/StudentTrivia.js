'use client';

import { useState, useEffect } from 'react';

const triviaFacts = [
  "The average student drinks 3 cups of coffee per day during finals week.",
  "Most students' favorite study spot is the library's quiet floor.",
  "Over 60% of students prefer studying with background music.",
  "The most common study snack is chips, followed by chocolate.",
  "Students spend an average of 2 hours per day on social media.",
  "The most popular study time is between 7 PM and 10 PM.",
  "85% of students have pulled an all-nighter at least once.",
  "The average student owns 4 different highlighters.",
  "Most students have a favorite pen they refuse to share.",
  "The library sees a 300% increase in visitors during finals week.",
];

export default function StudentTrivia({ mood }) {
  const [currentFact, setCurrentFact] = useState(triviaFacts[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentFact(triviaFacts[Math.floor(Math.random() * triviaFacts.length)]);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-4 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-purple/20' : 'bg-pastel-yellow/20'
    }`}>
      <h3 className="text-lg font-display mb-2">📊 Student Trivia</h3>
      <div
        className={`transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-sm">{currentFact}</p>
      </div>
    </div>
  );
} 