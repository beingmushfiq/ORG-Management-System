<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\OrgConfig;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Str;

class RegistrationController extends Controller
{
    public function create(): Response
    {
        $config = cache()->remember('org_config', 60, fn () => OrgConfig::current()->toArray());

        return Inertia::render('Public/Apply', [
            'config'     => $config,
            'categories' => Category::active()->get()->map(fn ($c) => [
                'id'      => $c->id,
                'name'    => $c->name,
                'name_bn' => $c->name_bn,
                'fee_bdt' => $c->fee_bdt,
                'fee_raw' => $c->fee_bdt_raw,
                'desc'    => $c->description,
            ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id'     => 'required|exists:categories,id',
            'student_name'    => 'required|string|max:100',
            'father_name'     => 'nullable|string|max:100',
            'mother_name'     => 'nullable|string|max:100',
            'mobile'          => 'required|string|max:20',
            'email'           => 'nullable|email|max:100',
            'institution'     => 'required|string|max:200',
            'class_grade'     => 'required|string|max:20',
            'division'        => 'required|string|max:50',
            'district'        => 'required|string|max:50',
            // Bangladesh Bank / SSLCommerz mandatory policy acceptance
            'policy_accepted' => 'accepted',
        ], [
            'policy_accepted.accepted' =>
                'You must read and accept the Terms & Conditions, Refund Policy, Privacy Policy, and Delivery Policy to proceed.',
        ]);

        $category = Category::findOrFail($validated['category_id']);

        $registration = Registration::create([
            ...$validated,
            'fee_paisa'           => $category->fee_paisa,
            'payment_status'      => 'PENDING',
            'policy_accepted'     => true,
            'policy_accepted_at'  => now(),
            'policy_accepted_ip'  => $request->ip(),
            'admit_card_token'    => Str::uuid(),
            'status'              => 'PENDING',
        ]);

        // TODO: Redirect to SSLCommerz / bKash payment gateway
        return redirect()->route('home')->with('success',
            "Registration submitted! ID #{$registration->id}. Complete payment to confirm your seat."
        );
    }
}
