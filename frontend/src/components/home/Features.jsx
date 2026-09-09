import { motion } from 'framer-motion';
import { useRef } from 'react';

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Self-Hosted Judge',
    desc: 'We run Judge0 ourselves. No third-party execution APIs. Every submission runs in a real Docker sandbox on our infrastructure — not a vendor call.',
    tag: 'Execution Engine',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Real-Time Contests',
    desc: 'Live Elo-rated contests with ICPC and Codeforces scoring modes. Redis-powered leaderboards update instantly. Your rating history plotted beautifully.',
    tag: 'Competitive',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Real-World Problems',
    desc: 'A category no other platform has. Mock flaky APIs, dirty data pipelines, race condition scenarios. Test production thinking, not just algorithm recall.',
    tag: 'Unique',
    highlight: true,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M9.5 3H5a2 2 0 00-2 2v4.5M9.5 3l5 5M9.5 3v5h5M9.5 8H21m0 0v13H3v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'AI Hint System',
    desc: 'Stuck? Get a directional hint from an AI mentor that never gives away the answer. Streamed in real-time, gated by coins to keep it intentional.',
    tag: 'AI',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Streak & Coins Economy',
    desc: 'Daily streaks, coin rewards for solving problems, and a full audit ledger. Spend coins on hints and editorials. Engagement loops that actually work.',
    tag: 'Gamification',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Monaco Code Editor',
    desc: 'The same editor powering VS Code. Syntax highlighting, autocomplete, multi-language support. Auto-saves your code per problem per language.',
    tag: 'Editor',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeatureCard = ({ feature }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl p-6 cursor-default"
      style={{
        background: feature.highlight
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.025)',
        border: feature.highlight
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.3s, background 0.3s',
        overflow: 'hidden',
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.04), transparent 70%)`,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.8)',
            flexShrink: 0,
          }}
        >
          {feature.icon}
        </div>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px 10px',
            borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {feature.tag}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 17,
          color: '#fff',
          letterSpacing: '-0.02em',
          marginBottom: 10,
        }}
      >
        {feature.title}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        {feature.desc}
      </p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" style={{ padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            Features
          </span>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-0.04em',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Everything serious
            <br />
            programmers need
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 17,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Built from the ground up for competitive programming — not bolted on as an afterthought.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
