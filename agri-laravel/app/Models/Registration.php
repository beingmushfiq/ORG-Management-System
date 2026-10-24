<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    protected $fillable = [
        'category_id', 'student_name', 'student_name_bn', 'father_name', 'mother_name',
        'mobile', 'email', 'institution', 'class_grade', 'division', 'district',
        'fee_paisa', 'payment_status', 'payment_method', 'transaction_id', 'paid_at',
        'policy_accepted', 'policy_accepted_at', 'policy_accepted_ip',
        'admit_card_token', 'admit_card_sent_at', 'status',
    ];

    protected $casts = [
        'policy_accepted'     => 'boolean',
        'policy_accepted_at'  => 'datetime',
        'paid_at'             => 'datetime',
        'admit_card_sent_at'  => 'datetime',
        'fee_paisa'           => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getFeeBdtAttribute(): string
    {
        return '৳ ' . number_format($this->fee_paisa / 100, 0);
    }
}
