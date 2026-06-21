<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    /**
     * Display the checkout form.
     */
    public function index(): Response|RedirectResponse
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your shopping cart is empty.');
        }

        $cartItems = [];
        $totalPrice = 0.0;

        $products = Product::whereIn('id', array_keys($cart))->get();

        foreach ($products as $product) {
            $qty = min($cart[$product->id], $product->stock);
            if ($product->is_available && $product->stock > 0) {
                $subtotal = $product->price * $qty;
                $totalPrice += $subtotal;
                $cartItems[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'quantity' => $qty,
                    'subtotal' => (float) $subtotal,
                ];
            }
        }

        if (empty($cartItems)) {
            session()->forget('cart');
            return redirect()->route('cart.index')->with('error', 'The items in your cart are no longer available.');
        }

        return Inertia::render('checkout/index', [
            'cartItems' => $cartItems,
            'totalPrice' => (float) $totalPrice,
            'user' => auth()->user(),
        ]);
    }

    public function store(CheckoutRequest $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        try {
            $order = DB::transaction(function () use ($request, $cart) {
                $products = Product::whereIn('id', array_keys($cart))->lockForUpdate()->get();
                $totalPrice = 0.0;
                $orderItemsData = [];

                // Validate stock levels
                /** @var \App\Models\Product $product */
                foreach ($products as $product) {
                    $qty = $cart[$product->id];
                    if ($product->stock < $qty) {
                        throw new \Exception("Insufficient stock for product: {$product->name}. Only {$product->stock} remaining.");
                    }

                    $subtotal = $product->price * $qty;
                    $totalPrice += $subtotal;

                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'price' => $product->price,
                    ];

                    // Deduct stock
                    $product->decrement('stock', $qty);
                }

                // Create Order
                $order = Order::create([
                    'user_id' => auth()->id(),
                    'customer_name' => $request->input('customer_name'),
                    'customer_email' => $request->input('customer_email'),
                    'customer_phone' => $request->input('customer_phone'),
                    'delivery_address' => $request->input('delivery_address'),
                    'delivery_date' => $request->input('delivery_date'),
                    'delivery_time' => $request->input('delivery_time'),
                    'total_price' => $totalPrice,
                    'payment_method' => $request->input('payment_method'), // paystack or pay_on_delivery
                    'payment_status' => 'pending',
                    'status' => 'pending',
                    'notes' => $request->input('notes'),
                ]);

                // Create Order Items
                foreach ($orderItemsData as $itemData) {
                    $itemData['order_id'] = $order->id;
                    OrderItem::create($itemData);
                }

                return $order;
            });

            // Log success
            Log::info("Order #{$order->id} created successfully. Payment method: {$order->payment_method}");

            if ($order->payment_method === 'pay_on_delivery') {
                session()->forget('cart');
                return redirect()->route('home')->with('success', "Thank you! Your order #{$order->id} has been placed successfully and you will pay on delivery.");
            }

            // Paystack Integration
            $paystackUrl = env('PAYSTACK_PAYMENT_URL', 'https://api.paystack.co');
            $secretKey = env('PAYSTACK_SECRET_KEY');

            $response = \Illuminate\Support\Facades\Http::withToken($secretKey)
                ->post("{$paystackUrl}/transaction/initialize", [
                    'email' => $order->customer_email,
                    'amount' => $order->total_price * 100, // Paystack uses kobo
                    'callback_url' => route('payment.callback', ['order_id' => $order->id]),
                    'metadata' => [
                        'order_id' => $order->id,
                        'customer_name' => $order->customer_name,
                    ],
                ]);

            if ($response->successful() && $response->json('status') === true) {
                // Redirect user to Paystack checkout page
                return Inertia::location($response->json('data.authorization_url'));
            }

            throw new \Exception('Failed to initialize Paystack payment: ' . $response->body());

        } catch (\Exception $e) {
            // Log failure details
            Log::error('Order creation failed.', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withInput()->with('error', 'Order failed: ' . $e->getMessage());
        }
    }

    /**
     * Handle Paystack callback.
     */
    public function handleCallback(\Illuminate\Http\Request $request)
    {
        $reference = $request->query('reference');
        $orderId = $request->query('order_id');

        if (!$reference || !$orderId) {
            return redirect()->route('home')->with('error', 'Invalid payment callback.');
        }

        $order = Order::findOrFail($orderId);

        $paystackUrl = env('PAYSTACK_PAYMENT_URL', 'https://api.paystack.co');
        $secretKey = env('PAYSTACK_SECRET_KEY');

        $response = \Illuminate\Support\Facades\Http::withToken($secretKey)
            ->get("{$paystackUrl}/transaction/verify/{$reference}");

        if ($response->successful() && $response->json('status') === true) {
            $data = $response->json('data');

            if ($data['status'] === 'success') {
                $order->update([
                    'payment_status' => 'paid',
                ]);
                
                // Clear session cart
                session()->forget('cart');

                return redirect()->route('home')->with('success', "Payment successful! Your order #{$order->id} has been confirmed.");
            }
        }

        // If payment failed, we might want to revert stock or just mark as failed.
        $order->update(['payment_status' => 'failed']);
        
        return redirect()->route('home')->with('error', 'Payment verification failed. Please try again.');
    }
}
