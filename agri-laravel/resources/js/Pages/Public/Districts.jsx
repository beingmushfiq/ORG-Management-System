import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { GlassCard, KineticHeading, SectionDivider } from '@/Components/UI/SharedComponents';

const DIVISIONS = ['All', 'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];

export default function Districts({ config, districts = [], stats = {} }) {
    const [selectedDivision, setSelectedDivision] = useState('All');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDistrict, setActiveDistrict] = useState(null);

    const filteredDistricts = useMemo(() => {
        return districts.filter((d) => {
            const matchesDivision = selectedDivision === 'All' || d.division.toLowerCase() === selectedDivision.toLowerCase();
            const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                d.name_en.toLowerCase().includes(q) ||
                d.name_bn.includes(q) ||
                (d.coordinator_name && d.coordinator_name.toLowerCase().includes(q)) ||
                d.division.toLowerCase().includes(q);

            return matchesDivision && matchesStatus && matchesSearch;
        });
    }, [districts, selectedDivision, statusFilter, searchQuery]);

    const divisionCounts = useMemo(() => {
        const counts = { All: districts.length };
        districts.forEach((d) => {
            counts[d.division] = (counts[d.division] || 0) + 1;
        });
        return counts;
    }, [districts]);

    return (
        <PublicLayout config={config}>
            <Head>
                <title>{`64 District Command & Volunteer Brigade — ${config?.org_name || 'Road Safety Movement'}`}</title>
                <meta name="description" content="Explore Road Safety Movement (RSM) field cells, local coordinators, and blackspot audits across all 64 districts of Bangladesh. Apply to lead or volunteer." />
            </Head>

            {/* ── HERO BANNER ──────────────────────────────────────────────────────── */}
            <section className="relative pt-20 pb-16 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.18),rgba(255,255,255,0))]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase mb-6"
                    >
                        <span>🗺️ Nationwide Ground Network</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    </motion.div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
                        64-District Vision Zero Command
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        Bangladesh's largest decentralized citizen traffic safety network. Every district has dedicated volunteer cadets monitoring high-risk crash curves, escorting children across school zones, and responding during golden hours.
                    </p>

                    {/* Stats Ticker */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl">
                            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">64</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Districts Mobilized</div>
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl">
                            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">{stats.active_cells || 38}</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Active Brigades</div>
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl">
                            <div className="text-3xl sm:text-4xl font-black text-blue-400 font-mono">{(stats.total_volunteers || 8900).toLocaleString()}+</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Volunteer Cadets</div>
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl">
                            <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">{stats.total_blackspots || 420}+</div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Blackspots Audited</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FILTER & SEARCH TOOLBAR ──────────────────────────────────────────── */}
            <section className="bg-slate-900 border-b border-slate-800 sticky top-20 z-30 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search district (e.g. Comilla, ঢাকা)..."
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pl-9 transition-colors"
                        />
                        <span className="absolute left-3 top-2.5 text-slate-500 text-sm">🔍</span>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs font-bold"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Status Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                                statusFilter === 'all'
                                    ? 'bg-amber-400 text-slate-950 font-black'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            All Status ({districts.length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('active')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                                statusFilter === 'active'
                                    ? 'bg-emerald-500 text-slate-950 font-black'
                                    : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
                            }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            Active Cell ({districts.filter(d => d.status === 'active').length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('forming')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                                statusFilter === 'forming'
                                    ? 'bg-amber-500 text-slate-950 font-black'
                                    : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                            }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            Forming ({districts.filter(d => d.status === 'forming').length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('needs_volunteers')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                                statusFilter === 'needs_volunteers'
                                    ? 'bg-rose-500 text-white font-black'
                                    : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
                            }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                            Needs Cadets ({districts.filter(d => d.status === 'needs_volunteers').length})
                        </button>
                    </div>
                </div>

                {/* Division Pills */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 overflow-x-auto flex items-center gap-2 border-t border-slate-800/80 pt-2.5">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-black shrink-0 mr-1">
                        Division:
                    </span>
                    {DIVISIONS.map((div) => {
                        const count = divisionCounts[div] || 0;
                        const isSelected = selectedDivision === div;
                        return (
                            <button
                                key={div}
                                onClick={() => setSelectedDivision(div)}
                                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
                                    isSelected
                                        ? 'bg-white text-slate-950 font-black shadow-sm'
                                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                                }`}
                            >
                                {div} <span className="opacity-70 text-[10px]">({count})</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ── 64 DISTRICTS GRID ────────────────────────────────────────────────── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1">
                {filteredDistricts.length === 0 ? (
                    <div className="text-center py-24 bg-slate-50 border border-slate-200 rounded-3xl p-8">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-lg font-black text-slate-800 mb-2">No districts matched your search</h3>
                        <p className="text-sm text-slate-500 mb-6">Try clearing filters or search terms to see all 64 districts.</p>
                        <button
                            onClick={() => { setSelectedDivision('All'); setStatusFilter('all'); setSearchQuery(''); }}
                            className="px-6 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                                Showing {filteredDistricts.length} of 64 Districts
                            </div>
                            <div className="text-xs text-slate-500 font-semibold hidden sm:block">
                                Click any card to inspect local coordinator or volunteer to lead
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredDistricts.map((d) => {
                                const isActiveCell = d.status === 'active';
                                const isForming = d.status === 'forming';

                                return (
                                    <motion.div
                                        key={d.code}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:border-amber-400/80 transition-all flex flex-col justify-between group relative overflow-hidden"
                                    >
                                        <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                                            isActiveCell ? 'bg-emerald-500' : isForming ? 'bg-amber-500' : 'bg-rose-500'
                                        }`} />

                                        <div>
                                            <div className="flex items-start justify-between gap-2 mb-3 mt-1">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                                        {d.division} Division
                                                    </span>
                                                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1 group-hover:text-amber-600 transition-colors">
                                                        {d.name_en}
                                                    </h3>
                                                    <p className="text-xs font-bold text-slate-600">
                                                        {d.name_bn}
                                                    </p>
                                                </div>

                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                                                    isActiveCell
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : isForming
                                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        isActiveCell ? 'bg-emerald-500' : isForming ? 'bg-amber-500' : 'bg-rose-500'
                                                    }`} />
                                                    {d.status.replace('_', ' ')}
                                                </span>
                                            </div>

                                            {/* Key Metrics */}
                                            <div className="grid grid-cols-2 gap-2 my-3 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                                <div>
                                                    <div className="text-[10px] uppercase font-bold text-slate-600">Active Cadets</div>
                                                    <div className="text-base font-black text-slate-900 font-mono">
                                                        {d.volunteer_count || 0}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] uppercase font-bold text-slate-600">Blackspots</div>
                                                    <div className="text-base font-black text-rose-600 font-mono">
                                                        {d.blackspots_count || 0}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Coordinator info */}
                                            <div className="text-xs text-slate-600 mb-4">
                                                <div className="text-[10px] uppercase font-black tracking-wider text-slate-600 mb-0.5">
                                                    District Command
                                                </div>
                                                {d.coordinator_name ? (
                                                    <div className="font-bold text-slate-800 truncate">
                                                        👤 {d.coordinator_name}
                                                    </div>
                                                ) : (
                                                    <div className="text-rose-600 font-bold flex items-center gap-1">
                                                        ⚠️ Cell Forming · Coordinator Needed
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-3 border-t border-slate-100">
                                            <Link
                                                href={`/apply?district=${d.code}`}
                                                className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-center block transition-all bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 shadow-sm"
                                            >
                                                {d.coordinator_name ? 'Join District Brigade →' : 'Apply to Lead District →'}
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>

            {/* ── BANGLADESH RAPID CRASH HELPLINE SECTION ──────────────────────────── */}
            <section className="bg-amber-400 text-slate-950 py-10 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div>
                        <span className="px-3 py-1 rounded-full bg-slate-950 text-white text-[10px] font-black uppercase tracking-wider inline-block mb-2">
                            24/7 National Emergency Hotline
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Witnessed a Road Crash or Severe Highway Blackspot Hazard?
                        </h2>
                        <p className="text-slate-800 text-xs sm:text-sm font-semibold max-w-xl mt-1">
                            Notify our regional cadet responders and national highway authorities instantly. Every second counts during the golden hour.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                        <a
                            href="tel:999"
                            className="px-6 py-3 bg-slate-950 text-white font-black rounded-xl text-xs sm:text-sm hover:bg-slate-900 shadow-lg flex items-center gap-2"
                        >
                            <span>🚨 Dial 999 (National)</span>
                        </a>
                        <Link
                            href="/apply"
                            className="px-6 py-3 bg-white text-slate-950 font-black rounded-xl text-xs sm:text-sm hover:bg-amber-50 shadow-lg"
                        >
                            Register as First Responder
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
