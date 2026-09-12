import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Problems', href: '#problems' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Floating pill container */}
        <div
          className={`w-full flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 border ${
            scrolled
              ? 'bg-zinc-950/80 backdrop-blur-xl border-zinc-800 shadow-2xl shadow-black/50'
              : 'bg-zinc-950/50 backdrop-blur-md border-zinc-800/60'
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-decoration-none group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm tracking-tight transition-transform group-hover:scale-105 shadow-sm">
              K
            </div>
            <span className="font-semibold text-base text-zinc-100 tracking-tight transition-colors group-hover:text-white">
              KyroCode
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white px-3.5 py-1.5 rounded-full transition-colors hover:bg-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-zinc-300 hover:text-white px-3.5 py-1.5 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="text-sm font-medium bg-white text-black hover:bg-zinc-200 px-4 py-1.5 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-zinc-950/95 border border-zinc-800/80 p-4 backdrop-blur-2xl shadow-2xl flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-1 border-t border-zinc-800/80 flex flex-col gap-2">
              <a
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-center text-zinc-300 hover:text-white py-2"
              >
                Sign In
              </a>
              <a
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-center bg-white text-black hover:bg-zinc-200 py-2 rounded-xl transition-colors font-semibold"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

