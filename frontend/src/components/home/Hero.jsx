import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Animated code snippet that cycles through languages
const CODE_SNIPPETS = [
    {
        lang: 'python',
        label: 'Python',
        color: '#3b82f6',
        lines: [
            { t: 'keyword', v: 'def ' },
            { t: 'fn', v: 'twoSum' },
            { t: 'plain', v: '(nums, target):' },
            { t: 'break' },
            { t: 'plain', v: '    seen = {}' },
            { t: 'break' },
            { t: 'keyword', v: '    for ' },
            { t: 'plain', v: 'i, n ' },
            { t: 'keyword', v: 'in ' },
            { t: 'fn', v: 'enumerate' },
            { t: 'plain', v: '(nums):' },
            { t: 'break' },
            { t: 'keyword', v: '        if ' },
            { t: 'plain', v: 'target - n ' },
            { t: 'keyword', v: 'in ' },
            { t: 'plain', v: 'seen:' },
            { t: 'break' },
            { t: 'keyword', v: '            return ' },
            { t: 'plain', v: '[seen[target-n], i]' },
        ],
    },
    {
        lang: 'cpp',
        label: 'C++',
        color: '#8b5cf6',
        lines: [
            { t: 'keyword', v: 'vector' },
            { t: 'plain', v: '<int> ' },
            { t: 'fn', v: 'twoSum' },
            { t: 'plain', v: '(' },
            { t: 'keyword', v: 'vector' },
            { t: 'plain', v: '<int>& nums, ' },
            { t: 'keyword', v: 'int ' },
            { t: 'plain', v: 'target) {' },
            { t: 'break' },
            { t: 'plain', v: '  unordered_map<int,int> seen;' },
            { t: 'break' },
            { t: 'keyword', v: '  for ' },
            { t: 'plain', v: '(' },
            { t: 'keyword', v: 'int ' },
            { t: 'plain', v: 'i = 0; i < nums.size(); i++) {' },
            { t: 'break' },
            { t: 'keyword', v: '    if ' },
            { t: 'plain', v: '(seen.count(target - nums[i]))' },
            { t: 'break' },
            { t: 'keyword', v: '      return ' },
            { t: 'plain', v: '{seen[target-nums[i]], i};' },
        ],
    },
];

const colorMap = {
    keyword: '#c084fc',
    fn: '#60a5fa',
    plain: '#e2e8f0',
    string: '#86efac',
    num: '#fb923c',
};

const STATS = [
    { value: '2,400+', label: 'Problems' },
    { value: '180K+', label: 'Coders' },
    { value: '12M+', label: 'Submissions' },
    { value: '340+', label: 'Contests' },
];

const VERDICTS = [
    { label: 'Accepted', color: '#22c55e', runtime: '48ms', memory: '18.2 MB' },
];

const TypingCursor = () => (
    <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ display: 'inline-block', width: 2, height: '1em', background: '#fff', verticalAlign: 'middle', marginLeft: 2, borderRadius: 1 }}
    />
);

