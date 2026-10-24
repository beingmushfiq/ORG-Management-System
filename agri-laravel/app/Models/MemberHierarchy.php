<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberHierarchy extends Model
{
    protected $table = 'member_hierarchy';

    protected $fillable = [
        'rank',
        'name_en',
        'name_bn',
        'convener_name',
        'convener_title',
        'convener_title_bn',
        'member_count',
        'mandate',
        'mandate_bn',
        'level',
        'icon_key',
        'accent_gradient',
        'contact_email',
        'is_active',
    ];

    protected $casts = [
        'rank'         => 'integer',
        'member_count' => 'integer',
        'is_active'    => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('rank');
    }
}
