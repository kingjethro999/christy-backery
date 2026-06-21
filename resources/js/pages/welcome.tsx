import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { ProductCard } from '@/components/product-card';

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

interface WelcomeProps {
    featuredProducts: Product[];
}

export default function Welcome({ featuredProducts = [] }: WelcomeProps) {
    return (
        <GuestLayout>
            <Head title="Christy Bakery" />
            
            {/* Hero Section */}
            <section className="relative w-full py-24 md:py-32 overflow-hidden bg-orange-50 dark:bg-orange-950/20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
                <div className="container relative mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
                    <span className="mb-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        Freshly Baked Every Day
                    </span>
                    <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
                        The Best Breads & <span className="text-[#f53003] dark:text-[#FF4433]">Pastries</span>
                    </h1>
                    <p className="mb-8 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
                        Experience the taste of traditional baking with our handcrafted selection of breads, cakes, and sweet treats made with love.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href={route('products.index')}
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#f53003] px-8 font-medium text-white shadow-lg shadow-orange-500/30 transition-transform hover:-translate-y-0.5 hover:bg-[#e02b02] focus:outline-none focus:ring-2 focus:ring-[#f53003] focus:ring-offset-2 dark:bg-[#FF4433] dark:hover:bg-[#ff3322]"
                        >
                            Order Now
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-8 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Our Story
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="py-20 bg-white dark:bg-[#0a0a0a]">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mb-10 flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                            <div>
                                <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-[#f53003]">
                                    Fresh Picks
                                </span>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                                    Today's Favourites
                                </h2>
                                <p className="mt-2 max-w-xl text-gray-600 dark:text-gray-400">
                                    A rotating selection of our most-loved breads, pastries, and cakes — baked fresh for you.
                                </p>
                            </div>
                            <Link
                                href={route('products.index')}
                                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 px-6 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 sm:mt-0"
                            >
                                View Full Menu
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            <section className="py-20 bg-[#fff8f5] dark:bg-[#111]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">Baked Fresh Daily</h3>
                            <p className="text-gray-600 dark:text-gray-400">Our bakers start early every morning to ensure you get the freshest bread and pastries possible.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">Premium Ingredients</h3>
                            <p className="text-gray-600 dark:text-gray-400">We use only the finest organic flour, pure butter, and fresh seasonal fruits in all our recipes.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">Custom Orders</h3>
                            <p className="text-gray-600 dark:text-gray-400">Need something special? We create custom cakes and large orders for your special events.</p>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
