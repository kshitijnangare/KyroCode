const FOOTER_LINKS = {
  Platform: [
    { label: 'Problem Catalog', href: '/problems' },
    { label: 'Real-World Track', href: '/problems?category=real-world' },
    { label: 'Rated Contests', href: '/contests' },
    { label: 'Global Leaderboard', href: '/leaderboard' },
    { label: 'Judge0 Sandboxing', href: '/docs/architecture' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Stats REST API', href: '/docs/api' },
    { label: 'Platform Status', href: '/status' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Product: [
    { label: 'Pricing Plans', href: '#pricing' },
    { label: 'Community Guidelines', href: '/guidelines' },
    { label: 'Open Source', href: 'https://github.com/kshitijnangare/KyroCode' },
    { label: 'Contact Support', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security Overview', href: '/security' },
  ],
};

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-zinc-900 pt-16 pb-12 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand info */}
          <div className="col-span-2 md:col-span-2">
            <a href="/" className="inline-flex items-center gap-2.5 mb-4 select-none">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm">
                K
              </div>
              <span className="font-semibold text-base text-white tracking-tight">
                KyroCode
              </span>
            </a>
            <p className="text-sm text-zinc-400 font-normal leading-relaxed max-w-sm mb-6">
              The next-generation competitive programming platform built with real Docker execution, live Elo ratings, and production challenges.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/kshitijnangare/KyroCode"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3">
              <h5 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                {category}
              </h5>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} KyroCode Inc. All rights reserved.</p>
          <p className="font-mono text-[11px] text-zinc-500">
            Crafted with precision by Kshitij Nangare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
