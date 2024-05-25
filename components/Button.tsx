// components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded">
      {label}
    </button>
  );
};

export default Button;
