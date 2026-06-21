<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Resources\OrderResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     */
    public function index(Request $request): Response
    {
        $query = Order::with('items.product');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $search = $request->input('search');
                $q->where('customer_name', 'like', "%{$search}%")
                  ->orWhere('customer_email', 'like', "%{$search}%")
                  ->orWhere('id', $search);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $orders = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/orders/index', [
            'orders' => OrderResource::collection($orders),
            'filters' => $request->only(['search', 'status']),
            'statuses' => ['pending', 'processing', 'completed', 'cancelled'],
        ]);
    }

    /**
     * Update the status of the specified order.
     */
    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,processing,completed,cancelled'],
            'payment_status' => ['required', 'string', 'in:pending,paid,failed'],
        ]);

        try {
            $oldStatus = $order->status;
            $oldPaymentStatus = $order->payment_status;

            $order->update($validated);

            Log::info("Order #{$order->id} status updated by admin.", [
                'admin_id' => auth()->id(),
                'old_status' => $oldStatus,
                'new_status' => $order->status,
                'old_payment_status' => $oldPaymentStatus,
                'new_payment_status' => $order->payment_status,
            ]);

            return back()->with('success', "Order #{$order->id} status updated successfully.");

        } catch (\Exception $e) {
            Log::error("Failed to update status for order #{$order->id}.", [
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to update order: ' . $e->getMessage());
        }
    }
}
