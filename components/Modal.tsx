
import React from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-scale-up">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none focus:outline-none transition-transform duration-200 transform hover:rotate-90"
          >
            &times;
          </button>
        </div>
        <div className="text-gray-700 mb-6 text-lg">
          {children}
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} variant="secondary">
            إغلاق
          </Button>
        </div>
      </div>
    </div>
  );
};
