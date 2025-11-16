
import React from 'react';
import { Navbar } from './Navbar';
import { useGame } from '../context/GameContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useGame();

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Navbar />}
      <main className={`flex-grow p-4 md:p-8 ${user ? 'mt-20' : 'mt-0'} flex items-center justify-center`}>
        {children}
      </main>
    </div>
  );
};
