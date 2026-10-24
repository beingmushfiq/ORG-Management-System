<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\District;
use App\Models\OrgConfig;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DistrictManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $query = District::query();

        if ($request->filled('division') && $request->division !== 'All') {
            $query->where('division', $request->division);
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name_en', 'like', "%{$s}%")
                  ->orWhere('name_bn', 'like', "%{$s}%")
                  ->orWhere('coordinator_name', 'like', "%{$s}%");
            });
        }

        $districts = $query->orderBy('division')->orderBy('name_en')->get();

        return Inertia::render('Portal/Districts', [
            'config'    => OrgConfig::current()->toArray(),
            'districts' => $districts,
            'filters'   => $request->only(['division', 'status', 'search']),
            'stats'     => [
                'total'           => District::count(),
                'active'          => District::where('status', 'active')->count(),
                'forming'         => District::where('status', 'forming')->count(),
                'needs_volunteers'=> District::where('status', 'needs_volunteers')->count(),
                'total_volunteers'=> District::sum('volunteer_count'),
                'total_blackspots'=> District::sum('blackspots_count'),
            ],
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $district = District::findOrFail($id);

        $validated = $request->validate([
            'coordinator_name'  => 'nullable|string|max:150',
            'coordinator_phone' => 'nullable|string|max:30',
            'coordinator_email' => 'nullable|email|max:150',
            'status'            => 'required|in:active,forming,needs_volunteers',
            'volunteer_count'   => 'nullable|integer|min:0',
            'blackspots_count'  => 'nullable|integer|min:0',
            'blackspot_notes'   => 'nullable|string',
        ]);

        $old = $district->only(array_keys($validated));
        $district->update($validated);

        AuditLog::log('update', 'district', (string) $district->id, [
            'district' => $district->name_en,
            'before'   => $old,
            'after'    => $validated,
        ]);

        return back()->with('success', "District {$district->name_en} command settings updated.");
    }
}
