import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section
      id="cta"
      style={{
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: 800,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 60%, transparent)',
        }}
      />

      {/* Radial glow behind content */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 28 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
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
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                display: 'inline-block',
              }}
            />
            Free to start · No credit card
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '-0.05em',
            color: '#fff',
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          Ready to
          <br />
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>level up?</span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.6,
            maxWidth: 480,
            margin: '0 auto 40px',
          }}
        >
          Join 180,000+ engineers already grinding on KyroCode.
          Your first 500 problems are free.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="/register"
            id="cta-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              color: '#000',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 16,
              padding: '15px 32px',
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              boxShadow: '0 0 40px rgba(255,255,255,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e5e5';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Coding Free
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/problems"
            id="cta-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              padding: '15px 28px',
              borderRadius: 12,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'color 0.2s, border-color 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Browse Problems
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {[
            'No credit card required',
            '2,400+ problems',
            'Real execution engine',
          ].map((item) => (
            <span
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path d="M5 12l5 5L20 7" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
