'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RamenItem {
  id: string;
  name: string;
  category: 'pack' | 'ingredient' | 'meat';
  kisses: number;
}

export interface Order {
  id: string;
  userName: string;
  dateType: string;
  selectedGames: string[];
  selectedMovies: string[];
  selectedSeries: string[];
  selectedRamenItems: Record<string, number>;
  tipsAmount: number;
  isPaid: boolean;
  paymentMethod?: string;
  createdAt: string;
  customDateIdea?: string;
  // 🌟 Extended fields for order history
  customMovieSuggestion?: string;
  feedbackStars?: number;
  feedbackNote?: string;
}

export interface AppState {
  userName: string;
  orderHistory: Order[];
  currentScreen: number;
  dateType: string | null;
  selectedGames: string[];
  selectedMovies: string[];
  selectedSeries: string[];
  selectedRamenItems: Record<string, number>;
  tipsAmount: number;
  isPaid: boolean;
  customDateIdea?: string;
  noClickCount: number;
  paymentMethod?: string;
  
  // 🌟 NEW FIELD CORES
  customMovieSuggestion?: string; // Captures custom movie notes
  isTrailerPlaying?: boolean;     // ⏸️ Tells global layout whether to pause background song
  feedbackStars?: number;         // Captures rating stars out of 5
  feedbackNote?: string;          // Captures review input block string text
}

const defaultAppState: AppState = {
  userName: '',
  orderHistory: [],
  currentScreen: 0,
  dateType: null,
  selectedGames: [],
  selectedMovies: [],
  selectedSeries: [],
  selectedRamenItems: {},
  tipsAmount: 0,
  isPaid: false,
  noClickCount: 0,
  // 🌟 Initialize custom states
  customMovieSuggestion: '',
  isTrailerPlaying: false,
  feedbackStars: 0,
  feedbackNote: '',
};

interface AppContextType {
  state: AppState;
  setState: (newState: Partial<AppState>) => void;
  goToScreen: (screen: number) => void;
  resetApp: () => void;
  saveOrder: (paymentMethod: string) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setStateInternal] = useState<AppState>(defaultAppState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    setMounted(true);
    const savedState = localStorage.getItem('datePlannerState');
    const savedHistory = localStorage.getItem('date_planner_history');
    
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (savedHistory) {
          try {
            parsed.orderHistory = JSON.parse(savedHistory);
          } catch (e) {
            console.error('[v0] Failed to parse history:', e);
          }
        }
        setStateInternal(parsed);
      } catch (e) {
        console.error('[v0] Failed to parse saved state:', e);
      }
    }
  }, []);

  const setState = (newState: Partial<AppState>) => {
    setStateInternal((prev) => {
      const updated = { ...prev, ...newState };
      if (mounted) {
        localStorage.setItem('datePlannerState', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const goToScreen = (screen: number) => {
    setState({ currentScreen: screen });
  };

  const resetApp = () => {
    setStateInternal(defaultAppState);
    localStorage.removeItem('datePlannerState');
  };

  const saveOrder = (paymentMethod: string) => {
    const order: Order = {
      id: Date.now().toString(),
      userName: state.userName,
      dateType: state.dateType || '',
      selectedGames: state.selectedGames,
      selectedMovies: state.selectedMovies,
      selectedSeries: state.selectedSeries,
      selectedRamenItems: state.selectedRamenItems,
      tipsAmount: state.tipsAmount,
      isPaid: true,
      paymentMethod,
      createdAt: new Date().toISOString(),
      customDateIdea: state.customDateIdea,
      // 🌟 Include custom values inside history logger securely
      customMovieSuggestion: state.customMovieSuggestion,
      feedbackStars: state.feedbackStars,
      feedbackNote: state.feedbackNote,
    };

    const updatedHistory = [...state.orderHistory, order];
    const updated = {
      ...state,
      orderHistory: updatedHistory,
      isPaid: true,
      paymentMethod,
    };
    
    setStateInternal(updated);
    localStorage.setItem('datePlannerState', JSON.stringify(updated));
    localStorage.setItem('date_planner_history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setState({ orderHistory: [] });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        goToScreen,
        resetApp,
        saveOrder,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};