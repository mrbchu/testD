'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Sparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: string; x: number; y: number }>>([]);

  useEffect(() => {
    // Generate sparkles that fill the screen
    const newSparkles = Array.from({ length: 50 }, (_, i) => ({
      id: `sparkle-${i}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            boxShadow: '0 0 6px #FFD700',
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [1, 1.2, 0],
            y: [0, -100],
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </>
  );
};

export default Sparkles;
