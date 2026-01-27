import React from 'react';
import { ExternalLink, Quote } from 'lucide-react';
import { Section, SectionTitle } from '../layout/Section';
import { Card } from '../ui/Card';
import { publications } from '../../data/portfolioData';

export const Publications: React.FC = () => (
  <Section id="publications" dark>
    <SectionTitle dark>Research & Publications</SectionTitle>
    
    <div className="grid gap-6">
      {publications.map((pub, idx) => (
        <Card 
          key={pub.id} 
          dark 
          hover 
          className="group border-slate-800 hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="flex items-start gap-5">
            {/* Numbered badge instead of icon for variety */}
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
              <span className="text-slate-500 font-mono font-bold text-sm group-hover:text-emerald-400 transition-colors">
                0{idx + 1}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  <a 
                    href={pub.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline decoration-emerald-500/30 underline-offset-4"
                  >
                    {pub.title}
                  </a>
                </h3>
                
                <a 
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-400 p-1.5 hover:bg-emerald-500/10 rounded-lg transition-all flex-shrink-0"
                  aria-label="View publication"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Quote size={14} className="text-emerald-500/50" />
                <p className="text-emerald-400/80 text-sm font-medium">
                  {pub.venue}
                </p>
              </div>
              
              <a 
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors group/link"
              >
                <span className="border-b border-transparent group-hover/link:border-emerald-400/30">
                  View Paper
                </span>
                <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);