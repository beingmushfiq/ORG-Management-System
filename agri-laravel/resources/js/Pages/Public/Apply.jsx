import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

const DIVISIONS = [
    'Dhaka (ঢাকা)', 'Chattogram (চট্টগ্রাম)', 'Rajshahi (রাজশাহী)',
    'Khulna (খুলনা)', 'Barishal (বরিশাল)', 'Sylhet (সিলেট)',
    'Rangpur (রংপুর)', 'Mymensingh (ময়মনসিংহ)',
];

const STEPS = ['Category', 'Student Info', 'Review & Pay'];

export default function Apply({ config, categories }) {
    const [step, setStep]           = useState(0);
    const [selectedCat, setSelectedCat] = useState(null);
    const primaryHsl = config?.primary_color_hsl || '222 47% 11%';
    const accentHsl  = config?.accent_color_hsl  || '38 92% 50%';

    const { data, setData, post, processing, errors } = useForm({
        category_id:     '',
        student_name:    '',
        father_name:     '',
        mother_name:     '',
        mobile:          '',
        email:           '',
        institution:     '',
        class_grade:     '',
        division:        '',
        district:        '',
        policy_accepted: false,   // ← MANDATORY Bangladesh Bank / SSLCommerz compliance
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const distParam = params.get('district');
            if (distParam) {
                const clean = distParam.trim();
                setData(d => ({
                    ...d,
                    district: clean.charAt(0).toUpperCase() + clean.slice(1)
                }));
            }
        }
    }, []);

    const handleCatSelect = (cat) => {
        setSelectedCat(cat);
        setData('category_id', cat.id);
    };

    const canProceedStep0 = !!data.category_id;
    const canProceedStep1 = data.student_name && data.mobile && data.institution
                         && data.class_grade && data.division && data.district;
    const canSubmit       = canProceedStep0 && canProceedStep1 && data.policy_accepted;

    const submit = (e) => {
        e.preventDefault();
        post(route('apply.store'));
    };

    const stepVariants = {
        enter: { opacity: 0, x: 60 },
        center: { opacity: 1, x: 0 },
        exit:  { opacity: 0, x: -60 },
    };

    return (
        <PublicLayout config={config}>
            <Head title={`Apply — ${config?.org_name}`} />

            <div className="min-h-screen py-16 px-4"
                 style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, hsl(${primaryHsl}/0.08), transparent)` }}>
                <div className="max-w-2xl mx-auto">

                    {/* Page title */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                            Road Safety Movement Registration
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Official membership tracks in <strong>{config?.default_currency || 'BDT'}</strong> (৳) · Secure checkout via SSLCommerz
                        </p>
                    </div>

                    {/* Step indicator */}
                    <div className="flex items-center justify-center gap-0 mb-10">
                        {STEPS.map((label, i) => (
                            <div key={i} className="flex items-center">
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300"
                                        style={{
                                            background: i <= step ? `hsl(${primaryHsl})` : '#e2e8f0',
                                            color:      i <= step ? 'white' : '#94a3b8',
                                        }}
                                    >
                                        {i < step ? '✓' : i + 1}
                                    </div>
                                    <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap hidden sm:block">
                                        {label}
                                    </span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className="w-16 sm:w-24 h-0.5 mb-4 mx-1 transition-all duration-500"
                                         style={{ background: i < step ? `hsl(${primaryHsl})` : '#e2e8f0' }} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form card */}
                    <form onSubmit={submit}>
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-black/5 overflow-hidden">
                            <AnimatePresence mode="wait">

                                {/* ── STEP 0: Category Selection ────────── */}
                                {step === 0 && (
                                    <motion.div
                                        key="step0"
                                        variants={stepVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="p-8"
                                    >
                                        <h2 className="text-xl font-extrabold text-slate-900 mb-1">Choose Your Track</h2>
                                        <p className="text-sm text-slate-400 mb-6">All registration fees are in Bangladesh Taka (BDT ৳)</p>
                                        <div className="space-y-3">
                                            {categories.map((cat) => (
                                                <motion.button
                                                    key={cat.id}
                                                    type="button"
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    onClick={() => handleCatSelect(cat)}
                                                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                                                        selectedCat?.id === cat.id
                                                            ? 'border-current bg-current/5'
                                                            : 'border-slate-200 hover:border-slate-300'
                                                    }`}
                                                    style={selectedCat?.id === cat.id ? {
                                                        borderColor: `hsl(${primaryHsl})`,
                                                        background: `hsl(${primaryHsl}/0.06)`,
                                                    } : {}}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-extrabold text-slate-900 text-sm">{cat.name}</div>
                                                            <div className="text-xs text-slate-400 mt-0.5">{cat.name_bn}</div>
                                                            {cat.desc && <div className="text-xs text-slate-500 mt-1 line-clamp-1">{cat.desc}</div>}
                                                        </div>
                                                        <div className="text-right shrink-0 ml-4">
                                                            <div className="text-xl font-black" style={{ color: `hsl(${primaryHsl})` }}>
                                                                {cat.fee_bdt}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400 font-mono">BDT</div>
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── STEP 1: Student Information ──────── */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        variants={stepVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="p-8 space-y-4"
                                    >
                                        <h2 className="text-xl font-extrabold text-slate-900 mb-1">Applicant & Member Information</h2>
                                        <p className="text-sm text-slate-400 mb-6">
                                            Track: <strong style={{ color: `hsl(${primaryHsl})` }}>{selectedCat?.name}</strong>
                                            {' '}— Membership Fee: <strong style={{ color: `hsl(${primaryHsl})` }}>{selectedCat?.fee_bdt}</strong>
                                        </p>

                                        {[
                                            { field: 'student_name',  label: 'Full Name',                         required: true,  type: 'text' },
                                            { field: 'father_name',   label: "Father's Name",                     required: false, type: 'text' },
                                            { field: 'mother_name',   label: "Mother's Name",                     required: false, type: 'text' },
                                            { field: 'mobile',        label: 'Mobile Number (WhatsApp)',          required: true,  type: 'tel' },
                                            { field: 'email',         label: 'Email Address',                     required: false, type: 'email' },
                                            { field: 'institution',   label: 'Institution / Campus / Work',       required: true,  type: 'text' },
                                            { field: 'class_grade',   label: 'Designation / Grade / Profession',  required: true,  type: 'text' },
                                        ].map(({ field, label, required, type }) => (
                                            <div key={field}>
                                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                    {label} {required && <span className="text-red-500">*</span>}
                                                </label>
                                                <input
                                                    type={type}
                                                    value={data[field]}
                                                    onChange={(e) => setData(field, e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 transition-all"
                                                    style={{ '--tw-ring-color': `hsl(${primaryHsl}/0.3)` }}
                                                    required={required}
                                                />
                                                {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
                                            </div>
                                        ))}

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Division <span className="text-red-500">*</span></label>
                                                <select
                                                    value={data.division}
                                                    onChange={(e) => setData('division', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none"
                                                    required
                                                >
                                                    <option value="">Select Division</option>
                                                    {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">District <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={data.district}
                                                    onChange={(e) => setData('district', e.target.value)}
                                                    placeholder="e.g. Dhaka, Chittagong"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── STEP 2: Review + Policy Acceptance ── */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        variants={stepVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="p-8"
                                    >
                                        <h2 className="text-xl font-extrabold text-slate-900 mb-6">Review & Confirm</h2>

                                        {/* Summary */}
                                        <div className="rounded-2xl border border-slate-200 p-5 mb-6 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Category</span>
                                                <span className="font-bold">{selectedCat?.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Student</span>
                                                <span className="font-bold">{data.student_name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Mobile</span>
                                                <span className="font-bold">{data.mobile}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Institution</span>
                                                <span className="font-bold">{data.institution}</span>
                                            </div>
                                            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                                                <span className="font-bold text-slate-700">Registration Fee</span>
                                                <span className="text-xl font-black" style={{ color: `hsl(${primaryHsl})` }}>
                                                    {selectedCat?.fee_bdt} <span className="text-xs font-mono text-slate-400">BDT</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* ─────────────────────────────────────────────────────────
                                            MANDATORY POLICY ACCEPTANCE CHECKBOX
                                            Bangladesh Bank / SSLCommerz compliance requirement
                                        ───────────────────────────────────────────────────────── */}
                                        <div className={`rounded-2xl border-2 p-5 mb-6 transition-all duration-300 ${
                                            data.policy_accepted
                                                ? 'border-green-400 bg-green-50'
                                                : 'border-slate-200 bg-slate-50'
                                        }`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <div className="relative shrink-0 mt-0.5">
                                                    <input
                                                        type="checkbox"
                                                        id="policy_accepted"
                                                        checked={data.policy_accepted}
                                                        onChange={(e) => setData('policy_accepted', e.target.checked)}
                                                        className="sr-only"
                                                    />
                                                    <motion.div
                                                        animate={{
                                                            background: data.policy_accepted ? `hsl(${primaryHsl})` : 'white',
                                                            borderColor: data.policy_accepted ? `hsl(${primaryHsl})` : '#cbd5e1',
                                                        }}
                                                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center"
                                                        onClick={() => setData('policy_accepted', !data.policy_accepted)}
                                                    >
                                                        {data.policy_accepted && (
                                                            <motion.span
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="text-white text-xs font-bold"
                                                            >✓</motion.span>
                                                        )}
                                                    </motion.div>
                                                </div>
                                                <div className="text-sm text-slate-600 leading-relaxed">
                                                    I have read and agree to the{' '}
                                                    <Link href="/terms-condition" target="_blank"
                                                          className="font-semibold underline underline-offset-2"
                                                          style={{ color: `hsl(${primaryHsl})` }}>
                                                        Terms &amp; Conditions
                                                    </Link>{', '}
                                                    <Link href="/refund-policy" target="_blank"
                                                          className="font-semibold underline underline-offset-2"
                                                          style={{ color: `hsl(${primaryHsl})` }}>
                                                        Return &amp; Refund Policy
                                                    </Link>{', '}
                                                    <Link href="/privacy-policy" target="_blank"
                                                          className="font-semibold underline underline-offset-2"
                                                          style={{ color: `hsl(${primaryHsl})` }}>
                                                        Privacy Policy
                                                    </Link>{', and '}
                                                    <Link href="/delivery-policy" target="_blank"
                                                          className="font-semibold underline underline-offset-2"
                                                          style={{ color: `hsl(${primaryHsl})` }}>
                                                        Delivery Policy
                                                    </Link>
                                                    {' '}of {config?.org_name}.
                                                </div>
                                            </label>
                                            {errors.policy_accepted && (
                                                <p className="text-xs text-red-500 mt-2 ml-8">{errors.policy_accepted}</p>
                                            )}
                                        </div>

                                        {!data.policy_accepted && (
                                            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
                                                ⚠️ You must accept all policies before submitting your registration.
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation buttons */}
                            <div className="px-8 pb-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
                                {step > 0 ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep(s => s - 1)}
                                        className="px-6 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                                    >
                                        ← Back
                                    </button>
                                ) : <div />}

                                {step < STEPS.length - 1 ? (
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setStep(s => s + 1)}
                                        disabled={
                                            (step === 0 && !canProceedStep0) ||
                                            (step === 1 && !canProceedStep1)
                                        }
                                        className="px-8 py-3 rounded-xl text-sm font-extrabold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        style={{ background: `hsl(${primaryHsl})` }}
                                    >
                                        Next Step →
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        type="submit"
                                        whileHover={canSubmit ? { scale: 1.02, boxShadow: `0 16px 32px hsl(${accentHsl}/0.35)` } : {}}
                                        whileTap={canSubmit ? { scale: 0.98 } : {}}
                                        disabled={!canSubmit || processing}
                                        className="px-8 py-3 rounded-xl text-sm font-extrabold text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        style={{ background: canSubmit ? `hsl(${accentHsl})` : '#e2e8f0' }}
                                    >
                                        {processing ? 'Submitting…' : `Confirm & Pay ${selectedCat?.fee_bdt}`}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* Compliance footnote */}
                    <p className="text-center text-xs text-slate-400 mt-6">
                        🔒 Secured by SSLCommerz · Trade License: <strong>{config?.trade_license_number}</strong>
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
}
