import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Color conversion helpers between HSL strings and Hex colors
function hslToHex(hslStr) {
    if (!hslStr) return '#0f172a';
    const parts = hslStr.replace(/%/g, '').trim().split(/\s+/).map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return '#0f172a';
    let [h, s, l] = parts;
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex) {
    if (!hex || hex.length < 7) return '222 47% 11%';
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: break;
        }
        h /= 6;
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const COLOR_PRESETS = [
    { name: 'Road Safety Classic (Asphalt & Caution Amber)', primary: '222 47% 11%', accent: '38 92% 50%', previewPrimary: '#0f172a', previewAccent: '#f59e0b' },
    { name: 'Traffic Alert Red & Deep Charcoal', primary: '222 47% 14%', accent: '0 84% 60%', previewPrimary: '#1e293b', previewAccent: '#ef4444' },
    { name: 'Civic Protection Navy & Amber', primary: '217 91% 22%', accent: '38 92% 50%', previewPrimary: '#172554', previewAccent: '#f59e0b' },
    { name: 'First Responder Emerald & Goldenrod', primary: '160 84% 16%', accent: '45 93% 47%', previewPrimary: '#064e3b', previewAccent: '#eab308' },
    { name: 'High-Vis Safety Neon & Pitch Black', primary: '220 39% 11%', accent: '48 96% 53%', previewPrimary: '#111827', previewAccent: '#facc15' },
    { name: 'Sunset Expressway Orange & Slate', primary: '224 71% 10%', accent: '24 94% 53%', previewPrimary: '#0b1329', previewAccent: '#f97316' },
];

