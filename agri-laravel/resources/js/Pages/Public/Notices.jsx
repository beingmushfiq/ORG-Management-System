import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Notices({ config, notices = [] }) {
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const defaultNotices = [
        {
            id: 1,
            memo_no: 'RSM/HQ/2026/GZ-042',
            category: 'gazette',
            priority: 'urgent',
            published_at: '2026-10-20',
            title: 'National Directive on Eliminating Highway Crash Blackspots: Joint Audit Protocol 2026',
            title_bn: 'মহাসড়কের দুর্ঘটনাকবলিত ব্ল্যাকস্পট সংস্কারে সমন্বিত অডিট প্রোটোকল সংক্রান্ত জাতীয় নির্দেশনা ২০২৬',
            body_html: 'In accordance with Central Secretariat Resolution 09/2026, all District Coordinators are instructed to complete Phase-1 LiDAR safety profiling of designated collision nodes by November 30.',
            signed_by: 'Engr. Mushfiqur Rahman (National Convener)',
            is_pinned: true,
            fileSize: '650 KB',
        },
        {
            id: 2,
            memo_no: 'RSM/DIR/TRAIN/2026-19',
            category: 'policy',
            priority: 'high',
            published_at: '2026-10-12',
            title: 'Standard Operating Procedure (SOP) for Roadside First Responders & Golden Hour Trauma Care',
            title_bn: 'সড়ক দুর্ঘটনায় গোল্ডেন আওয়ার জরুরি চিকিৎসা ও স্বেচ্ছাসেবক ক্যাডেট এসওপি নির্দেশনা',
            body_html: 'Standard protocol for Volunteer Cadets arriving first on road crash scenes: Immediate 999 alert, cervical spine stabilization, hemorrhagic tourniquet application, and crowd perimeter control.',
            signed_by: 'Dr. Sabrina Yesmin (Director of Medical Rescue)',
            is_pinned: true,
            fileSize: '1.2 MB',
        },
        {
            id: 3,
            memo_no: 'RSM/CIR/DIST-64/007',
            category: 'circular',
            priority: 'routine',
            published_at: '2026-10-04',
            title: 'Enrollment Window for 64-District Volunteer Brigade & Campus Road Safety Cells',
            title_bn: '৬৪ জেলায় স্বেচ্ছাসেবক ব্রিগেড ও শিক্ষাপ্রতিষ্ঠানভিত্তিক রোড সেফটি সেল নিবন্ধন বিজ্ঞপ্তি',
            body_html: 'Applications are formally invited from university and college students nationwide for the 2026 Volunteer Cadet intake across all 64 districts. Selected cadets receive certified life-saving training.',
            signed_by: 'Tanvir Ahmed (Director of Youth Mobilization)',
            is_pinned: false,
            fileSize: '410 KB',
        },
    ];

    const displayNotices = notices.length > 0 ? notices : defaultNotices;

    const filtered = displayNotices.filter((n) => {
        const matchesCategory = filter === 'ALL' || n.category === filter.toLowerCase();
        const q = search.toLowerCase().trim();
        const matchesSearch = !q ||
            n.title.toLowerCase().includes(q) ||
            (n.title_bn && n.title_bn.includes(q)) ||
            (n.memo_no && n.memo_no.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
    });

    return (
        <PublicLayout config={config}>
            <Head title={`Official Gazettes & Directives — ${config?.org_name || 'Road Safety Movement'}`} />

            {/* Header */}
            <div className="bg-slate-950 text-white border-b border-slate-800 py-16 px-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.15),transparent)]" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
                        Official Secretariat Gazette
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        Gazettes, Directives & Policy Circulars
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Authenticated administrative circulars, golden-hour medical SOPs, highway audit directives, and national executive resolutions.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-5 py-12">
                {/* Search & Filter Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        {['ALL', 'GAZETTE', 'POLICY', 'CIRCULAR'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                    filter === f
                                        ? 'bg-slate-900 text-amber-400 border border-slate-700 shadow-sm'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {f === 'ALL' ? 'All Gazettes' : f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or memo number..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 pl-8"
                        />
                        <span className="absolute left-2.5 top-2 text-xs text-slate-400">🔍</span>
                    </div>
                </div>

                {/* Notices List */}
                <div className="space-y-4">
                    {filtered.map((item, idx) => {
                        const dateFormatted = item.published_at
                            ? new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'October 2026';

                        return (
                            <motion.div
                                key={item.id || idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-amber-400/80 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
                            >
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {item.is_pinned && (
                                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                                                📌 Pinned Gazette
                                            </span>
                                        )}
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            item.priority === 'urgent'
                                                ? 'bg-rose-100 text-rose-800'
                                                : item.priority === 'high'
                                                ? 'bg-amber-100 text-amber-800'
                                                : 'bg-slate-100 text-slate-700'
                                        }`}>
                                            {item.priority || 'Routine'}
                                        </span>
                                        <span className="text-[11px] font-mono font-bold text-slate-500">
                                            {item.memo_no || 'RSM/DIR/GZ'}
                                        </span>
                                        <span className="text-[11px] text-slate-400 font-semibold">
                                            • {dateFormatted}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.title_bn && (
                                            <div className="text-xs font-bold text-slate-500 mt-0.5">
                                                {item.title_bn}
                                            </div>
                                        )}
                                    </div>

                                    {item.body_html && (
                                        <div
                                            className="text-xs text-slate-600 line-clamp-2 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: item.body_html }}
                                        />
                                    )}

                                    {item.signed_by && (
                                        <div className="text-[11px] text-slate-400 font-bold">
                                            Signed: <span className="text-slate-700">{item.signed_by}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="shrink-0 flex items-center gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                                    <button
                                        onClick={() => alert(`Notice Document Verified: ${item.memo_no || item.title}\nIssued by Central Secretariat, Road Safety Movement Bangladesh.`)}
                                        className="px-4 py-2 rounded-xl text-xs font-black bg-slate-900 text-white hover:bg-amber-400 hover:text-slate-950 transition-all flex items-center gap-1.5 shadow-sm"
                                    >
                                        <span>📜 View Memo</span>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </PublicLayout>
    );
}
