import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ShoppingBag, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import EmptyState from '@/components/empty-state';

interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    delivery_address: string;
    delivery_date: string;
    total_price: number;
    status: string;
    payment_status: string;
    payment_method: string;
    created_at: string;
    items: Array<{ id: number; product_name: string; quantity: number; price: number }>;
}

interface AdminOrdersIndexProps {
    orders: { data: Order[]; links: Record<string, unknown>[] };
    filters: { search?: string; status?: string };
    statuses: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Orders', href: '/admin/orders' },
];

const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminOrdersIndex({ orders, filters, statuses }: AdminOrdersIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const applyFilters = (e?: React.FormEvent) => {
        e?.preventDefault();
        router.get(route('admin.orders.index'), { search, status: statusFilter }, { preserveScroll: true });
    };

    const updateStatus = (order: Order, status: string) => {
        setUpdatingId(order.id);
        router.put(route('admin.orders.status', order.id), {
            status,
            payment_status: order.payment_status,
        }, {
            preserveScroll: true,
            onFinish: () => setUpdatingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin – Orders" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Orders</h1>
                    <form onSubmit={applyFilters} className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by name, email, ID..."
                                className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f53003]/30"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={e => { setStatusFilter(e.target.value); router.get(route('admin.orders.index'), { search, status: e.target.value }, { preserveScroll: true }); }}
                            className="px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-white focus:outline-none"
                        >
                            <option value="">All statuses</option>
                            {statuses.map(s => (
                                <option key={s} value={s} className="capitalize">{s}</option>
                            ))}
                        </select>
                        <Button type="submit" variant="outline" size="sm">Filter</Button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-50 dark:bg-[#111] border-b border-neutral-200 dark:border-neutral-800">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Order</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Customer</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Payment</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {orders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>
                                            <EmptyState
                                                title="No orders yet"
                                                description="Customer orders will appear here once they are placed from the store."
                                                icon={<ShoppingBag className="w-8 h-8" />}
                                            />
                                        </td>
                                    </tr>
                                ) : orders.data.map((order) => (
                                    <tr key={order.id} className={`hover:bg-neutral-50 dark:hover:bg-[#111] transition-colors ${updatingId === order.id ? 'opacity-50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-neutral-900 dark:text-white">#{order.id}</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-neutral-900 dark:text-white">{order.customer_name}</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{order.customer_email}</p>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">
                                            ₦{Number(order.total_price).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.payment_status] || ''}`}>
                                                {order.payment_status} · {order.payment_method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || ''}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {order.status !== 'completed' && order.status !== 'cancelled' && (
                                                    <>
                                                        {order.status === 'pending' && (
                                                            <Button size="sm" variant="outline" onClick={() => updateStatus(order, 'processing')} disabled={updatingId === order.id} className="text-blue-600 hover:text-blue-700 hover:border-blue-300">
                                                                Processing
                                                            </Button>
                                                        )}
                                                        {order.status === 'processing' && (
                                                            <Button size="sm" variant="outline" onClick={() => updateStatus(order, 'completed')} disabled={updatingId === order.id} className="text-green-600 hover:text-green-700 hover:border-green-300">
                                                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark as Delivered
                                                            </Button>
                                                        )}
                                                        <Button size="sm" variant="outline" onClick={() => updateStatus(order, 'cancelled')} disabled={updatingId === order.id} className="text-red-500 hover:text-red-600 hover:border-red-300">
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                                {(order.status === 'completed' || order.status === 'cancelled') && (
                                                    <span className="text-xs text-neutral-400 dark:text-neutral-500 italic">No actions</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
