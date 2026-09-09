import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Is KyroCode really free to start?',
    a: 'Yes. The free plan gives you access to 500+ problems, contest participation, a public profile with heatmap, and our core editor. No credit card required. Upgrade to Pro when you want the full arsenal.',
  },
  {
    q: 'How is the code execution engine different from LeetCode?',
    a: "We self-host Judge0 on our own servers. This means no rate limits from a third-party API, real Docker sandboxing, and you can submit as many times as you want. We don't pay per-execution — you don't get throttled during contests.",
  },
  {
    q: 'What are "Real-World Problems"?',
    a: 'A unique category where you solve production engineering scenarios — mock flaky API retries, parsing dirty data pipelines, handling race conditions with shared state. Problems that test if you can write production-grade code, not just recite patterns.',
  },
  {
    q: 'How does the Elo rating system work?',
    a: 'After each rated contest, your rating changes based on your rank relative to your expected performance. Outperform your expected rank → gain rating. Underperform → lose rating. K-factor is 32 for ratings below 1800, 16 above. Same model used by competitive chess.',
  },
  {
    q: 'What happens to my coins if I cancel Pro?',
    a: 'Your coins stay. They are stored in an immutable ledger tied to your account. If you downgrade to free, you can still spend any coins you already earned. You just won\'t earn at the Pro rate anymore.',
  },
  {
    q: 'Can I use KyroCode stats on my portfolio (e.g., Codolio)?',
    a: 'Yes. We expose a public Codolio-compatible stats API at /api/v1/users/:username/stats. Any portfolio aggregator can pull your KyroCode stats — problems solved by difficulty, rating, streak, and contest history.',
  },
  {
    q: 'Does the AI hint system give away the solution?',
    a: "Never. The AI is instructed to act as a coding mentor — it identifies what is conceptually wrong with your approach and gives one directional nudge. Maximum 3 sentences. It will not write code for you. After 3 hints per problem, you can purchase 5 more with coins.",
  },
];

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <button
        id={`faq-${index}`}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 16,
            color: open ? '#fff' : 'rgba(255,255,255,0.75)',
            transition: 'color 0.2s',
            lineHeight: 1.4,
          }}
        >
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.45)',
                paddingBottom: 20,
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" style={{ padding: '120px 0' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '5px 14px',
              borderRadius: 100,
              marginBottom: 20,
            }}
          >
            FAQ
          </span>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.04em',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Frequently asked questions
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Everything you need to know about KyroCode.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div>
          {FAQS.map((item, i) => (
            <FaqItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
