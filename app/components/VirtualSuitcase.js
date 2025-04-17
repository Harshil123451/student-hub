'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const suitcaseItems = [
  { id: 'sim', icon: '📱', name: 'SIM Card', description: 'Get a local SIM card for calls and data' },
  { id: 'bank', icon: '🏦', name: 'Bank Account', description: 'Open a local bank account' },
  { id: 'accommodation', icon: '🏠', name: 'Accommodation', description: 'Find your new home' },
  { id: 'groceries', icon: '🛒', name: 'Groceries', description: 'Stock up on essentials' },
  { id: 'myki', icon: '🚋', name: 'Myki Card', description: 'Get your transport card' },
  { id: 'health', icon: '🏥', name: 'Health Insurance', description: 'Set up your health cover' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  packed: {
    scale: 0.9,
    opacity: 0.6,
    transition: { duration: 0.2 }
  }
};

const successVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

export default function VirtualSuitcase() {
  const [packedItems, setPackedItems] = useState([]);
  const [packingOrder, setPackingOrder] = useState([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('suitcaseProgress');
    const savedOrder = localStorage.getItem('packingOrder');
    if (savedProgress) {
      setPackedItems(JSON.parse(savedProgress));
    }
    if (savedOrder) {
      setPackingOrder(JSON.parse(savedOrder));
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    localStorage.setItem('suitcaseProgress', JSON.stringify(packedItems));
    localStorage.setItem('packingOrder', JSON.stringify(packingOrder));
    
    // Check if all items are packed
    if (packedItems.length === suitcaseItems.length) {
      setShowChecklist(true);
    }
  }, [packedItems, packingOrder]);

  const toggleItem = (itemId) => {
    setPackedItems(prev => {
      if (prev.includes(itemId)) {
        // Remove from packing order when unpacking
        setPackingOrder(prevOrder => prevOrder.filter(id => id !== itemId));
        return prev.filter(id => id !== itemId);
      } else {
        // Only add to packing order if not already present
        setPackingOrder(prevOrder => prevOrder.includes(itemId) ? prevOrder : [...prevOrder, itemId]);
        return [...prev, itemId];
      }
    });
  };

  const resetProgress = () => {
    setPackedItems([]);
    setPackingOrder([]);
    setShowChecklist(false);
    localStorage.removeItem('suitcaseProgress');
    localStorage.removeItem('packingOrder');
  };

  const handleViewChecklist = () => {
    // Create a URL with the packing order as a query parameter
    const orderQuery = packingOrder.join(',');
    router.push(`/checklist?order=${orderQuery}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Your Virtual Student Suitcase
      </motion.h2>
      
      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{packedItems.length} of {suitcaseItems.length} items packed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div 
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(packedItems.length / suitcaseItems.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <AnimatePresence>
          {suitcaseItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              variants={itemVariants}
              initial="hidden"
              animate={packedItems.includes(item.id) ? "packed" : "visible"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg
                ${packedItems.includes(item.id) 
                  ? 'bg-gray-100 border-gray-300' 
                  : 'bg-white border-blue-200 hover:border-blue-400'}`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
              {packedItems.includes(item.id) && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 text-green-500"
                >
                  ✓
                </motion.div>
              )}
              {packingOrder.includes(item.id) && (
                <div className="absolute top-2 left-2 text-blue-500 font-bold">
                  {packingOrder.indexOf(item.id) + 1}
                </div>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={resetProgress}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset Progress
        </motion.button>
        
        <AnimatePresence>
          {showChecklist && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleViewChecklist}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Checklist
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showChecklist && (
          <motion.div 
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 p-4 bg-green-100 rounded-lg text-center"
          >
            <p className="text-green-800 font-medium">You're all set! 🎒 Here's your personalized checklist.</p>
            <p className="text-sm text-green-700 mt-2">Your items will be shown in the order you packed them.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 