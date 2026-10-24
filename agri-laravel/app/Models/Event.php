<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $fillable = [
        'title',
        'title_bn',
        'slug',
        'summary',
        'description',
        'event_date',
        'location',
        'location_bn',
        'district_id',
        'type',
        'image_url',
        'attendees_count',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'attendees_count' => 'integer',
    ];

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
