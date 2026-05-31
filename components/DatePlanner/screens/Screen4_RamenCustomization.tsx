"use client"

import React from "react"
import { motion } from "framer-motion"
import { useApp } from "@/lib/context/AppContext"
import { Plus, Minus, Soup, Leaf, Beef } from "lucide-react"

// Menu items with explicit kiss values and exact image mappings
const ramenFlavorPacks = [
  { id: "r1", name: "Spicy Ramen", src: "/spicy_ramen.jpg", price: 5 },
  { id: "r2", name: "Cheese Ramen", src: "/cheese_ramen.jpg", price: 5 },
  { id: "r3", name: "Plain Ramen", src: "/plain_ramen.jpg", price: 3 },
]

const ingredientItems = [
  { id: "i1", name: "Gochujang Chili Paste", src: "/gochujang.jpg", price: 2 },
  { id: "i2", name: "Topokki", src: "/topokki.jpg", price: 3 },
  { id: "i3", name: "Seaweed", src: "/seaweed.jpg", price: 1 },
  { id: "i4", name: "Mix Shabu Balls", src: "/shabu_balls.jpg", price: 4 },
]

const meatItems = [
  { id: "m1", name: "Beef Slice", src: "/beef_slice.jpg", price: 6 },
  { id: "m2", name: "Luncheon Meat", src: "/luncheon_meat.jpg", price: 4 },
  { id: "m3", name: "Porkchops", src: "/porkchops.jpg", price: 5 },
  { id: "m4", name: "Chicken", src: "/chicken.jpg", price: 4 },
]

// Single dictionary for easy price/image lookups later on the checkout screens
export const ramenRegistry: Record<string, { price: number; src: string }> = {};
[...ramenFlavorPacks, ...ingredientItems, ...meatItems].forEach(item => {
  ramenRegistry[item.name] = { price: item.price, src: item.src };
});

export default function Screen4_RamenCustomization() {
  const { state, setState, goToScreen } = useApp()
  const selectedRamenItems = state.selectedRamenItems || {}

  const updateQuantity = (name: string, change: number, price: number) => {
    const currentQty = selectedRamenItems[name] || 0
    const newQty = Math.max(0, currentQty + change)

    // Calculate total context tip amount adjustments dynamically
    const currentTotalTips = state.tipsAmount || 0
    const priceDifference = (newQty - currentQty) * price

    setState({
      tipsAmount: Math.max(0, currentTotalTips + priceDifference),
      selectedRamenItems: {
        ...selectedRamenItems,
        [name]: newQty,
      },
    })
  }

  const RenderRamenCard = ({ item }: { item: { name: string; src: string; price: number } }) => {
    const qty = selectedRamenItems[item.name] || 0
    return (
      <div className="bg-[#1c121b] border border-zinc-800 rounded-2xl p-4 flex flex-col items-center shadow-md">
        <div className="w-full aspect-square rounded-xl overflow-hidden bg-zinc-800 mb-3 border border-zinc-700/50">
          <img
            src={item.src}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300"
            }}
          />
        </div>
        
        <span className="text-sm font-bold text-zinc-200 text-center min-h-[32px] flex items-center justify-center">
          {item.name}
        </span>

        {/* 💋 NEW PRICE TAG ELEMENT */}
        <span className="text-xs text-pink-400 font-extrabold mb-3">
          {item.price} Kisses 💋
        </span>

        <div className="flex items-center gap-3 bg-zinc-900 rounded-full p-1 border border-zinc-800">
          <button
            onClick={() => updateQuantity(item.name, -1, item.price)}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-pink-400 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-pink-400 w-4 text-center select-none">
            {qty}
          </span>
          <button
            onClick={() => updateQuantity(item.name, 1, item.price)}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-pink-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#160d15] text-slate-100 p-4 md:p-8 pt-28 pb-32 relative overflow-y-auto">
      <div className="max-w-5xl mx-auto z-10 relative">
        
        <div className="text-center mb-10 px-16 md:px-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent mb-3">
            Build Your Hotpot Ramen 🍜
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-medium mb-4">
            Customize the ultimate cozy ramen bowl exactly how you both like it
          </p>
          <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-2xl bg-transparent">
            <img src="/pusheen-ramen.gif" alt="Pusheen Ramen" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Soup className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-bold text-pink-100">Ramen Flavor Pack</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ramenFlavorPacks.map((item) => <RenderRamenCard key={item.id} item={item} />)}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Leaf className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-rose-100">Ingredients</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ingredientItems.map((item) => <RenderRamenCard key={item.id} item={item} />)}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Beef className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-amber-100">Meat Selection</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {meatItems.map((item) => <RenderRamenCard key={item.id} item={item} />)}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#160d15] via-[#160d15]/90 to-transparent pt-6 pb-6 px-4 flex justify-center z-30">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => goToScreen(5)}
            className="w-full max-w-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 font-bold py-4 rounded-full shadow-xl text-white text-base transition-all tracking-wide"
          >
            Review Date Order Details ➡️
          </motion.button>
        </div>

      </div>
    </div>
  )
}