<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Backend\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum', 'is_admin')->group(function () {
    Route::get('/user', [AuthenticatedSessionController::class,'getAuthUser']);

    Route::post('logout', [AuthenticatedSessionController::class,'logout']);

    Route::apiResource('products', ProductController::class);
});



Route::post('login', [AuthenticatedSessionController::class,'login'])->middleware('guest');
