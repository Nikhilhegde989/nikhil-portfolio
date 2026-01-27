import React from 'react';
import { Section, SectionTitle } from '../layout/Section';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { experiences } from '../../data/portfolioData';
import { Building2, MapPin, Calendar } from 'lucide-react';

// Helper to calculate duration between dates
const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  
  return parts.join(' ') || 'Less than a month';
};

export const Experience: React.FC = () => (
  <Section id="experience" dark>
    <SectionTitle dark>Experience</SectionTitle>
    
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
      {experiences.map((exp) => (
        <Card key={exp.id} dark hover className="relative ml-12 md:ml-0">
          {/* Timeline Dot */}
          <div className="absolute -left-[53px] md:-left-[57px] top-8 w-4 h-4 rounded-full border-4 border-slate-800 bg-emerald-500 z-10 hidden md:block" />
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <Building2 size={20} className="text-slate-500" />
                {exp.link ? (
                  <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors border-b border-transparent hover:border-emerald-400/30">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </h3>
              <p className="text-lg text-emerald-400 font-medium">{exp.role}</p>
            </div>
            
            {/* Meta Info: Duration & Location */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                <Calendar size={14} className="text-emerald-500" />
                <span className="font-mono">
                  {calculateDuration(exp.startDate, exp.endDate)}
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500">
                  {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                <MapPin size={14} className="text-slate-600" />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <Badge key={tech} variant="dark">
                {tech}
              </Badge>
            ))}
          </div>

          <ul className="space-y-4">
            {exp.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300 text-base leading-relaxed pl-2 border-l-2 border-slate-800 hover:border-emerald-500/30 transition-colors">
                <span className="text-emerald-500/50 mt-1">▸</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: achievement
                    .replace(/\b(Architected|scoring engine|Led|Migrated|Awarded|Optimized|Reduced|Improved)\b/g, '<strong class="text-emerald-400 font-semibold">$1</strong>')
                    .replace(/\b(Key Contributor|supply-chain|marketplace|microservices|RESTful APIs)\b/g, '<strong class="text-emerald-400 font-semibold">$1</strong>')
                    .replace(/\b(real-time|AI chatbot|agent-based|voice-to-form|event streaming)\b/g, '<span class="text-purple-400 font-medium">$1</span>')
                    .replace(/\b(LLMs|RAG|LangChain|Redis caching|PostgreSQL query optimization|async design)\b/g, '<span class="text-blue-400 font-medium">$1</span>')
                    .replace(/(\d+%|\d+x|\d+\s?ms|₹[\d,]+|\.NET|FastAPI|Node\.js)/g, '<span class="text-white font-bold">$1</span>')
                }} />
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  </Section>
);