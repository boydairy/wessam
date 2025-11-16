
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AvatarPicker } from '../components/AvatarPicker';
import { EMOJI_AVATARS } from '../constants';
import { AppRoute } from '../types';

export const LoginScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(EMOJI_AVATARS[0]);
  const { login } = useGame();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim(), selectedAvatar);
      navigate(AppRoute.DASHBOARD);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border-4 border-blue-400 transform transition-all duration-500 hover:scale-105 animate-fade-in-up">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 animate-bounce-text">خذي بيدي</h1>
        <p className="text-xl text-gray-600 mb-2 animate-fade-in delay-200">اسم المدرسة: تبوك للتعليم الأساسي (٥-١٢)</p>
        <p className="text-xl text-gray-600 mb-2 animate-fade-in delay-300">اسم المعلمة: هويده سالم عبدالله الهاشمي</p>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in delay-400">مديرة المدرسة: أسماء الخروصية</p>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in delay-500">أهلاً بك في عالم قواعد اللغة العربية!</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 items-center">
          <Input
            id="name"
            type="text"
            placeholder="أدخل اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-center text-lg p-4 border-blue-300 focus:border-blue-500 animate-fade-in delay-600"
          />

          <AvatarPicker selectedAvatar={selectedAvatar} onSelectAvatar={setSelectedAvatar} />

          <Button type="submit" className="w-full text-xl py-4 mt-6 animate-fade-in delay-800" disabled={!name.trim()}>
            ابدأ اللعب
          </Button>
        </form>
      </div>
    </div>
  );
};
