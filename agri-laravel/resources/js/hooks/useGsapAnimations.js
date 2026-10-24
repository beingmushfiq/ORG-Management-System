import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements when they enter the viewport.
 * @param {string} selector - CSS selector for elements to animate
 * @param {object} fromVars - GSAP fromVars
 * @param {object} triggerOptions - ScrollTrigger options
 */
export function useScrollReveal(selector, fromVars = {}, triggerOptions = {}) {
    useEffect(() => {
        const defaults = { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' };
        const elements = gsap.utils.toArray(selector);

        elements.forEach((el) => {
            gsap.from(el, {
                ...defaults,
                ...fromVars,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                    ...triggerOptions,
                },
            });
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);
}

/**
 * Animate a counter from 0 to target value.
 */
export function useCounterAnimation(ref, target, suffix = '') {
    useEffect(() => {
        if (!ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 85%' },
            onUpdate: () => {
                if (ref.current) {
                    ref.current.textContent = Math.floor(obj.val).toLocaleString() + suffix;
                }
            },
        });
    }, [target]);
}
