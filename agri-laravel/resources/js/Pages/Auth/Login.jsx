import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

const DEMO_ROLES = [
    {
        role: 'Super Admin',
        tier: 'Tier 1',
        email: 'superadmin@roadsafetymovement.org.bd',
        password: 'password',
        icon: '👑',
        color: '#f59e0b',
        desc: 'National Command Secretariat · Full access to CMS & RBAC',
    },
    {
        role: 'Directorate Lead',
        tier: 'Tier 2',
        email: 'operations@roadsafetymovement.org',
        password: 'password',
        icon: '🎖️',
        color: '#38bdf8',
        desc: 'Crash Operations & Rapid Rescue Directorate',
    },
    {
        role: 'District Coordinator',
        tier: 'Tier 3',
        email: 'coordinator.dhaka@roadsafetymovement.org',
        password: 'password',
        icon: '📍',
        color: '#22c55e',
        desc: 'Dhaka District Command · Field Cadets & Blackspots',
    },
    {
        role: 'General Member',
        tier: 'Tier 4',
        email: 'member.nadim@gmail.com',
        password: 'password',
        icon: '👥',
        color: '#a855f7',
        desc: 'Citizen Advocate & Road Safety Campaigner',
    },
    {
        role: 'Volunteer Cadet',
        tier: 'Tier 5',
        email: 'cadet.tania@gmail.com',
        password: 'password',
        icon: '🛡️',
        color: '#ec4899',
        desc: 'Roadside Monitor & First-Aid Trauma Responder',
    },
];

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'superadmin@roadsafetymovement.org.bd',
        password: 'password',
        remember: true,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState(DEMO_ROLES[0].role);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const applyDemoRole = (roleItem) => {
        setSelectedRole(roleItem.role);
        setData((d) => ({
            ...d,
            email: roleItem.email,
            password: roleItem.password,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Ambient Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <Head title="Secretariat & Officer Sign In — Road Safety Movement" />

            <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 space-y-6">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2.5 group">
                        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                            🛡️
                        </div>
                        <div className="text-left">
                            <div className="text-lg font-black text-white tracking-tight">Road Safety Movement</div>
                            <div className="text-xs text-amber-400 font-bold font-bangla">নিরাপদ সড়ক আন্দোলন (বাংলাদেশ)</div>
                        </div>
                    </Link>

                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-2">
                        Command & Cadet Portal Sign In
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                        Authenticate with your 5-tier RBAC credentials to access executive controls, cadet brigades, or field tasks.
                    </p>
                </div>

                {/* 1-Click RBAC Role Switcher */}
                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 space-y-2.5 shadow-xl">
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <span>⚡</span> 1-Click 5-Tier RBAC Switcher
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Instant Test Access</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {DEMO_ROLES.map((r) => {
                            const isSelected = selectedRole === r.role;
                            return (
                                <button
                                    key={r.role}
                                    type="button"
                                    onClick={() => applyDemoRole(r)}
                                    className={`p-2 rounded-xl border text-center transition-all ${
                                        isSelected
                                            ? 'border-amber-400 bg-amber-500/20 shadow-md ring-1 ring-amber-400'
                                            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                                    }`}
                                >
                                    <div className="text-lg mb-0.5">{r.icon}</div>
                                    <div className="text-[11px] font-extrabold text-white truncate">{r.role.split(' ')[0]}</div>
                                    <div className="text-[9px] font-mono text-amber-400 font-semibold">{r.tier}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Login Card */}
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
                    {status && (
                        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 font-bold">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-300">
                                Official Email Address <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@roadsafetymovement.org"
                                required
                                autoFocus
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                            />
                            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold text-slate-300">
                                    Password <span className="text-rose-400">*</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
                                />
                                <span className="text-xs text-slate-300">Keep me authenticated for 30 days</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                    <span>Verifying Credentials...</span>
                                </>
                            ) : (
                                <>
                                    <span>Access Governance Portal</span>
                                    <span className="font-mono">→</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
                        <div>
                            New to the Movement?{' '}
                            <Link href="/register" className="text-amber-400 font-bold hover:underline">
                                Register as Volunteer Cadet or Member →
                            </Link>
                        </div>
                        <div>
                            <Link href="/" className="text-slate-500 hover:text-slate-300 transition">
                                ← Return to Public Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
