import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
  external?: boolean;
  download?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  icon: Icon,
  external = false,
  download = false,
  className = ''
}) => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-800 text-white hover:bg-slate-700",
    outline: "border border-slate-600 text-white hover:bg-slate-800"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a 
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...(download && { download: true })}
      >
        {Icon && <Icon size={20} />}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};