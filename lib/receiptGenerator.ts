import { AppState } from './context/AppContext';

// 🎬 Synced flawlessly to look up media posters
const mediaPosters: Record<string, string> = {
  "Love Reset": "/LoveReset.jpg",
  "Steal My Heart": "/StealMyHeart.jpg",
  "Sweet & Sour": "/sweetsour.jpg",
  "Mood Of The Day": "/MoodOfTheDay.jpg",
  "Little Forest": "/LettleForest.jpg",
  "My Dearest Nemesis": "/MyDearestNemesis.jpg",
  "Genie, Make a Wish": "/GenieMakeaWish.jpg",
  "My Demon": "/MyDemon.jpg",
  "Perfect Crown": "/PerfectCrown.jpg",
  "Queen of Tears": "/QueenOFTears.jpg",
};

// 🍲 FIXED: Synced keys character-for-character to match Screen 4 state tracking names perfectly
const ramenImages: Record<string, string> = {
  "Plain Ramen Base": "/plain_ramen.jpg",
  "Spicy Ramen Base": "/spicy_ramen.jpg",
  "Cheese Ramen Base": "/cheese_ramen.jpg",
  "Gochujang Paste": "/gochujang.jpg",
  "Fresh Seaweed": "/seaweed.jpg",
  "Shabu balls": "/shabu_balls.jpg",
  "Topokki": "/topokki.jpg",
  "Beef Slices": "/beef_slice.jpg",
  "Chicken": "/chicken.jpg",
  "Juicy Porkchops": "/porkchops.jpg",
  "Luncheon Meat": "/luncheon_meat.jpg",
};

