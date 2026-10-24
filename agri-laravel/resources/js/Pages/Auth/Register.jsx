import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Register({ roles = [], districts = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        role_slug: 'volunteer-cadet',
        district_id: districts[0]?.id || '',
        blood_group: 'B+',
        emergency_contact: '',
        password: '',
        password_confirmation: '',
        bylaws_accepted: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    // Group districts by division
    const districtsByDivision = districts.reduce((acc, dist) => {
        const div = dist.division || 'Dhaka';
        if (!acc[div]) acc[div] = [];
        acc[div].push(dist);
        return acc;
    }, {});

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Ambient Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <Head title="Join Road Safety Movement — Cadet & Member Registration" />

            <div className="sm:mx-auto sm:w-full sm:max-w-2xl relative z-10 space-y-6">
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
                        Mobilize for Vision Zero
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                        Enroll as a frontline Volunteer Cadet or General Member across 64 districts. Protect lives on every road.
                    </p>
                </div>

                {/* Main Registration Card */}
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* 1. Membership Role / Tier Selection */}
                        <div className="space-y-2.5">
                            <label className="block text-xs font-black uppercase text-amber-400 tracking-wider">
                                1. Select Movement Membership Tier (RBAC) <span className="text-rose-400">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    {
                                        slug: 'volunteer-cadet',
                                        icon: '🛡️',
                                        tier: 'Tier 5',
                                        name: 'Volunteer Cadet',
                                        nameBn: 'স্বেচ্ছাসেবক ক্যাডেট',
                                        desc: 'Roadside traffic monitor, school safety escort, first-aid crash responder.',
                                    },
                                    {
                                        slug: 'general-member',
                                        icon: '🎖️',
                                        tier: 'Tier 4',
                                        name: 'General Member',
                                        nameBn: 'সাধারণ সদস্য',
                                        desc: 'Citizen advocate, public campaign mobilizer, civic policy contributor.',
                                    },
                                ].map((role) => {
                                    const isSelected = data.role_slug === role.slug;
                                    return (
                                        <div
                                            key={role.slug}
                                            onClick={() => setData('role_slug', role.slug)}
                                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-amber-400 bg-amber-500/10 shadow-md ring-1 ring-amber-400'
                                                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">{role.icon}</span>
                                                    <span className="font-extrabold text-sm text-white">{role.name}</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300">
                                                    {role.tier}
                                                </span>
                                            </div>
                                            <div className="text-xs text-amber-300 font-bangla font-semibold mb-1">
                                                {role.nameBn}
                                            </div>
                                            <p className="text-[11px] text-slate-400 leading-relaxed">
                                                {role.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.role_slug && <p className="text-rose-400 text-xs mt-1">{errors.role_slug}</p>}
                        </div>

                        {/* 2. Personal Information */}
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <div className="text-xs font-black uppercase text-amber-400 tracking-wider">
                                2. Personal & Emergency Details
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Full Name <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Md. Ashraf Ali"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                                    />
                                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Email Address <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="ashraf@gmail.com"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                                    />
                                    {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Mobile / WhatsApp Number <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+880 1700-000000"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                                    />
                                    {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Blood Group (First Responder Record) <span className="text-rose-400">*</span>
                                    </label>
                                    <select
                                        value={data.blood_group}
                                        onChange={(e) => setData('blood_group', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                                    >
                                        <option value="A+">A+ (A Positive)</option>
                                        <option value="A-">A- (A Negative)</option>
                                        <option value="B+">B+ (B Positive)</option>
                                        <option value="B-">B- (B Negative)</option>
                                        <option value="O+">O+ (O Positive)</option>
                                        <option value="O-">O- (O Negative)</option>
                                        <option value="AB+">AB+ (AB Positive)</option>
                                        <option value="AB-">AB- (AB Negative)</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                    {errors.blood_group && <p className="text-rose-400 text-xs mt-1">{errors.blood_group}</p>}
                                </div>

                                <div className="space-y-1 sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Assigned District Chapter (Bangladesh 64 Districts) <span className="text-rose-400">*</span>
                                    </label>
                                    <select
                                        value={data.district_id}
                                        onChange={(e) => setData('district_id', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                                    >
                                        {Object.entries(districtsByDivision).map(([division, distList]) => (
                                            <optgroup key={division} label={`── ${division} Division ──`}>
                                                {distList.map((dist) => (
                                                    <option key={dist.id} value={dist.id}>
                                                        {dist.name_en} ({dist.name_bn}) — {dist.division}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    {errors.district_id && <p className="text-rose-400 text-xs mt-1">{errors.district_id}</p>}
                                </div>

                                <div className="space-y-1 sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Emergency Contact Person & Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.emergency_contact}
                                        onChange={(e) => setData('emergency_contact', e.target.value)}
                                        placeholder="e.g. Brother: Md. Karim (+880 1711-223344)"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                                    />
                                    {errors.emergency_contact && <p className="text-rose-400 text-xs mt-1">{errors.emergency_contact}</p>}
                                </div>
                            </div>
                        </div>

                        {/* 3. Security Credentials */}
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-black uppercase text-amber-400 tracking-wider">
                                    3. Portal Access Password
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-[11px] text-slate-400 hover:text-white"
                                >
                                    {showPassword ? 'Hide Password' : 'Show Password'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Password <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Minimum 8 characters"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                                    />
                                    {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-300">
                                        Confirm Password <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Re-enter password"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-rose-400 text-xs mt-1">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 4. Statutory Acceptance */}
                        <div className="pt-4 border-t border-slate-800 space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.bylaws_accepted}
                                    onChange={(e) => setData('bylaws_accepted', e.target.checked)}
                                    className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
                                />
                                <span className="text-xs text-slate-300 leading-relaxed">
                                    I agree to uphold the <strong className="text-white">Road Safety Movement Volunteer Safety Code</strong>, participate in blackspot alerts responsibly, and accept the{' '}
                                    <Link href="/terms-condition" target="_blank" className="text-amber-400 hover:underline">
                                        Constitution & Terms
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy-policy" target="_blank" className="text-amber-400 hover:underline">
                                        Privacy Policy
                                    </Link>.
                                </span>
                            </label>
                            {errors.bylaws_accepted && (
                                <p className="text-rose-400 text-xs mt-1 font-bold">{errors.bylaws_accepted}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                    <span>Enrolling in Vision Zero Network...</span>
                                </>
                            ) : (
                                <>
                                    <span>Complete Enrollment & Issue Digital ID</span>
                                    <span className="font-mono">✦</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Nav */}
                    <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
                        <div>
                            Already registered as an Officer or Cadet?{' '}
                            <Link href="/login" className="text-amber-400 font-bold hover:underline">
                                Secretariat & Cadet Sign In →
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
