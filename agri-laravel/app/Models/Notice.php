<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    protected $fillable = [
        'memo_no',
        'title',
        'title_bn',
        'slug',
        'category',
        'priority',
        'body_html',
        'pdf_url',
        'published_at',
        'signed_by',
        'is_pinned',
        'is_active',
    ];

    protected $casts = [
        'published_at' => 'date',
        'is_pinned' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
