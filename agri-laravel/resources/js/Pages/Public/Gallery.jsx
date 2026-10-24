import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Gallery({ config, items = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeModalItem, setActiveModalItem] = useState(null);

    const categories = ['All', 'Blackspot Audits', 'Field Responders', 'Youth Cadets', 'Citizens Rallies'];

    const defaultItems = [
        {
            id: 1,
            category: 'Blackspot Audits',
            title: 'Night-Time Highway Speed & Lighting Audit on N1 Highway',
            title_bn: 'এন-১ ঢাকা-চট্টগ্রাম মহাসড়কে রাতের গতি ও আলোকস্বল্পতা অডিট',
            location: 'Sitakunda, Chittagong',
            year: '2026',
            emoji: '🔦',
            color: 'from-slate-900 to-amber-950',
            desc: 'Cadet engineers testing retroreflective signage along high-casualty blind curves in Sitakunda.',
        },
        {
            id: 2,
            category: 'Field Responders',
            title: 'Emergency Roadside Bleeding Control Drill in Gazipur',
            title_bn: 'গাজীপুরে সড়ক দুর্ঘটনায় রক্তপাত বন্ধে ক্যাডেটদের প্রত্যক্ষ মহড়া',
            location: 'Joydebpur, Gazipur',
            year: '2026',
            emoji: '🚑',
            color: 'from-rose-950 to-slate-900',
            desc: 'Training 120 volunteer transport workers and students in practical golden-hour trauma stabilization.',
        },
        {
            id: 3,
            category: 'Youth Cadets',
            title: 'School Zone 3D Zebra Crossing Installation by Sylhet Cadets',
            title_bn: 'সিলেট জেলায় স্কুল জোনে স্থায়ী জেব্রা ক্রসিং অঙ্কন ও ট্রাফিক মহড়া',
            location: 'Zindabazar, Sylhet',
            year: '2026',
            emoji: '🚸',
            color: 'from-amber-950 to-yellow-950',
            desc: 'Cadets marking high-visibility optical zebra crossings outside Gov. Pilot High School to protect children.',
        },
        {
            id: 4,
            category: 'Citizens Rallies',
            title: 'National Citizens Rally for Speed Governors and Fit Buses',
            title_bn: 'স্পিড গভর্নর ও ফিটনেসবিহীন বাস বন্ধের দাবিতে কেন্দ্রীয় নাগরিক সমাবেশ',
            location: 'Central Shaheed Minar, Dhaka',
            year: '2026',
            emoji: '📢',
            color: 'from-blue-950 to-slate-900',
            desc: 'Over 5,000 citizens and student leaders uniting to demand strict fitness certification of commercial buses.',
        },
        {
            id: 5,
            category: 'Blackspot Audits',
            title: 'LiDAR Speed Detection & Sightline Obstruction Mapping',
            title_bn: 'লিডার স্পিড গান ও বাঁক পরিমাপে ক্যাডেট টিম',
            location: 'Daudkandi, Comilla',
            year: '2026',
            emoji: '📡',
            color: 'from-slate-900 to-emerald-950',
            desc: 'Mapping unpermitted median cuts and unauthorized vehicle u-turns creating chronic crash hazards.',
        },
        {
            id: 6,
            category: 'Youth Cadets',
            title: 'Volunteer Cadet Passing-Out Parade & Shield Conformance',
            title_bn: 'স্বেচ্ছাসেবক ক্যাডেট শপথ গ্রহণ ও ব্যাজ প্রদান অনুষ্ঠান',
            location: 'National Cadet Field, Uttara',
            year: '2026',
            emoji: '🎖️',
            color: 'from-amber-900 to-slate-950',
            desc: '500 newly certified roadside first responders taking the solemn oath to protect lives on Bangladesh roads.',
        },
    ];

    const displayItems = items.length > 0
        ? items.map(item => ({
            id: item.id,
            category: item.category === 'blackspot_audit' ? 'Blackspot Audits' :
                      item.category === 'field_action' ? 'Field Responders' :
                      item.category === 'youth_cadets' ? 'Youth Cadets' : 'Citizens Rallies',
            title: item.title,
            title_bn: item.title_bn,
            location: item.district?.name_en || 'Dhaka',
            year: item.captured_at ? new Date(item.captured_at).getFullYear().toString() : '2026',
            emoji: item.category === 'blackspot_audit' ? '🔦' : item.category === 'field_action' ? '🚑' : '🚸',
            color: 'from-slate-900 to-amber-950',
            desc: item.caption || item.title,
        }))
        : defaultItems;

    const filtered = selectedCategory === 'All'
        ? displayItems
        : displayItems.filter(item => item.category === selectedCategory);

    return (
        <PublicLayout config={config}>
            <Head title={`Field Action & Blackspot Gallery — ${config?.org_name || 'Road Safety Movement'}`} />

            {/* Header */}
            <div className="bg-slate-950 text-white border-b border-slate-800 py-16 px-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.15),transparent)]" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
                        Visual Field Evidence
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        Action on the Frontlines of Road Safety
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Documenting nationwide blackspot audits, rapid medical crash drills, school crosswalk installations, and civic mobilizations.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-5 py-12">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                selectedCategory === cat
                                    ? 'bg-amber-400 text-slate-950 shadow-md'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item, idx) => (
                        <motion.div
                            key={item.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setActiveModalItem(item)}
                            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                            <div className={`h-48 bg-gradient-to-br ${item.color} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
                                <div className="flex items-center justify-between relative z-10">
                                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-bold tracking-wider uppercase">
                                        {item.category}
                                    </span>
                                    <span className="text-xs font-mono font-bold text-amber-300">
                                        📍 {item.location} · {item.year}
                                    </span>
                                </div>
                                <div className="text-5xl transform group-hover:scale-110 transition-transform relative z-10">
                                    {item.emoji}
                                </div>
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 blur-xl group-hover:bg-amber-400/20 transition-all" />
                            </div>

                            <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.title_bn && (
                                        <p className="text-xs font-bold text-slate-500 mt-0.5">
                                            {item.title_bn}
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                                    <span>Inspect Field Record</span>
                                    <span>→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {activeModalItem && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
                        onClick={() => setActiveModalItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-slate-200"
                        >
                            <div className={`h-48 bg-gradient-to-br ${activeModalItem.color} p-6 flex flex-col justify-between text-white relative`}>
                                <button
                                    onClick={() => setActiveModalItem(null)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center font-bold hover:bg-black/60"
                                >
                                    ✕
                                </button>
                                <span className="text-xs font-mono font-bold text-amber-300">
                                    {activeModalItem.category} • {activeModalItem.location} ({activeModalItem.year})
                                </span>
                                <div className="text-6xl">{activeModalItem.emoji}</div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">
                                        {activeModalItem.title}
                                    </h3>
                                    {activeModalItem.title_bn && (
                                        <div className="text-xs font-bold text-amber-600 mt-1">
                                            {activeModalItem.title_bn}
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {activeModalItem.desc}
                                </p>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                                    <button
                                        onClick={() => setActiveModalItem(null)}
                                        className="px-5 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800"
                                    >
                                        Close Record
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
