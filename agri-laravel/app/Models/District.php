<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model
{
    protected $fillable = [
        'name_en',
        'name_bn',
        'division',
        'code',
        'status',
        'coordinator_name',
        'coordinator_phone',
        'coordinator_email',
        'volunteer_count',
        'blackspots_count',
        'lat',
        'lng',
        'blackspot_notes',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'lat' => 'float',
        'lng' => 'float',
        'volunteer_count' => 'integer',
        'blackspots_count' => 'integer',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
