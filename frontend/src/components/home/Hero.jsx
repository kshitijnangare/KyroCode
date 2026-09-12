import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CODE_SNIPPETS = [
  {
    lang: 'python',
    label: 'Python 3',
    filename: 'two_sum.py',
    lines: [
      { t: 'keyword', v: 'def ' },
      { t: 'fn', v: 'two_sum' },
      { t: 'plain', v: '(nums: list[int], target: int) -> list[int]:' },
      { t: 'break' },
      { t: 'plain', v: '    lookup = {}' },
      { t: 'break' },
      { t: 'keyword', v: '    for ' },
      { t: 'plain', v: 'i, num ' },
      { t: 'keyword', v: 'in ' },
      { t: 'fn', v: 'enumerate' },
      { t: 'plain', v: '(nums):' },
      { t: 'break' },
      { t: 'plain', v: '        diff = target - num' },
      { t: 'break' },
      { t: 'keyword', v: '        if ' },
      { t: 'plain', v: 'diff ' },
      { t: 'keyword', v: 'in ' },
      { t: 'plain', v: 'lookup:' },
      { t: 'break' },
      { t: 'keyword', v: '            return ' },
      { t: 'plain', v: '[lookup[diff], i]' },
      { t: 'break' },
      { t: 'plain', v: '        lookup[num] = i' },
    ],
  },
  {
    lang: 'cpp',
    label: 'C++ 20',
    filename: 'two_sum.cpp',
    lines: [
      { t: 'keyword', v: 'vector' },
      { t: 'plain', v: '<int> ' },
      { t: 'fn', v: 'twoSum' },
      { t: 'plain', v: '(vector<int>& nums, int target) {' },
      { t: 'break' },
      { t: 'plain', v: '    unordered_map<int, int> seen;' },
      { t: 'break' },
      { t: 'keyword', v: '    for ' },
      { t: 'plain', v: '(int i = 0; i < nums.size(); ++i) {' },
      { t: 'break' },
      { t: 'plain', v: '        int complement = target - nums[i];' },
      { t: 'break' },
      { t: 'keyword', v: '        if ' },
      { t: 'plain', v: '(seen.count(complement)) ' },
      { t: 'keyword', v: 'return ' },
      { t: 'plain', v: '{seen[complement], i};' },
      { t: 'break' },
      { t: 'plain', v: '        seen[nums[i]] = i;' },
      { t: 'break' },
      { t: 'plain', v: '    }' },
      { t: 'break' },
      { t: 'keyword', v: '    return ' },
      { t: 'plain', v: '{};' },
      { t: 'break' },
      { t: 'plain', v: '}' },
    ],
  },
];

const colorMap = {
  keyword: '#f43f5e',
  fn: '#60a5fa',
  plain: '#e4e4e7',
};

const STATS = [
  { value: '2,400+', label: 'DSA & System Problems' },
  { value: '180K+', label: 'Engineers Competing' },
  { value: '12M+', label: 'Docker Sandboxed Runs' },
  { value: '99.9%', label: 'Engine Uptime' },
];

const Hero = () => {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [typing, setTyping] = useState(true);

  const snippet = CODE_SNIPPETS[snippetIdx];

  useEffect(() => {
    setDisplayedLines([]);
    setTyping(true);
    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < snippet.lines.length) {
        setDisplayedLines((prev) => [...prev, snippet.lines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(interval);
        setTyping(false);
        setTimeout(() => {
          setSnippetIdx((i) => (i + 1) % CODE_SNIPPETS.length);
        }, 3200);
      }
    }, 75);
    return () => clearInterval(interval);
  }, [snippetIdx]);

  const renderCode = () => {
    const rows = [];
    let current = [];

    displayedLines.forEach((token, i) => {
      if (!token) return;
      if (token.t === 'break') {
        rows.push(
          <div key={i} className="min-h-[1.5rem]">
            {current.length ? current : <span>&nbsp;</span>}
          </div>
        );
        current = [];
      } else {
        current.push(
          <span key={i} style={{ color: colorMap[token.t] || '#e4e4e7' }}>
            {token.v}
          </span>
        );
      }
    });

    if (current.length) {
      rows.push(
        <div key="last" className="min-h-[1.5rem]">
          {current}
          {typing && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-white/90 align-middle ml-1 rounded-[1px]"
            />
          )}
        </div>
      );
    }

    return rows;
  };

  return (
    <section className="w-full relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-black flex flex-col items-center">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_70%)]" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Human, modern copy */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm text-xs font-medium text-zinc-300 mb-6 hover:border-zinc-700 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real Docker sandboxes · No fake APIs</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Code with purpose.
              <br />
              <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                Compete for real.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl mb-8 text-balance">
              The competitive coding ecosystem crafted for engineers who care about clean code, real Elo ratings, and production scenarios beyond basic DSA algorithms.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-12">
              <a
                href="/register"
                id="hero-cta-primary"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              >
                <span>Start Solving Free</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#features"
                id="hero-cta-secondary"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 text-sm font-medium transition-all text-center"
              >
                Explore Features
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-zinc-900 w-full">
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-500 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Editor Mock */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800/80 bg-zinc-950/90 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden group">
              {/* Contest Live floating badge - safely pinned relative to editor card */}
              <div className="absolute top-3.5 right-4 z-20 flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>Live Contest #42</span>
              </div>

              {/* Window Title Bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/70 bg-zinc-900/40">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="flex-1 text-center font-mono text-xs text-zinc-500 pr-16">
                  {snippet.filename}
                </div>
              </div>

              {/* Problem Metadata Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/20 border-b border-zinc-800/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-200">1. Two Sum</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                    Easy
                  </span>
                </div>
                <div className="font-mono text-[11px] text-zinc-400">
                  {snippet.label}
                </div>
              </div>

              {/* Code Workspace */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[220px] text-zinc-300 bg-black/40 overflow-x-auto">
                {renderCode()}
              </div>

              {/* Real-time Execution Verdict Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-t border-zinc-800/70 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Accepted</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500 font-mono text-[11px]">
                  <span>Runtime: <strong className="text-zinc-300 font-normal">38 ms</strong></span>
                  <span>Memory: <strong className="text-zinc-300 font-normal">17.8 MB</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;