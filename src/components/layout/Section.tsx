import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  className = '', 
  dark = false 
}) => {
  return (
    <section 
      id={id} 
      className={`relative py-20 px-4 sm:px-6 lg:px-8 ${dark ? 'bg-slate-900' : 'bg-slate-50'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ 
  children, 
  dark 
}) => (
  <h2 className={`text-3xl font-bold mb-12 ${dark ? 'text-white' : 'text-slate-900'}`}>
    {children}
  </h2>
);