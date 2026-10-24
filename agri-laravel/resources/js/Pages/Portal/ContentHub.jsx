import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ContentHub({ config, events = [], notices = [], gallery = [], districts = [] }) {
    const [activeTab, setActiveTab] = useState('events');

    // Modals
    const [showEventModal, setShowEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventForm, setEventForm] = useState({
        title: '',
        title_bn: '',
        summary: '',
        description: '',
        event_date: '',
        location: '',
        location_bn: '',
        district_id: '',
        type: 'campaign',
        attendees_count: 100,
        is_featured: false,
    });

    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [noticeForm, setNoticeForm] = useState({
        memo_no: '',
        title: '',
        title_bn: '',
        category: 'gazette',
        priority: 'routine',
        body_html: '',
        published_at: new Date().toISOString().split('T')[0],
        signed_by: '',
        is_pinned: false,
    });

    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [galleryForm, setGalleryForm] = useState({
        title: '',
        title_bn: '',
        category: 'blackspot_audit',
        image_url: '/images/gallery/field-audit.jpg',
        caption: '',
        district_id: '',
        captured_at: new Date().toISOString().split('T')[0],
        sort_order: 1,
    });

    // Event handlers
    const openCreateEvent = () => {
        setEditingEvent(null);
        setEventForm({
            title: '',
            title_bn: '',
            summary: '',
            description: '',
            event_date: '',
            location: '',
            location_bn: '',
            district_id: '',
            type: 'campaign',
            attendees_count: 100,
            is_featured: false,
        });
        setShowEventModal(true);
    };

    const openEditEvent = (ev) => {
        setEditingEvent(ev);
        setEventForm({
            title: ev.title,
            title_bn: ev.title_bn || '',
            summary: ev.summary || '',
            description: ev.description || '',
            event_date: ev.event_date ? ev.event_date.slice(0, 16) : '',
            location: ev.location,
            location_bn: ev.location_bn || '',
            district_id: ev.district_id || '',
            type: ev.type || 'campaign',
            attendees_count: ev.attendees_count || 100,
            is_featured: !!ev.is_featured,
        });
        setShowEventModal(true);
    };

    const saveEvent = (e) => {
        e.preventDefault();
        if (editingEvent) {
            router.patch(route('portal.events.update', editingEvent.id), eventForm, {
                onSuccess: () => setShowEventModal(false),
            });
        } else {
            router.post(route('portal.events.store'), eventForm, {
                onSuccess: () => setShowEventModal(false),
            });
        }
    };

    // Notice handlers
    const openCreateNotice = () => {
        setEditingNotice(null);
        setNoticeForm({
            memo_no: 'RSM/DIR/' + new Date().getFullYear() + '/' + Math.floor(100 + Math.random() * 900),
            title: '',
            title_bn: '',
            category: 'gazette',
            priority: 'routine',
            body_html: '',
            published_at: new Date().toISOString().split('T')[0],
            signed_by: 'Engr. Mushfiqur Rahman (National Secretariat)',
            is_pinned: false,
        });
        setShowNoticeModal(true);
    };

    const saveNotice = (e) => {
        e.preventDefault();
        if (editingNotice) {
            router.patch(route('portal.notices.update', editingNotice.id), noticeForm, {
                onSuccess: () => setShowNoticeModal(false),
            });
        } else {
            router.post(route('portal.notices.store'), noticeForm, {
                onSuccess: () => setShowNoticeModal(false),
            });
        }
    };

    // Gallery handler
    const saveGallery = (e) => {
        e.preventDefault();
        router.post(route('portal.gallery.store'), galleryForm, {
            onSuccess: () => setShowGalleryModal(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                            <span>📰 Public Content Hub & Secretariat Publishing Desk</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Publish field campaigns, official gazettes, and action gallery albums visible on the public portal.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {activeTab === 'events' && (
                            <button
                                onClick={openCreateEvent}
                                className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300 shadow-sm"
                            >
                                + New Campaign / Audit
                            </button>
                        )}
                        {activeTab === 'notices' && (
                            <button
                                onClick={openCreateNotice}
                                className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300 shadow-sm"
                            >
                                + Publish Gazette / Notice
                            </button>
                        )}
                        {activeTab === 'gallery' && (
                            <button
                                onClick={() => setShowGalleryModal(true)}
                                className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300 shadow-sm"
                            >
                                + Upload Action Photo
                            </button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Content Hub — Secretariat Portal" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* ── TABS ─────────────────────────────────────────────────────────── */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                            activeTab === 'events'
                                ? 'bg-amber-400 text-slate-950 shadow-md'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                    >
                        🚨 Campaigns & Audits ({events.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                            activeTab === 'notices'
                                ? 'bg-amber-400 text-slate-950 shadow-md'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                    >
                        📜 Gazettes & Circulars ({notices.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                            activeTab === 'gallery'
                                ? 'bg-amber-400 text-slate-950 shadow-md'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                    >
                        📸 Field Action Gallery ({gallery.length})
                    </button>
                </div>

                {/* ── TAB 1: EVENTS / CAMPAIGNS ────────────────────────────────────── */}
                {activeTab === 'events' && (
                    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                                    <tr>
                                        <th className="py-4 px-4">Campaign Title</th>
                                        <th className="py-4 px-4">Type</th>
                                        <th className="py-4 px-4">Event Date</th>
                                        <th className="py-4 px-4">Location</th>
                                        <th className="py-4 px-4">Cadets RSVP</th>
                                        <th className="py-4 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-900">
                                    {events.map((ev) => (
                                        <tr key={ev.id} className="hover:bg-slate-900/60 transition-colors">
                                            <td className="py-4 px-4">
                                                <div className="font-bold text-white text-sm">{ev.title}</div>
                                                <div className="text-[11px] text-amber-400">{ev.title_bn}</div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-amber-300 border border-slate-700">
                                                    {ev.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 font-mono text-slate-400">
                                                {new Date(ev.event_date).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-4 text-slate-300">
                                                {ev.location}
                                            </td>
                                            <td className="py-4 px-4 font-mono font-bold text-white">
                                                {ev.attendees_count || 0}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditEvent(ev)}
                                                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-bold transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Delete event '${ev.title}'?`)) {
                                                                router.delete(route('portal.events.destroy', ev.id));
                                                            }
                                                        }}
                                                        className="p-1 hover:text-rose-400 text-slate-500 transition"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── TAB 2: NOTICES / GAZETTES ────────────────────────────────────── */}
                {activeTab === 'notices' && (
                    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                                    <tr>
                                        <th className="py-4 px-4">Memo No.</th>
                                        <th className="py-4 px-4">Notice Title</th>
                                        <th className="py-4 px-4">Category</th>
                                        <th className="py-4 px-4">Priority</th>
                                        <th className="py-4 px-4">Published Date</th>
                                        <th className="py-4 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-900">
                                    {notices.map((n) => (
                                        <tr key={n.id} className="hover:bg-slate-900/60 transition-colors">
                                            <td className="py-4 px-4 font-mono font-bold text-amber-400">
                                                {n.memo_no || 'RSM/DIR'}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="font-bold text-white text-sm">{n.title}</div>
                                                <div className="text-[11px] text-slate-400">{n.title_bn}</div>
                                            </td>
                                            <td className="py-4 px-4 uppercase font-bold text-[10px] text-slate-400">
                                                {n.category}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                    n.priority === 'urgent'
                                                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                        : n.priority === 'high'
                                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                        : 'bg-slate-800 text-slate-300'
                                                }`}>
                                                    {n.priority}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 font-mono text-slate-400">
                                                {n.published_at}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Delete notice '${n.title}'?`)) {
                                                            router.delete(route('portal.notices.destroy', n.id));
                                                        }
                                                    }}
                                                    className="p-1 hover:text-rose-400 text-slate-500 transition"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── TAB 3: GALLERY ──────────────────────────────────────────────── */}
                {activeTab === 'gallery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {gallery.map((g) => (
                            <div key={g.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group">
                                <div className="h-40 bg-slate-900 flex items-center justify-center text-4xl relative">
                                    <span>📸</span>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Remove photo '${g.title}'?`)) {
                                                router.delete(route('portal.gallery.destroy', g.id));
                                            }
                                        }}
                                        className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="p-4 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">
                                        {g.category}
                                    </span>
                                    <h4 className="font-bold text-white text-xs truncate">{g.title}</h4>
                                    <p className="text-[11px] text-slate-400 truncate">{g.caption || 'No caption'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── CREATE / EDIT EVENT MODAL ─────────────────────────────────────── */}
            {showEventModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                            <h3 className="text-lg font-black text-white">
                                {editingEvent ? 'Edit Campaign Event' : 'Create New Campaign / Field Audit'}
                            </h3>
                            <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={saveEvent} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Title (English)</label>
                                <input
                                    type="text"
                                    value={eventForm.title}
                                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Title (বাংলা)</label>
                                <input
                                    type="text"
                                    value={eventForm.title_bn}
                                    onChange={(e) => setEventForm({ ...eventForm, title_bn: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Event Type</label>
                                    <select
                                        value={eventForm.type}
                                        onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    >
                                        <option value="campaign">Public Campaign</option>
                                        <option value="audit">Blackspot Audit</option>
                                        <option value="training">Cadet Training</option>
                                        <option value="rally">Citizens Rally</option>
                                        <option value="hearing">Policy Hearing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Target District</label>
                                    <select
                                        value={eventForm.district_id}
                                        onChange={(e) => setEventForm({ ...eventForm, district_id: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    >
                                        <option value="">National / All Districts</option>
                                        {districts.map(d => (
                                            <option key={d.id} value={d.id}>{d.name_en} ({d.division})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Event Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={eventForm.event_date}
                                        onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Expected Cadets</label>
                                    <input
                                        type="number"
                                        value={eventForm.attendees_count}
                                        onChange={(e) => setEventForm({ ...eventForm, attendees_count: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Venue / Location</label>
                                <input
                                    type="text"
                                    value={eventForm.location}
                                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Summary</label>
                                <textarea
                                    rows="2"
                                    value={eventForm.summary}
                                    onChange={(e) => setEventForm({ ...eventForm, summary: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowEventModal(false)}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300"
                                >
                                    Save Campaign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── CREATE NOTICE MODAL ───────────────────────────────────────────── */}
            {showNoticeModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                            <h3 className="text-lg font-black text-white">Publish Secretariat Notice / Directive</h3>
                            <button onClick={() => setShowNoticeModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={saveNotice} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Memo Number</label>
                                    <input
                                        type="text"
                                        value={noticeForm.memo_no}
                                        onChange={(e) => setNoticeForm({ ...noticeForm, memo_no: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Priority</label>
                                    <select
                                        value={noticeForm.priority}
                                        onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    >
                                        <option value="routine">Routine</option>
                                        <option value="high">High Priority</option>
                                        <option value="urgent">Urgent Directive</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Title (English)</label>
                                <input
                                    type="text"
                                    value={noticeForm.title}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Title (বাংলা)</label>
                                <input
                                    type="text"
                                    value={noticeForm.title_bn}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, title_bn: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Directives & Memo Body (HTML)</label>
                                <textarea
                                    rows="4"
                                    value={noticeForm.body_html}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, body_html: e.target.value })}
                                    placeholder="<p>Administrative resolution directives...</p>"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Publish Date</label>
                                    <input
                                        type="date"
                                        value={noticeForm.published_at}
                                        onChange={(e) => setNoticeForm({ ...noticeForm, published_at: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Signed By</label>
                                    <input
                                        type="text"
                                        value={noticeForm.signed_by}
                                        onChange={(e) => setNoticeForm({ ...noticeForm, signed_by: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowNoticeModal(false)}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300"
                                >
                                    Publish Directive
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── UPLOAD GALLERY MODAL ─────────────────────────────────────────── */}
            {showGalleryModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                            <h3 className="text-lg font-black text-white">Add Field Photo to Action Gallery</h3>
                            <button onClick={() => setShowGalleryModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={saveGallery} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={galleryForm.title}
                                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                                <select
                                    value={galleryForm.category}
                                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                >
                                    <option value="blackspot_audit">Blackspot Audit</option>
                                    <option value="field_action">Field Responders</option>
                                    <option value="youth_cadets">Youth Cadets</option>
                                    <option value="national_rally">Citizens Assembly</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Image URL / Path</label>
                                <input
                                    type="text"
                                    value={galleryForm.image_url}
                                    onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Caption</label>
                                <input
                                    type="text"
                                    value={galleryForm.caption}
                                    onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowGalleryModal(false)}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300"
                                >
                                    Upload Photo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
