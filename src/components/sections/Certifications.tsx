import React from 'react';
import { Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Section, SectionTitle } from '../layout/Section';
import { Card } from '../ui/Card';
import { certifications } from '../../data/portfolioData';

export const Certifications: React.FC = () => (
  <Section id="certifications" className="bg-slate-50">
    <SectionTitle>Certifications</SectionTitle>
    
    <div className="grid md:grid-cols-2 gap-4">
      {certifications.map((cert) => (
        <Card 
          key={cert.id} 
          hover 
          className="flex items-start gap-4 group border-slate-200 hover:border-emerald-200 transition-all duration-300 bg-white"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
            <Award className="text-emerald-600" size={24} strokeWidth={1.5} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
              {cert.link ? (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 hover:underline decoration-emerald-400/50 underline-offset-4"
                >
                  {cert.title}
                </a>
              ) : (
                cert.title
              )}
            </h3>
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              {cert.issuer}
              {cert.link && (
                <CheckCircle2 size={12} className="text-emerald-500" />
              )}
            </p>
          </div>
          
          {cert.link && (
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-all -mr-2 -mt-2"
              aria-label={`View ${cert.title} certificate`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </Card>
      ))}
    </div>
  </Section>
);