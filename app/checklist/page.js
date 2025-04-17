'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const suitcaseItems = {
  'sim': {
    id: 'sim',
    title: 'SIM Card',
    description: 'Get a local SIM card for calls and data',
    icon: '📱',
    category: 'essentials'
  },
  'bank': {
    id: 'bank',
    title: 'Bank Account',
    description: 'Open a local bank account',
    icon: '🏦',
    category: 'essentials'
  },
  'accommodation': {
    id: 'accommodation',
    title: 'Accommodation',
    description: 'Find your new home',
    icon: '🏠',
    category: 'essentials'
  },
  'groceries': {
    id: 'groceries',
    title: 'Groceries',
    description: 'Stock up on essentials',
    icon: '🛒',
    category: 'essentials'
  },
  'myki': {
    id: 'myki',
    title: 'Myki Card',
    description: 'Get your transport card',
    icon: '🚋',
    category: 'essentials'
  },
  'health': {
    id: 'health',
    title: 'Health Insurance',
    description: 'Set up your health cover',
    icon: '🏥',
    category: 'essentials'
  }
};

export default function Checklist() {
  const [completedItems, setCompletedItems] = useState({});
  const searchParams = useSearchParams();
  const orderParam = searchParams.get('order');
  // Use a Set to keep only unique items while maintaining order
  const orderedItems = orderParam 
    ? [...new Set(orderParam.split(','))]
    : Object.keys(suitcaseItems);

  useEffect(() => {
    // Load completed items from localStorage on mount
    const savedItems = localStorage.getItem('checklistCompletedItems');
    if (savedItems) {
      setCompletedItems(JSON.parse(savedItems));
    }
  }, []);

  const toggleItem = (id) => {
    setCompletedItems(prev => {
      const newItems = {
        ...prev,
        [id]: !prev[id]
      };
      // Save to localStorage whenever items change
      localStorage.setItem('checklistCompletedItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Your Personalized Checklist
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Follow these steps in your preferred order
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {orderedItems.map((itemId, index) => {
              const item = suitcaseItems[itemId];
              if (!item) return null;

              return (
                <div key={item.id} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-100 text-indigo-600">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {index + 1}. {item.title}
                        </h3>
                        <p className={`mt-1 text-sm ${completedItems[item.id] ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.description}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          id={item.id}
                          name={item.id}
                          type="checkbox"
                          checked={completedItems[item.id] || false}
                          onChange={() => toggleItem(item.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/starter-kit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Starter Kit
        </Link>
      </div>
    </div>
  );
} 