"use client"

import React from "react"
import { motion } from "framer-motion"
import { useApp } from "@/lib/context/AppContext"
import { ArrowLeft, CheckCircle } from "lucide-react"

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
  { name: "Juicy Porkchops", price: 8 },
  { name: "Luncheon Meat", price: 5 },
]

export default function Screen5_Invoice() {
  const { state, setState, goToScreen } = useApp()

  const selectedMovies = state.selectedMovies || []
  const selectedSeries = state.selectedSeries || []
  const selectedRamenItems = state.selectedRamenItems || {}
  const customMovieSuggestion = state.customMovieSuggestion || ""
  const customRamenSuggestion = state.customRamenSuggestion || ""
  const userName = state.userName || "Princess"

  // Compile active ingredients and calculate totals
  const activeRamenIngredients = ramenIngredientsLookup
    .filter(item => (selectedRamenItems[item.name] || 0) > 0)
    .map(item => ({
      name: item.name,
      quantity: selectedRamenItems[item.name],
      itemTotal: (selectedRamenItems[item.name] || 0) * item.price
    }))

  const grandTotalKisses = activeRamenIngredients.reduce((sum, item) => sum + item.itemTotal, 0)

  return (
    <div className="min-h-screen w-full bg-[#160d15] text-slate-100 p-4 md:p-8 pt-28 pb-32 relative overflow-y-auto">
      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Header Block */}
        <div className="text-center mb-10 px-16 md:px-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent mb-3">
            Our Date Ledger 🧾
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-medium mb-4">
            Review our synchronized agenda before locking in the reservations
          </p>
          <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-2xl">
            <img src="/billing-header.gif" alt="Billing Header" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Core Invoice Card Layout */}
        <div className="max-w-3xl mx-auto bg-[#1c121b] border border-zinc-800 rounded-3xl p-6 text-left shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-400 to-rose-300" />

          {/* Profile Row */}
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

          {/* 🍿 1. SHOWTIME SELECTIONS */}
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase text-pink-400 tracking-wider">1. Showtime Selections</h3>
            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 space-y-2 text-sm font-semibold text-zinc-300">
              {selectedMovies.length === 0 && selectedSeries.length === 0 ? (
                <p className="text-zinc-500 italic font-medium">No shows selected yet...</p>
              ) : (
                [...selectedMovies, ...selectedSeries].map((title, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <span>{title}</span>
                  </div>
                ))
              )}
              
              {/* 🎀 RESTORED: Anything Else My Princess */}
              {customMovieSuggestion && (
                <div className="pt-2 border-t border-zinc-800/40 mt-2">
                  <p className="text-[11px] font-black uppercase text-pink-300 tracking-wider">Anything else my princess:</p>
                  <p className="text-xs text-zinc-400 italic font-medium mt-0.5">"{customMovieSuggestion}"</p>
                </div>
              )}
            </div>
          </div>

          {/* 🍲 2. HOTPOT RECIPE BASKET */}
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider">2. Hotpot Recipe Basket</h3>
            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 space-y-3">
              {activeRamenIngredients.length === 0 ? (
                <p className="text-sm font-medium text-zinc-500 italic">Your recipe basket is currently empty...</p>
              ) : (
                activeRamenIngredients.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm font-bold">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{item.name}</span>
                      <span className="text-xs font-medium text-zinc-500">x{item.quantity}</span>
                    </div>
                    <span className="text-pink-400 text-xs font-black">{item.itemTotal} Kisses</span>
                  </div>
                ))
              )}

              {customRamenSuggestion && (
                <div className="pt-2 border-t border-zinc-800/40 mt-2">
                  <p className="text-[11px] font-black uppercase text-amber-300 tracking-wider">Extra recipe requests & drinks:</p>
                  <p className="text-xs text-zinc-400 italic font-medium mt-0.5">"{customRamenSuggestion}"</p>
                </div>
              )}
            </div>
          </div>

          {/* ⚠️ RESTORED: TIPS & WARNING SECTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/60">
            <div className="bg-zinc-900/30 border border-zinc-800/40 rounded-xl p-3 text-xs">
              <span className="font-bold text-amber-400">💡 Pro-Tip for Date Night:</span>
              <p className="text-zinc-400 mt-0.5 font-medium leading-relaxed">
                Make sure the cozy blankets are ready and the phone is on Do Not Disturb mode before launching the watch party streams!
              </p>
            </div>
            <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 text-xs">
              <span className="font-bold text-rose-400">⚠️ Mandatory Warning:</span>
              <p className="text-zinc-400 mt-0.5 font-medium leading-relaxed">
                Prices calculated here represent strict physical debt requirements. No skipping out on the kiss tolls at the door!
              </p>
            </div>
          </div>

          {/* 💳 RESTORED: PREVIOUS PAYMENTS / HISTORICAL ACCOUNT DATA */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3.5 text-xs space-y-1">
            <p className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Previous Transactions & Historical Records</p>
            <div className="flex justify-between text-zinc-500 font-semibold pt-1 text-[11px]">
              <span>Last Active Arrangement Status:</span>
              <span className="text-emerald-500/90 font-bold">Paid & Fulfilled Successfully ✓</span>
            </div>
          </div>

          {/* GRAND TOTAL ROW */}
          <div className="pt-4 border-t border-dashed border-zinc-800 flex justify-between items-center">
            <div>
              <p className="text-sm font-black uppercase text-zinc-400 tracking-wider">Grand Date Total</p>
              <p className="text-[10px] font-medium text-zinc-500 mt-0.5">Non-refundable romantic value assessment</p>
            </div>
            <div className="flex items-center gap-1 bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-2xl">
              <span className="text-xl font-black text-pink-400">{grandTotalKisses}</span>
              <span className="text-sm font-extrabold text-pink-300">Kisses 💋</span>
            </div>
          </div>

        </div>

        {/* BOTTOM NAVIGATION ACTIONS */}
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#160d15] via-[#160d15]/90 to-transparent pt-6 pb-6 px-4 flex justify-center gap-3 z-30">
          <button
            onClick={() => goToScreen(4)}
            className="w-32 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 py-4 rounded-full font-bold text-base transition-all shadow-md cursor-pointer border border-zinc-700/50 flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <button
            onClick={() => goToScreen(6)}
            className="w-full max-w-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 font-bold py-4 rounded-full shadow-xl text-white text-base transition-all tracking-wide cursor-pointer flex items-center justify-center gap-2"
          >
            Lock In Date Arrangement <CheckCircle className="w-5 h-5 fill-white/10" />
          </button>
        </div>

      </div>
    </div>
  )
}
