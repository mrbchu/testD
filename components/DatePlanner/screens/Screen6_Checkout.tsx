'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Star, Download, RefreshCw } from 'lucide-react';
import ScratchCard from '../components/ScratchCard';
import { downloadReceipt } from '@/lib/receiptGenerator';
import Sparkles from '../animations/Sparkles';

const mediaPosters: Record<string, string> = {
  "Love Reset": "/LoveReset.jpg",
  "Steal My Heart": "/StealMyHeart.jpg",
  "Sweet & Sour": "/sweetsour.jpg",
  "Mood Of The Day": "/MoodOfTheDay.jpg",
  "Little Forest": "/LettleForest.jpg",
  "My Dearest Nemesis": "/MyDearestNemesis.jpg",
  "Genie, Make a Wish": "/GenieMakeaWish.jpg",
  "My Demon": "/MyDemon.jpg",
  "Perfect Crown": "/PerfectCrown.jpg",
  "Queen of Tears": "/QueenOFTears.jpg",
};

// FIXED: Synced arrays with the true Screen 4 filenames
const ramenImages: Record<string, string> = {
  "Plain Ramen Base": "/plain_ramen.jpg",
  "Spicy Ramen Base": "/spicy_ramen.jpg",
  "Cheese Ramen Base": "/cheese_ramen.jpg",
  "Gochujang Paste": "/gochujang.jpg",
  "Fresh Seaweed": "/seaweed.jpg",
  "Shabu balls": "/shabu_balls.jpg",
  "Topokki": "/topokki.jpg",
  "Beef Slices": "/beef_slice.jpg",
  "Chicken": "/chicken.jpg",
  "Juicy Porkchops": "/porkchops.jpg",
  "Luncheon Meat": "/luncheon_meat.jpg",
};

const ramenPricesLookup: Record<string, number> = {
  "Plain Ramen Base": 5,
  "Spicy Ramen Base": 8,
  "Cheese Ramen Base": 10,
  "Gochujang Paste": 2,
  "Fresh Seaweed": 3,
  "Shabu balls": 4,
  "Topokki": 5,
  "Beef Slices": 7,
  "Chicken": 6,
  "Juicy Porkchops": 8,
  "Luncheon Meat": 5,
};

