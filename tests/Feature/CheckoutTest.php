<?php

use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates an order from cart and deducts stock', function () {
    $product = Product::factory()->create([
        'is_available' => true,
        'stock' => 10,
        'price' => 15.50,
    ]);

    // Simulate cart
    session(['cart' => [$product->id => 2]]);

    $this->post(route('checkout.store'), [
        'customer_name' => 'John Doe',
        'customer_email' => 'john@example.com',
        'customer_phone' => '1234567890',
        'delivery_address' => '123 Main St',
        'delivery_date' => now()->addDay()->format('Y-m-d'),
        'delivery_time' => 'morning',
        'payment_method' => 'delivery',
    ])->assertRedirect(route('home'));

    // Assert order was created
    $this->assertDatabaseHas('orders', [
        'customer_email' => 'john@example.com',
        'total_price' => 31.00,
        'status' => 'pending',
        'payment_status' => 'pending',
    ]);

    $order = Order::first();

    // Assert order item created
    $this->assertDatabaseHas('order_items', [
        'order_id' => $order->id,
        'product_id' => $product->id,
        'quantity' => 2,
    ]);

    // Assert stock deducted
    $this->assertEquals(8, $product->fresh()->stock);

    // Assert cart cleared
    $this->assertEmpty(session('cart'));
});

it('fails payment if mock CVV is 999', function () {
    $product = Product::factory()->create([
        'is_available' => true,
        'stock' => 10,
    ]);

    session(['cart' => [$product->id => 1]]);

    $this->post(route('checkout.store'), [
        'customer_name' => 'Jane Doe',
        'customer_email' => 'jane@example.com',
        'customer_phone' => '1234567890',
        'delivery_address' => '456 Side St',
        'delivery_date' => now()->addDay()->format('Y-m-d'),
        'delivery_time' => 'afternoon',
        'payment_method' => 'card',
        'card_number' => '1234567890123456',
        'card_expiry' => '12/25',
        'card_cvv' => '999', // Triggers failure
    ])->assertSessionHas('error');

    // Assert no order created
    $this->assertDatabaseCount('orders', 0);
    
    // Assert stock not deducted
    $this->assertEquals(10, $product->fresh()->stock);
    
    // Assert cart not cleared
    $this->assertNotEmpty(session('cart'));
});

it('redirects to cart if checkout index is hit with empty cart', function () {
    $this->get(route('checkout.index'))
         ->assertRedirect(route('cart.index'));
});
