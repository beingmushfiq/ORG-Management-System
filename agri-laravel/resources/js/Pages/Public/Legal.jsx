import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Legal({ config, pageType, title, contentHtml }) {
    const tabs = [
        { key: 'terms', label: 'Terms & Conditions', href: '/terms-condition' },
        { key: 'refund', label: 'Return & Refund Policy', href: '/refund-policy' },
        { key: 'privacy', label: 'Privacy Policy', href: '/privacy-policy' },
        { key: 'delivery', label: 'Delivery Policy', href: '/delivery-policy' },
    ];

    return (
        <PublicLayout config={config}>
            <Head title={`${title} — ${config?.org_name || 'National Agricultural Olympiad'}`} />

            {/* Breadcrumb & Header Banner */}
            <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/60 py-12 px-5">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                        <Link href="/" className="hover:text-emerald-700 transition">Home</Link>
                        <span>/</span>
                        <span className="text-slate-400">Legal & Statutory</span>
                        <span>/</span>
                        <span className="text-emerald-700 font-bold">{title}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        {title}
                    </h1>
                    <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                        Published in strict accordance with the e-commerce operating guidelines of the Ministry of Commerce and Bangladesh Bank online payment transaction standards.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-5 py-10">
                {/* Statutory Tab Pills */}
                <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
                    {tabs.map((tab) => {
                        const active = tab.key === pageType;
                        return (
                            <Link
                                key={tab.key}
                                href={tab.href}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                                    active
                                        ? 'bg-white text-emerald-800 shadow-sm border border-emerald-600/20'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                                }`}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Statutory Credential Callout Box */}
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div>
                        <div className="font-bold text-emerald-950 mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                            Registered Legal Entity & Compliance Status
                        </div>
                        <div className="text-emerald-900/80">
                            <strong>Organization:</strong> {config?.org_name} ({config?.org_name_bn}) | <strong>Trade License:</strong> {config?.trade_license_number || '03247/2023-2025'}
                        </div>
                        <div className="text-emerald-900/80 mt-0.5">
                            <strong>Registered Office:</strong> {config?.head_office_address}
                        </div>
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="shrink-0 px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-emerald-800 font-semibold text-xs hover:bg-emerald-100/50 transition flex items-center gap-1.5"
                    >
                        🖨️ Print Document
                    </button>
                </div>

                {/* Content Box */}
                <motion.article
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-6 sm:p-10 text-slate-800 leading-relaxed text-sm prose prose-slate max-w-none prose-h3:text-lg prose-h3:font-bold prose-h3:text-slate-900 prose-h3:mt-6 prose-h3:mb-2 prose-p:mb-4"
                >
                    {contentHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    ) : (
                        <p className="text-slate-500 italic">Policy content is being updated by the legal compliance division.</p>
                    )}

                    <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-3">
                        <div>
                            Last Reviewed: October 2025 | Regulatory Jurisdiction: People's Republic of Bangladesh
                        </div>
                        <div className="font-medium text-emerald-700">
                            Support: {config?.contact_email || 'agriculturalolympiad@gmail.com'}
                        </div>
                    </div>
                </motion.article>

                {/* Quick Registration CTA */}
                <div className="mt-8 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-900/10">
                    <div>
                        <h3 className="text-lg font-black tracking-tight mb-1">
                            Ready to participate in the National Olympiad?
                        </h3>
                        <p className="text-xs text-emerald-100/80">
                            Review our terms and complete registration in less than 3 minutes.
                        </p>
                    </div>
                    <Link
                        href="/apply"
                        className="shrink-0 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md hover:scale-105"
                    >
                        Register Now (Apply) →
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
