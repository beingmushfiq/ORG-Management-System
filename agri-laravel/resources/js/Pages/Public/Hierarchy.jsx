import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Hierarchy({ config, hierarchy }) {
    const [selectedLevel, setSelectedLevel] = useState('ALL');
    const [activeCard, setActiveCard] = useState(null);

    const levels = ['ALL', 'Apex Directorate', 'Standing Committee', 'Technical Wing', 'Humanitarian Wing', 'Regional Council', 'Student Wing', 'Communications Wing', 'Oversight Directorate'];

    const committees = hierarchy || [];

    const filtered = selectedLevel === 'ALL'
        ? committees
        : committees.filter(c => c.level === selectedLevel);

    const totalMembers = committees.reduce((sum, c) => sum + (c.member_count || 0), 0);

    const getIcon = (key) => {
        switch (key) {
            case 'shield': return '🛡️';
            case 'scale': return '⚖️';
            case 'alert': return '🚧';
            case 'heart': return '❤️';
            case 'building': return '🏛️';
            case 'graduation': return '🎓';
            case 'megaphone': return '📢';
            case 'book': return '📚';
            default: return '🔰';
        }
    };

    return (
        <PublicLayout config={config}>
            <Head title={`Member Hierarchy & National Governance — ${config?.org_name || 'Road Safety Movement'}`} />

            {/* Header Banner */}
            <div className="bg-slate-950 text-white py-16 px-5 border-b border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                        <span>🏛️ Governance & Directorate Organogram</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
                        Member Hierarchy & Executive Leadership
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                        Democratic leadership structure spanning the National Organizing Secretariat, Legal Advocacy Wing, Blackspot Taskforce, and 64-District Coordination Councils.
                    </p>

                    {/* Quick Stats Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-300">
                        <span className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10">
                            🏛️ <strong className="text-white">{committees.length}</strong> Specialized Directorates
                        </span>
                        <span className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10">
                            👥 <strong className="text-amber-400">{totalMembers}+</strong> Council Officers
                        </span>
                        <span className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10">
                            📍 <strong className="text-white">64</strong> District Chapters
                        </span>
                        <span className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10">
                            🛡️ Trade License: <strong className="text-amber-300 font-mono">{config?.trade_license_number || '03247/2023-2025'}</strong>
                        </span>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="max-w-6xl mx-auto px-5 py-8">
                <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase mr-2">Filter Level:</span>
                    {levels.map((lvl) => (
                        <button
                            key={lvl}
                            type="button"
                            onClick={() => setSelectedLevel(lvl)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                selectedLevel === lvl
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                            }`}
                        >
                            {lvl === 'ALL' ? 'All Directorates & Wings' : lvl}
                        </button>
                    ))}
                </div>

                {/* Hierarchy Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group hover:border-amber-500/60"
                        >
                            <div>
                                {/* Top Badge Bar */}
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                                        <span className="text-base">{getIcon(item.icon_key)}</span>
                                        <span>Rank #{item.rank}</span>
                                    </span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                                        {item.level}
                                    </span>
                                </div>

                                {/* Directorate Titles */}
                                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition leading-snug mb-1">
                                    {item.name_en}
                                </h3>
                                {item.name_bn && (
                                    <div className="text-xs font-semibold text-slate-500 mb-4 font-bangla">
                                        {item.name_bn}
                                    </div>
                                )}

                                {/* Convener Profile */}
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        Directorate Lead / Convener
                                    </div>
                                    <div className="font-bold text-slate-900 text-sm">
                                        {item.convener_name}
                                    </div>
                                    <div className="text-xs text-amber-700 font-semibold mt-0.5">
                                        {item.convener_title}
                                    </div>
                                    {item.convener_title_bn && (
                                        <div className="text-[11px] text-slate-500 mt-0.5">
                                            {item.convener_title_bn}
                                        </div>
                                    )}
                                </div>

                                {/* Mandate */}
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                    {item.mandate}
                                </p>
                            </div>

                            {/* Bottom Info & Contact */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 text-slate-600">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span className="font-bold text-slate-800">{item.member_count}</span>
                                    <span className="text-[11px] text-slate-500">Officers</span>
                                </div>

                                {item.contact_email && (
                                    <a
                                        href={`mailto:${item.contact_email}`}
                                        className="text-slate-500 hover:text-amber-700 font-medium text-[11px] transition truncate max-w-[150px]"
                                    >
                                        ✉️ {item.contact_email.split('@')[0]}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Organogram Architecture */}
                <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                            Structural Organogram
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black mt-2 text-white">
                            Subtree Hierarchy & Field Command Flow
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2">
                            Materialized Path telemetry guarantees clear chain of command from National Secretariat to 64-District student units.
                        </p>
                    </div>

                    <div className="space-y-4 max-w-2xl mx-auto text-xs">
                        {/* Tier 1 */}
                        <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-center">
                            <span className="font-mono text-amber-300 font-bold block text-[10px] uppercase">Tier 1 · Apex Governance</span>
                            <div className="font-black text-sm text-white mt-1">National Organizing Secretariat (Central HQ)</div>
                            <div className="text-slate-300 text-[11px]">Uttara Model Town, Dhaka · Trade License 03247/2023-2025</div>
                        </div>

                        <div className="flex justify-center text-slate-500 font-mono text-sm">↓</div>

                        {/* Tier 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                                <span className="font-mono text-blue-400 font-bold block text-[10px] uppercase">Tier 2A · Statutory & Legal</span>
                                <div className="font-bold text-slate-100 mt-0.5">Legal Advocacy & Compliance Bureau</div>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                                <span className="font-mono text-rose-400 font-bold block text-[10px] uppercase">Tier 2B · Highway Engineering</span>
                                <div className="font-bold text-slate-100 mt-0.5">Blackspot Elimination Taskforce</div>
                            </div>
                        </div>

                        <div className="flex justify-center text-slate-500 font-mono text-sm">↓</div>

                        {/* Tier 3 */}
                        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                            <span className="font-mono text-purple-400 font-bold block text-[10px] uppercase">Tier 3 · Regional Governance</span>
                            <div className="font-bold text-slate-100 mt-1">8 Divisional Coordination Councils</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">
                                Dhaka · Chattogram · Rajshahi · Khulna · Barishal · Sylhet · Rangpur · Mymensingh
                            </div>
                        </div>

                        <div className="flex justify-center text-slate-500 font-mono text-sm">↓</div>

                        {/* Tier 4 */}
                        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-600/40 text-center">
                            <span className="font-mono text-emerald-400 font-bold block text-[10px] uppercase">Tier 4 · Grassroots Movement</span>
                            <div className="font-black text-sm text-white mt-1">64 District Volunteer Cells & Campus Ambassadors</div>
                            <div className="text-emerald-300 text-[11px]">75,000+ Enrolled Volunteers Supervising School Zebra Crossings</div>
                        </div>
                    </div>
                </div>

                {/* Apply CTA Banner */}
                <div className="mt-14 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div>
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-black/10 px-2.5 py-1 rounded-full">
                            Recruitment Open
                        </span>
                        <h3 className="text-2xl font-black mt-2 tracking-tight">
                            Want to Join or Lead a Road Safety Cell in Your District?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-900/80 max-w-xl mt-1 leading-relaxed">
                            Apply today as a Volunteer Cadet (BDT 70) or General Member (BDT 100). Receive your digital credential and participate in civic safety audits.
                        </p>
                    </div>

                    <Link
                        href="/apply"
                        className="shrink-0 px-7 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-lg hover:scale-105"
                    >
                        Apply for Membership →
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
