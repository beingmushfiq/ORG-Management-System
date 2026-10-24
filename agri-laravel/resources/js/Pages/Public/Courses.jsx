import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Courses({ config, courses }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = (courses || []).filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.title_bn && c.title_bn.includes(searchTerm)) ||
        (c.instructor && c.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <PublicLayout config={config}>
            <Head title={`Road Safety Academy & Certifications — ${config?.org_name || 'Road Safety Movement'}`} />

            {/* Header Banner */}
            <div className="bg-slate-950 text-white border-b border-slate-800 py-16 px-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                        Master Defensive Road Craft & Emergency Response
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        Road Safety Academy & Field Certification
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Accredited training programs designed in collaboration with traffic engineers and trauma specialists. Transparent fees in BDT with verified digital credentials.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-md mx-auto relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search courses, instructors, or topics..."
                            className="w-full px-5 py-3.5 pl-12 rounded-2xl border border-slate-700 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm outline-none bg-slate-900 text-white placeholder-slate-400"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                            🔍
                        </span>
                    </div>
                </div>
            </div>

            {/* Course Cards Grid */}
            <div className="max-w-6xl mx-auto px-5 py-14">
                <div className="flex items-center justify-between mb-8">
                    <div className="text-sm font-bold text-slate-700">
                        Showing <span className="text-amber-700 font-black">{filteredCourses.length}</span> Active Certification Programmes
                    </div>
                    <div className="text-xs text-slate-500">
                        Official Currency: <strong className="text-slate-800 font-bold">{config?.default_currency || 'BDT'} (৳)</strong>
                    </div>
                </div>

                {filteredCourses.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                        <div className="text-4xl mb-3">🛡️</div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">No courses found</h3>
                        <p className="text-xs text-slate-500 mb-4">Try searching with a different keyword or reset search.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                        >
                            Reset Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredCourses.map((course, idx) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-7 flex flex-col justify-between group hover:border-amber-500/60"
                            >
                                <div>
                                    {/* Top Meta */}
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-bold font-mono">
                                            {course.duration_hours > 0 ? `${course.duration_hours} Hours Total` : 'Self-Paced'}
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">
                                            📚 {course.lesson_count} Practical Modules
                                        </span>
                                    </div>

                                    {/* Titles */}
                                    <h2 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition tracking-tight mb-1">
                                        {course.title}
                                    </h2>
                                    {course.title_bn && (
                                        <div className="text-xs font-semibold text-slate-500 mb-3 font-bangla">
                                            {course.title_bn}
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                                        {course.description}
                                    </p>

                                    {/* Instructor */}
                                    {course.instructor && (
                                        <div className="flex items-center gap-2.5 py-3 border-t border-slate-100 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                                                👨‍🏫
                                            </div>
                                            <div className="text-xs">
                                                <div className="font-bold text-slate-800">{course.instructor}</div>
                                                <div className="text-slate-400 text-[10px]">Certified Academy Instructor</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Pricing & Action Bottom Bar */}
                                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                                            Tuition Fee
                                        </span>
                                        <span className="text-2xl font-black text-slate-950">
                                            {course.fee_bdt}
                                        </span>
                                    </div>

                                    <Link
                                        href="/apply"
                                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-sm hover:shadow group-hover:scale-105"
                                    >
                                        Enroll Now →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
