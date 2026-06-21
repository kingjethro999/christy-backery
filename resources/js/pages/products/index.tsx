import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { ProductCard } from '@/components/product-card';
import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import EmptyState from '@/components/empty-state';

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_path: string | null;
    is_available: boolean;
    stock: number;
    category_name?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

type FilterState = {
    category?: string;
    search?: string;
    price_min?: string;
    price_max?: string;
    sort?: string;
};

interface ProductsIndexProps {
    products: PaginatedData<Product>;
    categories: Category[];
    filters?: FilterState | FilterState[] | null;
}

function normalizeFilters(filters: ProductsIndexProps['filters']): FilterState {
    if (!filters || Array.isArray(filters) || typeof filters !== 'object') {
        return {};
    }

    return filters;
}

export default function ProductsIndex({
    products = { data: [], current_page: 1, last_page: 1, prev_page_url: null, next_page_url: null, links: [], total: 0 },
    categories = [],
    filters: rawFilters,
}: ProductsIndexProps) {
    const filters = normalizeFilters(rawFilters);
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');
    const [sortBy, setSortBy] = useState(filters.sort ?? 'latest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const applyFilters = () => {
        const query: Record<string, string> = {};

        if (search) query.search = search;
        if (category) query.category = category;
        if (sortBy && sortBy !== 'latest') query.sort = sortBy;

        router.get(route('products.index'), query, { preserveState: true, preserveScroll: true });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search ?? '')) {
                applyFilters();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (category !== (filters.category ?? '') || sortBy !== (filters.sort ?? 'latest')) {
            applyFilters();
        }
    }, [category, sortBy]);

    return (
        <GuestLayout>
            <Head title="Our Menu" />
            
            {/* Page Header */}
            <div className="bg-[#fff8f5] dark:bg-[#1a1311] py-12 border-b border-[#fceee8] dark:border-[#2d211d]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Our Fresh <span className="text-[#f53003]">Menu</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Browse our complete selection of handcrafted breads, pastries, and cakes. Baked fresh daily just for you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden flex items-center justify-between mb-4">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Showing {products.data.length} of {products.total} products
                        </div>
                    </div>

                    {/* Sidebar Filters */}
                    <div className={`lg:w-1/4 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="sticky top-24 bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
                            
                            {/* Search */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-3">Search</h3>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-[#161615] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f53003] focus:border-[#f53003] sm:text-sm transition-colors"
                                    />
                                    {search && (
                                        <button 
                                            onClick={() => setSearch('')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-3">Categories</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setCategory('')}
                                        className={`block w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                                            category === '' 
                                                ? 'bg-orange-50 text-orange-700 font-medium dark:bg-orange-950/30 dark:text-orange-400' 
                                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-[#161615]'
                                        }`}
                                    >
                                        All Products
                                    </button>
                                    {categories.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => setCategory(c.slug)}
                                            className={`block w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                                                category === c.slug 
                                                    ? 'bg-orange-50 text-orange-700 font-medium dark:bg-orange-950/30 dark:text-orange-400' 
                                                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-[#161615]'
                                            }`}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-3">Sort By</h3>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-[#f53003] focus:border-[#f53003] sm:text-sm rounded-md appearance-none bg-white dark:bg-[#161615] dark:text-white"
                                    >
                                        <option value="latest">Newest Arrivals</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="lg:w-3/4 flex-1">
                        
                        <div className="hidden lg:flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {category ? categories.find(c => c.slug === category)?.name : 'All Products'}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing {products.data.length} of {products.total} products
                            </p>
                        </div>

                        {products.data.length === 0 ? (
                            <EmptyState 
                                title="No products found" 
                                description="We couldn't find any products matching your current filters. Try adjusting your search or category."
                                icon={<Search className="w-8 h-8" />}
                            />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.data.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.last_page > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            {products.links.map((link, idx) => {
                                                if (link.url === null) {
                                                    return (
                                                        <span 
                                                            key={idx}
                                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161615] text-sm font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed ${idx === 0 ? 'rounded-l-md' : ''} ${idx === products.links.length - 1 ? 'rounded-r-md' : ''}`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={idx}
                                                        href={link.url}
                                                        preserveScroll
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                                                            link.active 
                                                                ? 'z-10 bg-orange-50 dark:bg-orange-900/30 border-[#f53003] text-[#f53003]' 
                                                                : 'bg-white dark:bg-[#161615] border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#20201f]'
                                                        } ${idx === 0 ? 'rounded-l-md' : ''} ${idx === products.links.length - 1 ? 'rounded-r-md' : ''}`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}
