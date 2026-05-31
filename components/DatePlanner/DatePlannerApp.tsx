"use client"

import React, { useEffect, useRef, useState } from "react"
import { useApp } from "@/lib/context/AppContext"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Film, Soup, Star, X, Trash2 } from "lucide-react"

// Import all screen page views
import Screen1_Proposal from "./screens/Screen1_Proposal"
import Screen2_DateType from "./screens/Screen2_DateType"
import Screen3_MediaSelector from "./screens/Screen3_MediaSelector"
import Screen4_RamenCustomization from "./screens/Screen4_RamenCustomization"
import Screen5_Invoice from "./screens/Screen5_Invoice"
import Screen6_Checkout from "./screens/Screen6_Checkout"

export default function DatePlannerApp() {
  const { state, setState, goToScreen, clearHistory } = useApp()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const [localName, setLocalName] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)

  // 🚀 Auto-scroll window to top instantly on every screen change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [state.currentScreen])

  // Sync background looping audio track based on active panels
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (state.isTrailerPlaying || showSidebar) {
      audio.pause() // ⏸️ Pause music during trailers or sidebar logs
    } else {
      audio.play().catch(() => console.log("Waiting for interaction to trigger music..."))
    }
  }, [state.isTrailerPlaying, showSidebar])

  const handleStartApp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!localName.trim()) return
    setState({ userName: localName.trim() })
    goToScreen(1)
  }

  // Extract the first letter of the user's name
  const userInitial = state.userName ? state.userName.trim().charAt(0).toUpperCase() : "P"

  const renderActiveScreen = () => {
    switch (state.currentScreen) {
      case 0:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE5EC] to-[#FFC2D1] p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border border-pink-100"
            >
              <div className="text-5xl mb-4">👑</div>
              <h1 className="text-2xl font-black text-slate-800 mb-2">Welcome, Princess!</h1>
              <p className="text-xs text-slate-500 font-semibold mb-6">Please enter your name to begin our magical planner setup</p>
              
              <form onSubmit={handleStartApp} className="space-y-4">
                <input
                  type="text"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  placeholder="Enter your beautiful name..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-slate-700 text-center font-bold bg-white"
                  maxLength={20}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 transition-all shadow-md"
                >
                  Enter Kingdom ✨
                </button>
              </form>
            </motion.div>
          </div>
        )
      case 1: return <Screen1_Proposal />
      case 2: return <Screen2_DateType />
      case 3: return <Screen3_MediaSelector />
      case 4: return <Screen4_RamenCustomization />
      case 5: return <Screen5_Invoice />
      case 6: return <Screen6_Checkout />
      default: return <Screen1_Proposal />
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 🎵 GLOBAL BACKGROUND SOUND MATRIX WAVE - LINKED TO LOCAL PUBLIC ASSET ROUTE */}
      <audio 
        ref={audioRef} 
        src="/background-music.mp3" 
        loop 
        preload="auto" 
      />

      {renderActiveScreen()}

      {/* 🌸 THE NEW ALPHABET INITIAL BUTTON LAYER (REPLACED IMAGE ELEMENT) */}
      {state.userName && state.userName.toLowerCase() !== "test" && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed top-4 right-4 z-40 w-12 h-12 rounded-full border-2 border-pink-500 bg-gradient-to-br from-pink-400 to-rose-400 text-white font-black text-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 pointer-events-auto cursor-pointer"
          title="View Our Order History Ledger"
        >
          {userInitial}
        </button>
      )}

      {/* 🧾 HIGH-FIDELITY SLIDE-OUT RIGHT SIDEBAR DASHBOARD */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 pointer-events-auto"
            />

            {/* Sidebar Shell Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-pink-100 pointer-events-auto"
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50/50 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-black text-sm">
                    {userInitial}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-base leading-tight">Magical Date Logs</h3>
                    <p className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">History Ledger</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSidebar(false)} 
                  className="text-slate-400 hover:text-pink-500 hover:bg-pink-50 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Main History List View */}
              <div className="p-5 overflow-y-auto space-y-4 bg-slate-50/30 flex-grow scrollbar-thin">
                {(!state.orderHistory || state.orderHistory.length === 0) ? (
                  <div className="text-center py-20 text-slate-400 font-medium text-sm px-6">
                    No dates locked in yet! Fill out your choices to log your first order record. 🥰
                  </div>
                ) : (
                  state.orderHistory.map((order, idx) => (
                    <div key={order.id || idx} className="bg-white border border-pink-100/60 rounded-2xl p-4 shadow-xs space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-100/80 pb-2 text-xs text-slate-400 font-bold">
                        <span>📅 {new Date(order.createdAt).toLocaleDateString()}</span>
                        <span className="text-pink-400">Token: #{order.id?.slice(-5) || "DATE"}</span>
                      </div>
                      
                      {/* Media Options */}
                      {((order.selectedMovies || []).length > 0 || (order.selectedSeries || []).length > 0) && (
                        <div className="text-xs space-y-1">
                          <p className="font-black text-slate-400 uppercase tracking-wide flex items-center gap-1"><Film className="w-3 h-3" /> Selected Showtimes:</p>
                          <p className="font-bold text-slate-700 pl-4">
                            {[...(order.selectedMovies || []), ...(order.selectedSeries || [])].join(", ")}
                          </p>
                        </div>
                      )}

                      {/* Custom Movie Write-ins */}
                      {order.customMovieSuggestion && (
                        <div className="text-xs bg-pink-50/40 p-2 rounded-xl border border-pink-100/50">
                          <span className="font-bold text-pink-600">🎬 Suggested Shows:</span>
                          <p className="text-slate-600 font-medium italic mt-0.5">"{order.customMovieSuggestion}"</p>
                        </div>
                      )}

                      {/* Ramen Basket Options */}
                      {Object.keys(order.selectedRamenItems || {}).length > 0 && (
                        <div className="text-xs space-y-1">
                          <p className="font-black text-slate-400 uppercase tracking-wide flex items-center gap-1"><Soup className="w-3 h-3" /> Custom Hotpot Recipe:</p>
                          <p className="font-bold text-slate-700 pl-4">
                            {Object.entries(order.selectedRamenItems)
                              .filter(([_, qty]) => qty > 0)
                              .map(([name, qty]) => `${name} (x${qty})`)
                              .join(", ")}
                          </p>
                        </div>
                      )}

                      {/* Star Feedbacks Summary */}
                      {order.feedbackStars && order.feedbackStars > 0 && (
                        <div className="pt-2 border-t border-slate-100/80 flex flex-col gap-1 bg-amber-50/30 p-2 rounded-xl border border-amber-100/50">
                          <div className="flex gap-0.5">
                            {Array.from({ length: order.feedbackStars }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                          {order.feedbackNote && (
                            <p className="text-[11px] font-semibold italic text-slate-600">"{order.feedbackNote}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Sidebar Footer Controls */}
              {state.orderHistory && state.orderHistory.length > 0 && (
                <div className="p-4 bg-white border-t border-slate-100 flex justify-end flex-shrink-0">
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your date history logs? 😢")) {
                        clearHistory()
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-500 font-bold px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Wipe History Logs
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