export default function CmsStudio({ auth, config, hierarchy }) {
    const [activeTab, setActiveTab] = useState('branding');
    const [savedSuccess, setSavedSuccess] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [activePolicyTab, setActivePolicyTab] = useState('terms');
    const [policyPreviewMode, setPolicyPreviewMode] = useState(false);
    const [storyPreviewMode, setStoryPreviewMode] = useState(false);
    const [expandedHierarchy, setExpandedHierarchy] = useState({});

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        org_name: config?.org_name || '',
        org_name_bn: config?.org_name_bn || '',
        tagline: config?.tagline || '',
        tagline_bn: config?.tagline_bn || '',
        motto: config?.motto || '',
        motto_bn: config?.motto_bn || '',
        logo_url: config?.logo_url || '',
        primary_color_hsl: config?.primary_color_hsl || '222 47% 11%',
        accent_color_hsl: config?.accent_color_hsl || '38 92% 50%',
        contact_email: config?.contact_email || '',
        contact_phone: config?.contact_phone || '',
        whatsapp_number: config?.whatsapp_number || '',
        head_office_address: config?.head_office_address || '',
        head_office_address_bn: config?.head_office_address_bn || '',
        trade_license_number: config?.trade_license_number || '',
        tin_number: config?.tin_number || '',
        default_currency: config?.default_currency || 'BDT',
        about_story_html: config?.about_story_html || '',
        terms_html: config?.terms_html || '',
        refund_policy_html: config?.refund_policy_html || '',
        privacy_policy_html: config?.privacy_policy_html || '',
        delivery_policy_html: config?.delivery_policy_html || '',
        hero_headline: config?.hero_headline || '',
        hero_headline_bn: config?.hero_headline_bn || '',
        hero_subtitle: config?.hero_subtitle || '',
        hero_subtitle_bn: config?.hero_subtitle_bn || '',
        section_visibility: config?.section_visibility || {
            hero_3d: true,
            stats_ticker: true,
            alliances: true,
            pillars: true,
            command_flow: true,
            district_globe: true,
            directorates: true,
            membership_plans: true,
            faq: true,
            cta_banner: true,
        },
        nav_links: config?.nav_links || [],
        footer_columns: config?.footer_columns || [],
        hierarchy: hierarchy || [],
    });

    const copyToClipboard = (text, fieldName) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch('/portal/cms', {
            preserveScroll: true,
            onSuccess: () => {
                setSavedSuccess(true);
                setTimeout(() => setSavedSuccess(false), 4000);
            },
        });
    };

    const tabs = [
        { id: 'branding', label: 'Identity & Branding', icon: '🏷️', badge: 'Core' },
        { id: 'sections', label: 'Sections & Visibility', icon: '👁️', badge: 'Hero + 3D' },
        { id: 'colors', label: 'Colors & Theme', icon: '🎨', badge: 'Theme' },
        { id: 'hierarchy', label: 'Member Hierarchy', icon: '🏛️', badge: `${data.hierarchy?.length || 0} Wings` },
        { id: 'contact', label: 'Office & License', icon: '📍', badge: 'SSL Ready' },
        { id: 'policies', label: 'Statutory Policies', icon: '⚖️', badge: '4 Policies' },
        { id: 'story', label: 'Movement Story', icon: '📖', badge: 'Chronicle' },
        { id: 'navigation', label: 'Header & Footer', icon: '🧭', badge: 'Menus' },
    ];

    const toggleHierarchyItem = (index) => {
        setExpandedHierarchy((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const updateHierarchyItem = (index, field, value) => {
        const updated = [...data.hierarchy];
        updated[index] = { ...updated[index], [field]: value };
        setData('hierarchy', updated);
    };

    const addHierarchyItem = () => {
        const newItem = {
            id: null,
            rank: (data.hierarchy?.length || 0) + 1,
            name_en: 'New Directorate / Division',
            name_bn: 'নতুন অধিদপ্তর / উইং',
            convener_name: 'Lead Officer Name',
            convener_title: 'Directorate Lead',
            member_count: 12,
            mandate: 'Core strategic duties and operational deployment across blackspots.',
            level: 'National Standing Committee',
            accent_gradient: 'from-amber-500 to-yellow-600',
        };
        setData('hierarchy', [...(data.hierarchy || []), newItem]);
    };

    const removeHierarchyItem = (index) => {
        const updated = data.hierarchy.filter((_, i) => i !== index);
        setData('hierarchy', updated);
    };

    // Header Links Helpers
    const addHeaderLink = () => {
        setData('nav_links', [
            ...(data.nav_links || []),
            { label: 'New Link', label_bn: 'নতুন লিংক', href: '/new-page' },
        ]);
    };

    const removeHeaderLink = (index) => {
        setData('nav_links', data.nav_links.filter((_, i) => i !== index));
    };

    const updateHeaderLink = (index, field, val) => {
        const updated = [...data.nav_links];
        updated[index] = { ...updated[index], [field]: val };
        setData('nav_links', updated);
    };

    // Footer Columns Helpers
    const addFooterColumn = () => {
        setData('footer_columns', [
            ...(data.footer_columns || []),
            { heading: 'New Column', links: [{ label: 'Example Link', href: '/' }] },
        ]);
    };

    const removeFooterColumn = (colIdx) => {
        setData('footer_columns', data.footer_columns.filter((_, i) => i !== colIdx));
    };

    const updateFooterColumnHeading = (colIdx, heading) => {
        const updated = [...data.footer_columns];
        updated[colIdx].heading = heading;
        setData('footer_columns', updated);
    };

    const addFooterColumnLink = (colIdx) => {
        const updated = [...data.footer_columns];
        updated[colIdx].links = [...(updated[colIdx].links || []), { label: 'New Link', href: '/' }];
        setData('footer_columns', updated);
    };

    const removeFooterColumnLink = (colIdx, linkIdx) => {
        const updated = [...data.footer_columns];
        updated[colIdx].links = updated[colIdx].links.filter((_, i) => i !== linkIdx);
        setData('footer_columns', updated);
    };

    const updateFooterColumnLink = (colIdx, linkIdx, field, val) => {
        const updated = [...data.footer_columns];
        updated[colIdx].links[linkIdx] = { ...updated[colIdx].links[linkIdx], [field]: val };
        setData('footer_columns', updated);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm border border-amber-600">
                                🛡️
                            </span>
                            <div>
                                <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                                    Road Safety Movement — Executive CMS Studio
                                </h2>
                                <p className="text-xs font-bold text-slate-700 mt-0.5">
                                    High-Visibility Executive Console · 64 Districts Sync · RBAC Controlled Singleton
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                        <Link
                            href="/hierarchy"
                            target="_blank"
                            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 rounded-xl text-xs font-black transition flex items-center gap-1.5 border-2 border-slate-300 shadow-sm"
                        >
                            <span>Organogram</span>
                            <span className="text-[10px]">↗</span>
                        </Link>
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 rounded-xl text-xs font-black transition flex items-center gap-1.5 border-2 border-slate-300 shadow-sm"
                        >
                            <span>Live Website</span>
                            <span className="text-[10px]">↗</span>
                        </a>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow-md border-2 border-amber-600 transition flex items-center gap-2 disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                    <span>Publishing...</span>
                                </>
                            ) : (
                                <>
                                    <span>💾 Save & Publish</span>
                                    <span className="text-[10px] bg-slate-950 text-amber-400 px-2 py-0.5 rounded font-mono font-black">LIVE</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Visual CMS Studio & Member Hierarchy - Road Safety Movement" />

            <div className="py-8 bg-slate-100 min-h-[calc(100vh-140px)]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Notification Banner */}
                    <AnimatePresence>
                        {(recentlySuccessful || savedSuccess) && (
                            <motion.div
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                className="p-4 bg-emerald-50 border-2 border-emerald-600 rounded-2xl flex items-center justify-between text-xs text-emerald-950 font-black shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-black shrink-0">
                                        ✓
                                    </span>
                                    <span>
                                        All CMS settings, 3D switches, theme colors, and Member Hierarchy updated in database singleton! Live cache invalidated.
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-600 text-white uppercase font-black">
                                    Synced
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Tabs Bar — Ultra-High-Contrast Light Executive Theme */}
                    <div className="bg-white p-3 rounded-2xl border-2 border-slate-300 shadow-md">
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`p-3 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-between gap-1.5 border-2 min-h-[72px] text-center ${
                                            isActive
                                                ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-amber-400'
                                                : 'bg-white text-slate-900 border-slate-300 hover:border-slate-900 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-lg leading-none">{tab.icon}</span>
                                            <span className="font-black text-[11px] leading-tight text-center">{tab.label}</span>
                                        </div>
                                        <span
                                            className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-black ${
                                                isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-900 border border-slate-300'
                                            }`}
                                        >
                                            {tab.badge}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 1: IDENTITY & BRANDING                                    */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'branding' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-8 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                            <span>🏷️</span> Organization Identity & Brand Metadata
                                        </h3>
                                        <p className="text-xs font-bold text-slate-600 mt-1">
                                            Public names, bilingual slogans, and visual emblems displayed across the header, footer, and volunteer credentials.
                                        </p>
                                    </div>
                                    <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 border border-amber-500 font-black shadow-xs shrink-0">
                                        Primary Singleton
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Organization Name (English) <span className="text-amber-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.org_name}
                                            onChange={(e) => setData('org_name', e.target.value)}
                                            placeholder="Road Safety Movement (RSM)"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        />
                                        {errors.org_name && <p className="text-rose-600 text-xs font-bold mt-1">{errors.org_name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Organization Name (Bangla / বাংলা)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.org_name_bn}
                                            onChange={(e) => setData('org_name_bn', e.target.value)}
                                            placeholder="নিরাপদ সড়ক আন্দোলন (রিসাআ)"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bangla font-bold text-slate-950 bg-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Movement Tagline (English)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.tagline}
                                            onChange={(e) => setData('tagline', e.target.value)}
                                            placeholder="Citizens Alliance for Vision Zero, Highway Safety & Crash Casualties Prevention Across Bangladesh"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Movement Tagline (Bangla / বাংলা)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.tagline_bn}
                                            onChange={(e) => setData('tagline_bn', e.target.value)}
                                            placeholder="সড়ক দুর্ঘটনা নয়, প্রতিরোধযোগ্য রোড ক্র্যাশ নির্মূলে জাতীয় নাগরিক ঐক্য"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bangla font-bold text-slate-950 bg-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Motto / Subtitle (English)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.motto}
                                            onChange={(e) => setData('motto', e.target.value)}
                                            placeholder="Life Over Speed · Safety Over Silence"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Motto / Subtitle (Bangla / বাংলা)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.motto_bn}
                                            onChange={(e) => setData('motto_bn', e.target.value)}
                                            placeholder="গতির চেয়ে জীবন মূল্যবান · নীরবতা ভেঙে রাজপথে নিরাপত্তা চাই"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bangla font-bold text-slate-950 bg-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Official Logo URL / Asset Path
                                        </label>
                                        <input
                                            type="text"
                                            value={data.logo_url}
                                            onChange={(e) => setData('logo_url', e.target.value)}
                                            placeholder="https://... or /images/logo.png (leave empty for dynamic shield)"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-mono font-bold text-slate-950 bg-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Default Transaction Currency
                                        </label>
                                        <select
                                            value={data.default_currency}
                                            onChange={(e) => setData('default_currency', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none shadow-xs"
                                        >
                                            <option value="BDT">BDT (৳ - Bangladeshi Taka)</option>
                                            <option value="USD">USD ($ - US Dollar)</option>
                                            <option value="EUR">EUR (€ - Euro)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Live Branding Card Preview — High Contrast */}
                                <div className="p-6 rounded-2xl border-2 border-slate-300 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-slate-900 flex items-center justify-center text-3xl shadow-sm text-white shrink-0">
                                            {data.logo_url ? (
                                                <img src={data.logo_url} alt="Logo" className="max-w-[80%] max-h-[80%] object-contain" />
                                            ) : (
                                                <span>🛡️</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-base font-black text-slate-950 leading-tight">
                                                {data.org_name || 'Road Safety Movement (RSM)'}
                                            </div>
                                            <div className="text-sm text-amber-700 font-black font-bangla mt-0.5">
                                                {data.org_name_bn || 'নিরাপদ সড়ক আন্দোলন (বাংলাদেশ)'}
                                            </div>
                                            <div className="text-xs text-slate-700 font-medium mt-1 line-clamp-1 max-w-lg">
                                                {data.tagline || 'Citizens Movement for Vision Zero across Bangladesh'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <span className="px-4 py-1.5 rounded-full text-xs font-mono font-black bg-amber-400 text-slate-950 border border-amber-500 shadow-xs">
                                            {data.default_currency || 'BDT'} Currency
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 2: SECTIONS & VISIBILITY                                  */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'sections' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-8 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5">
                                    <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                        <span>👁️</span> Homepage Section Toggles & Hero Copy
                                    </h3>
                                    <p className="text-xs font-bold text-slate-600 mt-1">
                                        Instantly toggle any homepage block on or off without code edits. Configure hero banner headlines.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    <h4 className="text-xs font-black uppercase text-amber-700 tracking-wider flex items-center gap-2">
                                        <span>⚡</span> Hero Banner Headlines
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                                Hero Headline (English)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.hero_headline}
                                                onChange={(e) => setData('hero_headline', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                                Hero Headline (বাংলা)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.hero_headline_bn}
                                                onChange={(e) => setData('hero_headline_bn', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bangla font-bold text-slate-950 bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                                Hero Subtitle (English)
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={data.hero_subtitle}
                                                onChange={(e) => setData('hero_subtitle', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                                Hero Subtitle (বাংলা)
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={data.hero_subtitle_bn}
                                                onChange={(e) => setData('hero_subtitle_bn', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 text-sm font-bangla font-bold text-slate-950 bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t-2 border-slate-200 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-black uppercase text-amber-700 tracking-wider flex items-center gap-2">
                                            <span>🎛️</span> Section Display Switchboard ({Object.values(data.section_visibility || {}).filter(Boolean).length}/10 Active)
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const allOn = {
                                                    hero_3d: true,
                                                    stats_ticker: true,
                                                    alliances: true,
                                                    pillars: true,
                                                    command_flow: true,
                                                    district_globe: true,
                                                    directorates: true,
                                                    membership_plans: true,
                                                    faq: true,
                                                    cta_banner: true,
                                                };
                                                setData('section_visibility', allOn);
                                            }}
                                            className="text-xs font-black text-amber-700 hover:text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300"
                                        >
                                            Enable All Sections
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { key: 'hero_3d', icon: '🛣️', tag: '3D Scene', label: '3D Perspective Highway Scene', desc: 'Hardware-accelerated speed light trails, electronic LED gantry & radar pings' },
                                            { key: 'stats_ticker', icon: '📊', tag: 'Telemetry', label: 'Impact Statistics Counter Bar', desc: '420+ Blackspots, 64 Districts, 1,200+ Responders ticker' },
                                            { key: 'alliances', icon: '🤝', tag: 'Trust', label: 'Strategic Alliances & Affiliates', desc: 'BUET ARI, Highway Police, BRTA & Red Crescent institutional trust bar' },
                                            { key: 'pillars', icon: '🏛️', tag: 'Doctrine', label: 'Movement Core Pillars', desc: '4 strategic doctrine pillars: Vision Zero, Enforcement, Rescue & Open Audit' },
                                            { key: 'command_flow', icon: '⚡', tag: 'Organogram', label: '5-Tier Field Command Flow', desc: 'Interactive organogram connecting National HQ to Cadet Patrols' },
                                            { key: 'district_globe', icon: '🗺️', tag: 'Vector Map', label: '64-District Interactive Bangladesh Map', desc: 'Interactive SVG vector map with 64 district pins, national highways, division filters, and cadet dossiers' },
                                            { key: 'directorates', icon: '🎖️', tag: 'Wings', label: 'National Directorates Showcase', desc: 'Cards displaying Crash Ops, Legal Defense, Medical Rescue & Training Wings' },
                                            { key: 'membership_plans', icon: '💳', tag: 'Tiers', label: 'Cadet & Member Registration Tiers', desc: 'BDT 70, 100, 250, 1000 contribution cards with SSLCommerz gateway' },
                                            { key: 'faq', icon: '❓', tag: 'Support', label: 'Frequently Asked Questions', desc: 'Expandable FAQ accordion addressing volunteer roles, safety kits & dues' },
                                            { key: 'cta_banner', icon: '🚨', tag: 'Action', label: 'Volunteer Call-To-Action Banner', desc: 'High-impact volunteer mobilization banner immediately before the footer' },
                                        ].map(({ key, icon, tag, label, desc }) => {
                                            const isVisible = data.section_visibility?.[key] !== false;
                                            return (
                                                <div
                                                    key={key}
                                                    onClick={() => {
                                                        setData('section_visibility', {
                                                            ...data.section_visibility,
                                                            [key]: !isVisible,
                                                        });
                                                    }}
                                                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                                        isVisible
                                                            ? 'bg-white border-slate-950 shadow-md ring-1 ring-slate-900'
                                                            : 'bg-slate-100 border-dashed border-slate-300 opacity-60 hover:opacity-100'
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-lg shrink-0">
                                                            {icon}
                                                        </span>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-black text-slate-950">{label}</span>
                                                                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-slate-900 text-white">
                                                                    {tag}
                                                                </span>
                                                            </div>
                                                            <div className="text-xs text-slate-700 font-medium mt-0.5 line-clamp-1">{desc}</div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                            isVisible ? 'bg-emerald-600' : 'bg-slate-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                                isVisible ? 'translate-x-5' : 'translate-x-0'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 3: COLORS & THEME                                         */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'colors' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-8 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5">
                                    <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                        <span>🎨</span> Custom Colors & Theme Palette Studio
                                    </h3>
                                    <p className="text-xs font-bold text-slate-600 mt-1">
                                        Choose from 6 curated movement themes or select custom Hex / HSL colors. Buttons, banners, and badges update instantly.
                                    </p>
                                </div>

                                {/* Preset Selector */}
                                <div className="space-y-3">
                                    <label className="block text-xs font-black uppercase text-amber-700 tracking-wider">
                                        Movement Theme Presets (1-Click Switch)
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {COLOR_PRESETS.map((p, idx) => {
                                            const isSelected = data.primary_color_hsl === p.primary && data.accent_color_hsl === p.accent;
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => {
                                                        setData((d) => ({
                                                            ...d,
                                                            primary_color_hsl: p.primary,
                                                            accent_color_hsl: p.accent,
                                                        }));
                                                    }}
                                                    className={`p-4 rounded-2xl border-2 text-left transition flex items-center gap-3 ${
                                                        isSelected
                                                            ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400'
                                                            : 'border-slate-300 hover:border-slate-800 bg-white'
                                                    }`}
                                                >
                                                    <div className="flex gap-1.5 shrink-0">
                                                        <span
                                                            className="w-7 h-7 rounded-xl border border-black/20 shadow-xs"
                                                            style={{ background: p.previewPrimary }}
                                                        />
                                                        <span
                                                            className="w-7 h-7 rounded-xl border border-black/20 shadow-xs"
                                                            style={{ background: p.previewAccent }}
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-black text-slate-950 truncate">{p.name}</div>
                                                        <div className="text-[10px] text-slate-600 font-mono font-bold mt-0.5 truncate">
                                                            {p.previewPrimary} / {p.previewAccent}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Dual Color Picker & HSL Inputs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t-2 border-slate-200">
                                    <div className="p-5 rounded-2xl border-2 border-slate-300 bg-white space-y-3 shadow-xs">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-black text-slate-950 uppercase tracking-wide">
                                                Primary Color (Asphalt Slate)
                                            </label>
                                            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold">
                                                Hex: {hslToHex(data.primary_color_hsl)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={hslToHex(data.primary_color_hsl)}
                                                onChange={(e) => {
                                                    const hsl = hexToHsl(e.target.value);
                                                    setData('primary_color_hsl', hsl);
                                                }}
                                                className="w-14 h-14 rounded-xl border-2 border-slate-400 cursor-pointer p-0.5 bg-white shadow-xs"
                                            />
                                            <div className="flex-1 space-y-1">
                                                <input
                                                    type="text"
                                                    value={data.primary_color_hsl}
                                                    onChange={(e) => setData('primary_color_hsl', e.target.value)}
                                                    placeholder="222 47% 11%"
                                                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 outline-none focus:border-amber-500 bg-white"
                                                />
                                                <p className="text-[10px] font-bold text-slate-600">HSL format: Hue Saturation% Lightness%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl border-2 border-slate-300 bg-white space-y-3 shadow-xs">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-black text-slate-950 uppercase tracking-wide">
                                                Accent Color (Caution Amber)
                                            </label>
                                            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black border border-amber-500">
                                                Hex: {hslToHex(data.accent_color_hsl)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={hslToHex(data.accent_color_hsl)}
                                                onChange={(e) => {
                                                    const hsl = hexToHsl(e.target.value);
                                                    setData('accent_color_hsl', hsl);
                                                }}
                                                className="w-14 h-14 rounded-xl border-2 border-slate-400 cursor-pointer p-0.5 bg-white shadow-xs"
                                            />
                                            <div className="flex-1 space-y-1">
                                                <input
                                                    type="text"
                                                    value={data.accent_color_hsl}
                                                    onChange={(e) => setData('accent_color_hsl', e.target.value)}
                                                    placeholder="38 92% 50%"
                                                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 outline-none focus:border-amber-500 bg-white"
                                                />
                                                <p className="text-[10px] font-bold text-slate-600">HSL format: Hue Saturation% Lightness%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Live Mock Preview Card */}
                                <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-950 text-white space-y-4 shadow-xl">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                        <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
                                            <span>✨</span> Real-Time UI Theme Simulation
                                        </div>
                                        <span className="text-xs font-mono font-black text-amber-400">Adaptive Preview</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <button
                                            type="button"
                                            className="px-5 py-2.5 rounded-xl text-white font-black text-xs shadow-md border border-white/20"
                                            style={{ background: `hsl(${data.primary_color_hsl})` }}
                                        >
                                            Primary Asphalt Button
                                        </button>
                                        <button
                                            type="button"
                                            className="px-5 py-2.5 rounded-xl text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-105"
                                            style={{ background: `hsl(${data.accent_color_hsl})` }}
                                        >
                                            Join Movement ✦
                                        </button>
                                        <span
                                            className="px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs"
                                            style={{
                                                background: `hsl(${data.accent_color_hsl} / 0.25)`,
                                                color: `hsl(${data.accent_color_hsl})`,
                                                border: `2px solid hsl(${data.accent_color_hsl})`,
                                            }}
                                        >
                                            ★ 64 Districts Cadet Network
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 4: MEMBER HIERARCHY & ORGANOGRAM                          */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'hierarchy' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-6 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                            <span>🏛️</span> Member Hierarchy & National Directorates ({data.hierarchy?.length || 0})
                                        </h3>
                                        <p className="text-xs font-bold text-slate-600 mt-1">
                                            Configure the executive leadership organogram, standing committees, conveners, and field officer strengths.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href="/hierarchy"
                                            target="_blank"
                                            className="text-xs px-3.5 py-2 rounded-xl bg-white text-slate-900 font-black hover:bg-slate-50 transition border-2 border-slate-300 shadow-xs"
                                        >
                                            Preview Public Organogram ↗
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={addHierarchyItem}
                                            className="text-xs px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition shadow-sm border-2 border-amber-600 flex items-center gap-1.5"
                                        >
                                            <span>+</span> Add Directorate
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {(data.hierarchy || []).map((item, idx) => {
                                        const isExpanded = expandedHierarchy[idx] ?? idx < 3;
                                        return (
                                            <div
                                                key={item.id || idx}
                                                className="rounded-2xl border-2 border-slate-300 bg-white overflow-hidden transition-all shadow-sm"
                                            >
                                                {/* Accordion Header */}
                                                <div
                                                    onClick={() => toggleHierarchyItem(idx)}
                                                    className="p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 select-none border-b border-slate-200"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-xs">
                                                            #{item.rank || idx + 1}
                                                        </span>
                                                        <div>
                                                            <div className="font-black text-slate-950 text-sm flex items-center gap-2">
                                                                <span>{item.name_en || 'Untitled Directorate'}</span>
                                                                <span className="text-xs text-amber-700 font-bangla font-bold">
                                                                    {item.name_bn}
                                                                </span>
                                                            </div>
                                                            <div className="text-xs text-slate-600 font-bold">
                                                                {item.convener_title || 'Lead'}: <strong className="text-slate-950 font-black">{item.convener_name || 'Unassigned'}</strong>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-mono font-black px-3 py-1 rounded-lg bg-amber-100 text-amber-950 border border-amber-400">
                                                            {item.level || 'Standing Committee'}
                                                        </span>
                                                        <span className="text-xs text-slate-900 font-black bg-slate-100 px-3 py-1 rounded-lg border border-slate-300">
                                                            👥 {item.member_count || 10} Officers
                                                        </span>
                                                        <span className="text-slate-900 text-xs font-mono font-black">
                                                            {isExpanded ? '▲' : '▼'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Accordion Body */}
                                                {isExpanded && (
                                                    <div className="p-5 bg-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Rank Order</label>
                                                            <input
                                                                type="number"
                                                                value={item.rank || idx + 1}
                                                                onChange={(e) => updateHierarchyItem(idx, 'rank', parseInt(e.target.value) || 1)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Directorate Name (EN)</label>
                                                            <input
                                                                type="text"
                                                                value={item.name_en || ''}
                                                                onChange={(e) => updateHierarchyItem(idx, 'name_en', e.target.value)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Directorate Name (BN)</label>
                                                            <input
                                                                type="text"
                                                                value={item.name_bn || ''}
                                                                onChange={(e) => updateHierarchyItem(idx, 'name_bn', e.target.value)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bangla font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Governance Tier / Level</label>
                                                            <select
                                                                value={item.level || 'National Standing Committee'}
                                                                onChange={(e) => updateHierarchyItem(idx, 'level', e.target.value)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs bg-white font-bold text-slate-950"
                                                            >
                                                                <option value="National Standing Committee">National Standing Committee</option>
                                                                <option value="Rapid Field Command">Rapid Field Command</option>
                                                                <option value="Legal & Policy Directorate">Legal & Policy Directorate</option>
                                                                <option value="District Taskforce Secretariat">District Taskforce Secretariat</option>
                                                                <option value="Technical & Analytics Wing">Technical & Analytics Wing</option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Convener / Lead Name</label>
                                                            <input
                                                                type="text"
                                                                value={item.convener_name || ''}
                                                                onChange={(e) => updateHierarchyItem(idx, 'convener_name', e.target.value)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Convener Title / Designation</label>
                                                            <input
                                                                type="text"
                                                                value={item.convener_title || ''}
                                                                onChange={(e) => updateHierarchyItem(idx, 'convener_title', e.target.value)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Officer Strength (Count)</label>
                                                            <input
                                                                type="number"
                                                                value={item.member_count || 10}
                                                                onChange={(e) => updateHierarchyItem(idx, 'member_count', parseInt(e.target.value) || 0)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>

                                                        <div className="space-y-1.5 sm:col-span-2">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">Accent Gradient Class</label>
                                                            <input
                                                                type="text"
                                                                value={item.accent_gradient || 'from-amber-500 to-yellow-600'}
                                                                onChange={(e) => updateHierarchyItem(idx, 'accent_gradient', e.target.value)}
                                                                placeholder="from-amber-500 to-yellow-600"
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-3 space-y-1.5">
                                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                                                Directorate Mandate & Strategic Mission
                                                            </label>
                                                            <textarea
                                                                rows={2}
                                                                value={item.mandate || ''}
                                                                onChange={(e) => updateHierarchyItem(idx, 'mandate', e.target.value)}
                                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-950 bg-white"
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-3 flex justify-end pt-3 border-t-2 border-slate-200">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeHierarchyItem(idx)}
                                                                className="text-xs text-rose-700 hover:text-rose-800 font-black flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-300"
                                                            >
                                                                <span>🗑️</span> Remove Directorate
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 5: OFFICE & CREDENTIALS                                   */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'contact' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-8 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                            <span>📍</span> Central Secretariat Address & Statutory Credentials
                                        </h3>
                                        <p className="text-xs font-bold text-slate-600 mt-1">
                                            Physical operational headquarters and statutory licensing data required for SSLCommerz payment merchant verification.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono bg-emerald-100 text-emerald-950 border-2 border-emerald-500 px-3.5 py-1.5 rounded-xl font-black shrink-0">
                                        <span>🛡️</span> SSLCommerz Compliant
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                                Trade License Number <span className="text-amber-600">*</span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => copyToClipboard(data.trade_license_number, 'trade')}
                                                className="text-xs text-amber-950 font-black font-mono bg-amber-100 px-2 py-0.5 rounded border border-amber-300 hover:bg-amber-200"
                                            >
                                                {copiedField === 'trade' ? '✓ Copied' : 'Copy'}
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={data.trade_license_number}
                                            onChange={(e) => setData('trade_license_number', e.target.value)}
                                            placeholder="TRAD/DNCC/03247/2023"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-mono font-bold text-slate-950 bg-white outline-none focus:border-amber-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">E-TIN Number</label>
                                            <button
                                                type="button"
                                                onClick={() => copyToClipboard(data.tin_number, 'tin')}
                                                className="text-xs text-amber-950 font-black font-mono bg-amber-100 px-2 py-0.5 rounded border border-amber-300 hover:bg-amber-200"
                                            >
                                                {copiedField === 'tin' ? '✓ Copied' : 'Copy'}
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={data.tin_number}
                                            onChange={(e) => setData('tin_number', e.target.value)}
                                            placeholder="8492-4912-3901-RSM"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-mono font-bold text-slate-950 bg-white outline-none focus:border-amber-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Official Phone Number <span className="text-amber-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            placeholder="+880 1717-395047"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white outline-none focus:border-amber-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            WhatsApp Emergency Hotline
                                        </label>
                                        <input
                                            type="text"
                                            value={data.whatsapp_number}
                                            onChange={(e) => setData('whatsapp_number', e.target.value)}
                                            placeholder="+880 1717-395047"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white outline-none focus:border-amber-500"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Official Support Email <span className="text-amber-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            placeholder="contact@roadsafetymovement.org.bd"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white outline-none focus:border-amber-500"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Central Secretariat Physical Address (English) <span className="text-amber-600">*</span>
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.head_office_address}
                                            onChange={(e) => setData('head_office_address', e.target.value)}
                                            placeholder="Central Command Secretariat, House 04, Road 12/B, Sector 10, Uttara, Dhaka-1230, Bangladesh"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-950 bg-white outline-none focus:border-amber-500"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-xs font-black text-slate-950 uppercase tracking-wide">
                                            Central Secretariat Physical Address (Bangla / বাংলা)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.head_office_address_bn}
                                            onChange={(e) => setData('head_office_address_bn', e.target.value)}
                                            placeholder="কেন্দ্রীয় কমান্ড সচিবালয়, বাড়ি ০৪, রোড ১২/বি, সেক্টর ১০, উত্তরা, ঢাকা-১২৩০, বাংলাদেশ"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-bangla font-bold text-slate-950 bg-white outline-none focus:border-amber-500"
                                        />
                                    </div>
                                </div>

                                {/* Checklist Card — High Contrast */}
                                <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 space-y-3">
                                    <div className="text-sm font-black text-amber-950 flex items-center gap-2">
                                        <span>📋</span> Bangladesh Bank & Merchant Regulatory Readiness Checklist
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-950">
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-700 font-black text-sm">✓</span> Physical Secretariat Address
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-700 font-black text-sm">✓</span> Registered Trade License
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-700 font-black text-sm">✓</span> Emergency WhatsApp Hotline
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-700 font-black text-sm">✓</span> SSLCommerz Checkout Link
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 6: STATUTORY POLICIES                                     */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'policies' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-6 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                            <span>⚖️</span> 4 Mandatory Statutory Policies
                                        </h3>
                                        <p className="text-xs font-bold text-slate-600 mt-1">
                                            Mandatory legal texts linked in the application checkout footer to fulfill Bangladesh Bank e-commerce regulations.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPolicyPreviewMode(!policyPreviewMode)}
                                            className={`text-xs px-4 py-2 rounded-xl font-black transition border-2 ${
                                                policyPreviewMode
                                                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                                                    : 'bg-white text-slate-900 border-slate-300 hover:border-slate-800'
                                            }`}
                                        >
                                            {policyPreviewMode ? '👁️ Viewing Formatted Preview' : '✏️ Toggle Live Preview'}
                                        </button>
                                    </div>
                                </div>

                                {/* Sub-Tab Navigation for the 4 policies */}
                                <div className="flex flex-wrap gap-2 p-2 bg-slate-100 rounded-2xl border-2 border-slate-300">
                                    {[
                                        { id: 'terms', label: '1. Terms & Conditions', path: '/terms-condition', field: 'terms_html' },
                                        { id: 'refund', label: '2. Refund Policy', path: '/refund-policy', field: 'refund_policy_html' },
                                        { id: 'privacy', label: '3. Privacy Policy', path: '/privacy-policy', field: 'privacy_policy_html' },
                                        { id: 'delivery', label: '4. Delivery Policy', path: '/delivery-policy', field: 'delivery_policy_html' },
                                    ].map((p) => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setActivePolicyTab(p.id)}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 border-2 ${
                                                activePolicyTab === p.id
                                                    ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                                                    : 'bg-white text-slate-900 border-slate-300 hover:border-slate-800'
                                            }`}
                                        >
                                            <span>{p.label}</span>
                                            <span className="text-[10px] font-mono opacity-80">({(data[p.field] || '').length} chars)</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Active Policy Content */}
                                <div>
                                    {activePolicyTab === 'terms' && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-xs font-black">
                                                <span className="text-slate-950 uppercase tracking-wide">Official Movement Constitution & Terms</span>
                                                <Link href="/terms-condition" target="_blank" className="text-amber-700 hover:underline">
                                                    Open /terms-condition ↗
                                                </Link>
                                            </div>
                                            {policyPreviewMode ? (
                                                <div
                                                    className="p-6 rounded-2xl border-2 border-slate-300 bg-slate-50 min-h-[240px] prose prose-slate max-w-none text-slate-900 text-xs font-medium"
                                                    dangerouslySetInnerHTML={{ __html: data.terms_html || '<p class="text-slate-500 italic">No terms entered yet.</p>' }}
                                                />
                                            ) : (
                                                <textarea
                                                    rows={10}
                                                    value={data.terms_html}
                                                    onChange={(e) => setData('terms_html', e.target.value)}
                                                    className="w-full p-4 rounded-2xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 outline-none focus:border-amber-500 leading-relaxed bg-white"
                                                />
                                            )}
                                        </div>
                                    )}

                                    {activePolicyTab === 'refund' && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-xs font-black">
                                                <span className="text-slate-950 uppercase tracking-wide">Return & Dues Refund Policy</span>
                                                <Link href="/refund-policy" target="_blank" className="text-amber-700 hover:underline">
                                                    Open /refund-policy ↗
                                                </Link>
                                            </div>
                                            {policyPreviewMode ? (
                                                <div
                                                    className="p-6 rounded-2xl border-2 border-slate-300 bg-slate-50 min-h-[240px] prose prose-slate max-w-none text-slate-900 text-xs font-medium"
                                                    dangerouslySetInnerHTML={{ __html: data.refund_policy_html || '<p class="text-slate-500 italic">No refund policy entered yet.</p>' }}
                                                />
                                            ) : (
                                                <textarea
                                                    rows={10}
                                                    value={data.refund_policy_html}
                                                    onChange={(e) => setData('refund_policy_html', e.target.value)}
                                                    className="w-full p-4 rounded-2xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 outline-none focus:border-amber-500 leading-relaxed bg-white"
                                                />
                                            )}
                                        </div>
                                    )}

                                    {activePolicyTab === 'privacy' && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-xs font-black">
                                                <span className="text-slate-950 uppercase tracking-wide">Cadet & Volunteer Data Privacy Policy</span>
                                                <Link href="/privacy-policy" target="_blank" className="text-amber-700 hover:underline">
                                                    Open /privacy-policy ↗
                                                </Link>
                                            </div>
                                            {policyPreviewMode ? (
                                                <div
                                                    className="p-6 rounded-2xl border-2 border-slate-300 bg-slate-50 min-h-[240px] prose prose-slate max-w-none text-slate-900 text-xs font-medium"
                                                    dangerouslySetInnerHTML={{ __html: data.privacy_policy_html || '<p class="text-slate-500 italic">No privacy policy entered yet.</p>' }}
                                                />
                                            ) : (
                                                <textarea
                                                    rows={10}
                                                    value={data.privacy_policy_html}
                                                    onChange={(e) => setData('privacy_policy_html', e.target.value)}
                                                    className="w-full p-4 rounded-2xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 outline-none focus:border-amber-500 leading-relaxed bg-white"
                                                />
                                            )}
                                        </div>
                                    )}

                                    {activePolicyTab === 'delivery' && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-xs font-black">
                                                <span className="text-slate-950 uppercase tracking-wide">Rescue Kit & Digital ID Delivery Policy</span>
                                                <Link href="/delivery-policy" target="_blank" className="text-amber-700 hover:underline">
                                                    Open /delivery-policy ↗
                                                </Link>
                                            </div>
                                            {policyPreviewMode ? (
                                                <div
                                                    className="p-6 rounded-2xl border-2 border-slate-300 bg-slate-50 min-h-[240px] prose prose-slate max-w-none text-slate-900 text-xs font-medium"
                                                    dangerouslySetInnerHTML={{ __html: data.delivery_policy_html || '<p class="text-slate-500 italic">No delivery policy entered yet.</p>' }}
                                                />
                                            ) : (
                                                <textarea
                                                    rows={10}
                                                    value={data.delivery_policy_html}
                                                    onChange={(e) => setData('delivery_policy_html', e.target.value)}
                                                    className="w-full p-4 rounded-2xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 outline-none focus:border-amber-500 leading-relaxed bg-white"
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 7: ABOUT MOVEMENT STORY                                   */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'story' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-6 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                            <span>📖</span> About Movement Story & Civic Chronicle
                                        </h3>
                                        <p className="text-xs font-bold text-slate-600 mt-1">
                                            Featured on the /about route, detailing the youth awakening of 2018 and the roadmap toward Vision Zero in Bangladesh.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href="/about"
                                            target="_blank"
                                            className="text-xs px-3.5 py-2 rounded-xl bg-white text-slate-900 font-black hover:bg-slate-50 transition border-2 border-slate-300 shadow-xs"
                                        >
                                            View /about ↗
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => setStoryPreviewMode(!storyPreviewMode)}
                                            className={`text-xs px-4 py-2 rounded-xl font-black transition border-2 ${
                                                storyPreviewMode
                                                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                                                    : 'bg-white text-slate-900 border-slate-300 hover:border-slate-800'
                                            }`}
                                        >
                                            {storyPreviewMode ? '✏️ Edit Raw HTML' : '👁️ View Formatted Preview'}
                                        </button>
                                    </div>
                                </div>

                                {storyPreviewMode ? (
                                    <div
                                        className="p-8 rounded-2xl border-2 border-slate-300 bg-slate-50 min-h-[300px] prose prose-slate max-w-none text-xs font-medium text-slate-900 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: data.about_story_html || '<p class="italic text-slate-500">No story written yet.</p>' }}
                                    />
                                ) : (
                                    <div>
                                        <textarea
                                            rows={14}
                                            value={data.about_story_html}
                                            onChange={(e) => setData('about_story_html', e.target.value)}
                                            className="w-full p-4 rounded-2xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 outline-none focus:border-amber-500 leading-relaxed bg-white"
                                        />
                                        <p className="text-xs font-bold text-slate-600 mt-2">
                                            Supports standard HTML tags: &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, and &lt;blockquote&gt;.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* ───────────────────────────────────────────────────────────── */}
                        {/* TAB 8: NAVIGATION (HEADER & FOOTER)                           */}
                        {/* ───────────────────────────────────────────────────────────── */}
                        {activeTab === 'navigation' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-8 shadow-md"
                            >
                                <div className="border-b-2 border-slate-200 pb-5">
                                    <h3 className="text-lg font-black text-slate-950 flex items-center gap-2.5">
                                        <span>🧭</span> Header Navigation & Multi-Column Footer Studio
                                    </h3>
                                    <p className="text-xs font-bold text-slate-600 mt-1">
                                        Customize top navbar routes and bottom multi-column footer menus without altering layout source code.
                                    </p>
                                </div>

                                {/* Header Links Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-black uppercase text-amber-700 tracking-wider flex items-center gap-2">
                                            <span>📌</span> Top Header Navigation Links ({data.nav_links?.length || 0})
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={addHeaderLink}
                                            className="text-xs px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition border-2 border-amber-600 shadow-xs"
                                        >
                                            + Add Header Link
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {(data.nav_links || []).map((link, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-4 bg-white rounded-2xl border-2 border-slate-300 shadow-xs"
                                            >
                                                <span className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-mono font-black text-xs shrink-0">
                                                    {idx + 1}
                                                </span>
                                                <input
                                                    type="text"
                                                    value={link.label}
                                                    onChange={(e) => updateHeaderLink(idx, 'label', e.target.value)}
                                                    placeholder="Label (EN)"
                                                    className="w-full sm:w-1/3 px-3.5 py-2 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-950 bg-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={link.label_bn || ''}
                                                    onChange={(e) => updateHeaderLink(idx, 'label_bn', e.target.value)}
                                                    placeholder="Label (BN)"
                                                    className="w-full sm:w-1/3 px-3.5 py-2 rounded-xl border-2 border-slate-300 text-xs font-bangla font-bold text-slate-950 bg-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={link.href}
                                                    onChange={(e) => updateHeaderLink(idx, 'href', e.target.value)}
                                                    placeholder="/path"
                                                    className="w-full sm:w-1/3 px-3.5 py-2 rounded-xl border-2 border-slate-300 text-xs font-mono font-bold text-slate-950 bg-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeHeaderLink(idx)}
                                                    className="p-2 rounded-xl text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-300 transition shrink-0 font-bold"
                                                    title="Delete link"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Columns Section */}
                                <div className="pt-8 border-t-2 border-slate-200 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-xs font-black uppercase text-amber-700 tracking-wider flex items-center gap-2">
                                                <span>📑</span> Comprehensive Footer Columns ({data.footer_columns?.length || 0})
                                            </h4>
                                            <p className="text-xs font-bold text-slate-600 mt-1">
                                                Columns rendered dynamically in the public footer next to the Secretariat statutory card.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addFooterColumn}
                                            className="text-xs px-4 py-2 rounded-xl bg-slate-950 text-white font-black hover:bg-slate-800 transition shadow-xs"
                                        >
                                            + Add Footer Column
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {(data.footer_columns || []).map((col, colIdx) => (
                                            <div
                                                key={colIdx}
                                                className="p-5 rounded-2xl border-2 border-slate-300 bg-white space-y-4 shadow-sm"
                                            >
                                                <div className="flex items-center justify-between gap-2 border-b-2 border-slate-200 pb-3">
                                                    <input
                                                        type="text"
                                                        value={col.heading}
                                                        onChange={(e) => updateFooterColumnHeading(colIdx, e.target.value)}
                                                        placeholder="Column Heading"
                                                        className="font-black text-xs text-slate-950 bg-white outline-none border-b-2 border-slate-400 focus:border-amber-500 w-full py-1"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFooterColumn(colIdx)}
                                                        className="text-xs text-rose-700 hover:text-rose-800 font-black shrink-0 bg-rose-50 px-2 py-0.5 rounded border border-rose-300"
                                                        title="Delete column"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>

                                                <div className="space-y-2.5">
                                                    {(col.links || []).map((link, linkIdx) => (
                                                        <div key={linkIdx} className="flex items-center gap-2">
                                                            <input
                                                                type="text"
                                                                value={link.label}
                                                                onChange={(e) =>
                                                                    updateFooterColumnLink(colIdx, linkIdx, 'label', e.target.value)
                                                                }
                                                                placeholder="Link Title"
                                                                className="w-1/2 px-3 py-1.5 rounded-xl border-2 border-slate-300 text-xs bg-white font-bold text-slate-950"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={link.href}
                                                                onChange={(e) =>
                                                                    updateFooterColumnLink(colIdx, linkIdx, 'href', e.target.value)
                                                                }
                                                                placeholder="/url"
                                                                className="w-1/2 px-3 py-1.5 rounded-xl border-2 border-slate-300 text-xs bg-white font-mono font-bold text-slate-950"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFooterColumnLink(colIdx, linkIdx)}
                                                                className="text-slate-400 hover:text-rose-600 font-black text-sm px-1"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <button
                                                        type="button"
                                                        onClick={() => addFooterColumnLink(colIdx)}
                                                        className="w-full py-2 text-center rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-500 text-xs font-black text-slate-700 hover:text-amber-700 transition bg-slate-50"
                                                    >
                                                        + Add Link
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Sticky Action Footer */}
                        <div className="sticky bottom-4 bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 z-30">
                            <div className="flex items-center gap-2.5 text-xs text-slate-950 font-bold">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                                <span>Changes persist to PostgreSQL / SQLite singleton and invalidate public Redis/File cache immediately.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2.5 text-xs font-black text-slate-900 hover:text-amber-700 transition"
                                >
                                    Cancel / Preview Site ↗
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md border-2 border-amber-600 transition disabled:opacity-50 flex items-center gap-2"
                                >
                                    {processing ? 'Publishing...' : '💾 Save & Publish Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
