<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('org_config', function (Blueprint $table) {
            $table->string('hero_headline')->nullable()->after('motto_bn');
            $table->string('hero_headline_bn')->nullable()->after('hero_headline');
            $table->text('hero_subtitle')->nullable()->after('hero_headline_bn');
            $table->text('hero_subtitle_bn')->nullable()->after('hero_subtitle');
            $table->json('pillars')->nullable()->after('hero_subtitle_bn');
            $table->json('stats')->nullable()->after('pillars');
            $table->json('partners')->nullable()->after('stats');
            $table->json('faqs')->nullable()->after('partners');
            $table->json('social_links')->nullable()->after('faqs');
            $table->json('section_visibility')->nullable()->after('social_links');
        });
    }

    public function down(): void
    {
        Schema::table('org_config', function (Blueprint $table) {
            $table->dropColumn([
                'hero_headline', 'hero_headline_bn',
                'hero_subtitle', 'hero_subtitle_bn',
                'pillars', 'stats', 'partners', 'faqs',
                'social_links', 'section_visibility'
            ]);
        });
    }
};
