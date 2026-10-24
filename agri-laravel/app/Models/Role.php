<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    protected $fillable = [
        'name',
        'name_bn',
        'slug',
        'tier_level',
        'description',
        'permissions',
        'is_system',
        'is_active',
    ];

    protected $casts = [
        'permissions' => 'array',
        'is_system' => 'boolean',
        'is_active' => 'boolean',
        'tier_level' => 'integer',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function hasPermission(string $permission): bool
    {
        if ($this->tier_level === 1) {
            return true; // Super Admin has all permissions
        }

        $perms = $this->permissions ?? [];
        return in_array('*', $perms) || in_array($permission, $perms);
    }
}
