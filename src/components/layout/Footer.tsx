import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-800 pt-8 pb-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-slate-400 text-sm">
        © 2025 Nikhil Hegde. All rights reserved.
      </p>
      <div className="flex items-center gap-6">
        <a href="https://github.com/Nikhilhegde989" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub Profile">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/nikhilhegde989/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn Profile">
          <Linkedin size={20} />
        </a>
        <a href="mailto:nikhilhegde989@gmail.com" className="text-slate-400 hover:text-white transition-colors" aria-label="Email Me">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);