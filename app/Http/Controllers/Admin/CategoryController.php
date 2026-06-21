<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index(): Response
    {
        $categories = Category::withCount('products')->latest()->get();

        return Inertia::render('admin/categories/index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:categories,slug'],
            'description' => ['nullable', 'string'],
        ]);

        try {
            $category = Category::create($validated);

            Log::info("Category created by admin: {$category->name} (ID: {$category->id})", [
                'admin_id' => auth()->id(),
                'category_id' => $category->id,
            ]);

            return redirect()->route('admin.categories.index')
                ->with('success', 'Category created successfully.');

        } catch (\Exception $e) {
            Log::error("Failed to create category.", [
                'error' => $e->getMessage(),
            ]);

            return back()->withInput()->with('error', 'Failed to create category: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:categories,slug,' . $category->id],
            'description' => ['nullable', 'string'],
        ]);

        try {
            $category->update($validated);

            Log::info("Category updated by admin: {$category->name} (ID: {$category->id})", [
                'admin_id' => auth()->id(),
                'category_id' => $category->id,
            ]);

            return redirect()->route('admin.categories.index')
                ->with('success', 'Category updated successfully.');

        } catch (\Exception $e) {
            Log::error("Failed to update category ID: {$category->id}", [
                'error' => $e->getMessage(),
            ]);

            return back()->withInput()->with('error', 'Failed to update category: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        try {
            // Check if there are products belonging to this category
            if ($category->products()->count() > 0) {
                return back()->with('error', 'Cannot delete category because it has products associated with it. Please reassign or delete the products first.');
            }

            $name = $category->name;
            $category->delete();

            Log::info("Category deleted by admin: {$name} (ID: {$category->id})", [
                'admin_id' => auth()->id(),
                'category_id' => $category->id,
            ]);

            return redirect()->route('admin.categories.index')
                ->with('success', 'Category deleted successfully.');

        } catch (\Exception $e) {
            Log::error("Failed to delete category ID: {$category->id}", [
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to delete category: ' . $e->getMessage());
        }
    }
}
