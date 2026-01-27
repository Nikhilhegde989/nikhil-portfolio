import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2";
  const variantClasses = variant === 'default' 
    ? "bg-blue-100 text-blue-800"
    : "bg-slate-800 text-slate-300";
  
  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {children}
    </span>
  );
};