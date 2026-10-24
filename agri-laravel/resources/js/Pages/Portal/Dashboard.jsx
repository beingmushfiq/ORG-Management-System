import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth, config, hierarchy = [] }) {
    const user = auth?.user;
    const isStaff = !user?.role || user?.role?.tier_level <= 3;
    const roleName = user?.role?.name || (user?.email?.includes('admin') ? 'Super Admin (Tier 1)' : 'Volunteer Cadet');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black leading-tight text-white flex items-center gap-2">
                            <span>🛡️</span>
                            <span>{isStaff ? 'Vision Zero Secretariat Command War Room' : 'Cadet & Volunteer Field Terminal'}</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Active Identity: <strong className="text-amber-400">{user?.name}</strong> · Role: <span className="font-bold text-white">{roleName}</span> · District: <span className="font-mono text-slate-300">{user?.district?.name_en || 'Dhaka Central'}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {isStaff ? (
                            <Link
                                href="/portal/cms"
                                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow-md transition"
                            >
                                🎨 Visual CMS Studio →
                            </Link>
                        ) : (
                            <Link
                                href={`/portal/users/${user?.id}`}
                                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5"
                            >
                                <span>🆔 My Digital ID Pass</span>
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={`${isStaff ? 'War Room' : 'Cadet Terminal'} — Road Safety Movement`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* ══════════════════════════════════════════════════════════════════
                    CADET / MEMBER TERMINAL VIEW (Tiers 4 & 5)
                ══════════════════════════════════════════════════════════════════ */}
                {!isStaff ? (
                    <div className="space-y-6">
                        {/* Digital Cadet ID Badge Card */}
                        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                                    <div className="w-20 h-20 rounded-2xl bg-amber-400 text-slate-950 font-black text-3xl flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                                        {user?.name?.charAt(0) || 'C'}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                                {roleName}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                ● Active Field Status
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-white">{user?.name}</h3>
                                        <div className="text-xs text-slate-400 font-mono">
                                            Badge ID: <strong className="text-amber-400">{user?.badge_number || `RSM-CDT-${user?.id}`}</strong> · District: <strong className="text-white">{user?.district?.name_en || 'Dhaka'}</strong>
                                        </div>
                                        <div className="text-xs text-slate-300 pt-1">
                                            🩸 Blood Group: <strong className="text-rose-400 font-mono font-black">{user?.blood_group || 'O+'}</strong> · Emergency: <span className="font-mono text-slate-400">{user?.emergency_contact || 'Registered'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                                    <Link
                                        href={`/portal/users/${user?.id}`}
                                        className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition"
                                    >
                                        View Full ID Dossier ↗
                                    </Link>
                                    <Link
                                        href="/courses"
                                        className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                                    >
                                        Training Academy 📚
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Frontline Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl">
                                    ⚠️
                                </div>
                                <h4 className="text-base font-black text-white">Report Roadside Blackspot</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Encountered an illegal u-turn, broken barrier, or blind corner? File a blackspot audit report for the Engineering Taskforce.
                                </p>
                                <Link
                                    href="/portal/districts"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline pt-2"
                                >
                                    <span>Log Highway Hazard</span>
                                    <span>→</span>
                                </Link>
                            </div>

                            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-xl">
                                    📚
                                </div>
                                <h4 className="text-base font-black text-white">First Responder Academy</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Learn golden-hour trauma triage, safe crash victim extrication, and road transport act citizen enforcement modules.
                                </p>
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline pt-2"
                                >
                                    <span>Browse Courses</span>
                                    <span>→</span>
                                </Link>
                            </div>

                            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                                    👥
                                </div>
                                <h4 className="text-base font-black text-white">District Cadet Brigade</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Connect with fellow volunteers in {user?.district?.name_en || 'your district'} and coordinate with your District Coordinator.
                                </p>
                                <Link
                                    href="/districts"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline pt-2"
                                >
                                    <span>View 64 Districts Grid</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ══════════════════════════════════════════════════════════════════
                       LEADERSHIP / STAFF COMMAND WAR ROOM (Tiers 1, 2, & 3)
                    ══════════════════════════════════════════════════════════════════ */
                    <div className="space-y-6">
                        {/* KPI Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                                    <span>Volunteer Cadets</span>
                                    <span className="text-base">👥</span>
                                </div>
                                <div className="text-3xl font-black text-amber-400 font-mono mt-2">50,000+</div>
                                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                                    Across 64 District Cells
                                </div>
                            </div>

                            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                                    <span>Districts Mobilized</span>
                                    <span className="text-base">🗺️</span>
                                </div>
                                <div className="text-3xl font-black text-emerald-400 font-mono mt-2">64 / 64</div>
                                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                                    100% Nationwide Coverage
                                </div>
                            </div>

                            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                                    <span>Blackspots Audited</span>
                                    <span className="text-base">⚠️</span>
                                </div>
                                <div className="text-3xl font-black text-rose-400 font-mono mt-2">420+</div>
                                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                                    High-Risk Collision Nodes
                                </div>
                            </div>

                            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                                    <span>Statutory Compliance</span>
                                    <span className="text-base">📜</span>
                                </div>
                                <div className="text-xl font-black text-emerald-400 mt-2 flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                    100% Active
                                </div>
                                <div className="text-[11px] text-slate-400 mt-1">
                                    PCI-DSS SSLCommerz (BDT)
                                </div>
                            </div>
                        </div>

                        {/* Command Module Shortcuts */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Link
                                href="/portal/members"
                                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/60 p-6 rounded-3xl transition-all shadow-xl group block"
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">👥</div>
                                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                                    Member Directory & RBAC
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Search, filter, bulk activate, assign districts, and manage 5-tier role permissions.
                                </p>
                                <div className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                                    <span>Open Directory</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            <Link
                                href="/portal/districts"
                                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/60 p-6 rounded-3xl transition-all shadow-xl group block"
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🗺️</div>
                                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                                    64 Districts Command
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Appoint district coordinators, inspect volunteer brigade counts, and log blackspot audits.
                                </p>
                                <div className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                                    <span>Manage Districts</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            <Link
                                href="/portal/content"
                                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/60 p-6 rounded-3xl transition-all shadow-xl group block"
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📰</div>
                                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                                    Content Management
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Create public campaigns, publish official gazettes/directives, and upload action photos.
                                </p>
                                <div className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                                    <span>Publish Content</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            <Link
                                href="/portal/cms"
                                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/60 p-6 rounded-3xl transition-all shadow-xl group block"
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎨</div>
                                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                                    Visual CMS Studio
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Customize logo, HSL brand colors, homepage section visibility, organogram, and legal policies.
                                </p>
                                <div className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                                    <span>Open Studio</span>
                                    <span>→</span>
                                </div>
                            </Link>
                        </div>

                        {/* CMS Studio Quick Banner */}
                        <div className="bg-gradient-to-r from-amber-500/20 via-slate-950 to-slate-950 border border-amber-500/30 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-1">
                                <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest">
                                    Autonomous Organization Customization
                                </span>
                                <h3 className="text-2xl font-black text-white">Full CMS Synchronization Active</h3>
                                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                                    Every single section on the public site — from the 3D hero scene, 64-district map, mission pillars, stats ticker, down to the trade license and footer columns — can be edited, shown, hidden, or customized without touching code.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <Link
                                    href="/portal/cms"
                                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-lg transition"
                                >
                                    Configure Homepage Sections →
                                </Link>
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs border border-slate-700 transition"
                                >
                                    View Live Site ↗
                                </a>
                            </div>
                        </div>

                        {/* 8 National Directorates Summary */}
                        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                                <div>
                                    <h4 className="font-black text-white text-base">National Directorate Command Roster</h4>
                                    <p className="text-xs text-slate-400">8 Specialized Directorates powering the 5-Tier field hierarchy</p>
                                </div>
                                <Link href="/portal/cms" className="text-xs font-bold text-amber-400 hover:underline">
                                    Edit Hierarchy Organogram →
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {hierarchy.slice(0, 8).map((h) => (
                                    <div key={h.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                                            Rank #{h.rank} · {h.level || 'Directorate'}
                                        </span>
                                        <h5 className="font-bold text-white text-xs mt-1 truncate">{h.name_en}</h5>
                                        <div className="text-[11px] text-slate-400 mt-1 truncate">
                                            Lead: <strong className="text-slate-300">{h.convener_name}</strong>
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                            Officers: {h.member_count} Members
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
