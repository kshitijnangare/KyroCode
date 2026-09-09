import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Problems', href: '#problems' },
  { label: 'Contests', href: '#contests' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'Pricing', href: '#pricing' },
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
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/* Main bar */}
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6"
        style={{ paddingTop: '12px', paddingBottom: '12px' }}
      >
        <div
          className="flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(10,10,10,0.85)'
              : 'rgba(10,10,10,0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.6)' : 'none',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 select-none"
            style={{ textDecoration: 'none' }}
          >
            {/* K icon */}
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 32,
                height: 32,
                background: '#fff',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 900,
                  fontSize: 18,
                  color: '#000',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                K
              </span>
            </div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 16,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              KyroCode
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: 8,
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255,255,255,0.6)';
                  e.target.style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '7px 16px',
                borderRadius: 8,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.7)')}
            >
              Sign in
            </a>
            <a
              href="/register"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 14,
                color: '#000',
                textDecoration: 'none',
                padding: '7px 18px',
                borderRadius: 8,
                background: '#fff',
                transition: 'background 0.2s, transform 0.15s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e5e5e5';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: '#fff',
                  borderRadius: 2,
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform:
                    mobileOpen
                      ? i === 0
                        ? 'translateY(6px) rotate(45deg)'
                        : i === 2
                        ? 'translateY(-6px) rotate(-45deg)'
                        : 'none'
                      : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl p-4"
              style={{
                background: 'rgba(10,10,10,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    padding: '10px 12px',
                    borderRadius: 8,
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href="/login"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '9px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#000',
                    textDecoration: 'none',
                    padding: '9px',
                    borderRadius: 8,
                    background: '#fff',
                  }}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
