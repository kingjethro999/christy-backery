<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $cart = session()->get('cart', []);
        $cartItems = [];
        if (!empty($cart)) {
            $products = \App\Models\Product::whereIn('id', array_keys($cart))->get();
            foreach ($products as $product) {
                $qty = min($cart[$product->id], $product->stock);
                if ($product->is_available && $product->stock > 0) {
                    $cartItems[] = [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'price' => (float) $product->price,
                        'image_path' => $product->image_path,
                        'quantity' => $qty,
                        'subtotal' => (float) ($product->price * $qty),
                    ];
                }
            }
        }

        return array_merge(parent::share($request), [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'cart_count' => array_sum($cart),
            'cart_items' => $cartItems,
            'cart_total' => (float) array_sum(array_column($cartItems, 'subtotal')),
            'flash' => [
                'success' => session()->get('success'),
                'error' => session()->get('error'),
            ],
        ]);
    }
}
