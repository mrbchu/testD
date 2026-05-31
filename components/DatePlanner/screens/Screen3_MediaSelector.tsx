"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useApp } from "@/lib/context/AppContext"
import { Film, Tv, CheckCircle2, Play, X, Pencil } from "lucide-react"

const moviesData = [
  { id: "m1", title: "Love Reset", src: "/lovereset.jpg", trailer: "https://www.youtube.com/embed/vFseJg1WeMk?si=wQtBt6SocLlyySRb" },
  { id: "m2", title: "Steal My Heart", src: "/stealmyheart.jpg", trailer: "https://www.youtube.com/embed/ujzXXaqAvLo?si=x18M8iBWeseDzsVa" },
  { id: "m3", title: "Sweet & Sour", src: "/sweetsour.jpg", trailer: "https://www.youtube.com/embed/hZORUEZd_pg?si=A7CDj3yEyEqIT0WV" },
  { id: "m4", title: "Mood Of The Day", src: "/moodoftheday.jpg", trailer: "https://www.youtube.com/embed/v_yA_KNTVCs?si=3BcqqH44OobOsPsl" },
  { id: "m5", title: "LittleForest", src: "/littleforest.jpg", trailer: "https://www.youtube.com/embed/3sVJPHbzabM?si=086FHm1a92rYzkab" },
]

const seriesData = [
  { id: "s1", title: "My Dearest Nemesis", src: "/mydearestnemesis.jpg", trailer: "https://www.youtube.com/embed/dh-N9QEdzHs?si=E8tKHr7Bpu2pGop7" },
  { id: "s2", title: "Genie, Make a Wish", src: "/geniemakeawish.jpg", trailer: "https://www.youtube.com/embed/PaZIDBqhVSk?si=h4XCrWRHNjYT7FTk" },
  { id: "s3", title: "My Demon", src: "/mydemon.jpg", trailer: "https://www.youtube.com/embed/D-bAfFqvxZg?si=aMS4pUNTMRf_RUhQ" },
  { id: "s4", title: "Perfect Crown", src: "/perfectcrown.jpg", trailer: "https://www.youtube.com/embed/AGh-CwbKMlM?si=Rmp3Fc04E3x58DXT" },
  { id: "s5", title: "Queen OF Tears", src: "/queenoftears.jpg", trailer: "https://www.youtube.com/embed/Gg2D8zrzlOA?si=U9V8ql5AlTxbBbT2" },
]

