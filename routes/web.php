<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/landing', function () {
    return Inertia::render('landing/home');
})->name('landing');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('products', ProductController::class);
    Route::resource('departments', DepartmentController::class);
    Route::get('/getDepartments', [DepartmentController::class, 'getDepartments'])->name('departments.getDepartments');
});

Route::post('/settings/locale', function (Request $request) {
    $request->validate([
        'locale' => ['required', 'in:en,fil'],
    ]);

    cookie()->queue(cookie('locale', $request->locale, 60 * 24 * 365));

    if ($request->user()) {
        $request->user()->update([
            'locale' => $request->locale,
        ]);
    }

    return back();
})->middleware('auth');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
