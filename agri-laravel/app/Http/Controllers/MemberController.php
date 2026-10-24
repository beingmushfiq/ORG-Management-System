<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\District;
use App\Models\OrgConfig;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::with(['role', 'district']);

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('phone', 'like', "%{$s}%")
                  ->orWhere('badge_number', 'like', "%{$s}%");
            });
        }

        if ($request->filled('role_id')) {
            $query->where('role_id', $request->role_id);
        }

        if ($request->filled('district_id')) {
            $query->where('district_id', $request->district_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $users = $query->orderBy('id', 'desc')->get();

        return Inertia::render('Portal/Members', [
            'config'    => OrgConfig::current()->toArray(),
            'users'     => $users,
            'roles'     => Role::active()->get(),
            'districts' => District::active()->orderBy('name_en')->get(),
            'filters'   => $request->only(['search', 'role_id', 'district_id', 'status']),
            'stats'     => [
                'total'     => User::count(),
                'active'    => User::where('status', 'active')->count(),
                'suspended' => User::where('status', 'suspended')->count(),
                'cadets'    => User::whereHas('role', fn ($q) => $q->where('slug', 'volunteer-cadet'))->count(),
            ],
        ]);
    }

    public function show(int $id): Response
    {
        $user = User::with(['role', 'district'])->findOrFail($id);
        $auditLogs = AuditLog::where('resource_id', (string) $id)
            ->orWhere('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get();

        return Inertia::render('Portal/UserProfile', [
            'config'    => OrgConfig::current()->toArray(),
            'member'    => $user,
            'roles'     => Role::active()->get(),
            'districts' => District::active()->orderBy('name_en')->get(),
            'auditLogs' => $auditLogs,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name'              => 'required|string|max:150',
            'email'             => 'required|email|max:150|unique:users,email,' . $user->id,
            'role_id'           => 'required|exists:roles,id',
            'district_id'       => 'nullable|exists:districts,id',
            'directorate'       => 'nullable|string|max:150',
            'status'            => 'required|in:active,suspended,pending',
            'phone'             => 'nullable|string|max:30',
            'blood_group'       => 'nullable|string|max:10',
            'emergency_contact' => 'nullable|string|max:30',
            'badge_number'      => 'nullable|string|max:50',
        ]);

        $oldData = $user->only(array_keys($validated));
        $user->update($validated);

        AuditLog::log('update', 'user', (string) $user->id, [
            'before' => $oldData,
            'after'  => $validated,
        ]);

        return back()->with('success', "Member '{$user->name}' updated successfully.");
    }

    public function bulkAction(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'action'      => 'required|string|in:activate,suspend,assign_district,change_role,delete',
            'ids'         => 'required|array|min:1',
            'ids.*'       => 'integer|exists:users,id',
            'district_id' => 'nullable|exists:districts,id',
            'role_id'     => 'nullable|exists:roles,id',
        ]);

        $ids = $validated['ids'];
        $currentUserId = auth()->id();

        // Prevent self-destructive actions
        $filteredIds = array_filter($ids, fn ($id) => (int)$id !== (int)$currentUserId);

        switch ($validated['action']) {
            case 'activate':
                User::whereIn('id', $filteredIds)->update(['status' => 'active']);
                AuditLog::log('bulk_activate', 'user', null, ['count' => count($filteredIds), 'ids' => $filteredIds]);
                return back()->with('success', count($filteredIds) . ' members activated successfully.');

            case 'suspend':
                User::whereIn('id', $filteredIds)->update(['status' => 'suspended']);
                AuditLog::log('bulk_suspend', 'user', null, ['count' => count($filteredIds), 'ids' => $filteredIds]);
                return back()->with('success', count($filteredIds) . ' members suspended.');

            case 'assign_district':
                if (!empty($validated['district_id'])) {
                    User::whereIn('id', $filteredIds)->update(['district_id' => $validated['district_id']]);
                    AuditLog::log('bulk_assign_district', 'user', null, ['district_id' => $validated['district_id'], 'ids' => $filteredIds]);
                    return back()->with('success', count($filteredIds) . ' members assigned to district.');
                }
                break;

            case 'change_role':
                if (!empty($validated['role_id'])) {
                    User::whereIn('id', $filteredIds)->update(['role_id' => $validated['role_id']]);
                    AuditLog::log('bulk_change_role', 'user', null, ['role_id' => $validated['role_id'], 'ids' => $filteredIds]);
                    return back()->with('success', count($filteredIds) . ' members role updated.');
                }
                break;

            case 'delete':
                User::whereIn('id', $filteredIds)->delete();
                AuditLog::log('bulk_delete', 'user', null, ['count' => count($filteredIds), 'ids' => $filteredIds]);
                return back()->with('success', count($filteredIds) . ' members deleted.');
        }

        return back()->with('error', 'Unable to complete requested bulk action.');
    }

    public function destroy(int $id): RedirectResponse
    {
        if ((int)$id === (int)auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user = User::findOrFail($id);
        $name = $user->name;
        $user->delete();

        AuditLog::log('delete', 'user', (string) $id, ['name' => $name]);

        return back()->with('success', "Member '{$name}' removed from directory.");
    }
}
