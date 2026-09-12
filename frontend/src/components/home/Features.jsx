import { motion } from 'framer-motion';

const FEATURES = [
  {
    tag: 'Sandboxing',
    title: 'Self-Hosted Judge0 Engine',
    desc: 'Every single line of code executes in an isolated Docker container on bare-metal servers. No third-party API rate limits, no throttled queues.',
    badge: 'Zero Vendor Lock',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    tag: 'Live Contests',
    title: 'Elo Rating & Redis Leaderboards',
    desc: 'Experience real adrenaline with live sub-second leaderboard updates powered by Redis sorted sets. Elo recalculation runs automatically post-contest.',
    badge: 'Competitive Tier',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    tag: 'Industry First',
    title: 'Real-World Production Scenarios',
    desc: 'Tired of inversing binary trees? Solve real challenges: handle idempotency in payment queues, debounce telemetry, and parse malformed webhook feeds.',
    badge: 'Exclusive',
    highlight: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    tag: 'Mentorship',
    title: 'Contextual AI Hints Without Spoilers',
    desc: 'An AI mentor that inspects your failing test cases and explains logic gaps without blurting the solution. Teaches you how to reason independently.',
    badge: 'LLM Powered',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    tag: 'Gamification',
    title: 'Ledger-Backed Streak & Coin Economy',
    desc: 'Consistency is rewarded. Solve problems daily to earn coins, unlock verified editorials, and track proof of work on your public developer profile.',
    badge: 'Motivation Loop',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    tag: 'IDE Experience',
    title: 'Monaco Editor with Per-Language Autosave',
    desc: 'The exact editor engine powering VS Code with vim bindings, full intellisense, customized dark themes, and instant multi-language switching.',
    badge: 'VS Code Core',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full py-20 sm:py-28 bg-black flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">
            Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Engineered for developers who take code seriously.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Every feature is architected from scratch for high performance, accuracy, and true engineering growth.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 border flex flex-col justify-between ${
                feature.highlight
                  ? 'bg-zinc-900/40 border-zinc-700 hover:border-zinc-500 shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                  : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/20'
              }`}
            >
              <div>
                {/* Top header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200 group-hover:text-white group-hover:border-zinc-700 transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-zinc-900/70 border border-zinc-800/80">
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight mb-2.5 group-hover:text-zinc-100 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {feature.desc}
                </p>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center text-xs font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors">
                <span>{feature.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
