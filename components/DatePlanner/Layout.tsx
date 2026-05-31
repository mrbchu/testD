'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import MusicToggle from './MusicToggle';
import ProfileDrawer from './ProfileDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-100">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-100" />
      </div>

      {/* Profile Drawer */}
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>

      {/* Top-left: Profile Avatar Button */}
      {state.userName && (
        <button
          onClick={() => setIsProfileOpen(true)}
          className="absolute top-4 left-4 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="text-xl">{state.userName[0].toUpperCase()}</span>
        </button>
      )}

      {/* Top-right: Music Toggle */}
      <MusicToggle isOn={isMusicOn} onChange={setIsMusicOn} />
    </div>
  );
};

export default Layout;
