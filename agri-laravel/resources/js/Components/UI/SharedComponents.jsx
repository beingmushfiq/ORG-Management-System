import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GlassCard — Frosted glass card with gradient border glow and hover depth
 */
export function GlassCard({ children, className = '', glowColor = 'amber', hover = true, ...props }) {
    const glowColors = {
        amber: 'from-amber-500/20 via-transparent to-amber-500/10',
        emerald: 'from-emerald-500/20 via-transparent to-emerald-500/10',
        blue: 'from-blue-500/20 via-transparent to-blue-500/10',
        red: 'from-red-500/20 via-transparent to-red-500/10',
        purple: 'from-purple-500/20 via-transparent to-purple-500/10',
    };

    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative group ${className}`}
            {...props}
        >
            {/* Gradient border glow */}
            <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${glowColors[glowColor] || glowColors.amber} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
            {/* Card body */}
            <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden">
                {children}
            </div>
        </motion.div>
    );
}

/**
 * GlassCardLight — Light theme version for public pages
 */
export function GlassCardLight({ children, className = '', glowColor = 'amber', hover = true, ...props }) {
    const glowColors = {
        amber: 'from-amber-400/30 to-amber-500/10',
        emerald: 'from-emerald-400/30 to-emerald-500/10',
        blue: 'from-blue-400/30 to-blue-500/10',
    };

    return (
        <motion.div
            whileHover={hover ? { y: -6, scale: 1.01 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative group ${className}`}
            {...props}
        >
            <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${glowColors[glowColor] || glowColors.amber} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-lg shadow-slate-950/5 overflow-hidden">
                {children}
            </div>
        </motion.div>
    );
}

/**
 * KineticHeading — GSAP SplitText staggered reveal heading
 */
export function KineticHeading({ children, as: Tag = 'h2', className = '', delay = 0 }) {
    const headingRef = useRef(null);

    useEffect(() => {
        if (!headingRef.current) return;

        const chars = headingRef.current.querySelectorAll('.kinetic-char');
        if (chars.length === 0) return;

        gsap.from(chars, {
            opacity: 0,
            y: 40,
            rotateX: -45,
            stagger: 0.03,
            duration: 0.8,
            delay,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
                once: true,
            },
        });
    }, [delay]);

    // Split text into chars wrapped in spans
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    return (
        <Tag ref={headingRef} className={className} style={{ perspective: '1000px' }}>
            {words.map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.3em]">
                    {word.split('').map((char, ci) => (
                        <span
                            key={`${wi}-${ci}`}
                            className="kinetic-char inline-block"
                            style={{ transformOrigin: 'center bottom' }}
                        >
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </Tag>
    );
}

/**
 * MagneticButton — Cursor-magnetic CTA with ripple effect
 */
export function MagneticButton({ children, className = '', strength = 0.3, onClick, href, ...props }) {
    const btnRef = useRef(null);
    const rippleRef = useRef(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    const handleClick = (e) => {
        if (rippleRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'absolute rounded-full bg-white/30 animate-ping pointer-events-none';
            ripple.style.cssText = `left:${x}px;top:${y}px;width:20px;height:20px;transform:translate(-50%,-50%)`;
            rippleRef.current.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
        onClick?.(e);
    };

    const Comp = href ? 'a' : 'button';

    return (
        <Comp
            ref={btnRef}
            href={href}
            onClick={handleClick}
            className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
            {...props}
        >
            <span ref={rippleRef} className="absolute inset-0 pointer-events-none" />
            <span className="relative z-10">{children}</span>
        </Comp>
    );
}

/**
 * ScrollReveal — GSAP ScrollTrigger wrapper for any content
 */
export function ScrollReveal({ children, className = '', direction = 'up', delay = 0, stagger = 0 }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const from = {
            up: { y: 50, opacity: 0 },
            down: { y: -50, opacity: 0 },
            left: { x: -50, opacity: 0 },
            right: { x: 50, opacity: 0 },
            scale: { scale: 0.8, opacity: 0 },
        };

        gsap.from(ref.current.children.length > 0 && stagger ? ref.current.children : ref.current, {
            ...from[direction],
            duration: 0.8,
            delay,
            stagger: stagger || 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                once: true,
            },
        });
    }, [direction, delay, stagger]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

/**
 * CounterTicker — Animated number counter with scroll trigger
 */
export function CounterTicker({ value, suffix = '', prefix = '', duration = 2, className = '' }) {
    const counterRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!counterRef.current) return;

        ScrollTrigger.create({
            trigger: counterRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                if (hasAnimated.current) return;
                hasAnimated.current = true;

                const obj = { val: 0 };
                gsap.to(obj, {
                    val: value,
                    duration,
                    ease: 'power2.out',
                    onUpdate: () => {
                        if (counterRef.current) {
                            counterRef.current.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
                        }
                    },
                });
            },
        });
    }, [value, suffix, prefix, duration]);

    return (
        <span ref={counterRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
}

/**
 * SectionDivider — SVG wave / angle section transitions
 */
export function SectionDivider({ type = 'wave', color = '#0f172a', flip = false, className = '' }) {
    const paths = {
        wave: 'M0,64 C320,100 480,20 720,64 C960,108 1120,28 1440,64 L1440,0 L0,0 Z',
        angle: 'M0,64 L1440,0 L1440,0 L0,0 Z',
        curve: 'M0,96 Q720,0 1440,96 L1440,0 L0,0 Z',
    };

    return (
        <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}>
            <svg
                viewBox="0 0 1440 96"
                preserveAspectRatio="none"
                className="w-full h-16 md:h-24"
                fill={color}
            >
                <path d={paths[type] || paths.wave} />
            </svg>
        </div>
    );
}
