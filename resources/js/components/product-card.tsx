import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ShoppingBag, Check, Info } from 'lucide-react';
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

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [addedSuccessfully, setAddedSuccessfully] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (product.stock <= 0 || !product.is_available) return;

        setIsAdding(true);
        router.post(route('cart.add'), {
            product_id: product.id,
            quantity: 1
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

    // Helper to get fallback category-themed visual
    const getFallbackImageColor = (catName?: string) => {
        const name = catName?.toLowerCase() || '';
        if (name.includes('cake')) return 'bg-amber-100 dark:bg-amber-950/20 text-amber-600';
        if (name.includes('bread')) return 'bg-orange-100 dark:bg-orange-950/20 text-orange-600';
        if (name.includes('pastry')) return 'bg-rose-100 dark:bg-rose-950/20 text-rose-600';
        return 'bg-yellow-100 dark:bg-yellow-950/20 text-yellow-600';
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Image Section */}
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center">
                {product.image_path ? (
                    <img 
                        src={product.image_path} 
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className={`flex flex-col items-center justify-center w-full h-full ${getFallbackImageColor(product.category_name)}`}>
                        <ShoppingBag className="h-10 w-10 stroke-[1.5] animate-pulse" />
                        <span className="text-xs font-semibold tracking-wider uppercase mt-2">
                            {product.category_name || 'Bakery'}
                        </span>
                    </div>
                )}

                {/* Badge Status */}
                <div className="absolute left-3 top-3 flex flex-col gap-1">
                    {product.stock <= 0 ? (
                        <Badge variant="destructive" className="font-semibold uppercase tracking-wider text-[10px]">
                            Out of Stock
                        </Badge>
                    ) : product.stock < 10 ? (
                        <Badge className="bg-amber-500 text-white font-semibold uppercase tracking-wider text-[10px]">
                            Only {product.stock} Left
                        </Badge>
                    ) : null}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {product.category_name || 'Fresh Baked'}
                    </span>
                </div>
                
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    <Link href={route('products.show', product.slug)}>
                        {product.name}
                    </Link>
                </h4>
                
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80">
                    <span className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        ₦{product.price.toFixed(2)}
                    </span>

                    <div className="flex gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            asChild
                        >
                            <Link href={route('products.show', product.slug)}>
                                <Info className="h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || isAdding}
                            size="sm"
                            className={`h-8 rounded-full px-3 font-medium transition-all ${
                                addedSuccessfully 
                                    ? 'bg-green-600 hover:bg-green-600 text-white' 
                                    : 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white'
                            }`}
                        >
                            {isAdding ? (
                                <span className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                            ) : addedSuccessfully ? (
                                <Check className="h-4.5 w-4.5" />
                            ) : (
                                <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                            )}
                            {addedSuccessfully ? 'Added' : 'Add'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
