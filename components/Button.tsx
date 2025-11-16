
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  let baseStyles = 'font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed';

  switch (variant) {
    case 'primary':
      baseStyles += ' bg-blue-600 text-white hover:bg-blue-700';
      break;
    case 'secondary':
      baseStyles += ' bg-gray-300 text-gray-800 hover:bg-gray-400';
      break;
    case 'danger':
      baseStyles += ' bg-red-600 text-white hover:bg-red-700';
      break;
    case 'success':
      baseStyles += ' bg-green-500 text-white hover:bg-green-600';
      break;
  }

  switch (size) {
    case 'sm':
      baseStyles += ' text-sm py-1.5 px-3';
      break;
    case 'md':
      baseStyles += ' text-base py-2 px-4';
      break;
    case 'lg':
      baseStyles += ' text-lg py-3 px-6';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
