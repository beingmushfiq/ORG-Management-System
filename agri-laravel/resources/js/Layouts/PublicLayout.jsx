import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function PublicLayout({ children, config }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [lang, setLang] = useState('en');
    const { url, props } = usePage();
    const user = props.auth?.user;

    // Inject CMS colors as CSS custom variables
    useEffect(() => {
        document.documentElement.style.setProperty('--primary-hsl', config?.primary_color_hsl || '222 47% 11%');
        document.documentElement.style.setProperty('--accent-hsl', config?.accent_color_hsl || '38 92% 50%');
    }, [config]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useSmoothScroll();

    const navLinks = [
        { label: 'Home',         label_bn: 'মূলপাতা',          href: '/' },
        { label: '64 Districts', label_bn: '৬৪ জেলা কমান্ড',   href: '/districts' },
        { label: 'Hierarchy',    label_bn: 'সাংগঠনিক কাঠামো',  href: '/hierarchy' },
        { label: 'Academy',      label_bn: 'ক্যাডেট একাডেমি',   href: '/courses' },
        { label: 'Campaigns',    label_bn: 'ফিল্ড ক্যাম্পেইন',  href: '/events' },
        { label: 'Notices',      label_bn: 'গেজেট ও সার্কুলার', href: '/notices' },
        { label: 'Gallery',      label_bn: 'অ্যাকশন গ্যালারি',   href: '/gallery' },
        { label: 'About',        label_bn: 'লক্ষ্য ও ভিশন',     href: '/about' },
    ];

    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden w-full max-w-full" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
            {/* ── STREAMLINED STICKY HEADER (Glassmorphic & Uncluttered) ───────────── */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-slate-950/95 backdrop-blur-2xl shadow-xl shadow-slate-950/20 border-b border-slate-800'
                    : 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-900'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
                    {/* Brand / Logo */}
                    <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
                        {config?.logo_url ? (
                            <img
                                src={config.logo_url}
                                alt={config.org_name || 'Road Safety Movement'}
                                className="w-11 h-11 object-contain rounded-xl"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transition-transform group-hover:scale-105 ${config?.logo_url ? 'hidden' : 'flex'}`}
                            style={{ background: `linear-gradient(135deg, hsl(${config?.primary_color_hsl || '222 47% 11%'}), hsl(${config?.accent_color_hsl || '38 92% 50%'}))` }}
                        >
                            🛡️
                        </div>
                        <div className="leading-tight">
                            <div className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                                <span>{config?.org_name || 'Road Safety Movement'}</span>
                            </div>
                            <div className="text-[11px] text-amber-400 font-bold">
                                {config?.org_name_bn || 'নিরাপদ সড়ক আন্দোলন (বাংলাদেশ)'}
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden xl:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                        active
                                            ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                                    }`}
                                >
                                    {lang === 'en' ? link.label : (link.label_bn || link.label)}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action CTAs */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        {/* Language Switcher */}
                        <button
                            type="button"
                            onClick={() => setLang(l => l === 'en' ? 'bn' : 'en')}
                            className="text-xs px-2.5 py-1.5 border border-slate-700 bg-slate-900 rounded-xl text-slate-300 font-bold hover:border-amber-400 hover:text-amber-400 transition"
                        >
                            {lang === 'en' ? 'বাংলা' : 'English'}
                        </button>

                        {/* Portal Access & Registration */}
                        {user ? (
                            <Link href="/portal">
                                <span className="inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 transition shadow-xs">
                                    <span>👨‍💼 Portal ({user.name.split(' ')[0]})</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                </span>
                            </Link>
                        ) : (
                            <div className="hidden md:flex items-center gap-1.5">
                                <Link href="/login">
                                    <span className="text-xs px-3 py-2 text-slate-300 hover:text-white font-bold transition">
                                        Login
                                    </span>
                                </Link>
                                <Link href="/register">
                                    <span className="text-xs px-3 py-2 text-amber-400 hover:text-amber-300 font-bold transition border border-amber-400/40 rounded-xl bg-amber-400/10">
                                        Register
                                    </span>
                                </Link>
                            </div>
                        )}

                        {/* Primary CTA Button */}
                        <Link href="/apply">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl font-black text-slate-950 shadow-md transition-all shadow-amber-500/20 flex items-center gap-1.5"
                                style={{ background: `hsl(${config?.accent_color_hsl || '38 92% 50%'})` }}
                            >
                                <span>Join Movement</span>
                                <span className="text-amber-950 font-mono">✦</span>
                            </motion.button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            className="xl:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle Navigation Menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="xl:hidden border-t border-slate-800 bg-slate-950 px-5 py-5 space-y-3 shadow-2xl text-white"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {navLinks.map((link) => {
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                                                active
                                                    ? 'bg-amber-400 text-slate-950 font-black'
                                                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                            }`}
                                        >
                                            <span>{lang === 'en' ? link.label : (link.label_bn || link.label)}</span>
                                            {active && <span>•</span>}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                                {user ? (
                                    <Link
                                        href="/portal"
                                        onClick={() => setMobileOpen(false)}
                                        className="font-bold text-emerald-400 hover:text-emerald-300"
                                    >
                                        👨‍💼 Portal ({user.name})
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href="/login"
                                            onClick={() => setMobileOpen(false)}
                                            className="font-bold text-slate-300 hover:text-white"
                                        >
                                            🔐 Sign In
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setMobileOpen(false)}
                                            className="font-bold text-amber-400 hover:text-amber-300"
                                        >
                                            🛡️ Register
                                        </Link>
                                    </div>
                                )}
                                <span className="text-[10px] text-slate-400 font-mono">
                                    Lic: {config?.trade_license_number || '03247/2023-2025'}
                                </span>
                            </div>

                            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                                <Link href="/terms-condition" onClick={() => setMobileOpen(false)} className="hover:text-white">Terms & Constitution</Link>
                                <Link href="/refund-policy" onClick={() => setMobileOpen(false)} className="hover:text-white">Refund Framework</Link>
                                <Link href="/privacy-policy" onClick={() => setMobileOpen(false)} className="hover:text-white">Volunteer Privacy</Link>
                                <Link href="/delivery-policy" onClick={() => setMobileOpen(false)} className="hover:text-white">Rescue Kit Delivery</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── PAGE CONTENT ────────────────────────────────────────────────────── */}
            <main className="flex-1">{children}</main>

            {/* ── COMPREHENSIVE FOOTER (Statutory Credentials & CMS Navigation) ──── */}
            <footer
                style={{ background: `hsl(${config?.primary_color_hsl || '222 47% 11%'})` }}
                className="text-white mt-auto border-t border-slate-800"
            >
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Brand Column */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-400/20 border border-amber-400/30 rounded-2xl flex items-center justify-center text-2xl">
                                    🛡️
                                </div>
                                <div>
                                    <div className="font-black text-base tracking-tight leading-tight">{config?.org_name || 'Road Safety Movement'}</div>
                                    <div className="text-xs text-amber-400 font-bold">{config?.org_name_bn || 'নিরাপদ সড়ক আন্দোলন (বাংলাদেশ)'}</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {config?.tagline || 'Citizens Movement for Vision Zero, Highway Safety & Crash Casualties Prevention Across Bangladesh'}
                            </p>
                            <div className="text-xs text-slate-300 space-y-1.5 pt-2">
                                <div className="flex items-start gap-2">
                                    <span className="shrink-0">📍</span>
                                    <span>{config?.head_office_address || 'Central Command Secretariat, Uttara, Dhaka'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>📞</span>
                                    <span>{config?.contact_phone || '+880 1717-395047'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>✉️</span>
                                    <span>{config?.contact_email || 'contact@roadsafetymovement.org.bd'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Columns (from CMS config) */}
                        {(config?.footer_columns || []).map((col, idx) => (
                            <div key={idx} className="space-y-3">
                                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                                    {col.heading}
                                </h4>
                                <ul className="space-y-2.5 text-xs">
                                    {col.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link
                                                href={link.href}
                                                className="text-slate-300 hover:text-white transition flex items-center gap-1.5"
                                            >
                                                <span className="text-amber-400 font-mono text-[10px]">›</span>
                                                <span>{link.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Statutory & Regulatory Compliance Column */}
                        <div className="space-y-4 bg-slate-900/80 p-5 rounded-3xl border border-slate-800">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                                <span>Regulatory & Trust</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            </h4>
                            <div className="space-y-2 text-xs text-slate-300">
                                <div>
                                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Trade License:</span>
                                    <span className="font-mono text-amber-300 font-bold">{config?.trade_license_number || 'TRAD/DNCC/03247/2023'}</span>
                                </div>
                                {config?.tin_number && (
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Tax E-TIN:</span>
                                        <span className="font-mono text-emerald-300 font-bold">{config?.tin_number}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Compliance:</span>
                                    <div className="text-[11px] text-slate-400 leading-snug">
                                        Settled in <strong>{config?.default_currency || 'BDT'} (৳)</strong> via PCI-DSS SSLCommerz gateway.
                                    </div>
                                </div>
                            </div>

                            {/* MFS & Card Badges */}
                            <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5 text-[10px]">
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-pink-400 font-bold border border-slate-700">bKash</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-orange-400 font-bold border border-slate-700">Nagad</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-400 font-bold border border-slate-700">Rocket</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 font-bold border border-slate-700">Visa</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold border border-slate-700">Mastercard</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                        <div>
                            © {new Date().getFullYear()} {config?.org_name || 'Road Safety Movement'}. All statutory rights reserved. People's Republic of Bangladesh.
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/terms-condition" className="hover:text-white transition">Terms</Link>
                            <span>·</span>
                            <Link href="/refund-policy" className="hover:text-white transition">Refunds</Link>
                            <span>·</span>
                            <Link href="/privacy-policy" className="hover:text-white transition">Privacy</Link>
                            <span>·</span>
                            <Link href="/delivery-policy" className="hover:text-white transition">Delivery</Link>
                            <span>·</span>
                            <Link href="/portal" className="text-amber-400 hover:text-amber-300 font-bold transition">Secretariat Portal</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
