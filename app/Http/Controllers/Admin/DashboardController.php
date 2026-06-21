<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Order;
use App\Models\Product;
use App\Http\Resources\OrderResource;
use App\Http\Resources\InquiryResource;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $totalSales = (float) Order::where('payment_status', 'paid')->sum('total_price');
        $pendingOrdersCount = Order::where('status', 'pending')->count();
        $totalProductsCount = Product::count();
        $pendingInquiriesCount = Inquiry::where('status', 'pending')->count();

        // Recent orders with items
        $recentOrders = Order::with('items.product')
            ->latest()
            ->limit(5)
            ->get();

        // Recent inquiries
        $recentInquiries = Inquiry::latest()
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalSales' => $totalSales,
                'pendingOrders' => $pendingOrdersCount,
                'totalProducts' => $totalProductsCount,
                'pendingInquiries' => $pendingInquiriesCount,
            ],
            'recentOrders' => OrderResource::collection($recentOrders),
            'recentInquiries' => InquiryResource::collection($recentInquiries),
        ]);
    }
}
