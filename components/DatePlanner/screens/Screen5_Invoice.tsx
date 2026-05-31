'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingKisses from '../animations/FloatingKisses';

const Screen5_Invoice: React.FC = () => {
  const { state, setState, goToScreen } = useApp();
  const [showRevealText, setShowRevealText] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [floatingKisses, setFloatingKisses] = useState<Array<{ id: string; x: number; y: number }>>([]);

  const tipOptions = [
    { label: '2 Kisses', kisses: 2 },
    { label: '4 Kisses', kisses: 4 },
    { label: '6 Kisses', kisses: 6 },
  ];

  const calculateEventCost = () => {
    const baseCount = state.selectedGames?.length > 0 ? 1 : 1; // Event cost = 1 Kiss
    return baseCount;
  };

  const calculateMediaCost = () => {
    return (state.selectedMovies?.length || 0) + (state.selectedSeries?.length || 0);
  };

  const calculateRamenCost = () => {
    // 🍲 Updated item matrix to seamlessly lookup exact database string keys from Screen 4
    const ramenOptions = [
      { id: 'Plain Ramen Base', kisses: 5 },
      { id: 'Spicy Ramen Base', kisses: 8 },
      { id: 'Cheese Ramen Base', kisses: 10 },
      { id: 'Gochujang Paste', kisses: 2 },
      { id: 'Fresh Seaweed', kisses: 3 },
      { id: 'Shabu balls', kisses: 4 },
      { id: 'Topokki', kisses: 5 },
      { id: 'Beef Slices', kisses: 7 },
      { id: 'Chicken', kisses: 6 },
      { id: 'Juicy Porkchops', kisses: 8 },
      { id: 'Luncheon Meat', kisses: 5 },
    ];

    return Object.entries(state.selectedRamenItems || {}).reduce((sum, [itemId, qty]) => {
      const item = ramenOptions.find((r) => r.id === itemId);
      return sum + (item?.kisses || 0) * (qty as number);
    }, 0);
  };

  const eventCost = calculateEventCost();
  const mediaCost = calculateMediaCost();
  const ramenCost = calculateRamenCost();
  const subtotal = eventCost + mediaCost + ramenCost;
  const serviceCharge = 1; // 1 Kiss service charge
  const totalBeforeTip = subtotal + serviceCharge;

  const handleGoBack = () => {
    goToScreen(4);
  };

  const handleAddTip = (kisses: number, event: React.MouseEvent<HTMLButtonElement>) => {
    setState({ tipsAmount: (state.tipsAmount || 0) + kisses });

    // Create multiple floating particles from button
    const rect = event.currentTarget.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Spawn 5-8 particles in rapid succession
    const particleCount = 6 + Math.floor(Math.random() * 2);
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const id = `kiss-${Date.now()}-${i}-${Math.random()}`;
        setFloatingKisses((prev) => [...prev, { id, x: buttonCenterX, y: buttonCenterY }]);

        setTimeout(() => {
          setFloatingKisses((prev) => prev.filter((k) => k.id !== id));
        }, 2000);
      }, i * 50);
    }
  };

  const handleProceedPayment = () => {
    goToScreen(6);
  };

  return (
    <motion.div
      className="min-h-screen w-full px-4 md:px-6 py-8 pt-28 md:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating kisses */}
      {floatingKisses.map((kiss) => (
        <FloatingKisses key={kiss.id} x={kiss.x} y={kiss.y} />
      ))}

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Invoice Header Section */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Our Date Night Summary 📝</h1>
          <p className="text-slate-500 font-medium mb-4">Here is our finalized order breakdown</p>
          {/* Billing Page GIF */}
          <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-2xl">
            <img src="/billing-header.gif" alt="Pusheen Invoice" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Receipt Card with wavy edges */}
        <motion.div 
          className="relative bg-gradient-to-b from-pink-50 to-rose-50 rounded-xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg border-2 border-pink-200"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, pink 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 4px 4px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Wavy edge top */}
          <div className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full" style={{ clipPath: 'polygon(0 50%, 2% 30%, 4% 50%, 6% 30%, 8% 50%, 10% 30%, 12% 50%, 14% 30%, 16% 50%, 18% 30%, 20% 50%, 22% 30%, 24% 50%, 26% 30%, 28% 50%, 30% 30%, 32% 50%, 34% 30%, 36% 50%, 38% 30%, 40% 50%, 42% 30%, 44% 50%, 46% 30%, 48% 50%, 50% 30%, 52% 50%, 54% 30%, 56% 50%, 58% 30%, 60% 50%, 62% 30%, 64% 50%, 66% 30%, 68% 50%, 70% 30%, 72% 50%, 74% 30%, 76% 50%, 78% 30%, 80% 50%, 82% 30%, 84% 50%, 86% 30%, 88% 50%, 90% 30%, 92% 50%, 94% 30%, 96% 50%, 98% 30%, 100% 50%)' }} />
          
          {/* Receipt Header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-pink-300">
            <p className="text-xl font-bold text-gray-800">✨ Date Invoice ✨</p>
            <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
          </div>

          {/* Receipt Items */}
          <div className="space-y-4 mb-6">
            {state.dateType && (
              <div className="flex items-center justify-between text-gray-800 bg-white/50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🎬</span>
                  <span className="font-semibold">{state.dateType} Event</span>
                </div>
                <span className="font-bold text-pink-600">{eventCost} Kiss</span>
              </div>
            )}

            {state.selectedMovies?.length > 0 && (
              <div className="flex items-center justify-between text-gray-800 bg-white/50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🎥</span>
                  <span className="font-semibold">{state.selectedMovies.length} Movie(s)</span>
                </div>
                <span className="font-bold text-pink-600">{state.selectedMovies.length} Kisses</span>
              </div>
            )}

            {state.selectedSeries?.length > 0 && (
              <div className="flex items-center justify-between text-gray-800 bg-white/50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">📺</span>
                  <span className="font-semibold">{state.selectedSeries.length} Series</span>
                </div>
                <span className="font-bold text-pink-600">{state.selectedSeries.length} Kisses</span>
              </div>
            )}

            {Object.entries(state.selectedRamenItems || {}).filter(([_, qty]) => (qty as number) > 0).length > 0 && (
              <div className="space-y-2">
                {Object.entries(state.selectedRamenItems).map(([itemId, qty]) => {
                  // 🎀 Dynamic display mapping setup to correctly process text strings and match custom emojis
                  const ramenMap: Record<string, { name: string; emoji: string; kisses: number }> = {
                    'Plain Ramen Base': { name: 'Plain Ramen Base', emoji: '🍜', kisses: 5 },
                    'Spicy Ramen Base': { name: 'Spicy Ramen Base', emoji: '🌶️', kisses: 8 },
                    'Cheese Ramen Base': { name: 'Cheese Ramen Base', emoji: '🍲', kisses: 10 },
                    'Gochujang Paste': { name: 'Gochujang Paste', emoji: '🥫', kisses: 2 },
                    'Fresh Seaweed': { name: 'Fresh Seaweed', emoji: '🌿', kisses: 3 },
                    'Shabu balls': { name: 'Shabu balls', emoji: '🍢', kisses: 4 },
                    'Topokki': { name: 'Topokki', emoji: '🍡', kisses: 5 },
                    'Beef Slices': { name: 'Beef Slices', emoji: '🥩', kisses: 7 },
                    'Chicken': { name: 'Chicken', emoji: '🍗', kisses: 6 },
                    'Juicy Porkchops': { name: 'Juicy Porkchops', emoji: '🐷', kisses: 8 },
                    'Luncheon Meat': { name: 'Luncheon Meat', emoji: '🥓', kisses: 5 },
                  };
                  const item = ramenMap[itemId];
                  return item && (qty as number) > 0 ? (
                    <div key={itemId} className="flex items-center justify-between text-gray-800 bg-white/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{item.emoji}</span>
                        <span className="font-semibold">{item.name} x{qty}</span>
                      </div>
                      <span className="font-bold text-pink-600">{item.kisses * (qty as number)} Kisses</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* Service Charge */}
            <div className="flex items-center justify-between text-gray-800 bg-white/50 p-2 rounded-lg border-t-2 border-dashed border-pink-300 pt-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🎀</span>
                <span className="font-semibold">Service</span>
              </div>
              <span className="font-bold text-pink-600">{serviceCharge} Kiss</span>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between text-lg font-bold text-gray-800 mb-4 p-2">
            <span>Subtotal:</span>
            <span>{totalBeforeTip} Kisses</span>
          </div>

          {/* Tip Display */}
          {state.tipsAmount > 0 && (
            <div className="flex justify-between text-lg font-bold text-pink-600 mb-4 p-2">
              <span>Tips:</span>
              <span>+{state.tipsAmount} Kisses</span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between text-2xl font-bold text-pink-600 p-2 rounded-lg bg-gradient-to-r from-pink-100 to-rose-100">
            <span>Total:</span>
            <span>{totalBeforeTip + state.tipsAmount} Kisses</span>
          </div>

          {/* Wavy edge bottom */}
          <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full" style={{ clipPath: 'polygon(0 50%, 2% 70%, 4% 50%, 6% 70%, 8% 50%, 10% 70%, 12% 50%, 14% 70%, 16% 50%, 18% 70%, 20% 50%, 22% 70%, 24% 50%, 26% 70%, 28% 50%, 30% 70%, 32% 50%, 34% 70%, 36% 50%, 38% 70%, 40% 50%, 42% 70%, 44% 50%, 46% 70%, 48% 50%, 50% 70%, 52% 50%, 54% 70%, 56% 50%, 58% 70%, 60% 50%, 62% 70%, 64% 50%, 66% 70%, 68% 50%, 70% 70%, 72% 50%, 74% 70%, 76% 50%, 78% 70%, 80% 50%, 82% 70%, 84% 50%, 86% 70%, 88% 50%, 90% 70%, 92% 50%, 94% 70%, 96% 50%, 98% 70%, 100% 50%)' }} />
        </motion.div>

        {/* Continue Purchase Section */}
        <motion.div
          className="bg-white rounded-2xl p-6 md:p-8 border-2 border-pink-200 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-center text-base md:text-lg font-bold text-gray-800 mb-4">
            ANYTHING ELSE MY DEAR PRINCESS? 👑
          </p>

          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 text-sm md:text-base"
            >
              Ahem idk
            </button>
            <button
              onClick={() => setShowRevealText(!showRevealText)}
              className="px-4 py-2 rounded-lg bg-pink-200 text-pink-700 font-semibold hover:bg-pink-300 text-sm md:text-base"
            >
              No thx cutie
            </button>
          </div>

          {/* Reveal Text */}
          <AnimatePresence>
            {showRevealText && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-pink-600 font-bold text-sm"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                >
                  ayooo Ahemm 🫣
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Payment Due Warning */}
        <motion.div
          className="bg-red-100 border-2 border-red-400 rounded-2xl p-4 mb-8 text-center"
          animate={{ backgroundColor: ['rgb(254, 226, 226)', 'rgb(254, 240, 240)', 'rgb(254, 226, 226)'] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <p className="font-bold text-red-700 mb-2">
            ⚠️ Previous payment due of Video Kisses! ⚠️
          </p>
          <button
            onClick={() => setShowTipModal(true)}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600"
          >
            hehe i&apos;ll pay it soon
          </button>
        </motion.div>

        {/* Tip Modal */}
        <AnimatePresence>
          {showTipModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-8"
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-center text-base md:text-lg font-bold text-gray-800 mb-6">
                  Tips: Add some extra love? 💕
                </p>

                <div className="space-y-3 mb-6">
                  {tipOptions.map((option) => (
                    <motion.button
                      key={option.kisses}
                      onClick={(e) => handleAddTip(option.kisses, e)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-300 to-rose-300 text-white font-bold hover:shadow-lg transition-all text-sm md:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setShowTipModal(false)}
                  className="w-full py-2 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 text-sm md:text-base"
                >
                  Add to cart
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proceed Button */}
        <motion.button
          onClick={handleProceedPayment}
          className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:shadow-xl transition-all text-lg animate-pulse"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Proceed for Payment 💖
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Screen5_Invoice;
