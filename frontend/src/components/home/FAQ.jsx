import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Is KyroCode genuinely free to use for practice?',
    a: 'Yes. The Community plan gives full access to 500+ algorithmic problems, real-time Docker sandboxed execution, rated weekly contests, and public profile heatmaps. No credit card or trial period required.',
  },
  {
    q: 'How does self-hosted Judge0 execution work under the hood?',
    a: "Unlike platforms relying on throttled third-party APIs, we deploy Judge0 on dedicated Linux clusters with isolated ephemeral Docker sandboxes. Submissions are protected by strict cgroup resource constraints and real-time process limits.",
  },
  {
    q: 'What distinguishes "Real-World Problems" from typical DSA puzzles?',
    a: 'Typical DSA focuses on isolated algorithms. Our Real-World track challenges you with production engineering scenarios: implementing exponential backoff retries, resolving concurrency races with Mutexes, and safely parsing corrupted JSON webhooks.',
  },
  {
    q: 'How are contest ratings calculated?',
    a: 'We implement the standard Elo competitive rating formula with calibrated K-factors (32 for emerging ratings, 16 for masters). Your rating updates live based on your rank relative to the expected performance of other competitors.',
  },
  {
    q: 'Does the AI hint mentor ever give away code solutions?',
    a: 'No. The AI is prompt-engineered as a senior staff engineer conducting a pair interview. It identifies high-level algorithmic edge cases and logical fallacies without pasting code, preserving the learning curve.',
  },
  {
    q: 'Can I connect my KyroCode stats to third-party developer profiles like Codolio?',
    a: 'Yes. We provide an open, standardized REST API (/api/v1/users/:username/stats) allowing any developer portfolio aggregator to sync your solved difficulties, streak count, and Elo history.',
  },
  {
    q: 'What happens to my earned coins if I cancel a Pro subscription?',
    a: 'All earned coins remain permanently in your account ledger. You can continue redeeming them for editorials and community unlocks anytime.',
  },
];

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800/80 last:border-b-0">
      <button
        type="button"
        id={`faq-${index}`}
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left gap-4 group focus:outline-none"
      >
        <span className="text-base sm:text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">
          {item.q}
        </span>
        <div className={`w-7 h-7 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${open ? 'rotate-45 bg-zinc-800 text-white' : 'bg-zinc-900/60 text-zinc-400 group-hover:text-white'}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed pb-6 pt-1">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="w-full py-20 sm:py-28 bg-black flex flex-col items-center border-t border-zinc-900">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Everything you need to know.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Have questions about Judge0 sandboxing, ratings, or account tiers? Find answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-6 sm:p-8 divide-y divide-zinc-850 shadow-xl">
          {FAQS.map((item, idx) => (
            <FaqItem key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
