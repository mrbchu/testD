'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

interface FloatingKissesProps {
  x: number;
  y: number;
  duration?: number;
  particleCount?: number;
}

const FloatingKisses: React.FC<FloatingKissesProps> = ({
  x,
  y,
  duration = 2000,
  particleCount = 8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const startTime = Date.now();

    // Create particles at click location with varied emojis
    const emojis = ['💋', '💕', '✨', '💗'];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const velocity = 2 + Math.random() * 4;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2, // Initial upward bias
        life: 1,
        size: 10 + Math.random() * 12,
      });
    }

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        const life = Math.max(0, 1 - progress);
        p.life = life;

        // Update position with easing
        p.x += p.vx * (1 - progress * 0.3);
        p.y += p.vy;
        p.vy += 0.12; // gravity

        // Draw glowing background
        ctx.save();
        ctx.globalAlpha = life * 0.4;
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * life * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw emoji with glow
        ctx.globalAlpha = life * 0.9;
        ctx.font = `bold ${p.size * life}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const emoji = emojis[idx % emojis.length];
        ctx.fillText(emoji, p.x, p.y);

        ctx.restore();
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsActive(false);
      }
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [x, y, duration, particleCount, isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FloatingKisses;
