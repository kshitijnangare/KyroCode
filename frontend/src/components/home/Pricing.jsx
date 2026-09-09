import { useState } from 'react';
import { motion } from 'framer-motion';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    desc: 'For individual coders starting their journey',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: 'Get Started Free',
    ctaHref: '/register',
    highlighted: false,
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: {
      overview: ['Access to 500+ problems', 'Practice mode submissions', '3 languages supported'],
      highlights: [
        { label: 'Sample test cases only', included: true },
        { label: 'Public profile & heatmap', included: true },
        { label: 'Participate in contests', included: true },
        { label: 'AI hint system', included: false },
        { label: 'Editorials & solutions', included: false },
        { label: 'Real-World Problems', included: false },
      ],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'For serious coders who want every edge',
    monthlyPrice: 8,
    yearlyPrice: 6,
    cta: 'Start Pro',
    ctaHref: '/register?plan=pro',
    highlighted: true,
    badge: 'Most Popular',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: {
      overview: ['All 2,400+ problems', 'All languages incl. Go, Rust', 'Unlimited submissions'],
      highlights: [
        { label: 'All hidden test cases visible', included: true },
        { label: 'AI hint system (unlimited)', included: true },
        { label: 'Full editorial access', included: true },
        { label: 'Real-World Problems category', included: true },
        { label: 'Priority contest queue', included: true },
        { label: 'Custom profile badge', included: true },
      ],
    },
  },
];

const CheckIcon = ({ included }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    {included ? (
      <>
        <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.08)" />
        <path d="M5 8l2.5 2.5L11 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.03)" />
        <path d="M6 6l4 4M10 6l-4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const PlanCard = ({ plan, isYearly }) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background: plan.highlighted ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.025)',
        border: plan.highlighted
          ? '1px solid rgba(255,255,255,0.2)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '32px',
        flex: 1,
        maxWidth: 400,
      }}
    >
      {/* Recommended badge */}
      {plan.badge && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff',
            color: '#000',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.04em',
            padding: '4px 14px',
            borderRadius: 100,
            whiteSpace: 'nowrap',
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: 20,
        }}
      >
        {plan.icon}
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: 24,
          color: '#fff',
          letterSpacing: '-0.03em',
          marginBottom: 6,
        }}
      >
        {plan.name}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: 'rgba(255,255,255,0.4)',
          marginBottom: 24,
          lineHeight: 1.5,
        }}
      >
        {plan.desc}
      </p>

      {/* Price */}
      <div style={{ marginBottom: 24 }}>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 48,
            color: '#fff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {price === 0 ? 'Free' : `$${price}`}
        </span>
        {price > 0 && (
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              color: 'rgba(255,255,255,0.4)',
              marginLeft: 4,
            }}
          >
            / month
          </span>
        )}
        {isYearly && price > 0 && (
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              marginTop: 4,
            }}
          >
            billed annually · save 25%
          </div>
        )}
      </div>

      {/* CTA Button */}
      <a
        href={plan.ctaHref}
        id={`pricing-cta-${plan.id}`}
        style={{
          display: 'block',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 15,
          color: plan.highlighted ? '#000' : '#fff',
          background: plan.highlighted ? '#fff' : 'transparent',
          border: plan.highlighted ? 'none' : '1px solid rgba(255,255,255,0.15)',
          padding: '13px 24px',
          borderRadius: 10,
          textDecoration: 'none',
          marginBottom: 28,
          transition: 'background 0.2s, transform 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = plan.highlighted ? '#e5e5e5' : 'rgba(255,255,255,0.06)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = plan.highlighted ? '#fff' : 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {plan.cta}
      </a>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24 }}>
        {/* Overview */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Overview
        </p>
        {plan.features.overview.map((f) => (
          <div
            key={f}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            <CheckIcon included={true} />
            {f}
          </div>
        ))}

        {/* Highlights */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginTop: 20,
            marginBottom: 12,
          }}
        >
          Highlights
        </p>
        {plan.features.highlights.map((f) => (
          <div
            key={f.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: f.included ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
              textDecoration: f.included ? 'none' : 'line-through',
            }}
          >
            <CheckIcon included={f.included} />
            {f.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" style={{ padding: '120px 0' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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
            Pricing
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
            Simple, transparent pricing
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 32,
            }}
          >
            Switch between monthly and yearly billing anytime.
          </p>

          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: !isYearly ? '#fff' : 'rgba(255,255,255,0.4)',
                fontWeight: !isYearly ? 600 : 400,
              }}
            >
              Monthly
            </span>
            <button
              id="pricing-toggle"
              onClick={() => setIsYearly((v) => !v)}
              aria-label="Toggle billing period"
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                background: isYearly ? '#fff' : 'rgba(255,255,255,0.12)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.3s',
                flexShrink: 0,
              }}
            >
              <motion.div
                animate={{ x: isYearly ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: 2,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: isYearly ? '#000' : '#fff',
                }}
              />
            </button>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: isYearly ? '#fff' : 'rgba(255,255,255,0.4)',
                fontWeight: isYearly ? 600 : 400,
              }}
            >
              Yearly
            </span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#22c55e',
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  padding: '2px 8px',
                  borderRadius: 100,
                }}
              >
                Save 25%
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
