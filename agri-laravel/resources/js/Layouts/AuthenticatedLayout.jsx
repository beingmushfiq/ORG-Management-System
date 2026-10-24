import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const roleName = user?.role?.name || (user?.email?.includes('admin') ? 'Super Admin (Tier 1)' : 'General Member');

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
            {/* Top Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 shadow-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-6">
                            {/* Brand / Logo */}
                            <Link href="/portal" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                                    🛡️
                                </div>
                                <div className="leading-tight">
                                    <div className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                                        <span>Road Safety Movement</span>
                                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] font-black uppercase text-amber-400">
                                            Secretariat
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                                        Vision Zero Governance Portal
                                    </div>
                                </div>
                            </Link>

                            {/* Desktop Nav Links (Role-Aware according to 5-tier RBAC) */}
                            <div className="hidden lg:flex items-center space-x-1">
                                <NavLink
                                    href="/portal"
                                    active={route().current('portal.dashboard') || route().current('dashboard')}
                                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                >
                                    📊 {(!user?.role || user?.role?.tier_level <= 3) ? 'War Room' : 'My Terminal'}
                                </NavLink>

                                {(!user?.role || user?.role?.tier_level <= 3) ? (
                                    <>
                                        <NavLink
                                            href="/portal/members"
                                            active={route().current('portal.members') || route().current('portal.users.*')}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                        >
                                            👥 Members & RBAC
                                        </NavLink>
                                        <NavLink
                                            href="/portal/districts"
                                            active={route().current('portal.districts')}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                        >
                                            🗺️ 64 Districts
                                        </NavLink>
                                        <NavLink
                                            href="/portal/content"
                                            active={route().current('portal.content')}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                        >
                                            📰 Content Hub
                                        </NavLink>
                                        <NavLink
                                            href="/portal/cms"
                                            active={route().current('portal.cms')}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                        >
                                            🎨 CMS Studio
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink
                                            href="/portal/districts"
                                            active={route().current('portal.districts')}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                        >
                                            🗺️ 64 Districts
                                        </NavLink>
                                        <NavLink
                                            href="/courses"
                                            active={false}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                        >
                                            📚 Academy
                                        </NavLink>
                                        <NavLink
                                            href="/notices"
                                            active={false}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                                        >
                                            📰 Directives
                                        </NavLink>
                                        <NavLink
                                            href={`/portal/users/${user.id}`}
                                            active={route().current('portal.users.show', user.id)}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300"
                                        >
                                            🆔 My Digital ID
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right side CTAs & User Menu */}
                        <div className="hidden sm:flex sm:items-center sm:gap-3">
                            <a
                                href="/"
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 transition flex items-center gap-1.5 border border-slate-700"
                            >
                                <span>🌐 Public Site</span>
                                <span className="text-[10px]">↗</span>
                            </a>

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-slate-800 focus:outline-none shadow-sm"
                                        >
                                            <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[11px]">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="text-left hidden md:block">
                                                <div className="text-white text-xs truncate max-w-[120px] font-bold">{user.name}</div>
                                                <div className="text-[9px] text-amber-400 font-mono leading-none">{roleName}</div>
                                            </div>
                                            <svg
                                                className="h-3.5 w-3.5 text-slate-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <div className="px-4 py-2 border-b border-slate-100 text-[11px] text-slate-500">
                                            Signed in as <strong className="text-slate-800 block truncate">{user.email}</strong>
                                            <span className="text-amber-700 font-bold block mt-0.5">{roleName}</span>
                                        </div>
                                        <Dropdown.Link href="/portal/members">
                                            👥 Members & RBAC
                                        </Dropdown.Link>
                                        <Dropdown.Link href="/portal/districts">
                                            🗺️ 64 Districts
                                        </Dropdown.Link>
                                        <Dropdown.Link href="/portal/content">
                                            📰 Content Hub
                                        </Dropdown.Link>
                                        <Dropdown.Link href="/portal/cms">
                                            🎨 CMS Studio
                                        </Dropdown.Link>
                                        <Dropdown.Link href="/profile">
                                            👤 Account Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-red-600 font-bold"
                                        >
                                            🚪 Sign Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile hamburger */}
                        <div className="-mr-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Responsive Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2'}>
                    <ResponsiveNavLink
                        href="/portal"
                        active={route().current('portal.dashboard')}
                        className="text-slate-200"
                    >
                        📊 Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href="/portal/members"
                        active={route().current('portal.members')}
                        className="text-slate-200"
                    >
                        👥 Members & RBAC
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href="/portal/districts"
                        active={route().current('portal.districts')}
                        className="text-slate-200"
                    >
                        🗺️ 64 Districts
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href="/portal/content"
                        active={route().current('portal.content')}
                        className="text-slate-200"
                    >
                        📰 Content Hub
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href="/portal/cms"
                        active={route().current('portal.cms')}
                        className="text-slate-200"
                    >
                        🎨 CMS Studio
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href="/profile"
                        active={route().current('profile.edit')}
                        className="text-slate-200"
                    >
                        👤 Account Profile
                    </ResponsiveNavLink>
                    <div className="pt-2 border-t border-slate-800">
                        <ResponsiveNavLink
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-rose-400 font-bold"
                        >
                            🚪 Sign Out ({user.name})
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-slate-950 border-b border-slate-800 shadow-sm py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content Area */}
            <main className="flex-1 bg-slate-900 py-8 text-slate-100">
                {children}
            </main>
        </div>
    );
}
