
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { CoinDisplay } from './CoinDisplay';
import { Button } from './Button';
import { AppRoute } from '../types';

export const Navbar: React.FC = () => {
  const { user, logout, getEquippedAvatarFrame } = useGame();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(AppRoute.LOGIN);
  };

  if (!user) {
    return null; // Don't show navbar if not logged in
  }

  const equippedFrameClass = getEquippedAvatarFrame();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-2 px-4 flex items-center justify-between flex-wrap gap-2">
      {/* User Info & App Title (Left) */}
      <div className="flex items-center gap-2"> {/* Reduced gap */}
        {user.avatar && (
          <span className={`text-2xl sm:text-3xl p-1 rounded-full ${equippedFrameClass || ''} transition-all duration-300`}> {/* Reduced mobile avatar size */}
            {user.avatar}
          </span>
        )}
        <span className="font-extrabold text-lg sm:text-xl text-blue-700 animate-fade-in-down transition-all duration-500"> {/* Reduced mobile text size */}
          أهلاً بك، {user.name}!
        </span>
      </div>

      {/* Navigation Links - now responsive, will wrap if necessary */}
      <div className="flex-1 flex justify-center gap-2 min-w-[150px] order-last md:order-none"> {/* flex-1 to allow it to grow/shrink, justify-center for alignment, gap-2 for smaller spacing, order-last to push it below on small screens if it wraps, min-w to give it some base width */}
        <Link to={AppRoute.DASHBOARD}>
          <Button variant="secondary" size="sm">الرئيسية</Button>
        </Link>
        <Link to={AppRoute.STORE}>
          <Button variant="secondary" size="sm">المتجر</Button>
        </Link>
      </div>

      {/* Right side - Coins and Logout */}
      <div className="flex items-center gap-2"> {/* Reduced gap */}
        <CoinDisplay />
        <Button variant="danger" size="sm" onClick={handleLogout}>
          تسجيل الخروج
        </Button>
      </div>
    </nav>
  );
};
