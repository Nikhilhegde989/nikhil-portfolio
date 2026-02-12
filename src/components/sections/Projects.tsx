import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Section, SectionTitle } from '../layout/Section';
import { Card } from '../ui/Card';
import { projects } from '../../data/portfolioData';

export const Projects: React.FC = () => (
  <Section id="projects" dark>
    <SectionTitle dark>Featured Projects</SectionTitle>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {projects.map((project) => (
        <Card
          key={project.id}
          dark
          hover
          className="overflow-hidden p-0 group border-slate-800 hover:border-emerald-500/30 transition-all duration-500 flex flex-col"
        >
          {/* Image with zoom effect */}
          <div className="h-52 overflow-hidden relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10 opacity-60" />
            <img
              src={`images/projects/${project.id}.png`}
              alt={project.title}
              loading="lazy"
              width="800"
              height="450"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/60 backdrop-blur-sm"
                aria-hidden="true"
                tabIndex={-1}
              >
                <span className="flex items-center gap-2 text-white font-medium px-4 py-2 bg-emerald-600 rounded-full hover:bg-emerald-500 transition-colors">
                  View Project <ExternalLink size={16} />
                </span>
              </a>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow bg-slate-900">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-400 transition-colors p-1 hover:bg-emerald-500/10 rounded-lg"
                  aria-label={`View ${project.title}`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>

            <p className="text-slate-400 mb-5 text-sm leading-relaxed flex-grow">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700 group-hover:border-slate-600 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);