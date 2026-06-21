import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { CreditCard, Truck, AlertCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

interface User {
    name: string;
    email: string;
    phone?: string;
    address?: string;
}

interface CheckoutProps {
    cartItems: CartItem[];
    totalPrice: number;
    user: User | null;
}

export default function CheckoutIndex({ cartItems, totalPrice, user }: CheckoutProps) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: user?.name || '',
        customer_email: user?.email || '',
        customer_phone: user?.phone || '',
        delivery_address: user?.address || '',
        delivery_date: '',
        delivery_time: 'morning',
        payment_method: 'paystack',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <GuestLayout>
            <Head title="Checkout - Christy Bakery" />
            
            <div className="bg-[#f9f9f9] dark:bg-[#111] min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Form Column */}
                        <div className="lg:w-2/3">
                            <form onSubmit={submit} className="space-y-8">
                                
                                {/* Contact & Delivery Info */}
                                <div className="bg-white dark:bg-[#161615] rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                                        Delivery Details
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={data.customer_name}
                                                onChange={e => setData('customer_name', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.customer_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            />
                                            {errors.customer_name && <p className="mt-1 text-sm text-red-500">{errors.customer_name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={data.customer_email}
                                                onChange={e => setData('customer_email', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.customer_email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            />
                                            {errors.customer_email && <p className="mt-1 text-sm text-red-500">{errors.customer_email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={data.customer_phone}
                                                onChange={e => setData('customer_phone', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.customer_phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            />
                                            {errors.customer_phone && <p className="mt-1 text-sm text-red-500">{errors.customer_phone}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                                            <textarea
                                                rows={3}
                                                value={data.delivery_address}
                                                onChange={e => setData('delivery_address', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.delivery_address ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            ></textarea>
                                            {errors.delivery_address && <p className="mt-1 text-sm text-red-500">{errors.delivery_address}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Date</label>
                                            <input
                                                type="date"
                                                value={data.delivery_date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={e => setData('delivery_date', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.delivery_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            />
                                            {errors.delivery_date && <p className="mt-1 text-sm text-red-500">{errors.delivery_date}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
                                            <select
                                                value={data.delivery_time}
                                                onChange={e => setData('delivery_time', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.delivery_time ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            >
                                                <option value="morning">Morning (8 AM - 12 PM)</option>
                                                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                                <option value="evening">Evening (4 PM - 7 PM)</option>
                                            </select>
                                            {errors.delivery_time && <p className="mt-1 text-sm text-red-500">{errors.delivery_time}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Notes (Optional)</label>
                                            <textarea
                                                rows={2}
                                                value={data.notes}
                                                onChange={e => setData('notes', e.target.value)}
                                                placeholder="Allergy info, gate code, etc."
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003]"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white dark:bg-[#161615] rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                                        Payment Method
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        {/* Paystack Option */}
                                        <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${data.payment_method === 'paystack' ? 'border-[#f53003] bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="radio"
                                                    value="paystack"
                                                    checked={data.payment_method === 'paystack'}
                                                    onChange={e => setData('payment_method', e.target.value)}
                                                    className="w-4 h-4 text-[#f53003] focus:ring-[#f53003] border-gray-300"
                                                />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <span className="block text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                    <CreditCard className="w-5 h-5 text-gray-500" />
                                                    Pay Now (Paystack)
                                                </span>
                                                <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">Pay securely online with your card via Paystack. You will be redirected to complete your payment.</span>
                                            </div>
                                        </label>

                                        {/* Cash on Delivery Option */}
                                        <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${data.payment_method === 'pay_on_delivery' ? 'border-[#f53003] bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="radio"
                                                    value="pay_on_delivery"
                                                    checked={data.payment_method === 'pay_on_delivery'}
                                                    onChange={e => setData('payment_method', e.target.value)}
                                                    className="w-4 h-4 text-[#f53003] focus:ring-[#f53003] border-gray-300"
                                                />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <span className="block text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                    <Truck className="w-5 h-5 text-gray-500" />
                                                    Pay on Delivery
                                                </span>
                                                <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">Pay in cash or transfer when your order arrives.</span>
                                            </div>
                                        </label>
                                        {errors.payment_method && <p className="mt-1 text-sm text-red-500">{errors.payment_method}</p>}
                                    </div>
                                </div>
                                
                                <div className="hidden lg:block">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white h-14 text-lg font-bold"
                                    >
                                        {processing ? 'Processing Order...' : `Pay ₦${totalPrice.toFixed(2)}`}
                                    </Button>
                                </div>

                            </form>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-white dark:bg-[#161615] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 sticky top-24">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                ₦{item.subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                                        <span className="font-medium text-gray-900 dark:text-white">₦{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                                        <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between">
                                        <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-lg font-bold text-[#f53003] dark:text-[#FF4433]">₦{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 space-y-4 lg:hidden">
                                    <Button
                                        onClick={submit}
                                        disabled={processing}
                                        className="w-full bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white h-12 text-base font-bold"
                                    >
                                        {processing ? 'Processing...' : `Pay ₦${totalPrice.toFixed(2)}`}
                                    </Button>
                                </div>
                                
                                <div className="mt-6 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                    <p>By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
