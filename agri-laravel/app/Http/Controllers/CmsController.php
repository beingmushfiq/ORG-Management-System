<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\MemberHierarchy;
use App\Models\OrgConfig;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CmsController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Portal/Dashboard', [
            'config'     => OrgConfig::current()->toArray(),
            'categories' => Category::orderBy('sort_order')->get(),
            'courses'    => Course::orderBy('sort_order')->get(),
            'hierarchy'  => MemberHierarchy::orderBy('rank')->get(),
        ]);
    }

    public function edit(): Response
    {
        return Inertia::render('Portal/CmsStudio', [
            'config'     => OrgConfig::current()->toArray(),
            'categories' => Category::orderBy('sort_order')->get(),
            'courses'    => Course::orderBy('sort_order')->get(),
            'hierarchy'  => MemberHierarchy::orderBy('rank')->get(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'org_name'             => 'required|string|max:200',
            'org_name_bn'          => 'nullable|string|max:200',
            'tagline'              => 'nullable|string|max:500',
            'tagline_bn'           => 'nullable|string|max:500',
            'motto'                => 'nullable|string|max:200',
            'motto_bn'             => 'nullable|string|max:200',
            'primary_color_hsl'    => 'nullable|string|max:30',
            'accent_color_hsl'     => 'nullable|string|max:30',
            'logo_url'             => 'nullable|string|max:500',
            'contact_email'        => 'nullable|email|max:200',
            'contact_phone'        => 'nullable|string|max:30',
            'whatsapp_number'      => 'nullable|string|max:30',
            'head_office_address'  => 'nullable|string|max:500',
            'head_office_address_bn' => 'nullable|string|max:500',
            'trade_license_number' => 'nullable|string|max:50',
            'tin_number'           => 'nullable|string|max:50',
            'default_currency'     => 'nullable|string|max:10',
            'terms_html'           => 'nullable|string',
            'refund_policy_html'   => 'nullable|string',
            'privacy_policy_html'  => 'nullable|string',
            'delivery_policy_html' => 'nullable|string',
            'about_story_html'     => 'nullable|string',
            'hero_headline'        => 'nullable|string|max:250',
            'hero_headline_bn'     => 'nullable|string|max:250',
            'hero_subtitle'        => 'nullable|string|max:500',
            'hero_subtitle_bn'     => 'nullable|string|max:500',
            'section_visibility'   => 'nullable|array',
            'nav_links'            => 'nullable|array',
            'footer_columns'       => 'nullable|array',
        ]);

        OrgConfig::current()->update($validated);

        // Also sync hierarchy items if submitted
        if ($request->has('hierarchy') && is_array($request->hierarchy)) {
            foreach ($request->hierarchy as $item) {
                if (!empty($item['id'])) {
                    MemberHierarchy::where('id', $item['id'])->update([
                        'rank'            => $item['rank'] ?? 1,
                        'name_en'         => $item['name_en'] ?? '',
                        'name_bn'         => $item['name_bn'] ?? null,
                        'convener_name'   => $item['convener_name'] ?? '',
                        'convener_title'  => $item['convener_title'] ?? null,
                        'member_count'    => $item['member_count'] ?? 10,
                        'mandate'         => $item['mandate'] ?? null,
                        'level'           => $item['level'] ?? 'Standing Committee',
                        'accent_gradient' => $item['accent_gradient'] ?? 'from-amber-500 to-yellow-600',
                    ]);
                }
            }
        }

        // Bust cache
        cache()->forget('org_config');

        return back()->with('success', 'CMS settings and Member Hierarchy updated successfully!');
    }

    public function storeHierarchy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rank'            => 'required|integer',
            'name_en'         => 'required|string|max:200',
            'name_bn'         => 'nullable|string|max:200',
            'convener_name'   => 'required|string|max:150',
            'convener_title'  => 'nullable|string|max:150',
            'member_count'    => 'required|integer|min:1',
            'mandate'         => 'nullable|string',
            'level'           => 'required|string|max:100',
            'accent_gradient' => 'nullable|string|max:100',
        ]);

        MemberHierarchy::create($validated);

        return back()->with('success', 'New Directorate / Committee created in Member Hierarchy!');
    }

    public function updateHierarchy(Request $request, int $id): RedirectResponse
    {
        $committee = MemberHierarchy::findOrFail($id);

        $validated = $request->validate([
            'rank'            => 'nullable|integer',
            'name_en'         => 'required|string|max:200',
            'name_bn'         => 'nullable|string|max:200',
            'convener_name'   => 'required|string|max:150',
            'convener_title'  => 'nullable|string|max:150',
            'member_count'    => 'required|integer|min:1',
            'mandate'         => 'nullable|string',
            'level'           => 'required|string|max:100',
            'accent_gradient' => 'nullable|string|max:100',
        ]);

        $committee->update($validated);

        return back()->with('success', 'Committee updated successfully!');
    }

    public function destroyHierarchy(int $id): RedirectResponse
    {
        MemberHierarchy::findOrFail($id)->delete();

        return back()->with('success', 'Committee removed from Member Hierarchy.');
    }
}
