import { Head, Link, router, usePage } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    slug: string;
    price: number;
    image_path?: string | null;
    quantity: number;
    stock: number;
    subtotal: number;
}

interface CartPageProps {
    cartItems: CartItem[];
    totalPrice: number;
}

export default function CartIndex({ cartItems, totalPrice }: CartPageProps) {
    const { flash } = usePage<SharedData>().props;
    const [updatingIds, setUpdatingIds] = useState<number[]>([]);

    const updateQuantity = (productId: number, quantity: number) => {
        setUpdatingIds(prev => [...prev, productId]);
        router.post(route('cart.update'), { product_id: productId, quantity }, {
            preserveScroll: true,
            onFinish: () => setUpdatingIds(prev => prev.filter(id => id !== productId)),
        });
    };

    const removeItem = (productId: number) => {
        setUpdatingIds(prev => [...prev, productId]);
        router.post(route('cart.remove'), { product_id: productId }, {
            preserveScroll: true,
            onFinish: () => setUpdatingIds(prev => prev.filter(id => id !== productId)),
        });
    };

    const clearCart = () => {
        if (!confirm('Are you sure you want to clear your cart?')) return;
        router.post(route('cart.clear'), {}, { preserveScroll: true });
    };

    return (
        <GuestLayout>
            <Head title="Your Cart - Christy Bakery" />

            <div className="bg-[#f9f9f9] dark:bg-[#111] min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <ShoppingCart className="w-8 h-8" />
                        Shopping Cart
                        {cartItems.length > 0 && (
                            <span className="ml-1 text-base font-normal text-gray-500 dark:text-gray-400">
                                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                            </span>
                        )}
                    </h1>

                    {/* Flash messages */}
                    {flash.success && (
                        <div className="mb-6 px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg text-sm">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="mb-6 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg text-sm">
                            {flash.error}
                        </div>
                    )}

                    {cartItems.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-[#161615] rounded-2xl border border-gray-200 dark:border-gray-800">
                            <ShoppingBag className="w-16 h-16 mx-auto text-gray-200 dark:text-gray-700 mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added any items yet.</p>
                            <Button asChild className="bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white">
                                <Link href={route('products.index')}>
                                    <ShoppingCart className="w-4 h-4 mr-2" /> Browse Menu
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items */}
                            <div className="lg:flex-1">
                                <div className="bg-white dark:bg-[#161615] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {cartItems.map((item) => {
                                            const isUpdating = updatingIds.includes(item.id);
                                            return (
                                                <li key={item.id} className={`flex gap-5 p-5 transition-opacity ${isUpdating ? 'opacity-40 pointer-events-none' : ''}`}>
                                                    <Link href={route('products.show', item.slug)} className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                        {item.image_path ? (
                                                            <img src={item.image_path} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-orange-50 dark:bg-orange-900/20 text-3xl">🍞</div>
                                                        )}
                                                    </Link>

                                                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                        <div>
                                                            <Link href={route('products.show', item.slug)} className="font-semibold text-gray-900 dark:text-white hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors">
                                                                {item.name}
                                                            </Link>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">₦{item.price.toFixed(2)} each</p>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.stock} in stock</p>
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            {/* Quantity control */}
                                                            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                    className="px-3 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
                                                                >
                                                                    <Minus className="w-3.5 h-3.5" />
                                                                </button>
                                                                <span className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white border-x border-gray-200 dark:border-gray-700 min-w-[3rem] text-center">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    disabled={item.quantity >= item.stock}
                                                                    className="px-3 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
                                                                >
                                                                    <Plus className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>

                                                            <div className="text-right min-w-[5rem]">
                                                                <p className="font-bold text-gray-900 dark:text-white">₦{item.subtotal.toFixed(2)}</p>
                                                            </div>

                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                                aria-label={`Remove ${item.name}`}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="px-5 py-4 bg-gray-50 dark:bg-[#111] border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                        <Button variant="outline" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:border-red-300">
                                            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear Cart
                                        </Button>
                                        <Link href={route('products.index')} className="text-sm text-[#f53003] hover:underline font-medium">
                                            ← Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-80">
                                <div className="bg-white dark:bg-[#161615] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Subtotal ({cartItems.length} items)</span>
                                            <span>₦{totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Delivery</span>
                                            <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-base text-gray-900 dark:text-white">
                                            <span>Total</span>
                                            <span className="text-[#f53003] dark:text-[#FF4433]">₦{totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        asChild
                                        className="w-full mt-6 bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white h-12 text-base font-bold shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
                                    >
                                        <Link href={route('checkout.index')}>
                                            Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
