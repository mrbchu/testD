"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useApp } from "@/lib/context/AppContext"

export default function Screen2_DateType() {
  const { state, setState, goToScreen } = useApp()
  const selectedType = state.dateType
  const customIdea = state.customDateIdea || ""

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE5EC] to-[#FFC2D1] p-4 pt-24 pb-12 relative overflow-y-auto">
      <div className="max-w-4xl w-full flex flex-col items-center text-center z-10">
        
        <div className="mb-8 px-16 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">What kind of date do you want?</h1>
          <p className="text-slate-600 font-medium">Choose your perfect date experience</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-6">
          {/* OPTION 1: RAMEN */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setState({ dateType: "Ramen Movie Night" })
            }}
            className={`cursor-pointer bg-white/90 p-6 rounded-3xl shadow-md border-2 transition-all flex flex-col items-center justify-center min-h-[200px] ${
              selectedType === "Ramen Movie Night" ? "border-pink-500 bg-pink-50/50 ring-2 ring-pink-300" : "border-transparent"
            }`}
          >
            <div className="w-28 h-28 mb-4 flex items-center justify-center overflow-hidden rounded-2xl p-2">
              <img src="/ramen-choice.gif" alt="Ramen" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-bold text-slate-800">Ramen Movie Night</span>
          </motion.div>

          {/* OPTION 2: CUSTOM */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setState({ dateType: "Something Custom" })
            }}
            className={`cursor-pointer bg-white/90 p-6 rounded-3xl shadow-md border-2 transition-all flex flex-col items-center justify-center min-h-[200px] ${
              selectedType === "Something Custom" ? "border-pink-500 bg-pink-50/50 ring-2 ring-pink-300" : "border-transparent"
            }`}
          >
            <div className="w-24 h-24 mb-4 flex items-center justify-center text-5xl">✨</div>
            <span className="text-lg font-bold text-slate-800">Something Custom</span>
          </motion.div>
        </div>

        {/* REVEAL SUGGESTION BOX */}
        <AnimatePresence>
          {selectedType === "Something Custom" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-2xl mb-8 px-2"
            >
              <textarea
                value={customIdea}
                onChange={(e) => setState({ customDateIdea: e.target.value })}
                placeholder="Type your magical date ideas here... ✨🥰"
                className="w-full h-28 p-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white/90 text-slate-800 font-medium placeholder-slate-400 shadow-inner resize-none transition-colors"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => goToScreen(3)}
          disabled={!selectedType || (selectedType === "Something Custom" && !customIdea.trim())}
          className={`w-full max-w-2xl font-bold py-4 rounded-full shadow-md transition-all text-white ${
            selectedType && (selectedType !== "Something Custom" || customIdea.trim())
              ? "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 cursor-pointer"
              : "bg-slate-300 text-slate-400 cursor-not-allowed"
          }`}
        >
          Next Step ➡️
        </motion.button>
      </div>
    </div>
  )
}