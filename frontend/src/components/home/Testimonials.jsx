import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote:
      "The Real-World Problems category bridges the massive gap between DSA puzzles and actual backend engineering. Handling race conditions and dirty webhooks in timed tests is brilliant.",
    name: 'Aryan Mehta',
    role: 'Software Engineer @ Google',
    initials: 'AM',
  },
  {
    quote:
      "Having our contests scored by live Elo ratings rather than simple submission timestamps completely changes the competitive dynamic. The adrenaline in the last 10 minutes is intense.",
    name: 'Priya Sharma',
    role: 'ICPC Regionalist · IIT Bombay',
    initials: 'PS',
  },
  {
    quote:
      "Self-hosted Judge0 without artificial rate limits allowed me to test stress scripts with 100+ submissions per hour. KyroCode didn't drop a single execution.",
    name: 'Rohan Verma',
    role: 'Backend Dev @ Razorpay',
    initials: 'RV',
  },
  {
    quote:
      "The AI hints give directional architectural nudges instead of pasting code snippets. That keeps the dopamine of truly solving problems intact.",
    name: 'Sneha Kulkarni',
    role: 'Competitive Programmer',
    initials: 'SK',
  },
  {
    quote:
      "Autosave per problem per language in Monaco editor saved my contest run when my browser tab crashed. Seamless recovery without losing state.",
    name: 'Karan Joshi',
    role: 'Platform Engineer @ Atlassian',
    initials: 'KJ',
  },
  {
    quote:
      "The Codolio-compatible public API makes showcasing verified KyroCode performance directly on my personal engineering portfolio effortless.",
    name: 'Anika Reddy',
    role: 'Core Member @ NIT Trichy ACM',
    initials: 'AR',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full py-20 sm:py-28 bg-black flex flex-col items-center border-t border-zinc-900">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">
            Community & Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Trusted by competitive coders & engineers.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Real feedback from software engineers, competitive programmers, and students preparing for production roles.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl p-6 sm:p-7 bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
            >
              <p className="text-sm sm:text-[15px] text-zinc-300 leading-relaxed font-normal mb-6">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
                <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-200">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
