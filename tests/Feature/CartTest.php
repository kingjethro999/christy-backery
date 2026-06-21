<?php

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('adds a product to the cart', function () {
    $product = Product::factory()->create([
        'is_available' => true,
        'stock' => 10,
    ]);

    $this->post(route('cart.add'), [
        'product_id' => $product->id,
        'quantity' => 2,
    ])->assertRedirect();

    $this->assertEquals(2, session('cart')[$product->id]);
});

it('prevents adding unavailable products', function () {
    $product = Product::factory()->create([
        'is_available' => false,
        'stock' => 10,
    ]);

    $this->post(route('cart.add'), [
        'product_id' => $product->id,
        'quantity' => 2,
    ])->assertSessionHas('error');

    $this->assertEmpty(session('cart'));
});

it('prevents adding more than available stock', function () {
    $product = Product::factory()->create([
        'is_available' => true,
        'stock' => 5,
    ]);

    $this->post(route('cart.add'), [
        'product_id' => $product->id,
        'quantity' => 6,
    ])->assertSessionHas('error');

    $this->assertEmpty(session('cart'));
});

it('updates product quantity in the cart', function () {
    $product = Product::factory()->create([
        'is_available' => true,
        'stock' => 10,
    ]);

    // Initial add
    session(['cart' => [$product->id => 2]]);

    // Update
    $this->post(route('cart.update'), [
        'product_id' => $product->id,
        'quantity' => 5,
    ])->assertRedirect();

    $this->assertEquals(5, session('cart')[$product->id]);
});

it('removes a product from the cart', function () {
    $product = Product::factory()->create([
        'is_available' => true,
        'stock' => 10,
    ]);

    session(['cart' => [$product->id => 2]]);

    $this->post(route('cart.remove'), [
        'product_id' => $product->id,
    ])->assertRedirect();

    $this->assertArrayNotHasKey($product->id, session('cart'));
});

it('clears the cart entirely', function () {
    $product1 = Product::factory()->create(['stock' => 10]);
    $product2 = Product::factory()->create(['stock' => 10]);

    session(['cart' => [$product1->id => 2, $product2->id => 1]]);

    $this->post(route('cart.clear'))->assertRedirect();

    $this->assertEmpty(session('cart'));
});