export default function Screen3_MediaSelector() {
  const { state, setState, goToScreen } = useApp()
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null)

  const selectedMovies = state.selectedMovies || []
  const selectedSeries = state.selectedSeries || []
  const movieSuggestion = state.customMovieSuggestion || ""

  const toggleMovie = (title: string) => {
    if (selectedMovies.includes(title)) {
      setState({ selectedMovies: selectedMovies.filter((m) => m !== title) })
    } else {
      setState({ selectedMovies: [...selectedMovies, title] })
    }
  }

  const toggleSeries = (title: string) => {
    if (selectedSeries.includes(title)) {
      setState({ selectedSeries: selectedSeries.filter((s) => s !== title) })
    } else {
      setState({ selectedSeries: [...selectedSeries, title] })
    }
  }

  const openTrailer = (url: string) => {
    setActiveTrailer(url)
    setState({ isTrailerPlaying: true }) // ⏸️ Signals background audio engine to pause
  }

  const closeTrailer = () => {
    setActiveTrailer(null)
    setState({ isTrailerPlaying: false }) // ▶️ Signals background audio engine to resume
  }

  return (
    <div className="min-h-screen w-full bg-[#160d15] text-slate-100 p-4 md:p-8 pt-28 pb-32 relative overflow-y-auto">
      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-10 px-16 md:px-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent mb-3">
            What should we watch?
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-medium mb-4">
            Choose movies and series for our perfect date night
          </p>
          <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-2xl">
            <img src="/movie-header.gif" alt="Pusheen Movies" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* MOVIES ROW */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 px-2">
            <Film className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-bold text-pink-100">Movies For My Princess</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2 snap-x scroll-smooth">
            {moviesData.map((movie) => {
              const isSelected = selectedMovies.includes(movie.title)
              return (
                <div key={movie.id} className="flex-none w-[160px] sm:w-[180px] snap-start">
                  <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden relative bg-zinc-800 shadow-lg border-2 group transition-all duration-300">
                    <img src={movie.src} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div onClick={() => toggleMovie(movie.title)} className="absolute inset-0 cursor-pointer z-10" />
                    <button onClick={(e) => { e.stopPropagation(); openTrailer(movie.trailer); }} className="absolute bottom-3 left-3 bg-white/20 hover:bg-pink-500 backdrop-blur-md text-white rounded-full p-2.5 shadow-lg transition-all z-20 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-1 shadow-md z-20">
                        <CheckCircle2 className="w-4 h-4 text-white fill-pink-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-center text-xs md:text-sm font-semibold mt-2 text-zinc-300 truncate px-1">{movie.title}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* SERIES ROW */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 px-2">
            <Tv className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-rose-100">Series to Binge Together</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2 snap-x scroll-smooth">
            {seriesData.map((series) => {
              const isSelected = selectedSeries.includes(series.title)
              return (
                <div key={series.id} className="flex-none w-[160px] sm:w-[180px] snap-start">
                  <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden relative bg-zinc-800 shadow-lg border-2 group transition-all duration-300">
                    <img src={series.src} alt={series.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div onClick={() => toggleSeries(series.title)} className="absolute inset-0 cursor-pointer z-10" />
                    <button onClick={(e) => { e.stopPropagation(); openTrailer(series.trailer); }} className="absolute bottom-3 left-3 bg-white/20 hover:bg-rose-500 backdrop-blur-md text-white rounded-full p-2.5 shadow-lg transition-all z-20 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-rose-500 rounded-full p-1 shadow-md z-20">
                        <CheckCircle2 className="w-4 h-4 text-white fill-rose-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-center text-xs md:text-sm font-semibold mt-2 text-zinc-300 truncate px-1">{series.title}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 🍿 NEW: MOVIE SUGGESTION BOX */}
        <div className="bg-[#1c121b] border border-zinc-800 rounded-3xl p-6 mb-12 max-w-2xl mx-auto text-left shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Pencil className="w-4 h-4 text-pink-400" />
            <h3 className="text-base font-bold text-pink-100">Want to suggest another show?</h3>
          </div>
          <textarea
            value={movieSuggestion}
            onChange={(e) => setState({ customMovieSuggestion: e.target.value })}
            placeholder="Type any other Korean movies, shows, or custom video links you'd love to watch together... 🥰🎬"
            className="w-full h-20 p-3 rounded-xl border border-zinc-700 focus:border-pink-500 focus:outline-none bg-zinc-900/50 text-zinc-200 text-sm placeholder-zinc-500 resize-none transition-colors"
          />
        </div>

        {/* Floating Action Button Container */}
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#160d15] via-[#160d15]/90 to-transparent pt-6 pb-6 px-4 flex justify-center z-30">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goToScreen(4)}
            className="w-full max-w-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 font-bold py-4 rounded-full shadow-xl text-white text-base transition-all tracking-wide"
          >
            Next Step ➡️
          </motion.button>
        </div>

      </div>

      {/* TRAILER POPUP OVERLAY */}
      <AnimatePresence>
        {activeTrailer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50" onClick={closeTrailer}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#1c121b] border border-zinc-800 rounded-2xl overflow-hidden w-full max-w-3xl aspect-video relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeTrailer} className="absolute top-3 right-3 bg-black/50 hover:bg-pink-500 text-white p-2 rounded-full z-50 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <iframe src={`${activeTrailer}?autoplay=1&modestbranding=1&rel=0`} title="Trailer" className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}