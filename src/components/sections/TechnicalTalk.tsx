import React from 'react';
import { YouTubeEmbed } from '../ui/YouTubeEmbed';
import { Play, MapPin, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export const TechnicalTalk: React.FC = () => {
  const topics = [
    'What MVCC actually means and why it matters',
    'How Postgres stores and manages data (pages, blocks & shared buffers)',
    'What happens under the hood when you INSERT, UPDATE, or DELETE',
    'WAL and its role in recovery processes',
    'System columns, Commit logs, and Isolation levels',
    'How indexing works (and why HOT vs. non-HOT updates matter)',
    'Auto VACUUM vs. VACUUM FULL operations'
  ];

  return (
    <section id="talk" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wMykiLz48L3N2Zz4=')] opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            Featured Technical Presentation
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            Mastering MVCC in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mt-2">
              PostgreSQL
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl font-light">
            The Hidden Engine Behind Your Transactions - Hyderabad PostgreSQL Days 2025
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Meta Info Bar */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-600 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-emerald-600" />
                <span className="font-medium">August 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" />
                <span>Hyderabad, India</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-slate-700 leading-relaxed">
                Delivered my inaugural technical presentation at <span className="text-slate-900 font-bold">Hyderabad PG Days 2025</span>,
                engaging with the PostgreSQL community and sharing insights on database internals from a developer's perspective.
              </p>
              <p className="text-slate-600 leading-relaxed">
                An in-depth exploration of PostgreSQL's Multi-Version Concurrency Control system,
                covering the fundamental mechanisms that enable PostgreSQL's renowned reliability and performance.
              </p>
            </div>

            {/* Topics Grid */}
            <div>
              <h3 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">Talk Coverage</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {topics.slice(0, 6).map((topic, idx) => (
                  <div key={idx} className="group flex items-start gap-3 p-3 rounded-lg bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="text-emerald-700 group-hover:text-emerald-600 font-mono text-xs mt-0.5 font-bold transition-colors">0{idx + 1}</span>
                    <span className="text-slate-600 text-sm leading-snug group-hover:text-slate-900 transition-colors">{topic}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                <span className="text-emerald-700 font-mono text-xs mr-3 font-bold">07</span>
                <span className="text-slate-600 text-sm">{topics[6]}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                href="https://www.youtube.com/watch?v=-thlzArJhMc"
                external
                icon={Play}
                className="bg-red-600 hover:bg-red-700 text-white border-0 px-8 py-3 text-base font-medium shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all"
              >
                Watch Full Presentation
              </Button>
            </div>
          </div>

          {/* Right Column - Media Stack */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            {/* Video Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000" />
              <div className="relative aspect-video bg-white rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
                <YouTubeEmbed
                  videoId="-thlzArJhMc"
                  title="Mastering MVCC in PostgreSQL - Technical Talk"
                />
                {/* Platform Badge */}
                <div className="absolute top-3 right-3 pointer-events-none bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium border border-white/20 flex items-center gap-2 z-10">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  YouTube
                </div>
              </div>
            </div>

            {/* Event Photos - Reorganized Layout */}
            <div className="space-y-3">
              {/* Row 1: Presenting & Event (2 columns) */}
              <div className="grid grid-cols-2 gap-3">
                {/* Photo 1 - Presenting */}
                <div className="group relative aspect-square rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src="images/talk.jpeg"
                    alt="Presenting at Hyderabad PG Days"
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/0 to-slate-900/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-3">
                    <span className="text-white text-xs font-medium">Presenting</span>
                  </div>
                </div>

                {/* Photo 2 - Event */}
                <div className="group relative aspect-square rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src="images/talk2.jpeg"
                    alt="Event venue at Hyderabad PG Days"
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/0 to-slate-900/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-3">
                    <span className="text-white text-xs font-medium">Event</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Audience (Full width panoramic) */}
              <div className="group relative aspect-[21/9] rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="images/talk3.jpg"
                  alt="Audience at Hyderabad PG Days"
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-slate-900/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-4">
                  <div>
                    <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">Community</p>
                    <p className="text-white text-sm font-medium">Engaging with database engineers and architects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Caption */}
            {/* <p className="text-xs text-slate-500 text-center font-medium pt-1">
              Connecting with the PostgreSQL community at Hyderabad's premier database conference
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};