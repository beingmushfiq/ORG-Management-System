import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100 relative overflow-hidden"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
            {/* Ambient emerald background glow orbs */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-emerald-950/50 group-hover:scale-105 transition">
                            🌾
                        </div>
                        <div className="text-left">
                            <h1 className="text-base font-black text-white tracking-tight leading-tight">
                                Agricultural Olympiad
                            </h1>
                            <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                                Administrative Secretariat
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Card Container */}
                <div className="bg-white text-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 relative">
                    {children}
                </div>

                {/* Sub-Footer Statutory Credentials */}
                <div className="mt-8 text-center text-xs text-slate-400 space-y-1">
                    <div>
                        Official Secretariat Portal · Trade License: <span className="font-mono text-slate-300">03247/2023-2025</span>
                    </div>
                    <div>
                        <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                            ← Return to Public Website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
