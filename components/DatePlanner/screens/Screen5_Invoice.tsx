"use client"

import React from "react"
import { motion } from "framer-motion"
import { useApp } from "@/lib/context/AppContext"
import { ClipboardText, Heart, ArrowLeft, CheckCircle } from "lucide-react"

// Exact duplicate menu matrix to sync up string names and numeric calculations character-for-character
const ramenIngredientsLookup = [
  { name: "Plain Ramen Base", price: 5 },
  { name: "Spicy Ramen Base", price: 8 },
  { name: "Cheese Ramen Base", price: 10 },
  { name: "Gochujang Paste", price: 2 },
  { name: "Fresh Seaweed", price: 3 },
  { name: "Shabu balls", price: 4 },
  { name: "Topokki", price: 5 },
  { name: "Beef Slices", price: 7 },
  { name: "Chicken", price: 6 },
  { id: "i10", name: "Juicy Porkchops", price: 8 },
  { id: "i11", name: "Luncheon Meat", price: 5 },
]

export default function Screen5_Invoice() {
  const { state, setState, goToScreen } = useApp()

  // Gracefully fallback values to prevent system layout crashing
  const selectedMovies = state.selectedMovies || []
  const selectedSeries = state.selectedSeries || []
  const selectedRamenItems = state.selectedRamenItems || {}
  const customMovieSuggestion = state.customMovieSuggestion || ""
  const customRamenSuggestion = state.customRamenSuggestion || ""
  const userName = state.userName || "Princess"

  // 1. Compile the active chosen components from state array records
  const activeRamenIngredients = ramenIngredientsLookup
    .filter(item => (selectedRamenItems[item.name] || 0) > 0)
    .map(item => ({
      name: item.name,
      quantity: selectedRamenItems[item.name],
      itemTotal: (selectedRamenItems[item.name] || 0) * item.price
    }))

  // 2. Perform math reduction loop to figure out final kiss tally
  const grandTotalKisses = activeRamenIngredients.reduce((sum, item) => sum + item.itemTotal, 0)

  return (
    <div className="min-h-screen w-full bg-[#110d16] text-slate-100 p-4 md:p-8 pt-28 pb-32 relative overflow-y-auto">
      <div className="max-w-2xl mx-auto z-10 relative">
        
        {/* Header Block */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent mb-2">
            Our Date Ledger 🧾
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm font-medium">
            Review our synchronized agenda before locking in the reservations
          </p>
        </div>

        {/* Core Invoice Summary Card */}
        <div className="bg-[#1a1422] border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-50 to-amber-400" />

          {/* Customer profile banner row */}
          <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4 text-xs font-bold text-zinc-400">
            <div>
              <p className="uppercase tracking-wider text-[10px] text-pink-400">Reservation For</p>
              <p className="text-sm font-black text-zinc-200 mt-0.5">👑 {userName}</p>
            </div>
            <div className="text-right">
              <p className="uppercase tracking-wider text-[10px] text-amber-400">Invoice Status</p>
              <p className="text-sm font-black text-emerald-400 mt-0.5">Pending Kisses</p>
            </div>
          </div>

          {/* SECTION 1: WATCHLIST ENTERTAINMENT SELECTIONS */}
          <div className="text-left space-y-2">
            <h3 className="text-xs font-black uppercase text-pink-400 tracking-wider">1. Showtime Selections</h3>
            
            {selectedMovies.length === 0 && selectedSeries.length === 0 && !customMovieSuggestion ? (
              <p className="text-sm font-medium text-zinc-500 italic pl-3">No movies or series picked yet...</p>
            ) : (
              <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 space-y-2 text-sm font-semibold text-zinc-300">
                {[...selectedMovies, ...selectedSeries].map((title, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <span>{title}</span>
                  </div>
                ))}
                {customMovieSuggestion && (
                  <div className="pt-1.5 border-t border-zinc-800/60 mt-1 text-xs text-zinc-400 italic font-medium">
                    <span className="text-pink-400 font-bold not-italic">Extra note:</span> "{customMovieSuggestion}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: HOTPOT INGREDIENT RENDERING MATRIX */}
          <div className="text-left space-y-2">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">2. Hotpot Recipe Basket</h3>
            
            {activeRamenIngredients.length === 0 ? (
              <p className="text-sm font-medium text-zinc-500 italic pl-3">Your recipe basket is currently empty...</p>
            ) : (
              <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 space-y-3">
                {activeRamenIngredients.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm font-bold">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{item.name}</span>
                      <span className="text-xs font-medium text-zinc-500">x{item.quantity}</span>
                    </div>
                    <span className="text-pink-400 text-xs font-black">{item.itemTotal} Kisses</span>
                  </div>
                ))}
                
                {customRamenSuggestion && (
                  <div className="pt-2 border-t border-zinc-800/60 mt-1 text-xs text-zinc-400 italic font-medium">
                    <span className="text-amber-400 font-bold not-italic">Extra adjustments:</span> "{customRamenSuggestion}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FINAL TOTAL INVOICE BLOCK DECK */}
          <div className="pt-4 border-t-2 border-dashed border-zinc-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-black uppercase text-zinc-400 tracking-wider">Grand Date Total</p>
              <p className="text-[10px] font-medium text-zinc-500 mt-0.5">Non-refundable romantic value assessment</p>
            </div>
            <div className="flex items-center gap-1 bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-2xl">
              <span className="text-xl md:text-2xl font-black text-pink-400">{grandTotalKisses}</span>
              <span className="text-sm font-extrabold text-pink-300">Kisses 💋</span>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BUTTON CONTROLS ARRAY CONTAINER */}
        <div className="flex gap-3 max-w-xl mx-auto mt-8 items-center justify-center">
          <button
            onClick={() => goToScreen(4)}
            className="flex items-center gap-1.5 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 px-6 py-4 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer border border-zinc-700/50"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <button
            onClick={() => goToScreen(6)}
            className="flex-grow bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-black py-4 rounded-full shadow-xl text-base transition-all tracking-wide cursor-pointer flex items-center justify-center gap-2"
          >
            Lock In Date Arrangement <CheckCircle className="w-5 h-5 fill-white/10" />
          </button>
        </div>

      </div>
    </div>
  )
}
