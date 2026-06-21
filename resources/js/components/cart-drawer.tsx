import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart_items, cart_total } = usePage<SharedData>().props;
    const [updatingIds, setUpdatingIds] = useState<number[]>([]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const updateQuantity = (productId: number, quantity: number) => {
        setUpdatingIds([...updatingIds, productId]);
        router.post(route('cart.update'), {
            product_id: productId,
            quantity: quantity
        }, {
            preserveScroll: true,
            onFinish: () => setUpdatingIds(updatingIds.filter(id => id !== productId))
        });
    };

    const removeItem = (productId: number) => {
        setUpdatingIds([...updatingIds, productId]);
        router.post(route('cart.remove'), {
            product_id: productId
        }, {
            preserveScroll: true,
            onFinish: () => setUpdatingIds(updatingIds.filter(id => id !== productId))
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-gray-900 dark:text-white" />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Cart</h2>
                        <span className="ml-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full">
                            {cart_items?.length || 0}
                        </span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {(!cart_items || cart_items.length === 0) ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-10 h-10 text-gray-300 dark:text-gray-700" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">Looks like you haven't added anything yet.</p>
                            </div>
                            <Button 
                                onClick={() => {
                                    onClose();
                                    router.visit(route('products.index'));
                                }}
                                className="mt-4 bg-[#f53003] hover:bg-[#e02b02] text-white"
                            >
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {cart_items.map((item) => {
                                const isUpdating = updatingIds.includes(item.id);
                                return (
                                    <li key={item.id} className={`flex gap-4 ${isUpdating ? 'opacity-50 pointer-events-none' : 'opacity-100'} transition-opacity`}>
                                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                            {item.image_path ? (
                                                <img src={item.image_path} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-orange-50 dark:bg-orange-900/20">
                                                    <ShoppingCart className="w-6 h-6 text-orange-200 dark:text-orange-800" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <div className="flex justify-between mb-1">
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                                                    <Link href={route('products.show', item.slug)} onClick={onClose} className="hover:text-[#f53003] dark:hover:text-[#FF4433]">
                                                        {item.name}
                                                    </Link>
                                                </h4>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                                    ₦{item.subtotal.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                ₦{item.price.toFixed(2)} each
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors rounded-l-md"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-r-md"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {cart_items && cart_items.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-[#111]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-base font-medium text-gray-900 dark:text-white">Subtotal</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">₦{cart_total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="space-y-3">
                            <Button 
                                onClick={() => {
                                    onClose();
                                    router.visit(route('checkout.index'));
                                }}
                                className="w-full bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white h-12 text-base font-medium"
                            >
                                Checkout <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => {
                                    onClose();
                                    router.visit(route('cart.index'));
                                }}
                                className="w-full h-12 text-base font-medium"
                            >
                                View Cart Page
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
