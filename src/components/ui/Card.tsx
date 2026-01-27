import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  dark = false 
}) => {
  const baseClasses = "rounded-xl p-6 border";
  const darkClasses = dark 
    ? "bg-slate-900 border-slate-800" 
    : "bg-white border-slate-200 shadow-sm";
  const hoverClasses = hover 
    ? (dark ? "hover:border-slate-700" : "hover:shadow-md") 
    : "";
  
  return (
    <div className={`${baseClasses} ${darkClasses} ${hoverClasses} transition-all ${className}`}>
      {children}
    </div>
  );
};