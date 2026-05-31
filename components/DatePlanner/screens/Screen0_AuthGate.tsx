'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { motion } from 'framer-motion';

const Screen0_AuthGate: React.FC = () => {
  const { state, setState, goToScreen } = useApp();
  const [inputName, setInputName] = useState('');

  const handleStart = () => {
    if (inputName.trim()) {
      setState({
        userName: inputName.trim(),
        currentScreen: 1,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center px-4 pt-28 md:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-md w-full px-4 sm:px-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 px-16 md:px-8">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Date Planner
          </motion.h1>
          <motion.p
            className="text-gray-600 text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Plan the perfect date together
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Cute Message */}
          <p className="text-center text-gray-700 text-base sm:text-lg">
            What's your name, cutie?
          </p>

          {/* Input */}
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me your name..."
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
            autoFocus
          />

          {/* Button */}
          <motion.button
            onClick={handleStart}
            disabled={!inputName.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Go!
          </motion.button>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 text-2xl">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: i * 0.1, duration: 1, repeat: Infinity }}
              >
                💖
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Screen0_AuthGate;
