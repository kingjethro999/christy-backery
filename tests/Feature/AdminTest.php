<?php

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Helper: create admin user
function makeAdmin(): User
{
    return User::factory()->create(['is_admin' => true]);
}

// ─── Admin Middleware ─────────────────────────────────────────────────────────

it('blocks unauthenticated users from admin area', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
});

it('blocks non-admin users from admin area', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $this->actingAs($user)->get(route('admin.dashboard'))->assertForbidden();
});

it('allows admin users to access the dashboard', function () {
    $this->actingAs(makeAdmin())
         ->get(route('admin.dashboard'))
         ->assertSuccessful();
});

// ─── Admin Products ───────────────────────────────────────────────────────────

it('admin can create a product', function () {
    $category = Category::factory()->create();

    $this->actingAs(makeAdmin())
         ->post(route('admin.products.store'), [
             'name' => 'Sourdough Loaf',
             'slug' => 'sourdough-loaf',
             'description' => 'A tangy sourdough bread.',
             'price' => 8.50,
             'stock' => 20,
             'category_id' => $category->id,
             'is_available' => true,
         ])
         ->assertRedirect();

    $this->assertDatabaseHas('products', ['name' => 'Sourdough Loaf']);
});

it('admin can update a product', function () {
    $product = Product::factory()->create();

    $this->actingAs(makeAdmin())
         ->put(route('admin.products.update', $product), [
             'name' => 'Updated Loaf',
             'slug' => 'updated-loaf',
             'description' => $product->description,
             'price' => $product->price,
             'stock' => $product->stock,
             'category_id' => $product->category_id,
             'is_available' => true,
         ])
         ->assertRedirect();

    $this->assertDatabaseHas('products', ['name' => 'Updated Loaf']);
});

it('admin can delete a product', function () {
    $product = Product::factory()->create();

    $this->actingAs(makeAdmin())
         ->delete(route('admin.products.destroy', $product))
         ->assertRedirect();

    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});

// ─── Admin Orders ─────────────────────────────────────────────────────────────

it('admin can view orders list', function () {
    $this->actingAs(makeAdmin())
         ->get(route('admin.orders.index'))
         ->assertSuccessful();
});

it('admin can update order status', function () {
    $order = Order::factory()->create(['status' => 'pending', 'payment_status' => 'pending']);

    $this->actingAs(makeAdmin())
         ->put(route('admin.orders.status', $order), [
             'status' => 'completed',
             'payment_status' => 'paid',
         ])
         ->assertRedirect();

    $this->assertDatabaseHas('orders', ['id' => $order->id, 'status' => 'completed']);
});

// ─── Admin Inquiries ──────────────────────────────────────────────────────────

it('admin can view inquiries list', function () {
    $this->actingAs(makeAdmin())
         ->get(route('admin.inquiries.index'))
         ->assertSuccessful();
});

it('admin can resolve an inquiry', function () {
    $inquiry = Inquiry::factory()->create(['status' => 'pending']);

    $this->actingAs(makeAdmin())
         ->put(route('admin.inquiries.resolve', $inquiry))
         ->assertRedirect();

    $this->assertDatabaseHas('inquiries', ['id' => $inquiry->id, 'status' => 'resolved']);
});
