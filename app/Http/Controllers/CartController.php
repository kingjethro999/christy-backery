<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index(): Response
    {
        $cart = session()->get('cart', []);
        $cartItems = [];
        $totalPrice = 0.0;

        if (!empty($cart)) {
            $products = Product::whereIn('id', array_keys($cart))->get();

            foreach ($products as $product) {
                if (!$product->is_available || $product->stock <= 0) {
                    // Automatically clean unavailable products from cart
                    unset($cart[$product->id]);
                    session()->put('cart', $cart);
                    continue;
                }

                // Ensure quantity doesn't exceed stock
                $qty = min($cart[$product->id], $product->stock);
                if ($qty !== $cart[$product->id]) {
                    $cart[$product->id] = $qty;
                    session()->put('cart', $cart);
                }

                $subtotal = $product->price * $qty;
                $totalPrice += $subtotal;

                $cartItems[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => (float) $product->price,
                    'image_path' => $product->image_path,
                    'quantity' => $qty,
                    'stock' => $product->stock,
                    'subtotal' => (float) $subtotal,
                ];
            }
        }

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'totalPrice' => (float) $totalPrice,
        ]);
    }

    /**
     * Add a product to the cart.
     */
    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $productId = $request->input('product_id');
        $quantity = (int) $request->input('quantity');

        $product = Product::findOrFail($productId);

        if (!$product->is_available || $product->stock <= 0) {
            return back()->with('error', 'This product is currently unavailable.');
        }

        $cart = session()->get('cart', []);

        $currentQty = isset($cart[$productId]) ? $cart[$productId] : 0;
        $newQty = $currentQty + $quantity;

        if ($newQty > $product->stock) {
            return back()->with('error', "Cannot add more items. Only {$product->stock} in stock.");
        }

        $cart[$productId] = $newQty;
        session()->put('cart', $cart);

        return back()->with('success', "Added {$product->name} to cart.");
    }

    /**
     * Update the quantity of a product in the cart.
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $productId = $request->input('product_id');
        $quantity = (int) $request->input('quantity');

        $product = Product::findOrFail($productId);
        $cart = session()->get('cart', []);

        if (!isset($cart[$productId])) {
            return back()->with('error', 'Product not in cart.');
        }

        if ($quantity > $product->stock) {
            return back()->with('error', "Only {$product->stock} items available in stock.");
        }

        $cart[$productId] = $quantity;
        session()->put('cart', $cart);

        return back()->with('success', 'Cart updated successfully.');
    }

    /**
     * Remove a product from the cart.
     */
    public function remove(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $productId = $request->input('product_id');
        $cart = session()->get('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Item removed from cart.');
    }

    /**
     * Clear the cart.
     */
    public function clear(): RedirectResponse
    {
        session()->forget('cart');
        return back()->with('success', 'Cart cleared.');
    }
}
