"use client"

import React from "react"
import { motion } from "framer-motion"
import { useApp } from "@/lib/context/AppContext"
import { Soup, Plus, Minus, CheckCircle, Pencil } from "lucide-react"

// Complete menu built from your exact public folder files
const ramenIngredients = [
  // 🍜 RAMEN BASES
  { id: "i1", name: "Plain Ramen Base", src: "/plain_ramen.jpg", type: "Ramen Base" },
  { id: "i2", name: "Spicy Ramen Base", src: "/spicy_ramen.jpg", type: "Ramen Base" },
  { id: "i3", name: "Cheese Slice", src: "/cheese_ramen.jpg", type: "Topping" },
  
  // 🥩 MEATS & PROTEINS
  { id: "i4", name: "Beef Slices", src: "/beef_slice.jpg", type: "Meat / Protein" },
  { id: "i5", name: "Tender Chicken", src: "/chicken.jpg", type: "Meat / Protein" },
  { id: "i6", name: "Juicy Porkchops", src: "/porkchops.jpg", type: "Meat / Protein" },
  { id: "i7", name: "Luncheon Meat", src: "/luncheon_meat.jpg", type: "Meat / Protein" },
  
  // 🧀 TOPPINGS & SIDES
 
  { id: "i8", name: "Gochujang Paste", src: "/gochujang.jpg", type: "Topping" },
  { id: "i9", name: "Fresh Seaweed", src: "/seaweed.jpg", type: "Topping" },
  { id: "i10", name: "Shabu balls", src: "/shabu_balls.jpg", type: "Topping" },
  { id: "i11", name: "Topokki", src: "/topokki.jpg", type: "Topping" },
]


export default function Screen4_RamenCustomization() {
  const { state, setState, goToScreen } = useApp()

  const selectedRamenItems = state.selectedRamenItems || {}
  const ramenSuggestion = state.customRamenSuggestion || ""

  const updateQuantity = (name: string, amount: number) => {
    const currentQty = selectedRamenItems[name] || 0
    const newQty = Math.max(0, currentQty + amount)
    
    setState({
      selectedRamenItems: {
        ...selectedRamenItems,
        [name]: newQty,
      },
    })
  }

  return (
    <div className="min-h-screen w-full bg-[#111622] text-slate-100 p-4 md:p-8 pt-28 pb-32 relative overflow-y-auto">
      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-10 px-16 md:px-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent mb-3">
            Customize Our Hotpot 🍲
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-medium mb-4">
            Select the perfect ingredients and quantities for our custom recipe
          </p>
          <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-2xl">
            <img src="/pusheen-ramen.gif" alt="Pusheen Ramen" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Ingredients Selection Matrix Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {ramenIngredients.map((item) => {
            const count = selectedRamenItems[item.name] || 0
            return (
              <div key={item.id} className="bg-[#181f32] border border-zinc-800 rounded-2xl p-3 flex flex-col justify-between shadow-lg transition-all hover:border-amber-500/50">
                
                {/* Visual Asset frame */}
                <div className="aspect-square w-full rounded-xl overflow-hidden relative bg-zinc-900 mb-3 border border-zinc-800">
                  <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                  {count > 0 && (
                    <div className="absolute top-2 right-2 bg-amber-500 rounded-full p-1 shadow-md z-10 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-slate-900 fill-amber-400" />
                    </div>
                  )}
                </div>

                {/* Info and Counter Elements */}
                <div className="text-left px-1">
                  <h3 className="text-xs md:text-sm font-bold text-zinc-200 truncate">{item.name}</h3>
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mt-0.5 opacity-80">{item.type}</p>
                </div>

                {/* Counter Interface */}
                <div className="flex items-center justify-between bg-zinc-900/60 rounded-xl mt-3 p-1 border border-zinc-800">
                  <button 
                    onClick={() => updateQuantity(item.name, -1)}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-black text-sm text-zinc-100 min-w-[20px] text-center">
                    {count}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.name, 1)}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )
          })}
        </div>

        {/* Suggestion Write-In Box */}
        <div className="bg-[#181f32] border border-zinc-800 rounded-3xl p-6 mb-12 max-w-2xl mx-auto text-left shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Pencil className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-amber-100">Any extra recipe adjustments or drinks?</h3>
          </div>
          <textarea
            value={ramenSuggestion}
            onChange={(e) => setState({ customRamenSuggestion: e.target.value })}
            placeholder="Type any other ingredients, extra spiciness rules, specific drinks, or side dessert orders you'd love to add... 🥟🥤🌸"
            className="w-full h-24 p-3 rounded-xl border border-zinc-700 focus:border-amber-400 focus:outline-none bg-zinc-900/50 text-zinc-200 text-sm placeholder-zinc-500 resize-none transition-colors"
          />
        </div>

        {/* Navigation Action Button */}
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#111622] via-[#111622]/90 to-transparent pt-6 pb-6 px-4 flex justify-center z-30">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goToScreen(5)}
            className="w-full max-w-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-bold py-4 rounded-full shadow-xl text-slate-900 text-base transition-all tracking-wide"
          >
            Review Date Details ➡️
          </motion.button>
        </div>

      </div>
    </div>
  )
}
