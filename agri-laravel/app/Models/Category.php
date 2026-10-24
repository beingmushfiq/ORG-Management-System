<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name', 'name_bn', 'description', 'description_bn',
        'fee_paisa', 'capacity', 'grade_range', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'fee_paisa'  => 'integer',
        'capacity'   => 'integer',
        'sort_order' => 'integer',
    ];

    // BDT display accessor
    public function getFeeBdtAttribute(): string
    {
        return '৳ ' . number_format($this->fee_paisa / 100, 0);
    }

    public function getFeeBdtRawAttribute(): float
    {
        return $this->fee_paisa / 100;
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
