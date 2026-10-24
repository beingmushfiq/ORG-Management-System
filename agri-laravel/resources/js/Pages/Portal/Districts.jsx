import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const DIVISIONS = ['All', 'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];

export default function Districts({ config, districts = [], filters = {}, stats = {} }) {
    const [selectedDivision, setSelectedDivision] = useState(filters.division || 'All');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [search, setSearch] = useState(filters.search || '');

    const [editingDistrict, setEditingDistrict] = useState(null);
    const [form, setForm] = useState({
        coordinator_name: '',
        coordinator_phone: '',
        coordinator_email: '',
        status: 'active',
        volunteer_count: 0,
        blackspots_count: 0,
        blackspot_notes: '',
    });

    const handleFilterSubmit = (e) => {
        e?.preventDefault();
        router.get(route('portal.districts'), {
            division: selectedDivision,
            status: statusFilter,
            search,
        }, { preserveState: true });
    };

    const openEdit = (d) => {
        setEditingDistrict(d);
        setForm({
            coordinator_name: d.coordinator_name || '',
            coordinator_phone: d.coordinator_phone || '',
            coordinator_email: d.coordinator_email || '',
            status: d.status || 'active',
            volunteer_count: d.volunteer_count || 0,
            blackspots_count: d.blackspots_count || 0,
            blackspot_notes: d.blackspot_notes || '',
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!editingDistrict) return;

        router.patch(route('portal.districts.update', editingDistrict.id), form, {
            onSuccess: () => setEditingDistrict(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                            <span>🗺️ 64 Districts Command & Coordinator Roster</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Appoint district coordinators, monitor active volunteer brigades, and register highway blackspots.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="64 Districts Command — Secretariat Portal" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* ── KPI METRICS CARDS ────────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-amber-400 font-mono">64</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Districts Mobilized</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-emerald-400 font-mono">{stats.active || 0}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Active Brigades</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-blue-400 font-mono">{(stats.total_volunteers || 0).toLocaleString()}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Volunteer Cadets</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-rose-400 font-mono">{stats.total_blackspots || 0}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Blackspots Audited</div>
                    </div>
                </div>

                {/* ── FILTER & SEARCH TOOLBAR ──────────────────────────────────────── */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <form onSubmit={handleFilterSubmit} className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative w-64">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search district or coordinator..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pl-8"
                                />
                                <span className="absolute left-2.5 top-2 text-xs text-slate-500">🔍</span>
                            </div>

                            <select
                                value={selectedDivision}
                                onChange={(e) => setSelectedDivision(e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400"
                            >
                                {DIVISIONS.map(d => (
                                    <option key={d} value={d}>{d === 'All' ? 'All Divisions' : `${d} Division`}</option>
                                ))}
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400"
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active Cell</option>
                                <option value="forming">Forming</option>
                                <option value="needs_volunteers">Needs Volunteers</option>
                            </select>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300 transition"
                            >
                                Filter
                            </button>
                        </div>

                        <div className="text-xs text-slate-400 font-mono">
                            Showing {districts.length} Districts
                        </div>
                    </form>
                </div>

                {/* ── DISTRICTS TABLE ──────────────────────────────────────────────── */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                                <tr>
                                    <th className="py-4 px-4">District</th>
                                    <th className="py-4 px-4">Division</th>
                                    <th className="py-4 px-4">Coordinator</th>
                                    <th className="py-4 px-4">Contact Phone</th>
                                    <th className="py-4 px-4">Cadets</th>
                                    <th className="py-4 px-4">Blackspots</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900">
                                {districts.map((d) => (
                                    <tr key={d.id} className="hover:bg-slate-900/60 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-white text-sm">
                                            <div>{d.name_en}</div>
                                            <div className="text-[11px] text-amber-400">{d.name_bn}</div>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-300">
                                            {d.division}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {d.coordinator_name ? (
                                                <div className="font-bold text-white flex items-center gap-1.5">
                                                    <span>👤</span>
                                                    <span>{d.coordinator_name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-rose-400 italic">⚠️ Vacant / Coordinator Needed</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 font-mono text-slate-400">
                                            {d.coordinator_phone || '—'}
                                        </td>
                                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                                            {d.volunteer_count || 0}
                                        </td>
                                        <td className="py-3.5 px-4 font-mono font-bold text-rose-400">
                                            {d.blackspots_count || 0}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                d.status === 'active'
                                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                    : d.status === 'forming'
                                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                            }`}>
                                                {d.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                onClick={() => openEdit(d)}
                                                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white rounded-lg text-xs font-bold transition border border-slate-700"
                                            >
                                                Edit Command
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ── EDIT DISTRICT MODAL ───────────────────────────────────────────── */}
            {editingDistrict && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                            <div>
                                <h3 className="text-lg font-black text-white">
                                    Configure {editingDistrict.name_en} ({editingDistrict.name_bn})
                                </h3>
                                <p className="text-xs text-slate-400">{editingDistrict.division} Division · Code: {editingDistrict.code}</p>
                            </div>
                            <button
                                onClick={() => setEditingDistrict(null)}
                                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Coordinator Full Name</label>
                                <input
                                    type="text"
                                    value={form.coordinator_name}
                                    onChange={(e) => setForm({ ...form, coordinator_name: e.target.value })}
                                    placeholder="e.g. Fahim Rahman Chowdhury"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Coordinator Phone</label>
                                    <input
                                        type="text"
                                        value={form.coordinator_phone}
                                        onChange={(e) => setForm({ ...form, coordinator_phone: e.target.value })}
                                        placeholder="+880 1711-xxxxxx"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Coordinator Email</label>
                                    <input
                                        type="email"
                                        value={form.coordinator_email}
                                        onChange={(e) => setForm({ ...form, coordinator_email: e.target.value })}
                                        placeholder="coordinator@domain.org"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Cell Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white"
                                    >
                                        <option value="active">Active</option>
                                        <option value="forming">Forming</option>
                                        <option value="needs_volunteers">Needs Volunteers</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Volunteer Cadets</label>
                                    <input
                                        type="number"
                                        value={form.volunteer_count}
                                        onChange={(e) => setForm({ ...form, volunteer_count: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Blackspots</label>
                                    <input
                                        type="number"
                                        value={form.blackspots_count}
                                        onChange={(e) => setForm({ ...form, blackspots_count: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Highway Blackspot Audit Notes</label>
                                <textarea
                                    rows="2"
                                    value={form.blackspot_notes}
                                    onChange={(e) => setForm({ ...form, blackspot_notes: e.target.value })}
                                    placeholder="Enter curve risk, speed enforcement details..."
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setEditingDistrict(null)}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300"
                                >
                                    Save District Command
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
