import { useRef, useState, lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import { useScrollReveal, useCounterAnimation } from '@/hooks/useGsapAnimations';
import { GlassCard, GlassCardLight, KineticHeading, MagneticButton, ScrollReveal, CounterTicker, SectionDivider } from '@/Components/UI/SharedComponents';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin();

// Lazy load 3D components for performance (code-split Three.js)
const HighwayScene3D = lazy(() => import('@/Components/3D/HighwayScene3D'));
const BangladeshGlobe = lazy(() => import('@/Components/3D/BangladeshGlobe'));

export default function Home({ config, categories, hierarchy, courses }) {
    const heroRef = useRef(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    // Hero headline GSAP animation
    useGSAP(() => {
        gsap.from('.hero-elem', {
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
        });
    }, { scope: heroRef });

    // Scroll reveal for cards
    useScrollReveal('.reveal-card', { opacity: 0, y: 30, stagger: 0.08 });

    const primaryHsl = config?.primary_color_hsl || '222 47% 11%';
    const accentHsl  = config?.accent_color_hsl  || '38 92% 50%';

    const isSectionVisible = (key) => config?.section_visibility?.[key] !== false;

    const pillars = config?.pillars || [
        {
            icon: '🚧',
            title: 'Crash Blackspot Elimination',
            title_bn: 'বিপজ্জনক ব্লাকস্পট সংস্কার',
            desc: 'AI & GIS mapping of 420+ high-fatality highway curves — turning death zones into safe passages.',
        },
        {
            icon: '⚖️',
            title: 'Road Transport Act Enforcement',
            title_bn: 'আইন বাস্তবায়ন ও নাগরিক অধিকার',
            desc: 'Digitized speeding enforcement, vehicle fitness mandates, and pedestrian right-of-way protection.',
        },
        {
            icon: '🚑',
            title: 'Golden Hour Crash Response',
            title_bn: 'জরুরি উদ্ধার ও ট্রমা রেসপন্স',
            desc: 'Equipping highway cadets with crash trauma intervention — because the first 60 minutes save lives.',
        },
        {
            icon: '🎓',
            title: 'Defensive Driving Academy',
            title_bn: 'নিরাপদ চালনা একাডেমি',
            desc: 'Professional driver retraining, school zone cadet patrols, and zero-fatality transit certification.',
        },
    ];

    const stats = config?.stats || [
        { value: 420, suffix: '+', label: 'Crash Blackspots Mapped', sub: 'GIS-identified danger zones' },
        { value: 64, suffix: '', label: 'District Chapters Active', sub: 'Full national coverage' },
        { value: 1200, suffix: '+', label: 'Trained Crash Responders', sub: 'Golden Hour certified' },
        { value: 50000, suffix: '+', label: 'Youth Cadets Enlisted', sub: 'Across all 8 divisions' },
    ];

    const partners = config?.partners || [
        'BUET Accident Research Institute',
        'Highway Police HQ',
        'BRTA Bangladesh',
        'Fire Service & Civil Defence',
        'Bangladesh Red Crescent Society',
        'Nirapad Sarak Chai (NISCHA)',
    ];

    const faqs = config?.faqs || [
        {
            q: 'What is the Road Safety Movement (নিরাপদ সড়ক আন্দোলন)?',
            a: 'Bangladesh\'s largest grassroots citizen alliance born from the 2018 student mobilization, dedicated to achieving Vision Zero — zero preventable road crash deaths through civic oversight, Blackspot elimination, and rigorous enforcement of the Road Transport Act 2018.',
        },
        {
            q: 'How does the 5-Tier Member Hierarchy work?',
            a: 'Our governance spans a National Organizing Secretariat → 8 Specialized Directorates → 64 District Coordination Cells → General Members → Volunteer Cadets. Every member holds a verified rank with distinct responsibilities from highway patrolling to legal advocacy.',
        },
        {
            q: 'What does enrollment cost and how are funds used?',
            a: 'BDT 70 for Volunteer Cadets and BDT 100 for General Members. 100% funds go to emergency first-aid kits, reflective safety vests, crash blackspot signage, and volunteer coordination — zero administrative markup.',
        },
        {
            q: 'How do I get my Member ID and certificate?',
            a: 'Immediately after secure payment via SSLCommerz (bKash/Nagad/Cards), your digital E-Credential with tamper-proof QR code is issued on your dashboard and sent via SMS. Physical ID cards ship within 7 business days.',
        },
        {
            q: 'Can I volunteer in a specific district?',
            a: 'Yes! Use our interactive 64-District Map to select your preferred district. When you apply, your application is routed directly to that district\'s coordination cell for fast-track onboarding.',
        },
    ];

    const fieldCommandFlow = [
        { level: 'National HQ', icon: '🏛️', desc: 'Central Organizing Secretariat', color: 'from-amber-500 to-amber-600' },
        { level: '8 Directorates', icon: '⚙️', desc: 'Specialized operational wings', color: 'from-blue-500 to-blue-600' },
        { level: '64 District Cells', icon: '📍', desc: 'District Coordination Command', color: 'from-emerald-500 to-emerald-600' },
        { level: 'General Members', icon: '👥', desc: 'Registered active participants', color: 'from-purple-500 to-purple-600' },
        { level: 'Volunteer Cadets', icon: '🛡️', desc: 'Frontline youth responders', color: 'from-red-500 to-red-600' },
    ];

    const getIcon = (key) => {
        const icons = { shield: '🛡️', scale: '⚖️', alert: '🚧', heart: '❤️', building: '🏛️', graduation: '🎓', megaphone: '📢', book: '📚' };
        return icons[key] || '🔰';
    };

    return (
        <PublicLayout config={config}>
            <Head title={`${config?.org_name || 'Road Safety Movement'} — Citizens Alliance for Vision Zero Bangladesh`} />

            {/* ══════════════════════════════════════════════════════════════════
                1. CINEMATIC 3D HERO SECTION
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-[95vh] flex flex-col items-center justify-center text-center overflow-hidden">
                {/* 3D Highway Scene Background */}
                {isSectionVisible('hero_3d') ? (
                    <Suspense fallback={
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950" />
                    }>
                        <HighwayScene3D className="absolute inset-0 z-0" />
                    </Suspense>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950" />
                )}

                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/90 z-[1]" />

                {/* Hero Content */}
                <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6 py-20">
                    {/* Campaign Badge */}
                    <div className="hero-elem inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-xl text-xs font-bold uppercase tracking-wider text-amber-300 mb-8 shadow-lg shadow-amber-500/10">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span>Vision Zero Bangladesh · National Youth Taskforce</span>
                    </div>

                    {/* Headline — Kinetic Typography */}
                    <h1 className="hero-elem text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
                        {config?.hero_headline ? (
                            <span>{config.hero_headline}</span>
                        ) : (
                            <>
                                Protecting Every Life <br className="hidden sm:inline" />
                                <span className="inline-block bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                                    on Every Road
                                </span>
                            </>
                        )}
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-elem text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                        {config?.hero_subtitle || 'Mobilizing 50,000+ youth across 64 districts to eliminate road crashes, enforce the Road Transport Act 2018, and build a zero-fatality transit culture in Bangladesh.'}
                    </p>

                    {/* CTAs */}
                    <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                        <Link href="/apply">
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(245,158,11,0.4)' }}
                                whileTap={{ scale: 0.96 }}
                                className="px-8 py-4 rounded-2xl font-black text-slate-950 text-base shadow-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all"
                            >
                                Join the Movement ✦
                            </motion.button>
                        </Link>

                        <a href="#district-map">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-4 rounded-2xl font-bold text-white border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-base shadow-xs flex items-center gap-2 transition"
                            >
                                <span>🗺️ Explore 64 Districts</span>
                                <span>↓</span>
                            </motion.button>
                        </a>
                    </div>

                    {/* Trust Badges */}
                    <div className="hero-elem pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
                        {['64 District Chapters', 'Digital QR Member IDs', 'SSLCommerz Gateway', '14-Day Refund Policy'].map((badge, i) => (
                            <span key={i} className="flex items-center gap-1.5">
                                <span className="text-amber-400 font-bold">✓</span> {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                2. IMPACT STATS COUNTER BAR
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('stats_ticker') && (
                <section className="relative z-10 -mt-12 mx-4 sm:mx-6">
                    <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-950/10 border border-slate-200/60 p-6 sm:p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <CounterTicker
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        className="text-3xl sm:text-4xl font-black tabular-nums"
                                        style={{ color: `hsl(${primaryHsl})` }}
                                    />
                                    <div className="font-bold text-slate-900 text-sm">{stat.label}</div>
                                    <div className="text-xs text-slate-500">{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                3. STRATEGIC ALLIANCES MARQUEE
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('alliances') && (
                <div className="py-8 bg-white overflow-hidden">
                    <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <span className="text-slate-400 shrink-0">Institutional Alliances:</span>
                        {partners.map((p, i) => (
                            <span key={i} className="hover:text-slate-900 transition cursor-default shrink-0">{p}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                4. CORE ACTION PILLARS & STATUTORY CREDENTIALS
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('pillars') && (
                <section className="py-20 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <ScrollReveal>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                                <div className="lg:col-span-7 space-y-5">
                                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                                        Our Mission & Pillars
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                        Transforming Bangladesh Transit Through<br />
                                        <span className="bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                                            Citizen Action & Engineering
                                        </span>
                                    </h2>
                                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                        {config?.about_story_html ? (
                                            <span dangerouslySetInnerHTML={{ __html: config.about_story_html.substring(0, 320) + '...' }} />
                                        ) : (
                                            "Born from the historic 2018 student street movement, the Road Safety Movement unites youth, engineers, and legal advocates to eradicate highway crash fatalities through civic monitoring, driver education, and legislative oversight."
                                        )}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                        {pillars.map((pil, idx) => (
                                            <GlassCardLight key={idx} glowColor={idx % 2 === 0 ? 'amber' : 'emerald'}>
                                                <div className="p-5">
                                                    <div className="text-2xl mb-2">{pil.icon}</div>
                                                    <h4 className="font-bold text-slate-900 text-sm mb-0.5">{pil.title}</h4>
                                                    <div className="text-[11px] text-amber-700 font-bold mb-2">{pil.title_bn}</div>
                                                    <p className="text-xs text-slate-500 leading-relaxed">{pil.desc}</p>
                                                </div>
                                            </GlassCardLight>
                                        ))}
                                    </div>

                                    <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 pt-2">
                                        <span>Read Full Organization Story & Statutory Mandate</span>
                                        <span>→</span>
                                    </Link>
                                </div>

                                {/* Right Credential Box */}
                                <div className="lg:col-span-5">
                                    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-7 shadow-2xl border border-slate-800 space-y-5 sticky top-28">
                                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                                                Verified Statutory Registry
                                            </span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                        </div>

                                        <div className="space-y-4 text-xs">
                                            <div>
                                                <span className="text-slate-400 block text-[11px] mb-0.5">REGISTERED ENTITY</span>
                                                <div className="font-bold text-sm text-white">{config?.org_name || 'Road Safety Movement'}</div>
                                                <div className="text-amber-300 text-xs">{config?.org_name_bn || 'নিরাপদ সড়ক আন্দোলন'}</div>
                                            </div>

                                            <div>
                                                <span className="text-slate-400 block text-[11px] mb-0.5">TRADE LICENSE (DNCC)</span>
                                                <div className="font-mono text-amber-300 font-bold text-sm bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                                                    {config?.trade_license_number || '03247/2023-2025'}
                                                </div>
                                            </div>

                                            <div>
                                                <span className="text-slate-400 block text-[11px] mb-0.5">HEAD OFFICE ADDRESS</span>
                                                <div className="text-slate-200 leading-relaxed">
                                                    {config?.head_office_address || 'House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka'}
                                                </div>
                                            </div>

                                            <div>
                                                <span className="text-slate-400 block text-[11px] mb-0.5">CENTRAL HOTLINE</span>
                                                <div className="text-amber-300 font-bold">
                                                    📞 {config?.contact_phone || '+880 1717-395047'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <Link
                                                href="/apply"
                                                className="block w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-center text-xs transition shadow-md"
                                            >
                                                Apply for Member ID & Volunteer Vest →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                5. FIELD COMMAND FLOW (5-Tier Hierarchy Visualization)
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('command_flow') && (
                <section className="py-20 px-6 bg-slate-50 border-y border-slate-200/60">
                    <div className="max-w-6xl mx-auto">
                        <ScrollReveal>
                            <div className="text-center mb-14">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                                    Command Structure
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                                    5-Tier Field Command Flow
                                </h2>
                                <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
                                    From National Headquarters to frontline volunteer cadets — a clear chain of command for rapid crash response and civic oversight.
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="flex flex-col items-center gap-3">
                            {fieldCommandFlow.map((tier, idx) => (
                                <ScrollReveal key={idx} delay={idx * 0.1}>
                                    <div className="relative">
                                        {/* Connector line */}
                                        {idx > 0 && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-300" />
                                        )}

                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className={`flex items-center gap-4 px-6 sm:px-8 py-4 rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer ${
                                                idx === 0 ? 'min-w-[320px] sm:min-w-[450px]' : idx === 1 ? 'min-w-[300px] sm:min-w-[400px]' : idx === 2 ? 'min-w-[280px] sm:min-w-[380px]' : 'min-w-[260px] sm:min-w-[350px]'
                                            }`}
                                        >
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white text-xl shadow-md shrink-0`}>
                                                {tier.icon}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-sm sm:text-base">{tier.level}</div>
                                                <div className="text-xs text-slate-500">{tier.desc}</div>
                                            </div>
                                            <div className="ml-auto text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                                Tier {idx + 1}
                                            </div>
                                        </motion.div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/hierarchy" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition">
                                <span>Explore Full Organogram</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                6. INTERACTIVE 64-DISTRICT BANGLADESH VECTOR MAP
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('district_globe') && (
                <section id="district-map" className="relative overflow-hidden bg-slate-950">
                    <Suspense
                        fallback={
                            <div className="w-full py-24 flex items-center justify-center text-white/30 bg-slate-950">
                                <div className="text-center">
                                    <div className="text-5xl mb-3 animate-pulse">🗺️</div>
                                    <div className="text-xs font-mono font-bold tracking-widest uppercase">
                                        Loading 64-District Interactive Map...
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <BangladeshGlobe />
                    </Suspense>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                7. MEMBER HIERARCHY & DIRECTORATE SHOWCASE
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('directorates') && (
                <section className="py-20 bg-white px-6 border-b border-slate-200/60">
                    <div className="max-w-6xl mx-auto">
                        <ScrollReveal>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                                <div>
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                                        🏛️ Governance Structure
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                                        National Directorates & Organogram
                                    </h2>
                                    <p className="text-slate-500 text-xs sm:text-sm max-w-xl mt-1">
                                        Live from our CMS. Explore the command chain across our national directorates and district chapters.
                                    </p>
                                </div>

                                <Link
                                    href="/hierarchy"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition shrink-0"
                                >
                                    <span>Full 5-Tier Organogram</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(hierarchy || []).slice(0, 8).map((item, idx) => (
                                <ScrollReveal key={item.id} delay={idx * 0.05}>
                                    <GlassCardLight glowColor={idx % 3 === 0 ? 'amber' : idx % 3 === 1 ? 'blue' : 'emerald'}>
                                        <div className="p-5 flex flex-col justify-between min-h-[180px]">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-2xl">{getIcon(item.icon_key)}</span>
                                                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                                        Rank #{item.rank}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                                                    {item.name_en}
                                                </h3>
                                                {item.name_bn && (
                                                    <div className="text-[11px] text-slate-400 mb-2 truncate">{item.name_bn}</div>
                                                )}
                                                <div className="text-xs text-slate-700 font-semibold mb-0.5">{item.convener_name}</div>
                                                <div className="text-[10px] text-amber-600">{item.convener_title}</div>
                                            </div>

                                            <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                                                <span>👥 {item.member_count} Officers</span>
                                                <span className="text-amber-600/80 text-[10px] uppercase font-mono">{item.level?.split(' ')[0]}</span>
                                            </div>
                                        </div>
                                    </GlassCardLight>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                8. MEMBERSHIP TRACKS & PRICING
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('membership_plans') && (
                <section className="py-20 bg-slate-50 border-b border-slate-200/80 px-6">
                    <div className="max-w-6xl mx-auto">
                        <ScrollReveal>
                            <div className="text-center mb-14">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                                    Enrollment Tracks
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                                    Membership & Volunteer Tiers
                                </h2>
                                <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto mt-2">
                                    All fees in Bangladeshi Taka (BDT ৳). Secure payment via SSLCommerz gateway.
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {(categories || []).map((cat, idx) => (
                                <ScrollReveal key={cat.id} delay={idx * 0.05}>
                                    <GlassCardLight glowColor="amber">
                                        <div className="p-5 flex flex-col justify-between min-h-[260px]">
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm border border-amber-200">
                                                        🛡️
                                                    </span>
                                                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                                        {cat.grade_range}
                                                    </span>
                                                </div>

                                                <h3 className="font-extrabold text-slate-900 text-sm mb-1 leading-snug">{cat.name}</h3>
                                                {cat.name_bn && (
                                                    <div className="text-[11px] text-slate-400 font-medium mb-3">{cat.name_bn}</div>
                                                )}
                                                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{cat.description}</p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100">
                                                <div className="flex items-baseline justify-between mb-3">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Fee</span>
                                                    <span className="text-xl font-black text-amber-700">{cat.fee_bdt}</span>
                                                </div>
                                                <Link
                                                    href="/apply"
                                                    className="block w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl text-center transition shadow-xs"
                                                >
                                                    Apply Track →
                                                </Link>
                                            </div>
                                        </div>
                                    </GlassCardLight>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                9. ROAD SAFETY OPERATION ROADMAP
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-14">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                                Operations Roadmap
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                                How the Movement Operates
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            { step: '01', title: 'Cadet Enrollment', desc: 'Online registration, institutional verification & secure BDT payment.', icon: '📝' },
                            { step: '02', title: 'Crash Response Training', desc: 'Golden-hour trauma care and defensive driving certification.', icon: '🎓' },
                            { step: '03', title: 'Blackspot GIS Mapping', desc: 'District teams identify lethal curves with drone telemetry for BRTA.', icon: '🛰️' },
                            { step: '04', title: 'Legal & Compliance Audits', desc: 'Zebra crossing monitoring, helmet enforcement, vehicle fitness checks.', icon: '⚖️' },
                            { step: '05', title: 'Vision Zero Impact', desc: 'National safety awards, civic medals, and parliamentary White Paper.', icon: '🏆' },
                        ].map((st, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.08}>
                                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 text-center flex flex-col justify-between min-h-[200px] hover:border-red-300 transition group">
                                    <div>
                                        <div className="text-2xl mb-2">{st.icon}</div>
                                        <span className="text-[10px] font-mono font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full mb-2 inline-block">
                                            Phase {st.step}
                                        </span>
                                        <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-red-700 transition">{st.title}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                10. ACADEMY COURSES PREVIEW
            ══════════════════════════════════════════════════════════════════ */}
            {courses && courses.length > 0 && (
                <section className="py-20 bg-slate-50 border-y border-slate-200/80 px-6">
                    <div className="max-w-6xl mx-auto">
                        <ScrollReveal>
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                        Road Safety Academy
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                                        Crash Response & Safe Driving Certifications
                                    </h2>
                                </div>
                                <Link href="/courses" className="text-xs font-bold text-emerald-800 hover:text-emerald-900 shrink-0">
                                    View All Courses →
                                </Link>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {courses.map((c, idx) => (
                                <ScrollReveal key={c.id} delay={idx * 0.08}>
                                    <GlassCardLight glowColor="emerald">
                                        <div className="p-6 flex flex-col justify-between min-h-[220px]">
                                            <div>
                                                <div className="text-xs text-slate-500 font-mono mb-2">
                                                    {c.duration_hours}h · {c.lesson_count} Lessons
                                                </div>
                                                <h3 className="font-bold text-slate-900 text-sm mb-1 leading-snug">{c.title}</h3>
                                                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{c.description}</p>
                                            </div>
                                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <span className="font-black text-emerald-700 text-base">{c.fee_bdt}</span>
                                                <Link href="/courses" className="text-xs font-bold text-slate-900 hover:text-emerald-700 transition">
                                                    Enroll →
                                                </Link>
                                            </div>
                                        </div>
                                    </GlassCardLight>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                11. FAQ ACCORDION
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('faq') && (
                <section className="py-20 bg-white px-6">
                    <div className="max-w-4xl mx-auto">
                        <ScrollReveal>
                            <div className="text-center mb-12">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                                    Common Questions
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                                    Frequently Asked Questions
                                </h2>
                            </div>
                        </ScrollReveal>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={false}
                                    className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-slate-300 transition"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full px-6 py-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4"
                                    >
                                        <span>{faq.q}</span>
                                        <motion.span
                                            animate={{ rotate: openFaq === i ? 45 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-lg text-amber-600 shrink-0"
                                        >
                                            +
                                        </motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                12. FINAL CTA BANNER
            ══════════════════════════════════════════════════════════════════ */}
            {isSectionVisible('cta_banner') && (
                <section className="py-16 px-6">
                    <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl">
                        {/* Dark gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15),transparent_50%)]" />

                        <div className="relative z-10 p-8 sm:p-12 text-center text-white">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5 border border-amber-400/20">
                                Join 50,000+ Enrolled Youth
                            </span>
                            <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight max-w-2xl mx-auto">
                                Help Us Make Every Highway & School Crossing Safe in Bangladesh
                            </h3>
                            <p className="text-slate-300 text-sm mb-8 leading-relaxed max-w-xl mx-auto">
                                Registration takes less than 3 minutes. Immediate digital member ID issuance upon payment confirmation.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/apply">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg"
                                    >
                                        Join the Movement ✦
                                    </motion.button>
                                </Link>
                                <Link href="/hierarchy">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-sm transition border border-white/15"
                                    >
                                        View Full Hierarchy
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
