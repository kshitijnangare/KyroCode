import { useState } from 'react';
import { motion } from 'framer-motion';

const PLANS = [
  {
    id: 'free',
    name: 'Community',
    desc: 'For aspiring engineers building fundamental algorithmic discipline.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: 'Get Started Free',
    ctaHref: '/register',
    highlighted: false,
    features: [
      '500+ curated DSA problems',
      'Judge0 Docker sandboxed execution',
      'Public profile & GitHub-style heatmap',
      'Weekly rated contests & ICPC scoreboard',
      'Standard language support (C++, Python, Java)',
    ],
    limitations: [
      'Real-world system challenge scenarios',
      'Deep AI hint mentorship',
      'Complete editorial breakdowns',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Engineer',
    desc: 'For serious developers aiming for top-tier tech and contest mastery.',
    monthlyPrice: 9,
    yearlyPrice: 7,
    cta: 'Upgrade to Pro',
    ctaHref: '/register?plan=pro',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Complete 2,400+ problem library',
      'Real-world production engineering track',
      'Contextual AI hints without spoilers',
      'All hidden test cases & stress datasets',
      'Full verified editorial solutions',
      'Priority execution queue during contests',
      'Codolio-compatible portfolio stats sync',
    ],
    limitations: [],
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="w-full py-20 sm:py-28 bg-black flex flex-col items-center border-t border-zinc-900">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Invest in real engineering skill.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mb-8">
            No surprise tier limits. Start completely free and scale when you need the full arsenal.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-zinc-950 border border-zinc-800">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !isYearly
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                isYearly
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 text-[10px] font-bold">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                  plan.highlighted
                    ? 'bg-zinc-950 border-zinc-700 shadow-2xl shadow-black/80 hover:border-zinc-500'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Popular Pill Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-black text-[11px] font-bold tracking-wide uppercase shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-400 font-normal leading-relaxed mb-6 min-h-[40px]">
                    {plan.desc}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {price === 0 ? '$0' : `$${price}`}
                    </span>
                    <span className="text-sm text-zinc-500 font-normal">
                      / month {isYearly && price > 0 ? '(billed annually)' : ''}
                    </span>
                  </div>

                  {/* CTA button */}
                  <a
                    href={plan.ctaHref}
                    id={`pricing-cta-${plan.id}`}
                    className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-all duration-200 block mb-8 ${
                      plan.highlighted
                        ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {plan.cta}
                  </a>

                  {/* Included features */}
                  <div className="space-y-3 pt-6 border-t border-zinc-900">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      What's included:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                        <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}

                    {/* Excluded features if any */}
                    {plan.limitations.map((limit, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-zinc-600 line-through">
                        <svg className="w-4 h-4 text-zinc-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{limit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
