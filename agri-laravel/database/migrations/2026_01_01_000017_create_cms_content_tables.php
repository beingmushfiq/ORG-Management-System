<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Events / Campaigns
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_bn')->nullable();
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->dateTime('event_date');
            $table->string('location');
            $table->string('location_bn')->nullable();
            $table->foreignId('district_id')->nullable()->constrained('districts')->nullOnDelete();
            $table->string('type')->default('campaign'); // campaign, audit, training, rally, hearing
            $table->string('image_url')->nullable();
            $table->integer('attendees_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['event_date', 'is_active']);
        });

        // Notices / Gazettes / Circulars
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->string('memo_no')->nullable();
            $table->string('title');
            $table->string('title_bn')->nullable();
            $table->string('slug')->unique();
            $table->string('category')->default('gazette'); // gazette, policy, circular, press_release, directive
            $table->enum('priority', ['routine', 'high', 'urgent'])->default('routine');
            $table->longText('body_html')->nullable();
            $table->string('pdf_url')->nullable();
            $table->date('published_at');
            $table->string('signed_by')->nullable();
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['published_at', 'is_active']);
        });

        // Gallery Items
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_bn')->nullable();
            $table->string('category')->default('field_action'); // field_action, blackspot_audit, youth_cadets, national_rally
            $table->string('image_url');
            $table->string('caption')->nullable();
            $table->foreignId('district_id')->nullable()->constrained('districts')->nullOnDelete();
            $table->date('captured_at')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['category', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
        Schema::dropIfExists('notices');
        Schema::dropIfExists('events');
    }
};
