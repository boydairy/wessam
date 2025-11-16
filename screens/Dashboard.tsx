
import React from 'react';
import { Link } from 'react-router-dom';
import { GRADES } from '../constants';
import { Button } from '../components/Button';
import { AppRoute } from '../types';
import { useGame } from '../context/GameContext'; // Import useGame

export const Dashboard: React.FC = () => {
  const { getOwnedBadges } = useGame(); // Get owned badges
  const ownedBadges = getOwnedBadges();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl p-4 md:p-8 bg-white rounded-3xl shadow-2xl border-4 border-purple-400 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-10 text-center animate-bounce-text">اختر الصف الدراسي</h2>
      
      {ownedBadges.length > 0 && (
        <div className="mb-8 p-4 bg-purple-50 rounded-2xl shadow-inner border border-purple-200 w-full text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-4">شاراتك المقتناة 🏅</h3>
          <div className="flex flex-wrap justify-center gap-4 text-4xl">
            {ownedBadges.map((badge, index) => (
              <span key={index} role="img" aria-label="badge" className="transform hover:scale-125 transition-transform duration-200">
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {GRADES.map((grade) => (
          <Link
            key={grade.id}
            to={AppRoute.GRADE.replace(':gradeId', grade.id)}
            className="block transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-2xl"
          >
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-8 rounded-2xl flex flex-col items-center justify-center h-48 md:h-64 shadow-lg border-2 border-purple-300">
              <span className="text-6xl mb-4" role="img" aria-label="books">📚</span>
              <h3 className="text-3xl md:text-4xl font-bold text-purple-800">{grade.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};