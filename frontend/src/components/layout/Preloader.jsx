import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
    'Code',
    'Compete',
    'Conquer',
    'KyroCode',
];

const WORD_DURATION = 500;   // ms each word stays — slow enough to read
const HOLD_LAST = 1200;       // ms hold on final word
const SLIDE_DURATION = 1.0;  // s for slide-up
const CURVE_DEPTH = 14;      // vh — how deep the convex curve extends

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [slideOut, setSlideOut] = useState(false);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        if (index < WORDS.length - 1) {
            const t = setTimeout(() => setIndex((i) => i + 1), WORD_DURATION);
            return () => clearTimeout(t);
        }
        const slideTimer = setTimeout(() => setSlideOut(true), HOLD_LAST);
        const doneTimer = setTimeout(() => {
            setMounted(false);
            onComplete?.();
        }, HOLD_LAST + SLIDE_DURATION * 1000 + 80);
        return () => {
            clearTimeout(slideTimer);
            clearTimeout(doneTimer);
        };
    }, [index, onComplete]);

    if (!mounted) return null;

    const ORANGE = 'hsl(18, 100%, 50%)';

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={slideOut ? { y: `-${100 + CURVE_DEPTH}vh` } : { y: 0 }}
            transition={{ duration: SLIDE_DURATION, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-0 z-[9999] overflow-visible"
            style={{
                height: `calc(100vh + ${CURVE_DEPTH}vh)`,
                pointerEvents: slideOut ? 'none' : 'auto',
            }}
        >
            {/* Straight bottom edge before slide‑up – convex curve appears only during slide-up */}
            {slideOut ? (
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 114"
                    preserveAspectRatio="none"
                    aria-hidden
                >
                    {/* Convex curve: control point at y=114 (below baseline) pulls the bottom edge DOWN */}
                    <path
                        d="M 0 0 L 100 0 L 100 100 Q 50 114 0 100 Z"
                        fill={ORANGE}
                    />
                </svg>
            ) : (
                // Simple rectangle with a straight bottom edge – no curve visible before slide-up
                <div className="absolute inset-0 w-full h-full" style={{ background: ORANGE }} />
            )}

            {/* Word stack — sits in the upper viewport area, unchanged */}
            <div
                className="absolute inset-x-0 flex items-center justify-center px-6"
                style={{ top: 0, height: '100vh' }}
            >
                <div className="flex items-center gap-3 md:gap-4">
                    <span
                        className="inline-block bg-black rounded-full"
                        style={{
                            width: 'clamp(10px, 0.9vw, 14px)',
                            height: 'clamp(10px, 0.9vw, 14px)',
                        }}
                    />

                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={WORDS[index]}
                            initial={{ y: '40%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            exit={{ y: '-40%', opacity: 0 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="text-black uppercase select-none leading-none"
                            style={{
                                fontFamily: 'var(--font-pjs)',
                                fontWeight: 900,
                                fontSize: 'clamp(48px, 7vw, 90px)',
                                letterSpacing: '-0.04em',
                            }}
                        >
                            {WORDS[index]}
                        </motion.h1>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;