<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Roles Table
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_bn');
            $table->string('slug')->unique();
            $table->tinyInteger('tier_level')->default(5); // 1 = Super Admin, 2 = Directorate Lead, 3 = District Coordinator, 4 = General Member, 5 = Volunteer Cadet
            $table->text('description')->nullable();
            $table->json('permissions')->nullable(); // Array of allowed resources & actions: e.g. ["members.view", "members.edit", "cms.edit", "districts.manage"]
            $table->boolean('is_system')->default(false); // System roles cannot be deleted
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Add role_id, district_id, status to users table
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('password')->constrained('roles')->nullOnDelete();
            $table->foreignId('district_id')->nullable()->after('role_id')->constrained('districts')->nullOnDelete();
            $table->string('directorate')->nullable()->after('district_id');
            $table->string('status')->default('active')->after('directorate'); // active, suspended, pending
            $table->string('phone')->nullable()->after('email');
            $table->string('blood_group')->nullable()->after('phone');
            $table->string('emergency_contact')->nullable()->after('blood_group');
            $table->string('badge_number')->nullable()->after('emergency_contact');
            $table->timestamp('member_since')->nullable()->after('badge_number');
        });

        // Audit Logs Table for Governance & Accountable Actions
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('user_name')->nullable();
            $table->string('role_slug')->nullable();
            $table->string('action'); // create, update, delete, bulk_activate, bulk_suspend, export, status_change
            $table->string('resource_type'); // member, district, event, notice, cms, role
            $table->string('resource_id')->nullable();
            $table->json('payload')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['district_id']);
            $table->dropColumn([
                'role_id', 'district_id', 'directorate', 'status',
                'phone', 'blood_group', 'emergency_contact', 'badge_number', 'member_since'
            ]);
        });
        Schema::dropIfExists('roles');
    }
};
