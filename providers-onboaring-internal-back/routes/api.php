<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Lightit\Authentication\App\Controllers\{LoginController, LogoutController, RefreshController, SignupController};
use Lightit\Providers\App\Controllers\{ListProviderController, FavoriteProviderController, GetProviderController};
use Lightit\Users\App\Controllers\{
    DeleteUserController,
    GetUserController,
    ListUserController,
    StoreUserController,
    UpdateUserController
};


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(static function (): void {
    Route::post('login', LoginController::class);
    Route::post('logout', LogoutController::class)->middleware('auth:api');
    Route::post('refresh', RefreshController::class);
    Route::post('signup', SignupController::class);
});

Route::prefix('users')
    ->group(static function (): void {
        Route::get('/', ListUserController::class);
        Route::get('/{user}', GetUserController::class)
            ->withTrashed()
            ->whereNumber('user');
        Route::post('/', StoreUserController::class);
        Route::put('/{user}', UpdateUserController::class)
            ->whereNumber('user');
        Route::delete('/{user}', DeleteUserController::class)
            ->whereNumber('user');
    });

// NOTE: auth:api middleware temporarily removed for the front-end onboarding
// challenge. Restore the Route::middleware(['auth:api'])->group(...) wrapper
// when authentication is implemented in the next stage.
Route::prefix('providers')->group(function (): void {
    Route::get('/', ListProviderController::class);

    Route::prefix('{provider}')
        ->whereNumber('provider')
        ->group(function (): void {
            Route::get('/', GetProviderController::class);
            Route::patch('/favorite', FavoriteProviderController::class);
        });
});
