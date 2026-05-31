'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderDetailModal from './components/OrderDetailModal';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
  const { state, resetApp } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<(typeof state.orderHistory)[0] | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Order Detail Modal */}
          {selectedOrder && (
            <OrderDetailModal
              isOpen={!!selectedOrder}
              onClose={() => setSelectedOrder(null)}
              order={selectedOrder}
            />
          )}

          {/* Drawer */}
          <motion.div
            className="fixed top-0 left-0 h-screen w-80 z-50 bg-white shadow-2xl overflow-y-auto"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center text-white font-bold">
                  {state.userName[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{state.userName}</p>
                  <p className="text-xs text-gray-500">{state.orderHistory.length} orders</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order History */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Order History</h3>

              {state.orderHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">No previous orders yet</p>
              ) : (
                <div className="space-y-3">
                  {state.orderHistory.map((order) => (
                    <motion.button
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="font-medium text-gray-800 text-sm">{order.dateType}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs font-semibold text-pink-600 mt-2">
                        {order.tipsAmount + 1} Kisses Total
                      </p>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 space-y-2 border-t border-gray-200">
              <button
                onClick={() => {
                  resetApp();
                  onClose();
                }}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-300 to-rose-300 text-white font-medium hover:shadow-lg transition-shadow"
              >
                Start New Date
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDrawer;
