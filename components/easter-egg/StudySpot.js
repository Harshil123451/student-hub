'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const studyPlaylists = [
  {
    name: "Lo-fi Study Beats",
    videoId: "jfKfPfyJRdk",
    icon: "🎵"
  },
  {
    name: "Classical Focus",
    videoId: "4Tr0otuiQuU",
    icon: "🎻"
  },
  {
    name: "Nature Sounds",
    videoId: "q76bMs-NwRk",
    icon: "🌿"
  },
  {
    name: "Cafe Ambience",
    videoId: "2gliGzb2_1I",
    icon: "☕"
  }
];

const POMODORO_TIMES = {
  WORK: 25 * 60, // 25 minutes
  SHORT_BREAK: 5 * 60, // 5 minutes
  LONG_BREAK: 15 * 60 // 15 minutes
};

export default function StudySpot({ mood }) {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [currentPlaylist, setCurrentPlaylist] = useState(studyPlaylists[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(POMODORO_TIMES.WORK);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('WORK');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    let timerInterval;
    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      if (timerMode === 'WORK') {
        setCompletedPomodoros(prev => prev + 1);
        if (completedPomodoros % 3 === 0) {
          setTimerMode('LONG_BREAK');
          setTimer(POMODORO_TIMES.LONG_BREAK);
        } else {
          setTimerMode('SHORT_BREAK');
          setTimer(POMODORO_TIMES.SHORT_BREAK);
        }
      } else {
        setTimerMode('WORK');
        setTimer(POMODORO_TIMES.WORK);
      }
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer, timerMode, completedPomodoros]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimer(POMODORO_TIMES[timerMode]);
  };

  const handlePlaylistSelect = (playlist) => {
    setCurrentPlaylist(playlist);
    setIsPlaying(true);
  };

  return (
    <div className={`p-6 rounded-2xl ${
      mood === 'chill' ? 'bg-pastel-purple/20' : 'bg-pastel-orange/20'
    }`}>
      <h2 className="text-2xl font-display mb-4">🎵 StudySpot</h2>
      
      {/* Pomodoro Timer */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Pomodoro Timer</h3>
          <span className="text-sm opacity-80">
            {timerMode === 'WORK' ? 'Focus Time' : 
             timerMode === 'SHORT_BREAK' ? 'Short Break' : 'Long Break'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTimerToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              mood === 'chill' ? 'bg-pastel-purple' : 'bg-pastel-orange'
            }`}
          >
            {isTimerRunning ? '⏸️' : '▶️'}
          </motion.button>
          <div className="flex-1">
            <div className="text-2xl font-mono">{formatTime(timer)}</div>
            <div className="h-1 bg-white/20 rounded-full mt-1">
              <div 
                className={`h-full rounded-full ${
                  mood === 'chill' ? 'bg-pastel-purple' : 'bg-pastel-orange'
                }`}
                style={{ width: `${(timer / POMODORO_TIMES[timerMode]) * 100}%` }}
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTimerReset}
            className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            Reset
          </motion.button>
        </div>
        <div className="mt-2 text-sm text-center opacity-80">
          Completed Pomodoros: {completedPomodoros}
        </div>
      </div>

      {/* Study Music */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Study Music</h3>
        
        {/* YouTube Player */}
        <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${currentPlaylist.videoId}?autoplay=${isPlaying ? 1 : 0}&controls=1&modestbranding=1&rel=0`}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Playlist Selection */}
        <div className="grid grid-cols-2 gap-2">
          {studyPlaylists.map((playlist) => (
            <motion.button
              key={playlist.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePlaylistSelect(playlist)}
              className={`p-2 rounded-lg flex items-center gap-2 ${
                currentPlaylist.name === playlist.name
                  ? mood === 'chill' ? 'bg-pastel-purple/30' : 'bg-pastel-orange/30'
                  : 'bg-white/10'
              }`}
            >
              <span className="text-lg">{playlist.icon}</span>
              <span className="text-sm">{playlist.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className={`p-4 rounded-lg ${
        mood === 'chill' ? 'bg-pastel-purple/30' : 'bg-pastel-orange/30'
      }`}>
        <p className="text-center italic">"{currentQuote}"</p>
      </div>
    </div>
  );
} 