<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_bn');
            $table->string('division'); // Dhaka, Chittagong, Rajshahi, Khulna, Barisal, Sylhet, Rangpur, Mymensingh
            $table->string('code')->unique(); // e.g. dha, ctg
            $table->enum('status', ['active', 'forming', 'needs_volunteers'])->default('active');
            $table->string('coordinator_name')->nullable();
            $table->string('coordinator_phone')->nullable();
            $table->string('coordinator_email')->nullable();
            $table->integer('volunteer_count')->default(0);
            $table->integer('blackspots_count')->default(0);
            $table->decimal('lat', 8, 5)->nullable();
            $table->decimal('lng', 8, 5)->nullable();
            $table->text('blackspot_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('division');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('districts');
    }
};
