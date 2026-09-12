import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section id="cta" className="w-full py-24 sm:py-32 bg-black flex flex-col items-center border-t border-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_70%)] blur-2xl" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Tag badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Zero Cost To Start</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Ready to test your true engineering limits?
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto mb-10 text-balance">
          Join 180,000+ engineers solving DSA problems, production engineering scenarios, and climbing Elo leaderboards.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <a
            href="/register"
            id="cta-primary"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span>Start Solving Free</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="/problems"
            id="cta-secondary"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 text-sm font-medium transition-all"
          >
            Explore Problem Catalog
          </a>
        </div>

        {/* Trust bullet points */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant Docker execution</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>Public portfolio API</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
