<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;


///////////////////////////////////////////AUTH ROUTES
Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('forgot-password', [\App\Http\Controllers\AuthController::class, 'forgot']);
Route::post('reset-password', [\App\Http\Controllers\AuthController::class, 'reset']);
Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);

///////////////////////////////////////////USERS ROUTES
Route::get('users', [\App\Http\Controllers\UserController::class, 'getUsers'])->middleware('auth:sanctum');
Route::patch('user/settings', [\App\Http\Controllers\UserController::class, 'updateProfile'])->middleware('auth:sanctum');
Route::patch('user/avatar', [\App\Http\Controllers\UserController::class, 'updateAvatar'])->middleware('auth:sanctum');


///////////////////////////////////////////GLOBAL SEARCH
Route::get('search', [\App\Http\Controllers\SearchController::class, 'globalSearch'])->middleware('auth:sanctum');