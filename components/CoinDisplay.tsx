
import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

export const CoinDisplay: React.FC = () => {
  const { coins } = useGame();
  const prevCoinsRef = useRef(coins);
  const coinDisplayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (coins !== prevCoinsRef.current && coinDisplayRef.current) {
      const display = coinDisplayRef.current;
      display.classList.add('animate-ping-once'); // Trigger animation

      const timeout = setTimeout(() => {
        display.classList.remove('animate-ping-once');
      }, 500); // Duration of the animation

      return () => clearTimeout(timeout);
    }
    prevCoinsRef.current = coins;
  }, [coins]);

  return (
    <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 font-bold p-2 rounded-full shadow-md text-lg min-w-[80px] justify-center">
      <span role="img" aria-label="coin" className="text-xl">💰</span>
      <span ref={coinDisplayRef} className="relative inline-block transition-transform duration-300">
        {coins}
      </span>
    </div>
  );
};
