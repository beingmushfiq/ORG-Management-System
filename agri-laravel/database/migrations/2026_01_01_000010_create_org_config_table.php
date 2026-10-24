<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('org_config', function (Blueprint $table) {
            $table->id();

            // Identity
            $table->string('org_name')->default('National Agricultural Olympiad');
            $table->string('org_name_bn')->default('জাতীয় কৃষি অলিম্পিয়াড');
            $table->string('slug')->default('agriolympiad');
            $table->string('custom_domain')->nullable();
            $table->string('logo_url')->nullable();

            // Brand / Hero
            $table->text('tagline')->nullable();
            $table->text('tagline_bn')->nullable();
            $table->string('motto')->nullable();
            $table->string('motto_bn')->nullable();

            // Colors (HSL strings e.g. "142 76% 22%")
            $table->string('primary_color_hsl')->default('142 76% 22%');
            $table->string('accent_color_hsl')->default('38 92% 50%');

            // Contact / Statutory
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->text('head_office_address')->nullable();
            $table->text('head_office_address_bn')->nullable();
            $table->string('trade_license_number')->nullable();
            $table->string('tin_number')->nullable();
            $table->string('default_currency')->default('BDT');

            // Legal HTML (rich text)
            $table->longText('terms_html')->nullable();
            $table->longText('terms_html_bn')->nullable();
            $table->longText('refund_policy_html')->nullable();
            $table->longText('refund_policy_html_bn')->nullable();
            $table->longText('privacy_policy_html')->nullable();
            $table->longText('privacy_policy_html_bn')->nullable();
            $table->longText('delivery_policy_html')->nullable();
            $table->longText('delivery_policy_html_bn')->nullable();
            $table->longText('about_story_html')->nullable();
            $table->longText('about_story_html_bn')->nullable();

            // Footer & Nav (JSON)
            $table->json('nav_links')->nullable();
            $table->json('footer_columns')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('org_config');
    }
};
