import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Members({ config, users = [], roles = [], districts = [], filters = {}, stats = {} }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role_id || '');
    const [districtFilter, setDistrictFilter] = useState(filters.district_id || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const [bulkTargetDistrict, setBulkTargetDistrict] = useState('');
    const [bulkTargetRole, setBulkTargetRole] = useState('');
    const [showBulkDistrictModal, setShowBulkDistrictModal] = useState(false);
    const [showBulkRoleModal, setShowBulkRoleModal] = useState(false);

    // Apply client filter or trigger server filter
    const handleFilterSubmit = (e) => {
        e?.preventDefault();
        router.get(route('portal.members'), {
            search,
            role_id: roleFilter,
            district_id: districtFilter,
            status: statusFilter,
        }, { preserveState: true });
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === users.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(users.map(u => u.id));
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const executeBulk = (action, extraData = {}) => {
        if (selectedIds.length === 0) return;
        if (action === 'delete' && !confirm(`Are you sure you want to permanently delete ${selectedIds.length} members?`)) {
            return;
        }

        router.post(route('portal.members.bulk'), {
            action,
            ids: selectedIds,
            ...extraData,
        }, {
            onSuccess: () => {
                setSelectedIds([]);
                setShowBulkDistrictModal(false);
                setShowBulkRoleModal(false);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                            <span>👥 Member Directory & 5-Tier RBAC Command</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Manage volunteer cadets, district coordinators, directorate officers, and custom roles.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/portal/districts"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 transition"
                        >
                            🗺️ 64 Districts Command
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Member Directory & 5-Tier RBAC — Secretariat Portal" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* ── KPI METRICS CARDS ────────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-white font-mono">{stats.total || users.length}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Total Enrolled</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-emerald-400 font-mono">{stats.active || 0}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Active Members</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-amber-400 font-mono">{stats.cadets || 0}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Volunteer Cadets</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-rose-400 font-mono">{stats.suspended || 0}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Suspended / Inactive</div>
                    </div>
                </div>

                {/* ── FILTER & SEARCH TOOLBAR ──────────────────────────────────────── */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search name, email, badge..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pl-8"
                            />
                            <span className="absolute left-2.5 top-2 text-xs text-slate-500">🔍</span>
                        </div>

                        <div>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                            >
                                <option value="">All 5 Roles</option>
                                {roles.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.name} (Tier {r.tier_level})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={districtFilter}
                                onChange={(e) => setDistrictFilter(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                            >
                                <option value="">All 64 Districts</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.id}>
                                        {d.name_en} ({d.division})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                            >
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition shadow-sm"
                            >
                                Filter Directory
                            </button>
                            {(search || roleFilter || districtFilter || statusFilter) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch(''); setRoleFilter(''); setDistrictFilter(''); setStatusFilter('');
                                        router.get(route('portal.members'));
                                    }}
                                    className="px-3 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* ── FLOATING BULK ACTION BAR ─────────────────────────────────────── */}
                <AnimatePresence>
                    {selectedIds.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-amber-400 text-slate-950 p-3.5 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-amber-300 sticky top-20 z-30"
                        >
                            <div className="flex items-center gap-2 font-black text-xs">
                                <span className="bg-slate-950 text-white px-2.5 py-1 rounded-lg font-mono">
                                    {selectedIds.length} Selected
                                </span>
                                <span>Bulk Actions Available:</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => executeBulk('activate')}
                                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition shadow-xs"
                                >
                                    ✅ Activate Selected
                                </button>
                                <button
                                    onClick={() => executeBulk('suspend')}
                                    className="px-3 py-1.5 bg-amber-900 hover:bg-amber-800 text-white font-bold rounded-xl text-xs transition shadow-xs"
                                >
                                    ⏸️ Suspend Selected
                                </button>
                                <button
                                    onClick={() => setShowBulkDistrictModal(true)}
                                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold rounded-xl text-xs transition shadow-xs"
                                >
                                    🗺️ Assign District
                                </button>
                                <button
                                    onClick={() => setShowBulkRoleModal(true)}
                                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold rounded-xl text-xs transition shadow-xs"
                                >
                                    🛡️ Change Role Tier
                                </button>
                                <button
                                    onClick={() => executeBulk('delete')}
                                    className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-xl text-xs transition shadow-xs"
                                >
                                    🗑️ Delete
                                </button>
                                <button
                                    onClick={() => setSelectedIds([])}
                                    className="px-2.5 py-1.5 text-slate-900 hover:text-black font-extrabold text-xs"
                                >
                                    ✕ Clear
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── MEMBERS DATATABLE ────────────────────────────────────────────── */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                                <tr>
                                    <th className="py-4 px-4 w-10">
                                        <input
                                            type="checkbox"
                                            checked={users.length > 0 && selectedIds.length === users.length}
                                            onChange={toggleSelectAll}
                                            className="rounded border-slate-700 bg-slate-800 text-amber-400 focus:ring-0 cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-4 px-4">Member / Cadet</th>
                                    <th className="py-4 px-4">Role Tier (RBAC)</th>
                                    <th className="py-4 px-4">District / Cell</th>
                                    <th className="py-4 px-4">Contact Info</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-16 text-slate-500">
                                            No members matched the current filters.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((u) => {
                                        const isSelected = selectedIds.includes(u.id);
                                        const tier = u.role?.tier_level || 5;

                                        return (
                                            <tr
                                                key={u.id}
                                                className={`transition-colors hover:bg-slate-900/60 ${
                                                    isSelected ? 'bg-amber-500/10' : ''
                                                }`}
                                            >
                                                <td className="py-4 px-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleSelectRow(u.id)}
                                                        className="rounded border-slate-700 bg-slate-800 text-amber-400 focus:ring-0 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-black text-xs shrink-0">
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white text-sm">
                                                                <Link href={`/portal/users/${u.id}`} className="hover:text-amber-400 transition">
                                                                    {u.name}
                                                                </Link>
                                                            </div>
                                                            <div className="text-[11px] text-slate-500 font-mono">
                                                                Badge: {u.badge_number || `RSM-${u.id}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                        tier === 1
                                                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                                            : tier === 2
                                                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                                                            : tier === 3
                                                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                            : tier === 4
                                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                    }`}>
                                                        {u.role?.name || 'General Member'} (T{tier})
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    {u.district ? (
                                                        <div>
                                                            <div className="font-bold text-white">{u.district.name_en}</div>
                                                            <div className="text-[10px] text-slate-500">{u.district.division} Div</div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-500 italic">Central HQ / Unassigned</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-xs">
                                                    <div className="text-white truncate max-w-[160px]">{u.email}</div>
                                                    <div className="text-slate-400">{u.phone || 'No phone'}</div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                        u.status === 'active'
                                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                    }`}>
                                                        {u.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/portal/users/${u.id}`}
                                                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition border border-slate-700"
                                                        >
                                                            Profile
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Remove member '${u.name}'?`)) {
                                                                    router.delete(route('portal.users.destroy', u.id));
                                                                }
                                                            }}
                                                            className="p-1 hover:text-rose-400 text-slate-500 transition"
                                                            title="Delete Member"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ── BULK ASSIGN DISTRICT MODAL ────────────────────────────────────── */}
            {showBulkDistrictModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-lg font-black text-white mb-2">Assign {selectedIds.length} Members to District</h3>
                        <p className="text-xs text-slate-400 mb-4">Choose which of Bangladesh's 64 districts these members will be mobilized to.</p>

                        <select
                            value={bulkTargetDistrict}
                            onChange={(e) => setBulkTargetDistrict(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white mb-6 focus:border-amber-400"
                        >
                            <option value="">Select Target District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.id}>
                                    {d.name_en} — {d.name_bn} ({d.division} Division)
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowBulkDistrictModal(false)}
                                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => executeBulk('assign_district', { district_id: bulkTargetDistrict })}
                                disabled={!bulkTargetDistrict}
                                className="px-5 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300 disabled:opacity-50"
                            >
                                Confirm Assignment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── BULK CHANGE ROLE MODAL ────────────────────────────────────────── */}
            {showBulkRoleModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-lg font-black text-white mb-2">Change RBAC Role Tier for {selectedIds.length} Members</h3>
                        <p className="text-xs text-slate-400 mb-4">Adjust authority and access permissions across the 5-tier command hierarchy.</p>

                        <select
                            value={bulkTargetRole}
                            onChange={(e) => setBulkTargetRole(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white mb-6 focus:border-amber-400"
                        >
                            <option value="">Select Target Role Tier</option>
                            {roles.map(r => (
                                <option key={r.id} value={r.id}>
                                    {r.name} (Tier {r.tier_level})
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowBulkRoleModal(false)}
                                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => executeBulk('change_role', { role_id: bulkTargetRole })}
                                disabled={!bulkTargetRole}
                                className="px-5 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300 disabled:opacity-50"
                            >
                                Apply Role Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
