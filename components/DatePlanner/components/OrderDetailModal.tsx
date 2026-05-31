'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    dateType: string;
    createdAt: string;
    tipsAmount: number;
    selectedMovies: string[];
    selectedSeries: string[];
    selectedGames: string[];
  };
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, order }) => {
  const gameMap: Record<string, string> = {
    chess: '♟️ Chess',
    boardgame: '🎲 Board Games',
    videogame: '🎮 Video Games',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-96 overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-3xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{order.dateType}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Movies */}
                {order.selectedMovies && order.selectedMovies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🎬 Movies</h3>
                    <div className="space-y-2">
                      {order.selectedMovies.map((movie) => (
                        <p key={movie} className="text-sm text-gray-600 pl-3">
                          • {movie}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Series */}
                {order.selectedSeries && order.selectedSeries.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">📺 Series</h3>
                    <div className="space-y-2">
                      {order.selectedSeries.map((series) => (
                        <p key={series} className="text-sm text-gray-600 pl-3">
                          • {series}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Games */}
                {order.selectedGames && order.selectedGames.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🎮 Games</h3>
                    <div className="space-y-2">
                      {order.selectedGames.map((game) => (
                        <p key={game} className="text-sm text-gray-600 pl-3">
                          • {gameMap[game] || game}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-lg font-bold text-pink-600">
                    Total: {order.tipsAmount + 1} Kisses
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailModal;
