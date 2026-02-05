import React from 'react';
import { Github, Linkedin, Mail, Download, Code2, Mic, Cpu, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const Hero: React.FC = () => {
  const trackResumeDownload = () => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'file_download', {
        file_name: 'Nikhil_Hegde_Resume.pdf',
        file_extension: 'pdf',
        link_url: '/resume.pdf',
        event_category: 'Resume',
        event_label: 'Resume Download'
      });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">

        {/* MOBILE LAYOUT (md:hidden) - Everything visible, custom order */}
        <div className="flex flex-col md:hidden space-y-6">
          {/* 1. Software Engineer */}
          <div>
            <p className="text-emerald-400 font-mono text-sm tracking-wider uppercase">
              Software Engineer
            </p>
          </div>

          {/* 2. Name */}
          <div>
            <h1 className="text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Nikhil
              <span className="text-slate-400 block mt-2">Hegde</span>
            </h1>
          </div>

          {/* 3. Image */}
          <div className="flex justify-center py-4">
            <div className="relative group">
              <img
                src="images/profile.png"
                alt="Nikhil Hegde"
                width="256"
                height="256"
                className="w-64 h-64 object-cover rounded-2xl border-2 border-slate-700 shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-emerald-500 w-6 h-6 rounded-full border-4 border-slate-900 animate-pulse"></div>
            </div>
          </div>

          {/* 4. Stats Cards */}
          <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-5 border border-slate-700 shadow-xl">
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={Code2} color="emerald" value="2 Years" label="Shipping Code" />
              <StatCard icon={Mic} color="blue" value="Speaker" label="Hyderabad PG Days" />
              <StatCard icon={Cpu} color="purple" value="Performance" label="Latency & Optimization" />
              <StatCard icon={Sparkles} color="orange" value="Exploring" label="Gen AI Integration" />
            </div>
          </div>

          {/* 5. Description */}
          <div className="space-y-4 pt-2">
            <p className="text-lg text-slate-300 leading-relaxed font-light">
              Engineer who loves to explore <span className="text-white font-medium">how things work under the hood</span>, then make them faster.
              I ship end-to-end products, but obsess over backend craft : <span className="text-white font-medium">tuning latency</span>, <span className="text-white font-medium">optimizing performance</span>,
              and <span className="text-white font-medium">building reliable architectures</span> that work exactly as intended.
              Recently spoke about PostgreSQL internals at{' '}
              <span className="text-emerald-400 font-medium">Hyderabad PostgreSQL Days 2025</span>.
            </p>
            <p className="text-slate-400 italic border-l-2 border-emerald-500/30 pl-4">
              Currently exploring the intersection of Gen AI and backend systems. Always exploring. Always shipping.
            </p>
          </div>

          {/* 6. Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {['Python', 'Node.js', 'PostgreSQL', 'AWS', 'React', 'Gen AI'].map((skill) => (
              <span key={skill} className="px-3 py-1.5 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700 font-medium">
                {skill}
              </span>
            ))}
          </div>

          {/* 7. Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="https://github.com/Nikhilhegde989" external icon={Github} variant="secondary" className="bg-slate-800 hover:bg-slate-700 border-slate-700">
              GitHub
            </Button>
            <Button href="https://www.linkedin.com/in/nikhilhegde989/" external icon={Linkedin} className="bg-blue-600 hover:bg-blue-700">
              LinkedIn
            </Button>
            <Button href="#contact" icon={Mail} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              Contact
            </Button>
            <Button
              href="resume.pdf"
              download
              icon={Download}
              variant="outline"
              className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
              onClick={trackResumeDownload}
            >
              Resume
            </Button>
          </div>
        </div>

        {/* DESKTOP LAYOUT (hidden md:grid) - EXACTLY AS YOUR ORIGINAL */}
        <div className="hidden md:grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-2">
                Software Engineer
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                Nikhil
                <span className="text-slate-400 block mt-2">Hegde</span>
              </h1>
            </div>

            <div className="space-y-4">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl font-light">
                Engineer who loves to explore <span className="text-white font-medium">how things work under the hood</span>, then make them faster.
                I ship end-to-end products, but obsess over backend craft—<span className="text-white font-medium">tuning latency</span>, <span className="text-white font-medium">optimizing performance</span>,
                and <span className="text-white font-medium">building reliable architectures</span> that work exactly as intended.
                Recently spoke about PostgreSQL internals at{' '}
                <span className="text-emerald-400 font-medium">Hyderabad PostgreSQL Days 2025</span>.
              </p>

              <p className="text-slate-400 max-w-lg italic border-l-2 border-emerald-500/30 pl-4">
                Currently exploring the intersection of Gen AI and backend systems. Always exploring. Always shipping.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Python', 'Node.js', 'PostgreSQL', 'AWS', 'React', 'Gen AI'].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700 font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="https://github.com/Nikhilhegde989" external icon={Github} variant="secondary" className="bg-slate-800 hover:bg-slate-700 border-slate-700">
                GitHub
              </Button>
              <Button href="https://www.linkedin.com/in/nikhilhegde989/" external icon={Linkedin} className="bg-blue-600 hover:bg-blue-700">
                LinkedIn
              </Button>
              <Button href="#contact" icon={Mail} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Contact
              </Button>
              <Button
                href="resume.pdf"
                download
                icon={Download}
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500"
                onClick={trackResumeDownload}
              >
                Resume
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col items-center gap-8">
              <div className="relative group">
                <img
                  src="images/profile.png"
                  alt="Nikhil Hegde"
                  width="288"
                  height="288"
                  className="w-72 h-72 object-cover rounded-2xl border-2 border-slate-700 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 w-6 h-6 rounded-full border-4 border-slate-900 animate-pulse"></div>
              </div>

              <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 border border-slate-700 w-full shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard icon={Code2} color="emerald" value="2 Years" label="Shipping Code" />
                  <StatCard icon={Mic} color="blue" value="Speaker" label="Hyderabad PG Days" />
                  <StatCard icon={Cpu} color="purple" value="Performance" label="Latency & Optimization" />
                  <StatCard icon={Sparkles} color="orange" value="Exploring" label="Gen AI Integration" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const StatCard: React.FC<{ icon: any; color: string; value: string; label: string }> = ({
  icon: Icon, color, value, label
}) => {
  const colorClasses = {
    emerald: 'text-emerald-400 bg-emerald-400/10',
    blue: 'text-blue-400 bg-blue-400/10',
    purple: 'text-purple-400 bg-purple-400/10',
    orange: 'text-orange-400 bg-orange-400/10',
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors group">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>
      <div className="text-base font-bold text-white tracking-tight leading-tight mb-1">{value}</div>
      <div className="text-xs text-slate-400 font-medium tracking-wide">{label}</div>
    </div>
  );
};