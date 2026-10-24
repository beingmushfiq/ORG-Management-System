import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Events({ config, events = [] }) {
    const defaultCampaigns = [
        {
            stage: 'National Hearing',
            title: 'National Vision Zero 2026 Policy Hearing & Highway Safety Summit',
            title_bn: 'জাতীয় ভিশন জিরো ২০২৬ নীতি সংলাপ ও হাইওয়ে নিরাপত্তা সম্মেলন',
            date: 'Dec 15, 2026 · 10:00 AM',
            location: 'Bangabandhu International Conference Center (BICC), Agargaon, Dhaka',
            status: 'UPCOMING',
            desc: 'Convening policymakers, transport engineers, BUET ARI scientists, and crash victims to present the 64-District Blackspot Audit Report and demand statutory highway engineering reforms.',
            icon: '🏛️',
            attendees: 1250,
        },
        {
            stage: 'LiDAR Field Audit',
            title: 'Dhaka-Chittagong Expressway (N1) Blackspot Safety Inspection & Rapid Audit',
            title_bn: 'ঢাকা-চট্টগ্রাম মহাসড়ক (এন-১) দুর্ঘটনাস্থল ও ব্ল্যাকস্পট সরাসরি মাঠপর্যায়ে পরিদর্শন',
            date: 'Jan 05 – 10, 2027',
            location: 'Comilla & Feni Highway Corridor (N1)',
            status: 'UPCOMING',
            desc: 'Mobilizing 80 trained cadet engineers with LiDAR speed guns and reflective audit markers across 24 high-casualty curves between Daudkandi and Sitakunda.',
            icon: '🔍',
            attendees: 320,
        },
        {
            stage: 'Cadet Bootcamp',
            title: '64-District Volunteer Cadet First Responder Bootcamp',
            title_bn: '৬৪ জেলায় স্বেচ্ছাসেবক ক্যাডেট প্রাথমিক চিকিৎসা ও রেসকিউ বুটক্যাম্প',
            date: 'Feb 02 – 04, 2027',
            location: 'Central Field Command Ground, Uttara, Dhaka',
            status: 'ENROLLING',
            desc: 'Intensive golden-hour emergency trauma resuscitation, roadside bleeding control, and crowd management training certified by emergency trauma specialists.',
            icon: '🚑',
            attendees: 600,
        },
        {
            stage: 'Citizen Rally',
            title: 'National Zebra Crossing & Pedestrian Right-of-Way Campaign',
            title_bn: 'জেব্রা ক্রসিং ও পথচারীর অধিকার সুরক্ষা বিষয়ক দেশব্যাপী জনসচেতনতা কর্মসূচি',
            date: 'Ongoing Weekly Actions',
            location: 'Major University Campus Roads & School Zones Nationwide',
            status: 'ACTIVE',
            desc: 'Simultaneous citizen awareness rallies and driver sensitization across all major university campus roads and school zones, painting 3D optical crosswalks.',
            icon: '🚸',
            attendees: 2400,
        },
    ];

    const displayEvents = events.length > 0 ? events : defaultCampaigns;

    return (
        <PublicLayout config={config}>
            <Head title={`Field Campaigns & Blackspot Audits — ${config?.org_name || 'Road Safety Movement'}`} />

            {/* Header */}
            <div className="bg-slate-950 text-white border-b border-slate-800 py-16 px-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.15),transparent)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
                        Field Actions & Policy Advocacy
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        Campaigns & Highway Blackspot Audits
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Join our organized citizen brigades auditing crash hotspots, inspecting public bus speed governors, and holding transport authorities accountable.
                    </p>
                </div>
            </div>

            {/* Timeline / Event Cards */}
            <div className="max-w-5xl mx-auto px-5 py-14">
                <div className="space-y-6">
                    {displayEvents.map((ev, idx) => {
                        const title = ev.title;
                        const titleBn = ev.title_bn;
                        const dateStr = ev.event_date ? new Date(ev.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : (ev.date || 'TBD');
                        const location = ev.location || 'Nationwide';
                        const summary = ev.summary || ev.desc;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:border-amber-400/80 transition-all flex flex-col md:flex-row items-start justify-between gap-6"
                            >
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-400 font-mono text-[10px] font-black uppercase tracking-wider">
                                            {ev.type ? ev.type.toUpperCase() : (ev.stage || 'CAMPAIGN')}
                                        </span>
                                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                            <span>📅</span>
                                            <span>{dateStr}</span>
                                        </span>
                                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                            <span>📍</span>
                                            <span>{location}</span>
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                            {title}
                                        </h3>
                                        {titleBn && (
                                            <p className="text-xs sm:text-sm font-bold text-amber-600 mt-0.5">
                                                {titleBn}
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {summary}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2">
                                        <span>👥 Expected Cadets: <strong className="text-slate-900 font-mono font-black">{ev.attendees_count || ev.attendees || 250}+</strong></span>
                                        <span>•</span>
                                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">Free Participation</span>
                                    </div>
                                </div>

                                <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
                                    <Link
                                        href="/apply"
                                        className="w-full md:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow-md block text-center"
                                    >
                                        RSVP as Volunteer →
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </PublicLayout>
    );
}
