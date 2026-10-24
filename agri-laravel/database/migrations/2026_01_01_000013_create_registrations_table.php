<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();

            // Student Info
            $table->string('student_name');
            $table->string('student_name_bn')->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mobile')->index();
            $table->string('email')->nullable();
            $table->string('institution')->nullable();
            $table->string('class_grade')->nullable();
            $table->string('division')->nullable();
            $table->string('district')->nullable();

            // Payment
            $table->unsignedBigInteger('fee_paisa'); // BDT * 100
            $table->string('payment_status')->default('PENDING'); // PENDING|PAID|FAILED|REFUNDED
            $table->string('payment_method')->nullable(); // sslcommerz|bkash|nagad|manual
            $table->string('transaction_id')->nullable()->unique();
            $table->timestamp('paid_at')->nullable();

            // Mandatory policy acceptance (Bangladesh Bank / SSLCommerz compliance)
            $table->boolean('policy_accepted')->default(false);
            $table->timestamp('policy_accepted_at')->nullable();
            $table->string('policy_accepted_ip')->nullable();

            // Admit Card
            $table->string('admit_card_token')->nullable()->unique();
            $table->timestamp('admit_card_sent_at')->nullable();

            $table->string('status')->default('PENDING'); // PENDING|APPROVED|REJECTED
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
