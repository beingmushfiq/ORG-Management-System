<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryItem extends Model
{
    protected $fillable = [
        'title',
        'title_bn',
        'category',
        'image_url',
        'caption',
        'district_id',
        'captured_at',
        'sort_order',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'captured_at' => 'date',
        'sort_order' => 'integer',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
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
