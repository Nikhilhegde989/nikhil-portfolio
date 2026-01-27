import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-slate-500 text-sm">
        © 2025 Nikhil Hegde. All rights reserved.
      </p>
      <div className="flex items-center gap-6">
        <a href="https://github.com/Nikhilhegde989" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/nikhilhegde989/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
          <Linkedin size={20} />
        </a>
        <a href="mailto:nikhilhegde989@gmail.com" className="text-slate-500 hover:text-white transition-colors">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);