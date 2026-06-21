<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request): Response
    {
        $query = Product::with('category');

        if ($request->filled('search')) {
            $query->search($request->input('search'));
        }

        $products = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/products/index', [
            'products' => ProductResource::collection($products),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create(): Response
    {
        $categories = Category::all();

        return Inertia::render('admin/products/form', [
            'categories' => CategoryResource::collection($categories),
            'product' => null,
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        try {
            $product = Product::create($request->validated());

            Log::info("Product created by admin: {$product->name} (ID: {$product->id})", [
                'admin_id' => auth()->id(),
                'product_id' => $product->id,
            ]);

            return redirect()->route('admin.products.index')
                ->with('success', 'Product created successfully.');

        } catch (\Exception $e) {
            Log::error("Failed to create product.", [
                'error' => $e->getMessage(),
            ]);

            return back()->withInput()->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product): Response
    {
        $product->load('category');
        $categories = Category::all();

        return Inertia::render('admin/products/form', [
            'product' => new ProductResource($product),
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        try {
            $product->update($request->validated());

            Log::info("Product updated by admin: {$product->name} (ID: {$product->id})", [
                'admin_id' => auth()->id(),
                'product_id' => $product->id,
            ]);

            return redirect()->route('admin.products.index')
                ->with('success', 'Product updated successfully.');

        } catch (\Exception $e) {
            Log::error("Failed to update product ID: {$product->id}", [
                'error' => $e->getMessage(),
            ]);

            return back()->withInput()->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        try {
            $name = $product->name;
            $product->delete();

            Log::info("Product deleted by admin: {$name} (ID: {$product->id})", [
                'admin_id' => auth()->id(),
                'product_id' => $product->id,
            ]);

            return redirect()->route('admin.products.index')
                ->with('success', 'Product deleted successfully.');

        } catch (\Exception $e) {
            Log::error("Failed to delete product ID: {$product->id}", [
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }
}