// Helper object to parse real kiss pricing data matching your exact custom menu rates
const ramenPricesLookup: Record<string, number> = {
  "Plain Ramen Base": 5,
  "Spicy Ramen Base": 8,
  "Cheese Ramen Base": 10,
  "Gochujang Paste": 2,
  "Fresh Seaweed": 3,
  "Shabu balls": 4,
  "Topokki": 5,
  "Beef Slices": 7,
  "Chicken": 6,
  "Juicy Porkchops": 8,
  "Luncheon Meat": 5,
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load asset image path: ${src}`));
    img.src = src;
  });
};

export const generateReceiptImage = async (state: AppState): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  
  const selectedMediaCount = (state.selectedMovies || []).length + (state.selectedSeries || []).length;
  const chosenRamen = Object.entries(state.selectedRamenItems || {}).filter(([_, qty]) => (qty as number) > 0);
  
  const hasFeedback = (state.feedbackStars && state.feedbackStars > 0) || state.feedbackNote;
  const feedbackPadding = hasFeedback ? 160 : 0;

  canvas.height = 780 + (selectedMediaCount * 110) + (chosenRamen.length * 80) + feedbackPadding;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background - elegant cream pink tint
  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, '#fdf2f8');
  bgGradient.addColorStop(1, '#fce7f3');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Decorative wavy top border
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(20, 40);
  ctx.lineTo(780, 40);
  ctx.stroke();
  ctx.setLineDash([]);

  let y = 80;

  // Render Celebration Image Header
  try {
    const headerImg = await loadImage('/success-celebration.gif');
    ctx.drawImage(headerImg, canvas.width / 2 - 80, y, 160, 160);
    y += 190;
  } catch (e) {
    console.warn("Header banner failed to render, skipping image slot...", e);
    y += 20;
  }

  // Header Typography
  ctx.font = "bold 32px 'Arial', sans-serif";
  ctx.fillStyle = '#be185d';
  ctx.textAlign = 'center';
  ctx.fillText('💖 Official Date Confirmation 💖', 400, y);
  y += 40;

  ctx.font = "bold 24px 'Arial', sans-serif";
  ctx.fillStyle = '#db2777';
  ctx.fillText('for My Princess', 400, y);
  y += 35;

  const cleanName = !state.userName || state.userName.toLowerCase().trim() === 'test' ? '' : ` ${state.userName}`;
  ctx.font = "18px 'Arial', sans-serif";
  ctx.fillStyle = '#be185d';
  ctx.fillText(`Locked in for:${cleanName} ✨`, 400, y);
  y += 40;

  // Divider
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(40, y);
  ctx.lineTo(760, y);
  ctx.stroke();
  ctx.setLineDash([]);
  y += 40;

  // SECTION 1: SHOWTIMES & MEDIA POSTERS
  const combinedMedia = [...(state.selectedMovies || []), ...(state.selectedSeries || [])];
  if (combinedMedia.length > 0) {
    ctx.font = "bold 22px 'Arial', sans-serif";
    ctx.fillStyle = '#be185d';
    ctx.textAlign = 'left';
    ctx.fillText('🎬 Media Selection', 50, y);
    y += 30;

    for (const title of combinedMedia) {
      const posterSrc = mediaPosters[title] || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100";
      try {
        const img = await loadImage(posterSrc);
        ctx.drawImage(img, 70, y - 20, 55, 80);
      } catch (e) {
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(70, y - 20, 55, 80);
      }

      ctx.font = "bold 18px 'Arial', sans-serif";
      ctx.fillStyle = '#334155';
      ctx.textAlign = 'left';
      ctx.fillText(title, 145, y + 25);
      
      if (state.customMovieSuggestion) {
        ctx.font = "italic 14px 'Arial', sans-serif";
        ctx.fillStyle = '#64748b';
        ctx.fillText(`Note: suggested additions included`, 145, y + 50);
      }
      y += 95;
    }
    y += 15;
  }

  // SECTION 2: RAMEN SELECTIONS WITH IMAGES
  if (chosenRamen.length > 0) {
    ctx.font = "bold 22px 'Arial', sans-serif";
    ctx.fillStyle = '#be185d';
    ctx.textAlign = 'left';
    ctx.fillText('🍜 Ramen Customization', 50, y);
    y += 30;

    for (const [name, qty] of chosenRamen) {
      const itemSrc = ramenImages[name] || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100";
      try {
        const img = await loadImage(itemSrc);
        ctx.drawImage(img, 70, y - 15, 50, 50);
      } catch (e) {
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(70, y - 15, 50, 50);
      }

      ctx.font = "bold 16px 'Arial', sans-serif";
      ctx.fillStyle = '#334155';
      ctx.textAlign = 'left';
      ctx.fillText(`${name} (Qty: ${qty})`, 145, y + 15);
      y += 65;
    }
    y += 15;
  }

  if (state.dateType === "Something Custom" && state.customDateIdea) {
    ctx.font = "bold 20px 'Arial', sans-serif";
    ctx.fillStyle = '#be185d';
    ctx.textAlign = 'left';
    ctx.fillText('✨ Custom Date Idea', 50, y);
    y += 25;

    ctx.font = "italic 16px 'Arial', sans-serif";
    ctx.fillStyle = '#475569';
    ctx.fillText(`"${state.customDateIdea}"`, 70, y + 10);
    y += 55;
  }

  // 🌟 SECTION 3: THE PRINCESS REVIEW & FEEDBACK STAMP
  if (hasFeedback) {
    ctx.font = "bold 22px 'Arial', sans-serif";
    ctx.fillStyle = '#be185d';
    ctx.textAlign = 'left';
    ctx.fillText('⭐ Princess Review Score', 50, y);
    y += 35;

    if (state.feedbackStars && state.feedbackStars > 0) {
      ctx.font = "bold 24px 'Arial', sans-serif";
      let starsString = "";
      for (let i = 0; i < state.feedbackStars; i++) {
        starsString += "⭐ ";
      }
      ctx.fillText(starsString.trim(), 70, y);
      y += 35;
    }

    if (state.feedbackNote) {
      ctx.font = "italic 15px 'Arial', sans-serif";
      ctx.fillStyle = '#475569';
      const textLine = state.feedbackNote.length > 75 ? `${state.feedbackNote.slice(0, 72)}...` : state.feedbackNote;
      ctx.fillText(`"${textLine}"`, 70, y);
      y += 30;
    }
    y += 10;
  }

  // Divider Line before Financials
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(40, y);
  ctx.lineTo(760, y);
  ctx.stroke();
  ctx.setLineDash([]);
  y += 40;

  // 💰 CORE MATH ENGINE: Calculate genuine hotpot subtotal in real numbers
  const calculatedRamenCost = chosenRamen.reduce((sum, [itemId, qty]) => {
    const price = ramenPricesLookup[itemId] || 0;
    return sum + price * (qty as number);
  }, 0);

  const eventCost = 1;
  const mediaCost = combinedMedia.length;
  const serviceCharge = 1;
  const tipsAmount = state.tipsAmount || 0;

  // Real Subtotal = Event + Media items + Hotpot items
  const actualKissesSubtotal = eventCost + mediaCost + calculatedRamenCost;
  const calculatedGrandTotal = actualKissesSubtotal + serviceCharge + tipsAmount;

  ctx.font = "bold 18px 'Arial', sans-serif";
  ctx.fillStyle = '#475569';
  ctx.textAlign = 'left';

  ctx.fillText(`Service Charge: ${serviceCharge} 💋`, 70, y);
  y += 35;

  ctx.fillText(`Kisses Subtotal: ${actualKissesSubtotal} 💋`, 70, y);
  y += 35;

  if (tipsAmount > 0) {
    ctx.fillText(`Added Extra Love Tips: ${tipsAmount} 💋`, 70, y);
    y += 40;
  } else {
    y += 5;
  }

  // Grand Total Highlight Container Box
  const boxHeight = 65;
  const totalGradient = ctx.createLinearGradient(40, y - 15, 40, y + boxHeight);
  totalGradient.addColorStop(0, '#f472b6');
  totalGradient.addColorStop(1, '#ec4899');
  ctx.fillStyle = totalGradient;
  ctx.fillRect(40, y - 15, 720, boxHeight);

  ctx.font = "bold 26px 'Arial', sans-serif";
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(`TOTAL PAID: ${calculatedGrandTotal} 💋`, 400, y + 25);
  y += boxHeight + 40;

  // Footer Metadata Block
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(40, y);
  ctx.lineTo(760, y);
  ctx.stroke();
  ctx.setLineDash([]);
  y += 35;

  ctx.font = "14px 'Arial', sans-serif";
  ctx.fillStyle = '#a78bfa';
  ctx.textAlign = 'center';
  ctx.fillText('Status: Valid Forever in Our Hearts 💕', 400, y);
  y += 25;
  ctx.fillText(`Order No: #ROMANCE-${Date.now().toString().slice(-6)}`, 400, y);

  return canvas.toDataURL('image/png');
};

export const downloadReceipt = async (state: AppState): Promise<void> => {
  try {
    const imageDataUrl = await generateReceiptImage(state);
    
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'maganda_princess_date_receipt.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('[v0] Failed to build high-fidelity download canvas:', error);
  }
};
