"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { useApp } from "@/lib/context/AppContext"

const dateImages = [
  "/m0.gif",
  "/m1.jpg",
  "/m2.gif",
  "/m3.gif",
  "/m4.gif",
  "/m5.gif"
]

const pleadingTexts = [
  "Plzzz 🥺",
  "You can't say no! 😭",
  "Are you sure? 💔",
  "Pretty please? 👉👈",
  "muhehe no option 😸"
]

export default function Screen1_Proposal() {
  const { state, goToScreen } = useApp()
  const userName = state.userName || ""

  const [noCount, setNoCount] = useState(0)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (noCount >= 4) {
      setNoCount(5)
      return
    }

    const randomX = (Math.random() - 0.5) * 240
    const randomY = (Math.random() - 0.5) * 240
    setNoButtonPos({ x: randomX, y: randomY })
    setNoCount((prev) => prev + 1)
  }

  const handleNextStep = () => {
    console.log("YES Clicked! Advancing to screen 2...")
    goToScreen(2)
  }

  // Clean name verification logic check
  const isTestOrEmpty = !userName || userName.toLowerCase().trim() === "test"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE5EC] to-[#FFC2D1] p-4 relative overflow-hidden pt-24">
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-pink-100 z-10"
      >
        {/* Dynamic Image Container */}
        <div className="w-64 h-64 mx-auto mb-6 relative overflow-hidden rounded-2xl bg-pink-50 flex items-center justify-center">
          <img 
            src={dateImages[Math.min(noCount, 5)]} 
            alt="Date illustration" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Cleaned title statement wrapper layout */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 px-4">
          Will you go on a magical date with me, My Princess{isTestOrEmpty ? "" : ` ${userName}`}? 🥺👉👈
        </h1>

        {/* Dynamic Pleading Text Messaging */}
        <div className="h-8 mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {noCount > 0 && noCount <= 5 && (
              <motion.p
                key={noCount}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-pink-600 font-semibold text-lg"
              >
                {pleadingTexts[Math.min(noCount - 1, 4)]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button Area with clean vertical stack spacing */}
        <div className="flex flex-col items-center justify-center gap-8 mt-6 relative min-h-[140px] w-full">
          
          {/* YES BUTTON */}
          <motion.button
            onClick={handleNextStep}
            style={{ transformOrigin: "center center" }}
            animate={{ scale: 1 + noCount * 0.15 }}
            whileHover={{ scale: (1 + noCount * 0.15) * 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:from-pink-600 hover:to-rose-600 transition-colors z-30 flex items-center gap-2 select-none relative pointer-events-auto"
          >
            <Heart className="w-5 h-5 fill-current animate-pulse" /> YES! ✨
          </motion.button>

          {/* NO BUTTON - Changes layout style context parameters depending on interaction state */}
          {noCount < 5 && (
            <motion.button
              onMouseEnter={handleNoInteraction}
              onClick={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className={`bg-slate-100 text-slate-500 font-medium px-6 py-2.5 rounded-full hover:bg-slate-200 transition-colors cursor-pointer z-20 shadow-sm border border-slate-200/50 select-none ${
                noCount === 0 ? "relative mt-2" : "absolute"
              }`}
            >
              No 😢
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  )
}