const Screen6_Checkout: React.FC = () => {
  const { state, setState, saveOrder, resetApp } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [showReceiptDetails, setShowReceiptDetails] = useState(false);

  const [starRating, setStarRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackNote, setFeedbackNote] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const paymentOptions = [
    { id: 'voice', label: 'Voice Kiss', emoji: '🎙️' },
    { id: 'video', label: 'Video Kiss', emoji: '📹' },
    { id: 'both', label: 'Both', emoji: '🥂' },
    { id: 'later', label: 'ill think later', emoji: '😉' },
  ];

  const handlePlaceOrder = async () => {
    if (!selectedPayment) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    saveOrder(selectedPayment);
    setIsSuccess(true);
    setIsProcessing(false);
  };

  const handleSubmitFeedback = () => {
    setState({
      feedbackStars: starRating,
      feedbackNote: feedbackNote.trim()
    });
    setFeedbackSubmitted(true);
  };

  const handleDownloadReceipt = async () => {
    saveOrder(selectedPayment);
    await downloadReceipt({
      ...state,
      feedbackStars: starRating,
      feedbackNote: feedbackNote.trim()
    });
    setShowReceiptDetails(true);
  };

  const chosenRamen = Object.entries(state.selectedRamenItems || {}).filter(([_, qty]) => (qty as number) > 0);

  // Calculate live preview calculations for display element block
  const calculatedRamenCost = chosenRamen.reduce((sum, [itemId, qty]) => {
    const price = ramenPricesLookup[itemId] || 0;
    return sum + price * (qty as number);
  }, 0);

  const combinedMedia = [...(state.selectedMovies || []), ...(state.selectedSeries || [])];
  const eventCost = 1;
  const mediaCost = combinedMedia.length;
  const serviceCharge = 1;
  const totalChargedPreview = eventCost + mediaCost + calculatedRamenCost + serviceCharge + (state.tipsAmount || 0);

  if (isProcessing) {
    return (
      <motion.div className="min-h-screen w-full flex flex-col items-center justify-center pt-28 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="w-40 h-40 overflow-hidden rounded-2xl mb-6" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <img src="/processing-loader.gif" alt="Processing..." className="w-full h-full object-contain" />
        </motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="mb-6">
          <Loader2 className="w-12 h-12 text-pink-400" />
        </motion.div>
        <p className="text-2xl font-bold text-gray-800 text-center">Processing your order...</p>
        <p className="text-gray-600 mt-2 text-center">Getting ready for your special date!</p>
      </motion.div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-28 pb-24 bg-gradient-to-b from-[#FFE5EC] to-[#FFC2D1] overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="max-w-2xl w-full">
          
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-44 h-44 overflow-hidden rounded-3xl mb-4 shadow-sm">
              <img src="/success-celebration.gif" alt="Success Celebration" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-2">Order Successfully Placed!</h1>
            <p className="text-slate-600 font-medium">Our date is locked in! Let&apos;s make it unforgettable.</p>
          </div>

          <ScratchCard revealText="I love you, can't wait for our date! 💖" onRevealThreshold={setIsRevealed} />

          {/* ⭐ FEEDBACK ENTRY SECTION FIRST */}
          <div className="bg-white rounded-3xl p-6 border-2 border-pink-100 shadow-xl mt-8 text-center">
            <h3 className="font-extrabold text-slate-800 text-lg mb-1">Rate Your App Planner Experience! ✨</h3>
            <p className="text-xs text-slate-400 font-semibold mb-4">Leave a score for your prince before downloading the official bill</p>
            
            {!feedbackSubmitted ? (
              <>
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setStarRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || starRating)
                            ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="Write a sweet message or note about our upcoming date plan... 🥰💬"
                  className="w-full h-20 p-3 rounded-xl border border-slate-200 focus:border-pink-400 focus:outline-none text-slate-700 bg-slate-50/50 text-sm resize-none mb-4 placeholder-slate-400 font-medium"
                />

                <button
                  disabled={starRating === 0}
                  onClick={handleSubmitFeedback}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-pink-500 hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  Submit Feedback ❤️
                </button>
              </>
            ) : (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="py-2">
                <p className="text-emerald-600 font-black text-sm">🎉 Feedback Locked In Successfully! 🥰</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">You can now download the complete official bill below.</p>
              </motion.div>
            )}
          </div>

          <div className="space-y-3 mt-6">
            <button
              onClick={handleDownloadReceipt}
              disabled={!feedbackSubmitted}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-xl transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" /> Lock in & Download Bill 📅
            </button>
            
            {feedbackSubmitted && (
              <button onClick={resetApp} className="w-full py-4 rounded-xl font-bold text-gray-700 bg-white/80 border border-pink-200 hover:bg-gray-100 transition-all text-lg flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Plan Another Date
              </button>
            )}
          </div>

          {/* RENDER BILL PREVIEW DISPLAY DETAILS */}
          <AnimatePresence>
            {showReceiptDetails && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-white rounded-3xl p-6 shadow-xl border border-pink-100 space-y-6">
                <div className="border-b-2 border-dashed border-pink-100 pb-4 text-center">
                  <span className="text-xs uppercase tracking-widest text-pink-400 font-black">Official Date Receipt</span>
                  <h2 className="text-xl font-bold text-slate-800 mt-1">Our Sweet Additions 🧾</h2>
                </div>

                {combinedMedia.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider">🎬 Showtimes to Watch</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {combinedMedia.map((title) => (
                        <div key={title} className="bg-pink-50/40 border border-pink-100/60 p-2 rounded-xl flex items-center gap-3">
                          <div className="w-12 h-16 rounded-lg overflow-hidden bg-zinc-200 flex-shrink-0">
                            <img src={mediaPosters[title] || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100"} alt={title} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-bold text-slate-700 line-clamp-2">{title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {state.customMovieSuggestion && (
                  <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-xs font-medium text-slate-600">
                    <span className="font-bold text-slate-800">💡 Suggested Movies:</span> {state.customMovieSuggestion}
                  </div>
                )}

                {chosenRamen.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider">🍜 Our Hotpot Recipe Basket</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {chosenRamen.map(([name, qty]) => (
                        <div key={name} className="bg-amber-50/40 border border-amber-100/60 p-2 rounded-xl flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-200 flex-shrink-0">
                            <img src={ramenImages[name] || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100"} alt={name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700 line-clamp-1">{name}</span>
                            <span className="text-[11px] text-amber-600 font-extrabold mt-0.5">Qty: {qty}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-amber-50/40 border border-amber-100 p-3 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-700">⭐ Submitted Review Score:</span>
                  <div className="flex gap-0.5 my-1">
                    {Array.from({ length: starRating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {feedbackNote && <p className="text-slate-600 italic font-medium">"{feedbackNote}"</p>}
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 text-xs font-medium text-slate-500 space-y-1.5 border border-slate-100">
                  <p><span className="font-bold text-slate-700">Order Token:</span> #{Date.now().toString().slice(-6)}</p>
                  <p><span className="font-bold text-slate-700">Experience Profile:</span> {state.dateType}</p>
                  <p><span className="font-bold text-slate-700">Settlement Gateway:</span> KissPay ({selectedPayment})</p>
                  <div className="border-t border-slate-200/60 mt-2 pt-2 flex justify-between items-center text-sm">
                    <span className="font-black text-slate-700">Total Charged:</span>
                    <span className="font-black text-pink-500 text-base">{totalChargedPreview} Kisses 💋</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 pt-28" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="max-w-2xl w-full" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">KissPay Secure Checkout</h1>
          <p className="text-gray-600 mb-4">Choose how you&apos;d like to pay</p>
          <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-2xl">
            <img src="/checkout-header.gif" alt="Secure Pay" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {paymentOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setSelectedPayment(option.id)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                selectedPayment === option.id ? 'bg-gradient-to-br from-pink-400 to-rose-400 border-pink-500 text-white shadow-xl' : 'bg-white border-pink-200 text-gray-800 hover:border-pink-400'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3">{option.emoji}</div>
              <p className="font-bold text-lg">{option.label}</p>
            </motion.button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-center text-sm text-blue-700">
          🔒 Your kisses are secure and encrypted
        </div>

        <motion.button onClick={handlePlaceOrder} disabled={!selectedPayment} className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:shadow-xl transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed">
          Place Order ✨
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Screen6_Checkout;
