import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Larger */}
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-bold text-white tracking-tight hover:text-emerald-400 transition-colors">
              NH<span className="text-emerald-500">.</span>
            </a>
          </div>
          
          {/* Desktop Nav - Larger text and spacing */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium transition-colors relative py-2 ${
                    activeSection === item.href.slice(1) 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Active indicator dot */}
                  {activeSection === item.href.slice(1) && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Larger touch target */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Larger padding and text */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-medium ${
                  activeSection === item.href.slice(1)
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};