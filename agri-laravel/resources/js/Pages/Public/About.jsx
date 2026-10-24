import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

export default function About({ config, hierarchy }) {
    const stats = [
        { label: 'Active District Chapters', value: '64 of 64', desc: '100% Nationwide coverage' },
        { label: 'Registered Volunteers', value: '50,000+', desc: 'Across 5 membership tracks' },
        { label: 'Blackspots Audited', value: '420+', desc: 'GIS-mapped high-risk curves' },
        { label: 'Crash Responders', value: '1,200+', desc: 'Trained first-aid volunteers' },
    ];

    const values = [
        {
            icon: '🚧',
            title: 'Vision Zero Principle',
            desc: 'Every road death is preventable through proactive civil engineering, strict speed zoning, and civic vigilance.',
        },
        {
            icon: '⚖️',
            title: 'Legislative Enforcement',
            desc: 'Continuous advocacy for strict implementation of the Road Transport Act 2018 and transparent licensing.',
        },
        {
            icon: '🚑',
            title: 'Golden-Hour Rescue',
            desc: 'Building nationwide rapid crash response corridors to ensure injured victims receive trauma care within 60 minutes.',
        },
        {
            icon: '🤝',
            title: 'Equitable & Transparent',
            desc: 'Subsidized BDT 70 cadet enrollment ensuring students and everyday citizens can actively participate in governance.',
        },
    ];

    const directorates = (hierarchy && hierarchy.length > 0) ? hierarchy : [
        { name_en: 'National Organizing Secretariat', name_bn: 'কেন্দ্রীয় সাংগঠনিক সচিবালয়', convener_name: 'Dr. Tariqul Islam Chowdhury', convener_title: 'Secretary General & Chief Convener', member_count: 35 },
        { name_en: 'Legal Advocacy & Legislative Directorate', name_bn: 'আইনি ও সংসদীয় বিষয়ক সেল', convener_name: 'Barrister Farzana Ahmed', convener_title: 'Director of Legal Advocacy', member_count: 24 },
        { name_en: 'Blackspot Engineering & Safety Audit Taskforce', name_bn: 'ব্লাকস্পট ও হাইওয়ে অডিট উইং', convener_name: 'Engr. Mahmudur Rahman, PEng', convener_title: 'Chief Technical Auditor', member_count: 42 },
        { name_en: 'Emergency Trauma & Crash Response Wing', name_bn: 'জরুরি ট্রমা ও রেসকিউ কোর', convener_name: 'Dr. Shahriar Nafis, MBBS', convener_title: 'Director of Trauma Response', member_count: 58 },
    ];

    return (
        <PublicLayout config={config}>
            <Head title={`About Us — ${config?.org_name || 'Road Safety Movement'}`} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-5 border-b border-slate-800">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6 uppercase tracking-wider"
                    >
                        <span>🛡️ Citizens Alliance for Vision Zero Bangladesh</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-white"
                    >
                        Pioneering Safe Highways & <br className="hidden sm:inline" />
                        <span className="text-amber-400">Civic Accountability in Transit</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        {config?.tagline || 'Mobilizing 50,000+ youth across all 64 districts to eliminate road accidents, enforce the Road Transport Act 2018, and build a culture of safe transit.'}
                    </motion.p>
                </div>
            </section>

            {/* Story & Business Credentials Grid */}
            <section className="py-16 px-5 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    {/* Left: Organization Story */}
                    <div className="lg:col-span-2">
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 block">
                            Our Journey & Movement History
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
                            From Street Mobilization to Structured National Governance
                        </h2>

                        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
                            {config?.about_story_html ? (
                                <div dangerouslySetInnerHTML={{ __html: config.about_story_html }} />
                            ) : (
                                <>
                                    <p>
                                        The Road Safety Movement (নিরাপদ সড়ক আন্দোলন) was born out of the historic youth awakening of 2018, where school and university students across Bangladesh stepped forward to demand accountability on lethal transit routes.
                                    </p>
                                    <p>
                                        What began as students inspecting driver licenses at city intersections has evolved into an institutionalized, nationwide NGO and research alliance spanning all 64 districts. We bridge civic vigilance with cutting-edge civil engineering, collaborating with BUET Accident Research Institute (ARI) and Highway Police to remediate fatal highway blackspots.
                                    </p>
                                    <p>
                                        Through our 8 specialized directorates, we conduct independent vehicle fitness inspections, train volunteer crash first-aid responders, and champion the uncompromising enforcement of the Road Transport Act 2018.
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Core Pillars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                            {values.map((v, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <div className="text-2xl mb-2">{v.icon}</div>
                                    <h3 className="font-bold text-slate-900 text-sm mb-1">{v.title}</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Statutory Business Profile Card */}
                    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 border border-slate-800">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-mono tracking-wider text-amber-400 uppercase font-bold">
                                Official Business Registry
                            </span>
                        </div>

                        <div className="space-y-5 text-xs">
                            <div>
                                <label className="text-slate-400 font-semibold block text-[11px] mb-1">
                                    REGISTERED ENTITY
                                </label>
                                <div className="font-bold text-sm text-white">{config?.org_name || 'Road Safety Movement'}</div>
                                <div className="text-amber-300 text-xs mt-0.5">{config?.org_name_bn || 'নিরাপদ সড়ক আন্দোলন'}</div>
                            </div>

                            <div>
                                <label className="text-slate-400 font-semibold block text-[11px] mb-1">
                                    TRADE LICENSE NUMBER
                                </label>
                                <div className="font-mono text-amber-400 font-bold text-sm bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 inline-block">
                                    {config?.trade_license_number || '03247/2023-2025'}
                                </div>
                            </div>

                            {config?.tin_number && (
                                <div>
                                    <label className="text-slate-400 font-semibold block text-[11px] mb-1">
                                        E-TIN REGISTRATION
                                    </label>
                                    <div className="font-mono text-slate-300">
                                        {config?.tin_number}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-slate-400 font-semibold block text-[11px] mb-1">
                                    HEAD OFFICE ADDRESS
                                </label>
                                <div className="text-slate-200 leading-relaxed">
                                    {config?.head_office_address || 'House 04, Road 12/b, Sector 10, Uttara Model Town, Dhaka, Bangladesh'}
                                </div>
                                {config?.head_office_address_bn && (
                                    <div className="text-slate-400 text-[11px] mt-1">
                                        {config.head_office_address_bn}
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <label className="text-slate-400 font-semibold block text-[11px] mb-1">
                                    OFFICIAL CONTACT
                                </label>
                                <div className="text-slate-300">
                                    📞 {config?.contact_phone || '+880 1717-395047'}
                                </div>
                                <div className="text-slate-300 mt-1">
                                    ✉️ {config?.contact_email || 'roadsafetymovement.bd@gmail.com'}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <label className="text-slate-400 font-semibold block text-[11px] mb-1">
                                    CURRENCY & PAYMENTS
                                </label>
                                <div className="text-slate-300">
                                    Transactions processed in <strong>{config?.default_currency || 'BDT'} (৳)</strong> via SSLCommerz authorized gateway.
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
                            <Link
                                href="/apply"
                                className="block w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-center transition-all text-xs shadow-md"
                            >
                                Apply as Volunteer Cadet (৳70) →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* National Impact Metrics */}
            <section className="bg-slate-100/70 border-y border-slate-200/70 py-16 px-5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                            Scale of Civic Impact
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                            Eradicating Fatalities Across Bangladesh Corridors
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((s, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center">
                                <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">
                                    {s.value}
                                </div>
                                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                                    {s.label}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                    {s.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Member Hierarchy & Leadership Sync */}
            <section className="py-16 px-5 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                            Governance & Leadership
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                            National Directorates & Conveners
                        </h2>
                        <p className="text-slate-600 text-sm max-w-xl mt-1">
                            Direct oversight from technical experts, legal practitioners, and senior student conveners across all 8 specialized wings.
                        </p>
                    </div>

                    <Link
                        href="/hierarchy"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition shrink-0"
                    >
                        <span>Interactive Organogram</span>
                        <span>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {directorates.slice(0, 8).map((dir, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition text-center flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-amber-50 mx-auto flex items-center justify-center text-2xl font-bold text-amber-700 mb-4 border border-amber-200">
                                    🏛️
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1">{dir.convener_name}</h3>
                                <div className="text-amber-700 font-semibold text-xs mb-1">{dir.convener_title}</div>
                                {dir.name_bn && (
                                    <div className="text-[11px] text-slate-400 mb-3 font-bangla">{dir.name_bn}</div>
                                )}
                            </div>
                            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="font-medium text-slate-700 truncate">{dir.name_en}</span>
                                <span className="text-amber-800 font-bold shrink-0 ml-1">👥 {dir.member_count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
