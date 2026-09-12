import { motion } from 'framer-motion';

const COMPANIES = [
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'Apple',
  'Stripe',
  'Uber',
  'Razorpay',
  'Atlassian',
  'Swiggy',
];

const Companies = () => {
  return (
    <section className="w-full py-12 sm:py-16 border-y border-zinc-900 bg-black overflow-hidden relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Engineers practicing on KyroCode work at world-class companies
        </p>
      </div>

      {/* Marquee with left/right fade masks */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Continuous ticker track */}
        <motion.div
          className="flex items-center gap-12 sm:gap-16 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...COMPANIES, ...COMPANIES].map((name, idx) => (
            <div
              key={idx}
              className="flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-default select-none"
            >
              <span className="font-semibold text-lg sm:text-xl tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Companies;
