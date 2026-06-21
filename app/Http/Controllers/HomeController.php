<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        $featuredProducts = Product::available()
            ->with('category')
            ->inRandomOrder()
            ->limit(8)
            ->get();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts->map(
                fn (Product $product) => (new ProductResource($product))->resolve()
            )->values()->all(),
        ]);
    }

    /**
     * Display the products catalog.
     */
    public function catalog(Request $request): Response
    {
        return Inertia::render('products/index', $this->catalogProps($request));
    }

    /**
     * @return array{products: \Illuminate\Contracts\Pagination\LengthAwarePaginator, categories: array<int, array<string, mixed>>, filters: \stdClass}
     */
    private function catalogProps(Request $request): array
    {
        $query = Product::available()->with('category');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->input('category'));
            });
        }

        if ($request->filled('search')) {
            $query->search($request->input('search'));
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', (float) $request->input('price_min'));
        }
        if ($request->filled('price_max')) {
            $query->where('price', '<=', (float) $request->input('price_max'));
        }

        $sort = $request->input('sort', 'latest');
        if ($sort === 'price-asc') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'price-desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }

        $products = $query->paginate(9)->withQueryString()->through(
            fn (Product $product) => (new ProductResource($product))->resolve()
        );
        $categories = Category::all();

        return [
            'products' => $products,
            'categories' => $categories->map(
                fn (Category $category) => (new CategoryResource($category))->resolve()
            )->values()->all(),
            'filters' => (object) $request->only(['category', 'search', 'price_min', 'price_max', 'sort']),
        ];
    }

    /**
     * Display a single product details.
     */
    public function show(Product $product): Response
    {
        if (!$product->is_available) {
            abort(404);
        }

        $product->load('category');

        $relatedProducts = Product::available()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return Inertia::render('products/show', [
            'product' => (new ProductResource($product))->resolve(),
            'relatedProducts' => $relatedProducts->map(
                fn (Product $related) => (new ProductResource($related))->resolve()
            )->values()->all(),
        ]);
    }
}
