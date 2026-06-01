<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Lightit\Shared\App\Exceptions\Http\InvalidActionException;

Route::get('invalid', static fn() => throw new InvalidActionException("Is not valid"));

Route::get('/', static fn(): \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View => view('welcome'));

Route::get('/login', static fn(): \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View => view('welcome'))->name('login');


