<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Public routes (no authentication needed)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{slug}', [NewsController::class, 'show']);

Route::post('/contact', [ContactController::class, 'store']);

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    // Admin CRUD for products
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Admin CRUD for news
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);

    // View contact messages (admin)
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::put('/contacts/{id}/read', [ContactController::class, 'markAsRead']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});