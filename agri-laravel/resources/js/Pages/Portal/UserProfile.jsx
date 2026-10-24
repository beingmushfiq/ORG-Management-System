import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function UserProfile({ config, member, roles = [], districts = [], auditLogs = [] }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: member.name || '',
        email: member.email || '',
        role_id: member.role_id || '',
        district_id: member.district_id || '',
        directorate: member.directorate || '',
        status: member.status || 'active',
        phone: member.phone || '',
        blood_group: member.blood_group || '',
        emergency_contact: member.emergency_contact || '',
        badge_number: member.badge_number || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('portal.users.update', member.id));
    };

    const currentRole = roles.find(r => r.id === data.role_id) || member.role;
    const tier = currentRole?.tier_level || 5;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/portal/members"
                            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs"
                        >
                            ←
                        </Link>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                                <span>{member.name}</span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                    tier === 1 ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                                    tier === 2 ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                                    tier === 3 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                    tier === 4 ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                }`}>
                                    {currentRole?.name || 'Cadet'} (Tier {tier})
                                </span>
                            </h2>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">
                                Badge ID: {member.badge_number || `RSM-${member.id}`} · Member Since: {member.member_since ? new Date(member.member_since).toLocaleDateString() : 'Active'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/portal/members"
                            className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition"
                        >
                            Back to Directory
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Member Profile: ${member.name} — Secretariat Portal`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── LEFT: MEMBER IDENTITY CARD ─────────────────────────────────── */}
                    <div className="space-y-6">
                        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-center space-y-4">
                            <div className="w-24 h-24 rounded-3xl bg-amber-400 text-slate-950 font-black text-4xl flex items-center justify-center mx-auto shadow-xl shadow-amber-500/10">
                                {member.name.charAt(0)}
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-white">{member.name}</h3>
                                <p className="text-xs text-amber-400 font-bold">{currentRole?.name || 'Volunteer Cadet'}</p>
                                <p className="text-xs text-slate-400 mt-1">{member.email}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800 text-xs">
                                <div className="bg-slate-900 p-2.5 rounded-xl">
                                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Blood Group</span>
                                    <span className="font-mono font-black text-rose-400 text-sm">{member.blood_group || 'O+'}</span>
                                </div>
                                <div className="bg-slate-900 p-2.5 rounded-xl">
                                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Status</span>
                                    <span className="font-black text-emerald-400 text-sm capitalize">{member.status}</span>
                                </div>
                            </div>

                            <div className="bg-slate-900/60 p-4 rounded-2xl text-left text-xs space-y-2 border border-slate-800">
                                <div className="text-slate-400">
                                    <strong>Phone:</strong> <span className="text-white font-mono">{member.phone || 'N/A'}</span>
                                </div>
                                <div className="text-slate-400">
                                    <strong>Emergency:</strong> <span className="text-white font-mono">{member.emergency_contact || 'N/A'}</span>
                                </div>
                                <div className="text-slate-400">
                                    <strong>Assigned Cell:</strong> <span className="text-amber-300 font-bold">{member.district?.name_en || 'Central HQ'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: EDIT PROFILE & RBAC ROLE CONFIGURATION ─────────────── */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8">
                            <h3 className="text-lg font-black text-white mb-6 border-b border-slate-800 pb-3">
                                🛡️ Role Assignment & Field Authorization
                            </h3>

                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                                            required
                                        />
                                        {errors.name && <p className="text-rose-500 text-[10px] mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                                            required
                                        />
                                        {errors.email && <p className="text-rose-500 text-[10px] mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">RBAC Role Tier</label>
                                        <select
                                            value={data.role_id}
                                            onChange={(e) => setData('role_id', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                                        >
                                            {roles.map(r => (
                                                <option key={r.id} value={r.id}>
                                                    {r.name} (Tier {r.tier_level})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">Assigned District Cell</label>
                                        <select
                                            value={data.district_id}
                                            onChange={(e) => setData('district_id', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                                        >
                                            <option value="">Central HQ / Unassigned</option>
                                            {districts.map(d => (
                                                <option key={d.id} value={d.id}>
                                                    {d.name_en} ({d.division})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                                        >
                                            <option value="active">Active</option>
                                            <option value="suspended">Suspended</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">Mobile (WhatsApp)</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">Blood Group</label>
                                        <select
                                            value={data.blood_group}
                                            onChange={(e) => setData('blood_group', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                                        >
                                            <option value="">Select Blood Group</option>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">Official Badge ID</label>
                                        <input
                                            type="text"
                                            value={data.badge_number}
                                            onChange={(e) => setData('badge_number', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-800 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Profile Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* ── AUDIT LOG HISTORY ─────────────────────────────────────────── */}
                        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6">
                            <h3 className="text-base font-black text-white mb-4 flex items-center justify-between">
                                <span>📜 Activity & Audit History</span>
                                <span className="text-xs text-slate-500 font-mono">{auditLogs.length} Records</span>
                            </h3>

                            {auditLogs.length === 0 ? (
                                <p className="text-xs text-slate-500 py-6 text-center">No audit trail records found for this user.</p>
                            ) : (
                                <div className="space-y-3">
                                    {auditLogs.map((log) => (
                                        <div key={log.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                                            <div>
                                                <div className="font-bold text-white">
                                                    Action: <span className="text-amber-400 font-mono">{log.action}</span> on <span className="text-slate-300">{log.resource_type}</span>
                                                </div>
                                                <div className="text-[10px] text-slate-400 mt-0.5">
                                                    By: {log.user_name} ({log.role_slug || 'system'}) • IP: {log.ip_address || '127.0.0.1'}
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-500 shrink-0">
                                                {new Date(log.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
