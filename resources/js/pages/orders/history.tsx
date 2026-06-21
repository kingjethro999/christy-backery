import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Package, Clock, CheckCircle2, XCircle, ChevronRight, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import EmptyState from '@/components/empty-state';

interface OrderItem {
    id: number;
    product_name: string;
    product_image?: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    created_at: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    total_price: number;
    payment_method: string;
    delivery_date: string;
    items: OrderItem[];
}

interface OrdersHistoryProps {
    orders: { data: Order[] };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'My Orders', href: '/orders/history' },
];

export default function OrdersHistory({ orders }: OrdersHistoryProps) {
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
            case 'processing': return <Clock className="w-4 h-4 mr-1.5" />;
            case 'cancelled': return <XCircle className="w-4 h-4 mr-1.5" />;
            default: return <Package className="w-4 h-4 mr-1.5" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order History" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Order History
                    </h1>
                </div>

                {orders.data.length === 0 ? (
                    <EmptyState
                        title="No orders yet"
                        description="When you place an order, it will appear here so you can track its status."
                        icon={<Package className="w-8 h-8" />}
                        actionLabel="Browse Menu"
                        actionUrl={route('products.index')}
                    />
                ) : (
                    <div className="grid gap-6">
                        {orders.data.map((order) => (
                            <div key={order.id} className="bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
                                {/* Order Header */}
                                <div className="bg-neutral-50 dark:bg-[#111] p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800">
                                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">Order placed</p>
                                            <p className="text-neutral-500 dark:text-neutral-400">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">Total</p>
                                            <p className="text-neutral-500 dark:text-neutral-400">₦{order.total_price.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">Delivery</p>
                                            <p className="text-neutral-500 dark:text-neutral-400">{new Date(order.delivery_date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">Order #</p>
                                            <p className="text-neutral-500 dark:text-neutral-400">{order.id}</p>
                                        </div>
                                    </div>
                                    <Badge className={`flex items-center uppercase tracking-wider text-xs font-semibold px-3 py-1 ${getStatusColor(order.status)} border-none`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </Badge>
                                </div>

                                {/* Order Items */}
                                <div className="p-4 sm:p-6">
                                    <ul className="space-y-6">
                                        {order.items.map((item) => (
                                            <li key={item.id} className="flex items-center gap-4">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-700">
                                                    {item.product_image ? (
                                                        <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-orange-50 dark:bg-orange-900/20">
                                                            <Package className="w-6 h-6 text-orange-200 dark:text-orange-800" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-medium text-neutral-900 dark:text-white truncate">
                                                        {item.product_name}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                                        Qty: {item.quantity} × ₦{item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-base font-medium text-neutral-900 dark:text-white">
                                                        ₦{(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Order Footer */}
                                <div className="bg-neutral-50 dark:bg-[#111] px-4 py-3 sm:px-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                                    <Button variant="outline" className="text-sm font-medium" asChild>
                                        <Link href={route('contact')} className="flex items-center">
                                            <FileText className="w-4 h-4 mr-2" />
                                            Need Help?
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
