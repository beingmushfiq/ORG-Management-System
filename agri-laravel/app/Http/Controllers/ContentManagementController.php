<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\District;
use App\Models\Event;
use App\Models\GalleryItem;
use App\Models\Notice;
use App\Models\OrgConfig;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ContentManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Portal/ContentHub', [
            'config'    => OrgConfig::current()->toArray(),
            'events'    => Event::with('district')->orderBy('event_date', 'desc')->get(),
            'notices'   => Notice::orderBy('published_at', 'desc')->get(),
            'gallery'   => GalleryItem::with('district')->orderBy('sort_order')->get(),
            'districts' => District::active()->orderBy('name_en')->get(),
        ]);
    }

    // ── EVENTS ────────────────────────────────────────────────────────
    public function storeEvent(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'           => 'required|string|max:200',
            'title_bn'        => 'nullable|string|max:200',
            'summary'         => 'required|string|max:500',
            'description'     => 'nullable|string',
            'event_date'      => 'required|date',
            'location'        => 'required|string|max:200',
            'location_bn'     => 'nullable|string|max:200',
            'district_id'     => 'nullable|exists:districts,id',
            'type'            => 'required|string|in:campaign,audit,training,rally,hearing',
            'attendees_count' => 'nullable|integer|min:0',
            'is_featured'     => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        $event = Event::create($validated);

        AuditLog::log('create', 'event', (string) $event->id, ['title' => $event->title]);

        return back()->with('success', "Event '{$event->title}' created successfully.");
    }

    public function updateEvent(Request $request, int $id): RedirectResponse
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'title'           => 'required|string|max:200',
            'title_bn'        => 'nullable|string|max:200',
            'summary'         => 'required|string|max:500',
            'description'     => 'nullable|string',
            'event_date'      => 'required|date',
            'location'        => 'required|string|max:200',
            'location_bn'     => 'nullable|string|max:200',
            'district_id'     => 'nullable|exists:districts,id',
            'type'            => 'required|string|in:campaign,audit,training,rally,hearing',
            'attendees_count' => 'nullable|integer|min:0',
            'is_featured'     => 'boolean',
            'is_active'       => 'boolean',
        ]);

        $event->update($validated);
        AuditLog::log('update', 'event', (string) $event->id, ['title' => $event->title]);

        return back()->with('success', "Event '{$event->title}' updated.");
    }

    public function deleteEvent(int $id): RedirectResponse
    {
        $event = Event::findOrFail($id);
        $title = $event->title;
        $event->delete();

        AuditLog::log('delete', 'event', (string) $id, ['title' => $title]);

        return back()->with('success', "Event '{$title}' removed.");
    }

    // ── NOTICES ───────────────────────────────────────────────────────
    public function storeNotice(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'memo_no'      => 'nullable|string|max:100',
            'title'        => 'required|string|max:200',
            'title_bn'     => 'nullable|string|max:200',
            'category'     => 'required|string|in:gazette,policy,circular,press_release,directive',
            'priority'     => 'required|in:routine,high,urgent',
            'body_html'    => 'required|string',
            'published_at' => 'required|date',
            'signed_by'    => 'nullable|string|max:150',
            'is_pinned'    => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        $notice = Notice::create($validated);

        AuditLog::log('create', 'notice', (string) $notice->id, ['title' => $notice->title]);

        return back()->with('success', "Notice memo '{$notice->title}' published.");
    }

    public function updateNotice(Request $request, int $id): RedirectResponse
    {
        $notice = Notice::findOrFail($id);

        $validated = $request->validate([
            'memo_no'      => 'nullable|string|max:100',
            'title'        => 'required|string|max:200',
            'title_bn'     => 'nullable|string|max:200',
            'category'     => 'required|string|in:gazette,policy,circular,press_release,directive',
            'priority'     => 'required|in:routine,high,urgent',
            'body_html'    => 'required|string',
            'published_at' => 'required|date',
            'signed_by'    => 'nullable|string|max:150',
            'is_pinned'    => 'boolean',
            'is_active'    => 'boolean',
        ]);

        $notice->update($validated);
        AuditLog::log('update', 'notice', (string) $notice->id, ['title' => $notice->title]);

        return back()->with('success', "Notice '{$notice->title}' updated.");
    }

    public function deleteNotice(int $id): RedirectResponse
    {
        $notice = Notice::findOrFail($id);
        $title = $notice->title;
        $notice->delete();

        AuditLog::log('delete', 'notice', (string) $id, ['title' => $title]);

        return back()->with('success', "Notice '{$title}' deleted.");
    }

    // ── GALLERY ───────────────────────────────────────────────────────
    public function storeGallery(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:200',
            'title_bn'     => 'nullable|string|max:200',
            'category'     => 'required|string|in:field_action,blackspot_audit,youth_cadets,national_rally',
            'image_url'    => 'required|string|max:500',
            'caption'      => 'nullable|string|max:500',
            'district_id'  => 'nullable|exists:districts,id',
            'captured_at'  => 'nullable|date',
            'sort_order'   => 'nullable|integer',
        ]);

        $item = GalleryItem::create($validated);
        AuditLog::log('create', 'gallery', (string) $item->id, ['title' => $item->title]);

        return back()->with('success', "Photo '{$item->title}' added to gallery.");
    }

    public function deleteGallery(int $id): RedirectResponse
    {
        $item = GalleryItem::findOrFail($id);
        $title = $item->title;
        $item->delete();

        AuditLog::log('delete', 'gallery', (string) $id, ['title' => $title]);

        return back()->with('success', "Gallery item '{$title}' removed.");
    }
}
