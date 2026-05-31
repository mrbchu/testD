'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicToggleProps {
  isOn: boolean;
  onChange: (value: boolean) => void;
}

const WaveBar: React.FC<{ delay: number; isOn: boolean }> = ({ delay, isOn }) => {
  return (
    <motion.div
      className="w-1 h-8 rounded-full bg-gradient-to-t from-pink-400 to-rose-300"
      animate={isOn ? { height: [8, 24, 8] } : { height: 8 }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay,
      }}
    />
  );
};

const MusicToggle: React.FC<MusicToggleProps> = ({ isOn, onChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Royalty-free lofi music URL (direct MP3 link)
  const AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  // Handle audio playback
  useEffect(() => {
    if (!audioRef.current) return;

    if (isOn && !hasStarted) {
      // Try to play audio
      const playAudio = async () => {
        try {
          audioRef.current!.volume = 0.3;
          await audioRef.current!.play();
          setHasStarted(true);
        } catch (error) {
          console.log('[v0] Audio autoplay blocked by browser, waiting for user gesture');
        }
      };

      // On first user interaction, play the audio
      const handleUserInteraction = () => {
        playAudio();
        document.removeEventListener('click', handleUserInteraction);
      };

      playAudio().catch(() => {
        document.addEventListener('click', handleUserInteraction);
      });
    } else if (!isOn && hasStarted) {
      audioRef.current.pause();
    }
  }, [isOn, hasStarted]);

  const handleToggle = () => {
    onChange(!isOn);
  };

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-2">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        loop
        crossOrigin="anonymous"
        onError={() => console.log('[v0] Audio failed to load from URL')}
      />

      {/* Music Icon Button */}
      <button
        onClick={handleToggle}
        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all shadow-lg ${
          isOn
            ? 'bg-gradient-to-br from-pink-400 to-rose-400'
            : 'bg-gradient-to-br from-gray-200 to-gray-300'
        }`}
      >
        <Music className={`w-6 h-6 ${isOn ? 'text-white' : 'text-gray-600'}`} />
      </button>

      {/* Wave Equalizer */}
      {isOn && (
        <motion.div
          className="flex items-end gap-1 h-12"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          {[0, 1, 2].map((i) => (
            <WaveBar key={i} delay={i * 0.1} isOn={isOn} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MusicToggle;
