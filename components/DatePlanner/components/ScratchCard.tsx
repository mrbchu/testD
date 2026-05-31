'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  revealText: string;
  onRevealThreshold: (reached: boolean) => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ revealText, onRevealThreshold }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw scratch overlay
    ctx.fillStyle = '#FFB6C1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    ctx.fillStyle = '#FFB6C1';
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < canvas.width; i += 20) {
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.fillRect(i, j, 10, 10);
      }
    }
    ctx.globalAlpha = 1;

    // Add border
    ctx.strokeStyle = '#FFB6C1';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getMousePos = (e: React.MouseEvent | React.TouchEvent): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];

    const rect = canvas.getBoundingClientRect();
    const x =
      'touches' in e
        ? e.touches[0].clientX - rect.left
        : (e as React.MouseEvent).clientX - rect.left;
    const y =
      'touches' in e
        ? e.touches[0].clientY - rect.top
        : (e as React.MouseEvent).clientY - rect.top;

    return [x, y];
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear circle at position
    ctx.clearRect(x - 20, y - 20, 40, 40);

    // Check if 50% is revealed
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let clearedPixels = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        clearedPixels++;
      }
    }

    const totalPixels = canvas.width * canvas.height;
    const revealPercent = (clearedPixels / totalPixels) * 100;

    if (revealPercent > 50 && !isRevealed) {
      setIsRevealed(true);
      onRevealThreshold(true);
    }
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const [x, y] = getMousePos(e);
    scratch(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = () => {
    setIsDrawing(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const [x, y] = getMousePos(e);
    scratch(x, y);
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600 font-semibold text-center">
        Scratch to reveal your surprise! 💖
      </p>
      
      {/* Container with relative positioning for absolute overlay */}
      <div className="relative w-full max-w-sm">
        <canvas
          ref={canvasRef}
          className="w-full h-40 border-2 border-pink-200 rounded-2xl cursor-pointer bg-white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        
        {/* Hidden message underneath, revealed by scratching */}
        {isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4 bg-pink-100 rounded-xl border border-pink-300 backdrop-blur-sm">
              <p className="text-pink-700 font-bold text-lg">{revealText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScratchCard;
