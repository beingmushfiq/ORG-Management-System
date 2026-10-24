<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title', 'title_bn', 'description', 'description_bn',
        'fee_paisa', 'lesson_count', 'duration_hours',
        'instructor', 'thumbnail_url', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active'      => 'boolean',
        'fee_paisa'      => 'integer',
        'lesson_count'   => 'integer',
        'duration_hours' => 'integer',
    ];

    public function getFeeBdtAttribute(): string
    {
        return '৳ ' . number_format($this->fee_paisa / 100, 0);
    }

    public function getFeeBdtRawAttribute(): float
    {
        return $this->fee_paisa / 100;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
