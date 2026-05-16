import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { BlogPostPreview } from '../../types';

const tagColors: Record<string, string> = {
  security: 'bg-rose-950/60 text-rose-300 border-rose-800/50',
  cors: 'bg-orange-950/60 text-orange-300 border-orange-800/50',
  web: 'bg-sky-950/60 text-sky-300 border-sky-800/50',
  backend: 'bg-slate-900/60 text-slate-300 border-slate-700/50',
  postgresql: 'bg-blue-950/60 text-blue-300 border-blue-800/50',
  kafka: 'bg-orange-950/60 text-orange-300 border-orange-800/50',
  performance: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50',
  python: 'bg-amber-950/60 text-amber-300 border-amber-800/50',
  redis: 'bg-red-950/60 text-red-300 border-red-800/50',
  internals: 'bg-violet-950/60 text-violet-300 border-violet-800/50',
  websockets: 'bg-purple-950/60 text-purple-300 border-purple-800/50',
  architecture: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/50',
  fastapi: 'bg-teal-950/60 text-teal-300 border-teal-800/50',
};

const tagGradients: Record<string, string> = {
  postgresql: 'from-blue-600 via-blue-800 to-indigo-900',
  internals: 'from-violet-600 via-purple-800 to-indigo-900',
  performance: 'from-emerald-500 via-green-700 to-teal-900',
  python: 'from-amber-500 via-orange-600 to-orange-900',
  fastapi: 'from-teal-500 via-emerald-700 to-cyan-900',
  kafka: 'from-orange-500 via-red-600 to-rose-900',
  websockets: 'from-purple-600 via-violet-700 to-indigo-900',
  architecture: 'from-cyan-500 via-sky-700 to-blue-900',
  redis: 'from-red-500 via-rose-700 to-red-900',
  security: 'from-rose-600 via-red-700 to-rose-900',
  cors: 'from-amber-500 via-orange-600 to-red-900',
  web: 'from-sky-500 via-blue-700 to-indigo-900',
  backend: 'from-slate-500 via-slate-700 to-slate-900',
};

function gradient(tags: string[]) {
  for (const t of tags) if (tagGradients[t]) return tagGradients[t];
  return 'from-slate-700 via-slate-800 to-slate-900';
}

function tagClass(tag: string) {
  return tagColors[tag] ?? 'bg-slate-900/60 text-slate-300 border-slate-700/50';
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface BlogPreviewProps {
  posts: BlogPostPreview[];
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  const gridClass =
    posts.length === 1
      ? 'max-w-sm'
      : posts.length === 2
        ? 'grid md:grid-cols-2 max-w-2xl'
        : 'grid md:grid-cols-2 lg:grid-cols-3';

  return (
    <section id="blog" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Faint emerald glow top-right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase mb-2">Writing</p>
            <h2 className="text-3xl font-bold text-white">From the Blog</h2>
          </div>
          <a
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-400 font-medium transition-colors group"
          >
            View all posts
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <div className={`gap-5 ${gridClass}`}>
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]"
            >
              {/* Thumbnail */}
              <div className="h-48 overflow-hidden flex-shrink-0 relative">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`bg-gradient-to-br ${gradient(post.tags)} w-full h-full flex items-center justify-center relative`}>
                    {/* grid overlay */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-${post.slug}`} width="32" height="32" patternUnits="userSpaceOnUse">
                          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-${post.slug})`} />
                    </svg>
                    <BookOpen size={36} strokeWidth={0.8} className="text-white/20 relative z-10" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 bg-white/[0.02]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${tagClass(t)}`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 mt-auto">
                  <span className="text-xs text-slate-600">
                    {fmtDate(post.publishedAt)} · {post.readingTime} min read
                  </span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
          >
            View all posts <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
