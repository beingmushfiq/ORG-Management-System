<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\District;
use App\Models\Event;
use App\Models\GalleryItem;
use App\Models\MemberHierarchy;
use App\Models\Notice;
use App\Models\OrgConfig;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Shared CMS config passed to every public page as Inertia shared prop.
     * Cached for 60s to avoid DB hits on every request.
     */
    private function config(): array
    {
        return cache()->remember('org_config', 60, fn () => OrgConfig::current()->toArray());
    }

    public function home(): Response
    {
        $config = $this->config();

        return Inertia::render('Public/Home', [
            'config'     => $config,
            'districts'  => District::active()->orderBy('division')->orderBy('name_en')->get(),
            'events'     => Event::active()->orderBy('event_date', 'asc')->take(3)->get(),
            'notices'    => Notice::active()->orderBy('published_at', 'desc')->take(3)->get(),
            'categories' => Category::active()->get()->map(fn ($c) => [
                'id'          => $c->id,
                'name'        => $c->name,
                'name_bn'     => $c->name_bn,
                'description' => $c->description,
                'fee_bdt'     => $c->fee_bdt,
                'fee_raw'     => $c->fee_bdt_raw,
                'grade_range' => $c->grade_range,
                'capacity'    => $c->capacity,
            ]),
            'hierarchy'  => MemberHierarchy::active()->get(),
            'courses'    => Course::active()->take(4)->get()->map(fn ($c) => [
                'id'             => $c->id,
                'title'          => $c->title,
                'title_bn'       => $c->title_bn,
                'description'    => $c->description,
                'fee_bdt'        => $c->fee_bdt,
                'lesson_count'   => $c->lesson_count,
                'duration_hours' => $c->duration_hours,
                'instructor'     => $c->instructor,
            ]),
        ]);
    }

    public function districts(): Response
    {
        $districts = District::active()->orderBy('division')->orderBy('name_en')->get();

        $stats = [
            'total_districts'   => $districts->count(),
            'active_cells'      => $districts->where('status', 'active')->count(),
            'forming_cells'     => $districts->where('status', 'forming')->count(),
            'needs_volunteers'  => $districts->where('status', 'needs_volunteers')->count(),
            'total_volunteers'  => $districts->sum('volunteer_count'),
            'total_blackspots'  => $districts->sum('blackspots_count'),
        ];

        return Inertia::render('Public/Districts', [
            'config'    => $this->config(),
            'districts' => $districts,
            'stats'     => $stats,
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Public/About', [
            'config'    => $this->config(),
            'hierarchy' => MemberHierarchy::active()->get(),
        ]);
    }

    public function hierarchy(): Response
    {
        return Inertia::render('Public/Hierarchy', [
            'config'    => $this->config(),
            'hierarchy' => MemberHierarchy::active()->get(),
        ]);
    }

    public function courses(): Response
    {
        return Inertia::render('Public/Courses', [
            'config'  => $this->config(),
            'courses' => Course::active()->get()->map(fn ($c) => [
                'id'             => $c->id,
                'title'          => $c->title,
                'title_bn'       => $c->title_bn,
                'description'    => $c->description,
                'fee_bdt'        => $c->fee_bdt,
                'fee_raw'        => $c->fee_bdt_raw,
                'lesson_count'   => $c->lesson_count,
                'duration_hours' => $c->duration_hours,
                'instructor'     => $c->instructor,
                'thumbnail_url'  => $c->thumbnail_url,
            ]),
        ]);
    }

    public function events(): Response
    {
        return Inertia::render('Public/Events', [
            'config' => $this->config(),
            'events' => Event::active()->with('district')->orderBy('event_date', 'asc')->get(),
        ]);
    }

    public function gallery(): Response
    {
        return Inertia::render('Public/Gallery', [
            'config' => $this->config(),
            'items'  => GalleryItem::active()->with('district')->orderBy('sort_order')->orderBy('captured_at', 'desc')->get(),
        ]);
    }

    public function notices(): Response
    {
        return Inertia::render('Public/Notices', [
            'config'  => $this->config(),
            'notices' => Notice::active()->orderBy('is_pinned', 'desc')->orderBy('published_at', 'desc')->get(),
        ]);
    }

    // ── Statutory / Legal Pages ──────────────────────────────────────
    public function terms(): Response
    {
        return Inertia::render('Public/Legal', [
            'config'      => $this->config(),
            'pageType'    => 'terms',
            'title'       => 'Terms & Conditions',
            'contentHtml' => $this->config()['terms_html'] ?? '',
        ]);
    }

    public function refund(): Response
    {
        return Inertia::render('Public/Legal', [
            'config'      => $this->config(),
            'pageType'    => 'refund',
            'title'       => 'Return & Refund Policy',
            'contentHtml' => $this->config()['refund_policy_html'] ?? '',
        ]);
    }

    public function privacy(): Response
    {
        return Inertia::render('Public/Legal', [
            'config'      => $this->config(),
            'pageType'    => 'privacy',
            'title'       => 'Privacy Policy',
            'contentHtml' => $this->config()['privacy_policy_html'] ?? '',
        ]);
    }

    public function delivery(): Response
    {
        return Inertia::render('Public/Legal', [
            'config'      => $this->config(),
            'pageType'    => 'delivery',
            'title'       => 'Delivery Policy',
            'contentHtml' => $this->config()['delivery_policy_html'] ?? '',
        ]);
    }
}
