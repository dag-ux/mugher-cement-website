<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\JobApplicationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ==================== PUBLIC ROUTES ====================

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

// News
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{slug}', [NewsController::class, 'show']);

// Contact
Route::post('/contact', [ContactController::class, 'store']);

// Jobs (public)
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{slug}', [JobController::class, 'show']);
Route::post('/jobs/{id}/apply', [JobController::class, 'apply']);

// Authentication
Route::post('/login', [AuthController::class, 'login']);

// ==================== PROTECTED ROUTES ====================

Route::middleware('auth:sanctum')->group(function () {

    // Products
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // News
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);

    // Contact Messages
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::put('/contacts/{id}/read', [ContactController::class, 'markAsRead']);

    // Jobs (Admin)
    Route::post('/admin/jobs', [JobController::class, 'store']);
    Route::put('/admin/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/admin/jobs/{id}', [JobController::class, 'destroy']);

    // Job Applications (Admin)
    Route::get('/admin/applications', [JobApplicationController::class, 'index']);
    Route::put('/admin/applications/{id}', [JobApplicationController::class, 'update']);
    Route::get('/admin/applications/{id}/download', [JobApplicationController::class, 'downloadCV']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});