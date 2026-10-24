<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view with RBAC roles and 64 districts.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'roles' => Role::whereIn('slug', ['volunteer-cadet', 'general-member'])
                ->orderByDesc('tier_level')
                ->get(['id', 'name', 'name_bn', 'slug', 'tier_level', 'description']),
            'districts' => District::orderBy('name_en')
                ->get(['id', 'name_en', 'name_bn', 'division', 'code']),
        ]);
    }

    /**
     * Handle an incoming registration request according to 5-tier RBAC.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'email'             => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone'             => 'required|string|max:30',
            'role_slug'         => 'required|in:volunteer-cadet,general-member',
            'district_id'       => 'required|exists:districts,id',
            'blood_group'       => 'required|in:A+,A-,B+,B-,O+,O-,AB+,AB-,Unknown',
            'emergency_contact' => 'nullable|string|max:255',
            'bylaws_accepted'   => 'accepted',
            'password'          => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'bylaws_accepted.accepted' => 'You must accept the Road Safety Movement Volunteer Code & Bylaws to join.',
            'role_slug.in'             => 'Please choose a valid tier (Volunteer Cadet or General Member).',
        ]);

        $role = Role::where('slug', $validated['role_slug'])->firstOrFail();
        $prefix = $role->slug === 'volunteer-cadet' ? 'CDT' : 'GM';
        $badgeNumber = 'RSM-' . $prefix . '-' . date('y') . '-' . strtoupper(Str::random(4));

        $user = User::create([
            'name'              => $validated['name'],
            'email'             => $validated['email'],
            'phone'             => $validated['phone'],
            'password'          => Hash::make($validated['password']),
            'role_id'           => $role->id,
            'district_id'       => $validated['district_id'],
            'blood_group'       => $validated['blood_group'],
            'emergency_contact' => $validated['emergency_contact'] ?? null,
            'badge_number'      => $badgeNumber,
            'status'            => 'active',
            'member_since'      => now(),
        ]);

        // Increment district volunteer strength counter
        District::where('id', $validated['district_id'])->increment('volunteer_count');

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('portal.dashboard')->with('success',
            "Welcome to the Road Safety Movement! You are officially registered as {$role->name} (Badge: {$badgeNumber})."
        );
    }
}
