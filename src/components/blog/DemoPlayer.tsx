import React, { useState, useEffect, useCallback } from 'react';

export type StepStatus = 'neutral' | 'success' | 'blocked' | 'warning';

export interface Step {
  label: string;
  panelType: 'terminal' | 'browser';
  content: string;
  status: StepStatus;
}

export interface Scenario {
  id: string;
  tab: string;
  steps: Step[];
  insight: string;
}

interface DemoPlayerProps {
  scenarios: Scenario[];
  title: string;
}

export function DemoPlayer({ scenarios, title }: DemoPlayerProps) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = scenarios[scenarioIdx];
  const step = scenario.steps[stepIdx];
  const isLast = stepIdx === scenario.steps.length - 1;

  const reset = useCallback((idx: number) => {
    setScenarioIdx(idx);
    setStepIdx(0);
    setIsPlaying(false);
  }, []);

  const next = useCallback(() => {
    if (!isLast) setStepIdx((s) => s + 1);
    else setIsPlaying(false);
  }, [isLast]);

  const prev = () => {
    if (stepIdx > 0) setStepIdx((s) => s - 1);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (isLast) {
      setIsPlaying(false);
      return;
    }
    const t = setTimeout(next, 1500);
    return () => clearTimeout(t);
  }, [isPlaying, stepIdx, isLast, next]);

  const panelBg =
    step.status === 'blocked'
      ? 'bg-[#160606]'
      : step.status === 'warning'
        ? 'bg-[#14100a]'
        : step.panelType === 'terminal'
          ? 'bg-[#060e06]'
          : 'bg-[#06060f]';

  const contentColor =
    step.status === 'blocked'
      ? 'text-red-300'
      : step.status === 'warning'
        ? 'text-amber-300'
        : step.panelType === 'terminal'
          ? 'text-emerald-300'
          : 'text-sky-300';

  const statusIcon =
    step.status === 'blocked' ? '✗' : step.status === 'success' ? '✓' : step.status === 'warning' ? '⚠' : '◉';

  const statusColor =
    step.status === 'blocked'
      ? 'text-red-400'
      : step.status === 'success'
        ? 'text-emerald-400'
        : step.status === 'warning'
          ? 'text-amber-400'
          : 'text-slate-400';

  const panelLabel = step.panelType === 'terminal' ? '⚡  Backend Terminal' : '🌐  Browser';

  return (
    <div className="not-prose my-8 rounded-2xl overflow-hidden border border-white/[0.09] font-mono text-sm">
      {/* Header */}
      <div className="bg-[#0c0c1a] px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-slate-500 text-[10px] uppercase tracking-widest font-sans">{title}</span>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#0a0a16] border-b border-white/[0.06] overflow-x-auto">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => reset(i)}
            className={`px-5 py-2.5 text-xs font-sans font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              i === scenarioIdx
                ? 'border-emerald-400 text-emerald-400 bg-emerald-400/5'
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      {/* Step label */}
      <div className="bg-[#0c0c1a] px-5 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className={`text-xs flex-shrink-0 ${statusColor}`}>{statusIcon}</span>
          <span className="text-slate-300 text-xs font-sans">
            <span className="text-slate-600 mr-1">
              {stepIdx + 1}/{scenario.steps.length}
            </span>
            {step.label}
          </span>
        </div>
      </div>

      {/* Content panel */}
      <div className={`${panelBg} min-h-52`}>
        <div className="px-5 pt-4 pb-1.5">
          <span className="text-[10px] uppercase tracking-widest text-slate-600 font-sans">{panelLabel}</span>
        </div>
        <pre className={`px-5 pb-6 text-xs leading-relaxed whitespace-pre-wrap break-words ${contentColor}`}>
          {step.content}
        </pre>
      </div>

      {/* Controls */}
      <div className="bg-[#0c0c1a] border-t border-white/[0.06] px-5 py-3 flex items-center justify-between">
        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {scenario.steps.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setStepIdx(i);
                setIsPlaying(false);
              }}
              title={`Step ${i + 1}: ${s.label}`}
              className={`rounded-full transition-all duration-200 hover:opacity-80 ${
                i === stepIdx
                  ? 'w-5 h-1.5 bg-emerald-400'
                  : i < stepIdx
                    ? s.status === 'blocked'
                      ? 'w-1.5 h-1.5 bg-red-500/70'
                      : s.status === 'warning'
                        ? 'w-1.5 h-1.5 bg-amber-500/70'
                        : 'w-1.5 h-1.5 bg-emerald-600/70'
                    : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            disabled={stepIdx === 0}
            className="text-slate-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed text-xs px-2 py-1.5 rounded transition-colors font-sans"
          >
            ← Prev
          </button>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs px-3 py-1.5 rounded-lg transition-colors font-sans font-medium mx-1"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={isLast ? () => { setStepIdx(0); setIsPlaying(false); } : next}
            className="text-slate-500 hover:text-white text-xs px-2 py-1.5 rounded transition-colors font-sans"
          >
            {isLast ? '↺ Restart' : 'Next →'}
          </button>
        </div>
      </div>

      {/* Insight — shown on last step */}
      {isLast && (
        <div className="bg-emerald-500/[0.06] border-t border-emerald-500/20 px-5 py-3.5">
          <p className="text-emerald-400/80 text-xs font-sans leading-relaxed">
            💡 {scenario.insight}
          </p>
        </div>
      )}
    </div>
  );
}