const Hero = () => {
    const [snippetIdx, setSnippetIdx] = useState(0);
    const [displayedLines, setDisplayedLines] = useState([]);
    const [typing, setTyping] = useState(true);

    const snippet = CODE_SNIPPETS[snippetIdx];

    useEffect(() => {
        setDisplayedLines([]);
        setTyping(true);
        let lineIdx = 0;
        const interval = setInterval(() => {
            if (lineIdx < snippet.lines.length) {
                setDisplayedLines((prev) => [...prev, snippet.lines[lineIdx]]);
                lineIdx++;
            } else {
                clearInterval(interval);
                setTyping(false);
                setTimeout(() => {
                    setSnippetIdx((i) => (i + 1) % CODE_SNIPPETS.length);
                }, 2500);
            }
        }, 90);
        return () => clearInterval(interval);
    }, [snippetIdx]);

    // Render lines as grouped by 'break' tokens
    // Render lines as grouped by 'break' tokens
    const renderCode = () => {
        const rows = [];
        let current = [];

        displayedLines.forEach((token, i) => {
            // Guard against any undefined token entry
            if (!token) return;

            if (token.t === 'break') {
                rows.push(
                    <div key={i}>
                        {current.length ? current : <span>&nbsp;</span>}
                    </div>
                );
                current = [];
            } else {
                current.push(
                    <span key={i} style={{ color: colorMap[token.t] || '#e2e8f0' }}>
                        {token.v}
                    </span>
                );
            }
        });

        if (current.length) {
            rows.push(
                <div key="last">
                    {current}
                    {typing && <TypingCursor />}
                </div>
            );
        }

        return rows;
    };

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ paddingTop: 120, paddingBottom: 80 }}
        >
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Glow spots */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '10%',
                    left: '20%',
                    width: 500,
                    height: 500,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
            <div
                className="absolute pointer-events-none"
                style={{
                    bottom: '10%',
                    right: '15%',
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left: Text content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 mb-6"
                        >
                            <span
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.7)',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                            >
                                <span
                                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 8px #22c55e' }}
                                />
                                180K+ coders and counting
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 900,
                                fontSize: 'clamp(40px, 6vw, 76px)',
                                lineHeight: 1.05,
                                letterSpacing: '-0.04em',
                                color: '#fff',
                                marginBottom: 24,
                            }}
                        >
                            Code.
                            <br />
                            <span style={{ color: 'rgba(255,255,255,0.45)' }}>Compete.</span>
                            <br />
                            Conquer.
                        </motion.h1>

                        {/* Sub-headline */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: 'clamp(16px, 2vw, 19px)',
                                lineHeight: 1.65,
                                color: 'rgba(255,255,255,0.5)',
                                maxWidth: 480,
                                marginBottom: 40,
                            }}
                        >
                            The competitive programming platform built for serious engineers.
                            Real code execution, live contests with Elo ratings, and real-world challenges
                            that go beyond LeetCode.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.55 }}
                            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12"
                        >
                            <a
                                href="/register"
                                id="hero-cta-primary"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    background: '#fff',
                                    color: '#000',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    fontSize: 15,
                                    padding: '13px 28px',
                                    borderRadius: 10,
                                    textDecoration: 'none',
                                    transition: 'transform 0.15s, background 0.2s',
                                    boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#e5e5e5';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                Start Solving Free
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href="#features"
                                id="hero-cta-secondary"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    background: 'transparent',
                                    color: 'rgba(255,255,255,0.7)',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    padding: '13px 24px',
                                    borderRadius: 10,
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    transition: 'color 0.2s, border-color 0.2s, transform 0.15s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                See features
                            </a>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap gap-6 justify-center lg:justify-start"
                        >
                            {STATS.map((s, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <div
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 800,
                                            fontSize: 22,
                                            color: '#fff',
                                            letterSpacing: '-0.03em',
                                            lineHeight: 1,
                                        }}
                                    >
                                        {s.value}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 400,
                                            fontSize: 12,
                                            color: 'rgba(255,255,255,0.4)',
                                            marginTop: 2,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Code editor mock */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 w-full max-w-lg lg:max-w-none"
                    >
                        <div
                            style={{
                                background: '#0a0a0a',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 16,
                                overflow: 'hidden',
                                boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
                            }}
                        >
                            {/* Editor title bar */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '12px 16px',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    background: '#111',
                                }}
                            >
                                {/* Traffic lights */}
                                {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
                                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} />
                                ))}
                                <div style={{ flex: 1 }} />
                                <div
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: 12,
                                        color: 'rgba(255,255,255,0.3)',
                                        letterSpacing: '0.02em',
                                    }}
                                >
                                    two-sum.{snippet.lang === 'cpp' ? 'cpp' : snippet.lang}
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: 11,
                                        color: snippet.color,
                                        fontWeight: 600,
                                        background: `${snippet.color}18`,
                                        padding: '2px 8px',
                                        borderRadius: 4,
                                    }}
                                >
                                    {snippet.label}
                                </div>
                            </div>

                            {/* Problem title bar */}
                            <div
                                style={{
                                    padding: '10px 16px',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    background: '#0d0d0d',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 600,
                                        fontSize: 13,
                                        color: '#fff',
                                    }}
                                >
                                    1. Two Sum
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: '#22c55e',
                                        background: 'rgba(34,197,94,0.12)',
                                        padding: '2px 8px',
                                        borderRadius: 4,
                                    }}
                                >
                                    Easy
                                </span>
                            </div>

                            {/* Code area */}
                            <div
                                style={{
                                    padding: '16px',
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: 13,
                                    lineHeight: 1.7,
                                    minHeight: 200,
                                    color: '#e2e8f0',
                                    background: '#0a0a0a',
                                }}
                            >
                                {renderCode()}
                            </div>

                            {/* Verdict bar */}
                            <motion.div
                                key={snippetIdx}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: typing ? 0 : 1, y: typing ? 8 : 0 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    padding: '12px 16px',
                                    borderTop: '1px solid rgba(255,255,255,0.06)',
                                    background: '#111',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                }}
                            >
                                <span
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: '#22c55e',
                                    }}
                                >
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" fill="rgba(34,197,94,0.15)" />
                                        <path d="M8 12l3 3 5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Accepted
                                </span>
                                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                                    Runtime: <span style={{ color: 'rgba(255,255,255,0.7)' }}>48 ms</span>
                                </span>
                                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                                    Memory: <span style={{ color: 'rgba(255,255,255,0.7)' }}>18.2 MB</span>
                                </span>
                            </motion.div>
                        </div>

                        {/* Floating badges */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                top: -20,
                                right: -20,
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 12,
                                padding: '10px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                            }}
                            className="hidden lg:flex"
                        >
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#fff' }}>
                                Contest Live
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 inset-x-0 pointer-events-none"
                style={{
                    height: 120,
                    background: 'linear-gradient(to top, #000 0%, transparent 100%)',
                }}
            />
        </section>
    );
};

export default Hero;