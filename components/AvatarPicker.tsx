
import React from 'react';
import { EMOJI_AVATARS } from '../constants';

interface AvatarPickerProps {
  selectedAvatar: string;
  onSelectAvatar: (avatar: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, onSelectAvatar }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-6xl p-4 bg-white rounded-full shadow-lg border-2 border-blue-300 animate-pulse-slow">
        {selectedAvatar}
      </div>
      <div className="grid grid-cols-5 md:grid-cols-8 gap-2 p-2 bg-white rounded-xl shadow-inner max-w-md overflow-auto">
        {EMOJI_AVATARS.map((avatar, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectAvatar(avatar)}
            className={`text-3xl p-2 rounded-full hover:bg-blue-100 transition duration-200 transform hover:scale-110
              ${selectedAvatar === avatar ? 'bg-blue-200 ring-2 ring-blue-500' : 'bg-gray-50'}`}
          >
            {avatar}
          </button>
        ))}
      </div>
    </div>
  );
};
