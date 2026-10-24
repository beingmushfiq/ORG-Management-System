<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_hierarchy', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('rank')->default(1);
            $table->string('name_en');
            $table->string('name_bn')->nullable();
            $table->string('convener_name');
            $table->string('convener_title')->nullable();
            $table->string('convener_title_bn')->nullable();
            $table->unsignedInteger('member_count')->default(10);
            $table->text('mandate')->nullable();
            $table->text('mandate_bn')->nullable();
            $table->string('level')->default('Standing Committee'); // Apex, Standing Committee, Regional, Cell
            $table->string('icon_key')->default('shield'); // shield, scale, heart, building, megaphone, graduation, alert
            $table->string('accent_gradient')->default('from-amber-500 to-yellow-600');
            $table->string('contact_email')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('member_hierarchy');
    }
};
