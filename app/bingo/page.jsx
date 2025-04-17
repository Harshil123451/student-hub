'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import ThemeToggle from '@/components/ThemeToggle';
import MemeVault from '@/components/MemeVault';
import { useRouter } from 'next/navigation';

const bingoItems = [
  "Missed the tram by 1 second 🚋",
  "Scammed by gumtree ad 💸",
  "Free pizza at uni 🍕",
  "Got lost on campus 🗺️",
  "Took a photo with a possum 🦝",
  "Found a quiet study spot 📚",
  "Ate instant noodles for dinner 🍜",
  "Went to a free uni event 🎉",
  "Saw a protest on campus ✊",
  "Got lost in the library 📚",
  "Found a $2 coffee ☕",
  "Witnessed a campus proposal 💍",
  "Took a nap in the student lounge 😴",
  "Got caught in the rain without an umbrella 🌧️",
  "Found a free textbook online 📖",
  "Ate at a food truck 🚚",
  "Went to a student bar 🍻",
  "Saw a celebrity on campus 🌟",
  "Got a free sample at the market 🎁",
  "Took a photo with the uni mascot 🦁",
  "Found a shortcut on campus 🏃",
  "Went to a midnight study session 🌙",
  "Got free merch at orientation 🎒",
  "Saw a rainbow over campus 🌈",
  "Found a $5 lunch special 🍱",
  "Lost Myki card 🚇",
  "Ate at 7-Eleven at 2am 🌙",
  "Went to a student protest ✊",
  "Found a free textbook 📚",
  "Got lost in the library 📚"
];

const memes = [
  {
    id: 'row',
    image: '/memes/row-complete.jpg',
    caption: 'When you complete a row! 🎉'
  },
  {
    id: 'column',
    image: '/memes/column-complete.jpg',
    caption: 'Column complete! Time to celebrate! 🎊'
  },
  {
    id: 'diagonal',
    image: '/memes/diagonal-complete.jpg',
    caption: 'Diagonal victory! You\'re on fire! 🔥'
  },
  {
    id: 'full',
    image: '/memes/full-board.jpg',
    caption: 'Full board completion! You\'re a legend! 🌟'
  }
];

const BingoPage = () => {
  const router = useRouter();
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMemeVault, setShowMemeVault] = useState(false);
  const [theme, setTheme] = useState('light');
  const [clickSequence, setClickSequence] = useState([]);
  const [toast, setToast] = useState(null);

  // Easter egg sequence
  const easterEggSequence = ['Lost Myki card 🚇', 'Missed the tram by 1 second 🚋', 'Free pizza at uni 🍕'];

  const generateRandomBoard = () => {
    // Fisher-Yates shuffle algorithm for better randomization
    const shuffled = [...bingoItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 25);
  };

  const regenerateBoard = () => {
    setBoard(generateRandomBoard());
    setCompleted([]);
    localStorage.removeItem('bingoCompleted');
  };

  useEffect(() => {
    // Load completed squares and theme from localStorage
    const savedCompleted = JSON.parse(localStorage.getItem('bingoCompleted') || '[]');
    setCompleted(savedCompleted);
    const savedTheme = localStorage.getItem('bingoTheme') || 'light';
    setTheme(savedTheme);

    // Generate daily board
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('bingoDate');
    const savedSeed = localStorage.getItem('bingoSeed');

    if (savedDate !== today || !savedSeed) {
      const newSeed = Math.random().toString(36).substring(7);
      localStorage.setItem('bingoDate', today);
      localStorage.setItem('bingoSeed', newSeed);
      setBoard(generateRandomBoard());
    } else {
      setBoard(generateRandomBoard());
    }
  }, []);

  const toggleSquare = (index) => {
    const newCompleted = completed.includes(index)
      ? completed.filter(i => i !== index)
      : [...completed, index];
    
    setCompleted(newCompleted);
    localStorage.setItem('bingoCompleted', JSON.stringify(newCompleted));
    
    // Track click sequence for easter egg
    const clickedItem = board[index];
    setClickSequence(prev => [...prev, clickedItem].slice(-3));
    
    checkWin(newCompleted);
  };

  const checkWin = (completedSquares) => {
    const winningCombinations = [
      // Rows
      [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
      // Columns
      [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
      // Diagonals
      [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
    ];

    const hasWon = winningCombinations.some(combo =>
      combo.every(index => completedSquares.includes(index))
    );

    if (hasWon) {
      setShowModal(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      unlockMeme('full');
    }
  };

  const unlockMeme = (type) => {
    const meme = memes.find(m => m.id === type);
    if (meme) {
      const unlockedMemes = JSON.parse(localStorage.getItem('unlockedMemes') || '[]');
      if (!unlockedMemes.some(m => m.id === type)) {
        const newMeme = {
          ...meme,
          timestamp: new Date().toISOString()
        };
        const updatedMemes = [...unlockedMemes, newMeme];
        localStorage.setItem('unlockedMemes', JSON.stringify(updatedMemes));
        showToast(`New meme unlocked: ${meme.caption}`);
      }
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const shareBoard = async () => {
    const boardElement = document.getElementById('bingo-board');
    const canvas = await html2canvas(boardElement);
    const image = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'student-bingo.png';
    link.href = image;
    link.click();
  };

  const resetBoard = () => {
    setCompleted([]);
    localStorage.removeItem('bingoCompleted');
    setShowModal(false);
    setBoard(generateRandomBoard());
  };

  // Check for easter egg
  useEffect(() => {
    if (clickSequence.length === 3) {
      const isEasterEgg = clickSequence.every((item, index) => 
        item === easterEggSequence[index]
      );
      if (isEasterEgg) {
        router.push('/easter-egg');
      }
    }
  }, [clickSequence, router]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-b from-pink-50 to-purple-50' 
        : 'bg-gradient-to-b from-gray-900 to-purple-900'
    } p-4`}>
      <ThemeToggle 
        onThemeChange={setTheme} 
        onBoardRegenerate={regenerateBoard}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold text-center mb-2 ${
          theme === 'light' ? 'text-purple-800' : 'text-purple-300'
        }`}>
          Melbourne Student Bingo 🎓
        </h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
          New student bingo board every day! 🎉
        </p>
        
        <div id="bingo-board" className="grid grid-cols-5 gap-2 mb-8">
          {board.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleSquare(index)}
              className={`aspect-square p-2 rounded-lg text-center flex items-center justify-center transition-colors duration-200 shadow-md ${
                completed.includes(index)
                  ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : theme === 'light'
                    ? 'bg-white hover:bg-purple-100 text-purple-800'
                    : 'bg-gray-800 hover:bg-purple-900 text-purple-300'
              }`}
            >
              <span className="text-sm font-medium">{item}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowMemeVault(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Meme Vault 🎭
          </button>
          <button
            onClick={shareBoard}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share Board 📤
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-300">
                YOU'VE SEEN IT ALL 😎
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Congratulations! You've experienced the full Melbourne student life!
              </p>
              <button
                onClick={resetBoard}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Restart Bingo
              </button>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            {toast}
          </div>
        )}

        <MemeVault isOpen={showMemeVault} onClose={() => setShowMemeVault(false)} />
      </div>
    </div>
  );
};

export default BingoPage; 