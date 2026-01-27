import React from 'react';
import { Code2, Database, Brain, Cloud } from 'lucide-react';
import { Section, SectionTitle } from '../layout/Section';
import { Card } from '../ui/Card';
import { skillCategories, additionalSkills } from '../../data/portfolioData';

const iconMap = { Code2, Database, Brain, Cloud };

export const Skills: React.FC = () => (
  <Section id="skills" className="bg-slate-50">
    <SectionTitle>Technical Skills</SectionTitle>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skillCategories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        const colorClasses = {
          backend: 'from-blue-500/20 to-blue-600/20 text-blue-600 border-blue-200',
          database: 'from-emerald-500/20 to-emerald-600/20 text-emerald-600 border-emerald-200',
          ai: 'from-purple-500/20 to-purple-600/20 text-purple-600 border-purple-200',
          cloud: 'from-orange-500/20 to-orange-600/20 text-orange-600 border-orange-200'
        };
        
        return (
          <Card key={category.id} hover className="bg-white border-slate-200">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[category.id as keyof typeof colorClasses]} border flex items-center justify-center mb-5 shadow-sm`}>
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-slate-900 mb-4 text-lg">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="text-sm px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700 transition-all duration-300 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        );
      })}
    </div>

    {/* Additional Skills - Premium Treatment */}
    <div className="mt-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 h-px top-1/2" />
      <div className="relative flex items-center justify-center">
        <span className="bg-slate-50 px-4 text-sm font-medium text-slate-500 uppercase tracking-wider">
          Additional Tools & Technologies
        </span>
      </div>
    </div>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {additionalSkills.map((skill) => (
        <span key={skill} className="group relative px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 font-medium hover:border-emerald-400 hover:text-emerald-700 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 cursor-default">
          {skill}
          <span className="absolute inset-0 rounded-full bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </span>
      ))}
    </div>
  </Section>
);