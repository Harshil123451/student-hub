'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AcademicCapIcon, HomeIcon, SparklesIcon, LightBulbIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const studentTips = [
  "Join student Facebook groups to grab free furniture!",
  "Always carry your student ID for discounts around town",
  "Check out the campus library's free printing services",
  "Use public transport with your student pass to save money",
  "Attend career fairs early in the semester for the best opportunities"
];

export default function NotFound() {
  const [randomTip, setRandomTip] = useState('');
  const [showSparkles, setShowSparkles] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    // Set a random tip when component mounts
    setRandomTip(studentTips[Math.floor(Math.random() * studentTips.length)]);
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Starter Kit', href: '/starter-kit', icon: AcademicCapIcon },
    { name: 'Explore', href: '/explore', icon: AcademicCapIcon },
    { name: 'Student Tips', href: '/tips', icon: AcademicCapIcon },
    { name: 'Help Me Decide', href: '/help-me-decide', icon: AcademicCapIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          {/* Lost Student Illustration */}
          <motion.div 
            className="relative w-72 h-72 mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute inset-0 bg-indigo-50 rounded-full opacity-20"></div>
            <AcademicCapIcon className="w-40 h-40 mx-auto mt-16 text-indigo-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-extrabold text-gray-900">
              Oops! Looks like you're lost
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Don't worry, we'll help you find your way back
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setIsHovered(index)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <link.icon className="w-6 h-6 mr-3" />
                      {link.name}
                    </div>
                    <ArrowRightIcon className={`w-5 h-5 transition-transform duration-300 ${isHovered === index ? 'translate-x-1' : ''}`} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Random Student Tip */}
          <motion.div 
            className="mt-12 p-8 bg-white rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-50 rounded-full">
                <LightBulbIcon className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900">
                Random Student Tip
              </h3>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              {randomTip}
            </p>
          </motion.div>

          {/* Easter Egg */}
          <motion.div 
            className="mt-12 cursor-pointer"
            onClick={() => setShowSparkles(!showSparkles)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-sm text-gray-500">
              You found the secret student hideout! {showSparkles ? '⭐' : '😎'} Want a gold star?
            </p>
            {showSparkles && (
              <motion.div 
                className="flex justify-center mt-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SparklesIcon className="w-8 h-8 text-yellow-500 animate-pulse" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 