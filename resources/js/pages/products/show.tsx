import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { ProductCard } from '@/components/product-card';
import { useState } from 'react';
import { ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface ProductShowProps {
    product: Product;
    relatedProducts?: Product[];
}

export default function ProductShow({ product, relatedProducts = [] }: ProductShowProps) {
    const p = product;
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [addedSuccessfully, setAddedSuccessfully] = useState(false);

    const increment = () => {
        if (quantity < p.stock) {
            setQuantity(q => q + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        }
    };

    const handleAddToCart = () => {
        if (p.stock <= 0 || !p.is_available) return;

        setIsAdding(true);
        router.post(route('cart.add'), {
            product_id: p.id,
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsAdding(false);
                setAddedSuccessfully(true);
                setTimeout(() => setAddedSuccessfully(false), 2000);
            },
            onError: () => {
                setIsAdding(false);
            }
        });
    };

    const getFallbackImageColor = (catName?: string) => {
        const name = catName?.toLowerCase() || '';
        if (name.includes('cake')) return 'bg-amber-100 dark:bg-amber-950/20 text-amber-600';
        if (name.includes('bread')) return 'bg-orange-100 dark:bg-orange-950/20 text-orange-600';
        if (name.includes('pastry')) return 'bg-rose-100 dark:bg-rose-950/20 text-rose-600';
        return 'bg-yellow-100 dark:bg-yellow-950/20 text-yellow-600';
    };

    return (
        <GuestLayout>
            <Head title={p.name} />
            
            <div className="bg-[#fff8f5] dark:bg-[#1a1311] py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <Link 
                        href={route('products.index')} 
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Menu
                    </Link>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        
                        {/* Product Image */}
                        <div className="flex flex-col-reverse lg:flex-row gap-6">
                            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800">
                                {p.image_path ? (
                                    <img 
                                        src={p.image_path} 
                                        alt={p.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className={`flex flex-col items-center justify-center w-full h-full ${getFallbackImageColor(p.category_name)}`}>
                                        <ShoppingBag className="h-24 w-24 stroke-[1.5] animate-pulse opacity-50" />
                                        <span className="text-sm font-semibold tracking-wider uppercase mt-4 opacity-70">
                                            {p.category_name || 'Bakery'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mt-10 px-4 sm:px-0 lg:mt-0">
                            <div className="mb-3">
                                <span className="text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                                    {p.category_name || 'Fresh Baked'}
                                </span>
                            </div>
                            
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                                {p.name}
                            </h1>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ₦{p.price.toFixed(2)}
                                </p>
                                
                                {p.stock <= 0 ? (
                                    <Badge variant="destructive" className="font-semibold uppercase tracking-wider">
                                        Out of Stock
                                    </Badge>
                                ) : p.stock < 10 ? (
                                    <Badge className="bg-amber-500 text-white font-semibold uppercase tracking-wider">
                                        Only {p.stock} Left
                                    </Badge>
                                ) : (
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-semibold uppercase tracking-wider border-none">
                                        In Stock
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div className="text-base text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed">
                                    <p>{p.description}</p>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#161615] h-14">
                                        <button 
                                            onClick={decrement}
                                            disabled={quantity <= 1 || p.stock <= 0}
                                            className="px-5 py-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                            {quantity}
                                        </span>
                                        <button 
                                            onClick={increment}
                                            disabled={quantity >= p.stock || p.stock <= 0}
                                            className="px-5 py-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={p.stock <= 0 || isAdding}
                                        className={`flex-1 h-14 text-base font-semibold shadow-md transition-all ${
                                            addedSuccessfully 
                                                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/20' 
                                                : 'bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white shadow-orange-500/20'
                                        }`}
                                    >
                                        {isAdding ? (
                                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                                        ) : addedSuccessfully ? (
                                            <Check className="h-5 w-5 mr-2" />
                                        ) : (
                                            <ShoppingBag className="mr-2 h-5 w-5" />
                                        )}
                                        {addedSuccessfully ? 'Added to Cart' : 'Add to Cart'}
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Features List */}
                            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <ul className="space-y-4">
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Freshly baked every morning
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Made with premium, natural ingredients
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Available for same-day pickup
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="bg-white dark:bg-[#0a0a0a] py-16 border-t border-[#fceee8] dark:border-[#2d211d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                You might also like
                            </h2>
                            <Link 
                                href={route('products.index')} 
                                className="text-sm font-medium text-[#f53003] hover:text-[#e02b02] dark:text-[#FF4433] dark:hover:text-[#ff3322]"
                            >
                                See all products &rarr;
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((rp) => (
                                <ProductCard key={rp.id} product={rp} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}
