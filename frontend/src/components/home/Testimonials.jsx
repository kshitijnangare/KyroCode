import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "KyroCode's Real-World Problems category is a game changer. First platform where I felt like I was actually solving engineering challenges, not just grinding leetcode patterns.",
    name: 'Aryan Mehta',
    role: 'SDE Intern @ Google',
    initials: 'AM',
    color: '#6366f1',
  },
  {
    quote: "The Elo rating system and live leaderboards during contests made every submission feel high-stakes. The adrenaline is unmatched. Easily the best contest experience I've had.",
    name: 'Priya Sharma',
    role: 'CS final year @ IIT Bombay',
    initials: 'PS',
    color: '#8b5cf6',
  },
  {
    quote: "The Monaco editor with per-language code autosave is something I didn't know I needed. Switching between problems mid-contest without losing context is huge.",
    name: 'Rohan Verma',
    role: 'Backend Dev @ Razorpay',
    initials: 'RV',
    color: '#0ea5e9',
  },
  {
    quote: "Finally — a hint system that doesn't just dump the solution on you. The AI gives you one nudge, and the satisfaction of figuring the rest out yourself is intact.",
    name: 'Sneha Kulkarni',
    role: 'Competitive Programmer, ICPC regionals',
    initials: 'SK',
    color: '#10b981',
  },
  {
    quote: "The self-hosted judge means zero BS rate limits. I've submitted 200+ times in a single session stress testing edge cases. The platform handles it without blinking.",
    name: 'Karan Joshi',
    role: 'DSA mentor, 1800+ rated on CF',
    initials: 'KJ',
    color: '#f59e0b',
  },
  {
    quote: "Streak + coins system actually got me to solve problems daily for 30 days straight. The gamification is subtle but effective. My consistency improved a lot.",
    name: 'Anika Reddy',
    role: 'Placement prep @ NIT Trichy',
    initials: 'AR',
    color: '#ec4899',
  },
];

const TestimonialCard = ({ t, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16,
      padding: '24px',
      marginBottom: 16,
      transition: 'border-color 0.3s',
    }}
    whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
  >
    {/* Quote mark */}
    <div
      style={{
        fontFamily: 'Georgia, serif',
        fontSize: 48,
        lineHeight: 0.7,
        color: 'rgba(255,255,255,0.08)',
        marginBottom: 12,
        userSelect: 'none',
      }}
    >
      "
    </div>

    {/* Quote text */}
    <p
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.7,
        color: 'rgba(255,255,255,0.65)',
        marginBottom: 20,
      }}
    >
      {t.quote}
    </p>

    {/* Author */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `${t.color}22`,
          border: `1.5px solid ${t.color}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 12,
            color: t.color,
          }}
        >
          {t.initials}
        </span>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 13,
            color: '#fff',
          }}
        >
          {t.name}
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          {t.role}
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  // Split into 3 columns
  const col1 = [TESTIMONIALS[0], TESTIMONIALS[3]];
  const col2 = [TESTIMONIALS[1], TESTIMONIALS[4]];
  const col3 = [TESTIMONIALS[2], TESTIMONIALS[5]];

  return (
    <section id="testimonials" style={{ padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            Testimonials
          </span>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(30px, 5vw, 50px)',
              letterSpacing: '-0.04em',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            What our users say
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            From students to industry engineers — here's what they think.
          </p>
        </motion.div>

        {/* Masonry 3-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          <div>{col1.map((t, i) => <TestimonialCard key={t.name} t={t} delay={i * 0.1} />)}</div>
          <div style={{ paddingTop: 32 }}>{col2.map((t, i) => <TestimonialCard key={t.name} t={t} delay={0.1 + i * 0.1} />)}</div>
          <div>{col3.map((t, i) => <TestimonialCard key={t.name} t={t} delay={0.2 + i * 0.1} />)}</div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
