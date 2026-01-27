import React from 'react';
import { GraduationCap, MapPin, Lightbulb } from 'lucide-react';
import { Section, SectionTitle } from '../layout/Section';

export const About: React.FC = () => (
  <Section id="about">
    <SectionTitle>About Me</SectionTitle>
    
    <div className="grid lg:grid-cols-5 gap-12 items-start">
      {/* Main Story - Takes up 3 columns */}
      <div className="lg:col-span-3 space-y-6">
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed">
            My journey into software engineering started with a fascination for how things work,
            first with <span className="text-emerald-600 font-medium">Physics and Mathematics</span>, 
            then with code. That curiosity led me from a BSc in Physics, Maths and Computer Science 
            to an MCA from <span className="text-slate-900 font-semibold">MIT Manipal</span>, and 
            ultimately to building production systems that handle real-world scale.
          </p>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Today, I work at the intersection of <span className="text-emerald-600 font-medium">backend architecture 
            and database internals</span>. Whether it's optimizing PostgreSQL queries, designing 
            distributed systems with Kafka, or tuning latency for high-throughput APIs, I'm drawn to 
            the invisible infrastructure that powers user experiences.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <GraduationCap size={16} />
            Education
          </h3>
          
          <div className="space-y-6">
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white z-10" />
                <div className="w-0.5 h-full bg-slate-200 -mt-1" />
              </div>
              <div className="pb-6">
                <div className="text-slate-900 font-semibold">Master of Computer Applications (MCA)</div>
                <div className="text-slate-500 text-sm">MIT Manipal • 2022 — 2024</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-emerald-600/80 text-sm font-medium">CGPA: 9.06</span>
                  <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium border border-emerald-200">
                    Top 10% of batch
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-slate-400 ring-4 ring-white z-10" />
              </div>
              <div>
                <div className="text-slate-700 font-medium">BSc Physics, Mathematics & Computer Science</div>
                <div className="text-slate-400 text-sm">JSS Dharwad • 2019 — 2022</div>
                <div className="text-slate-600 text-sm mt-1 font-medium">Percentage: 84%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Quick Info - Takes up 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500/30 transition-colors group shadow-sm hover:shadow-md">
            <div className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">2+</div>
            <div className="text-sm text-slate-500 mt-1">Years Experience</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500/30 transition-colors group shadow-sm hover:shadow-md">
            <div className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">3</div>
            <div className="text-sm text-slate-500 mt-1">Research Papers</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500/30 transition-colors group shadow-sm hover:shadow-md">
            <div className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">1</div>
            <div className="text-sm text-slate-500 mt-1">Technical Talk</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500/30 transition-colors group shadow-sm hover:shadow-md">
            <div className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">9+</div>
            <div className="text-sm text-slate-500 mt-1">Projects Shipped</div>
          </div>
        </div>

        {/* Current Status */}
        <div className="p-6 bg-slate-100 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-emerald-600" />
            Currently
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span>Building backend systems at <span className="text-slate-900 font-medium">Stryv.ai</span></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span>Exploring Gen AI integration with backend architectures</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span>Open to collaborations on Backend Systems</span>
            </li>
          </ul>
        </div>

        {/* Location - Updated with both locations */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-slate-600 text-sm">
            <MapPin size={16} className="text-emerald-600" />
            <span>Currently in <span className="text-slate-900 font-medium">Hyderabad, India</span></span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-sm pl-6 border-l-2 border-slate-100 ml-2">
            <span>Originally from <span className="text-slate-700 font-medium">Sirsi, Karnataka</span></span>
          </div>
        </div>
      </div>
    </div>
  </Section>
);