<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('products', [HomeController::class, 'catalog'])->name('products.index');
Route::get('products/{product:slug}', [HomeController::class, 'show'])->name('products.show');

// Public Cart Session Routes
Route::get('cart', [CartController::class, 'index'])->name('cart.index');
Route::post('cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('cart/update', [CartController::class, 'update'])->name('cart.update');
Route::post('cart/remove', [CartController::class, 'remove'])->name('cart.remove');
Route::post('cart/clear', [CartController::class, 'clear'])->name('cart.clear');

// Public Checkout Routes
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/payment/callback', [CheckoutController::class, 'handleCallback'])->name('payment.callback');

// Contact & Bookings Inquiry Route
Route::inertia('about', 'about')->name('about');
Route::inertia('contact', 'contact')->name('contact');
Route::post('inquire', [InquiryController::class, 'store'])->name('inquiries.store');

// Authenticated Routes
Route::middleware(['auth'])->group(function () {
    // Shared Dashboard Redirector
    Route::get('dashboard', function () {
        if (auth()->user()->is_admin) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('orders.history');
    })->name('dashboard');

    // Customer Order History
    Route::get('orders/history', function () {
        $orders = App\Models\Order::with('items.product')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();
            
        return Inertia::render('orders/history', [
            'orders' => App\Http\Resources\OrderResource::collection($orders),
        ]);
    })->name('orders.history');
});

// Admin Administrative Area
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', AdminProductController::class)->except(['show']);
    Route::resource('categories', AdminCategoryController::class)->except(['show', 'create', 'edit']);
    Route::get('orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::put('orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.status');
    Route::get('inquiries', [AdminInquiryController::class, 'index'])->name('inquiries.index');
    Route::put('inquiries/{inquiry}/resolve', [AdminInquiryController::class, 'resolve'])->name('inquiries.resolve');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
