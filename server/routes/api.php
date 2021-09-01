<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CurrenciesController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UsersController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Public Routes
Route::get('/transactions', [TransactionsController::class, 'index']);
Route::get('/transaction/{id}', [TransactionsController::class, 'show']);
Route::post('/transactions', [TransactionsController::class, 'purchase']);
Route::delete('/transaction/{id}', [TransactionsController::class, 'destroy']);

Route::get('/currencies', [CurrenciesController::class, 'index']);
Route::get('/currency/{id}', [CurrenciesController::class, 'show']);
Route::post('/currency', [CurrenciesController::class, 'store']);
Route::put('/currency/{id}', [CurrenciesController::class, 'update']);

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/users', [UsersController::class, 'index']);
    Route::get('user/{id}', [UsersController::class, 'show']);
    Route::get('user/{id}/transactions', [UsersController::class, 'indexTransactions']);
    Route::put('user/{id}', [UsersController::class, 'update']);
    Route::delete('user/{id}', [UsersController::class, 'destroy']);
});
