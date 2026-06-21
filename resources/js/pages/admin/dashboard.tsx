import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    DollarSign, ShoppingBag, Package, MessageSquare,
    TrendingUp, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Stats {
    totalSales: number;
    pendingOrders: number;
    totalProducts: number;
    pendingInquiries: number;
}

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
}

interface RecentOrder {
    id: number;
    customer_name: string;
    customer_email: string;
    total_price: number;
    status: string;
    payment_status: string;
    created_at: string;
    items: OrderItem[];
}

interface RecentInquiry {
    id: number;
    name: string;
    email: string;
    type: string;
    status: string;
    created_at: string;
}

interface AdminDashboardProps {
    stats: Stats;
    recentOrders: { data: RecentOrder[] };
    recentInquiries: { data: RecentInquiry[] };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
];

const statusColors: Record<string, string> = {
    pending: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
    processing: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400',
    resolved: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
};

export default function AdminDashboard({ stats, recentOrders, recentInquiries }: AdminDashboardProps) {
    const statCards = [
        {
            title: 'Total Sales',
            value: `$${stats.totalSales.toFixed(2)}`,
            icon: DollarSign,
            color: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-50 dark:bg-green-900/20',
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: ShoppingBag,
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            href: route('admin.orders.index'),
        },
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: Package,
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            href: route('admin.products.index'),
        },
        {
            title: 'Pending Inquiries',
            value: stats.pendingInquiries,
            icon: MessageSquare,
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
            href: route('admin.inquiries.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-6">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        const content = (
                            <div className="bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-6 h-6 ${card.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{card.title}</p>
                                    <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-0.5">{card.value}</p>
                                </div>
                            </div>
                        );
                        return card.href ? (
                            <Link key={card.title} href={card.href}>{content}</Link>
                        ) : (
                            <div key={card.title}>{content}</div>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Orders */}
                    <div className="bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                            <h2 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-[#f53003]" /> Recent Orders
                            </h2>
                            <Link href={route('admin.orders.index')} className="text-sm text-[#f53003] hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {recentOrders.data.length === 0 ? (
                                <p className="text-center py-8 text-neutral-500 dark:text-neutral-400 text-sm">No orders yet.</p>
                            ) : recentOrders.data.map((order) => (
                                <div key={order.id} className="flex items-center justify-between px-6 py-4">
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-sm text-neutral-900 dark:text-white truncate">{order.customer_name}</p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">#{order.id} · {new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || statusColors.pending}`}>
                                            {order.status}
                                        </span>
                                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                                            ${Number(order.total_price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Inquiries */}
                    <div className="bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                            <h2 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-[#f53003]" /> Recent Inquiries
                            </h2>
                            <Link href={route('admin.inquiries.index')} className="text-sm text-[#f53003] hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {recentInquiries.data.length === 0 ? (
                                <p className="text-center py-8 text-neutral-500 dark:text-neutral-400 text-sm">No inquiries yet.</p>
                            ) : recentInquiries.data.map((inquiry) => (
                                <div key={inquiry.id} className="flex items-center justify-between px-6 py-4">
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-sm text-neutral-900 dark:text-white truncate">{inquiry.name}</p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 capitalize">{inquiry.type.replace('_', ' ')} · {new Date(inquiry.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[inquiry.status] || statusColors.pending}`}>
                                        {inquiry.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'Manage Products', href: route('admin.products.index'), icon: Package },
                        { label: 'View Orders', href: route('admin.orders.index'), icon: ShoppingBag },
                        { label: 'Inquiries', href: route('admin.inquiries.index'), icon: MessageSquare },
                        { label: 'Add Product', href: route('admin.products.create'), icon: TrendingUp },
                    ].map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-[#f53003] hover:text-[#f53003] transition-colors group"
                            >
                                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-center">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
