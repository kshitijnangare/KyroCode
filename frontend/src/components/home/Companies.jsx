import { motion } from 'framer-motion';

// SVG logos for companies (using simple text-based logos for realism)
const COMPANIES = [
  {
    name: 'Google',
    logo: (
      <svg viewBox="0 0 74 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Google</text>
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    logo: (
      <svg viewBox="0 0 90 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Microsoft</text>
      </svg>
    ),
  },
  {
    name: 'Amazon',
    logo: (
      <svg viewBox="0 0 70 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Amazon</text>
      </svg>
    ),
  },
  {
    name: 'Razorpay',
    logo: (
      <svg viewBox="0 0 80 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Razorpay</text>
      </svg>
    ),
  },
  {
    name: 'Atlassian',
    logo: (
      <svg viewBox="0 0 88 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Atlassian</text>
      </svg>
    ),
  },
  {
    name: 'Flipkart',
    logo: (
      <svg viewBox="0 0 72 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Flipkart</text>
      </svg>
    ),
  },
  {
    name: 'Stripe',
    logo: (
      <svg viewBox="0 0 50 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Stripe</text>
      </svg>
    ),
  },
  {
    name: 'Swiggy',
    logo: (
      <svg viewBox="0 0 62 24" fill="none" height="20">
        <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="rgba(255,255,255,0.45)" y="20">Swiggy</text>
      </svg>
    ),
  },
];

const Companies = () => {
  return (
    <section
      style={{
        padding: '80px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          Our users work at
        </motion.p>

        {/* Scrolling marquee */}
        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Left fade */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 120,
              background: 'linear-gradient(to right, #000 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          {/* Right fade */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 120,
              background: 'linear-gradient(to left, #000 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Ticker track */}
          <motion.div
            style={{
              display: 'flex',
              gap: 60,
              width: 'max-content',
            }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '-0.02em',
                    transition: 'color 0.2s',
                  }}
                >
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
