<?php

use App\Http\Controllers\PublicController;
use App\Http\Controllers\CmsController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\DistrictManagementController;
use App\Http\Controllers\ContentManagementController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|----------------------------------------------------------------------
| PUBLIC ROUTES — served via Inertia + React
|----------------------------------------------------------------------
*/
Route::get('/',                 [PublicController::class, 'home'])->name('home');
Route::get('/about',            [PublicController::class, 'about'])->name('about');
Route::get('/courses',          [PublicController::class, 'courses'])->name('courses');
Route::get('/events',           [PublicController::class, 'events'])->name('events');
Route::get('/hierarchy',        [PublicController::class, 'hierarchy'])->name('hierarchy');
Route::get('/districts',        [PublicController::class, 'districts'])->name('districts');
Route::get('/gallery',          [PublicController::class, 'gallery'])->name('gallery');
Route::get('/notices',          [PublicController::class, 'notices'])->name('notices');

// Statutory / Legal pages
Route::get('/terms-condition',  [PublicController::class, 'terms'])->name('terms');
Route::get('/refund-policy',    [PublicController::class, 'refund'])->name('refund');
Route::get('/privacy-policy',   [PublicController::class, 'privacy'])->name('privacy');
Route::get('/delivery-policy',  [PublicController::class, 'delivery'])->name('delivery');

// Registration/Apply (Checkout)
Route::get('/apply',            [RegistrationController::class, 'create'])->name('apply');
Route::post('/apply',           [RegistrationController::class, 'store'])->name('apply.store');

/*
|----------------------------------------------------------------------
| PORTAL / ADMIN ROUTES — require auth
|----------------------------------------------------------------------
*/
Route::middleware(['auth'])->prefix('portal')->name('portal.')->group(function () {
    Route::get('/',                 [CmsController::class, 'dashboard'])->name('dashboard');
    Route::get('/cms',              [CmsController::class, 'edit'])->name('cms');
    Route::patch('/cms',            [CmsController::class, 'update'])->name('cms.update');
    Route::post('/hierarchy',       [CmsController::class, 'storeHierarchy'])->name('hierarchy.store');
    Route::patch('/hierarchy/{id}', [CmsController::class, 'updateHierarchy'])->name('hierarchy.update');
    Route::delete('/hierarchy/{id}',[CmsController::class, 'destroyHierarchy'])->name('hierarchy.destroy');

    // Member Management & 5-Tier RBAC
    Route::get('/members',          [MemberController::class, 'index'])->name('members');
    Route::post('/members/bulk',    [MemberController::class, 'bulkAction'])->name('members.bulk');
    Route::get('/users/{id}',       [MemberController::class, 'show'])->name('users.show');
    Route::patch('/users/{id}',     [MemberController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}',    [MemberController::class, 'destroy'])->name('users.destroy');

    // 64 Districts Management
    Route::get('/districts',        [DistrictManagementController::class, 'index'])->name('districts');
    Route::patch('/districts/{id}', [DistrictManagementController::class, 'update'])->name('districts.update');

    // Content Management Hub (Events, Notices, Gallery)
    Route::get('/content',          [ContentManagementController::class, 'index'])->name('content');
    Route::post('/events',          [ContentManagementController::class, 'storeEvent'])->name('events.store');
    Route::patch('/events/{id}',    [ContentManagementController::class, 'updateEvent'])->name('events.update');
    Route::delete('/events/{id}',   [ContentManagementController::class, 'deleteEvent'])->name('events.destroy');

    Route::post('/notices',         [ContentManagementController::class, 'storeNotice'])->name('notices.store');
    Route::patch('/notices/{id}',   [ContentManagementController::class, 'updateNotice'])->name('notices.update');
    Route::delete('/notices/{id}',  [ContentManagementController::class, 'deleteNotice'])->name('notices.destroy');

    Route::post('/gallery',         [ContentManagementController::class, 'storeGallery'])->name('gallery.store');
    Route::delete('/gallery/{id}',  [ContentManagementController::class, 'deleteGallery'])->name('gallery.destroy');

    Route::get('/profile',          [ProfileController::class, 'edit'])->name('profile');
    Route::patch('/profile',        [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile',       [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile',          [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',        [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile',       [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', fn () => redirect()->route('portal.dashboard'))->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
