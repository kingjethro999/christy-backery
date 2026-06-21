import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { MessageSquare, Search, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import EmptyState from '@/components/empty-state';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone?: string;
    type: string;
    status: string;
    message: string;
    reservation_date?: string;
    reservation_time?: string;
    created_at: string;
}

interface AdminInquiriesIndexProps {
    inquiries: { data: Inquiry[] };
    filters: { type?: string; status?: string; search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Inquiries', href: '/admin/inquiries' },
];

const typeLabels: Record<string, string> = {
    reservation: '📅 Reservation',
    custom_cake: '🎂 Custom Cake',
    feedback: '💬 Feedback',
    other: '📋 General',
};

const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export default function AdminInquiriesIndex({ inquiries, filters }: AdminInquiriesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [resolvingId, setResolvingId] = useState<number | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const applyFilters = (overrides: Record<string, string> = {}) => {
        router.get(route('admin.inquiries.index'), {
            search,
            type: typeFilter,
            status: statusFilter,
            ...overrides,
        }, { preserveScroll: true });
    };

    const resolve = (inquiry: Inquiry) => {
        setResolvingId(inquiry.id);
        router.put(route('admin.inquiries.resolve', inquiry.id), {}, {
            preserveScroll: true,
            onFinish: () => setResolvingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin – Inquiries" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Inquiries & Reservations</h1>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-56">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && applyFilters()}
                                placeholder="Search name, email..."
                                className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-white focus:outline-none"
                            />
                        </div>
                        <select
                            value={typeFilter}
                            onChange={e => { setTypeFilter(e.target.value); applyFilters({ type: e.target.value }); }}
                            className="px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-white"
                        >
                            <option value="">All types</option>
                            <option value="reservation">Reservation</option>
                            <option value="custom_cake">Custom Cake</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">General</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={e => { setStatusFilter(e.target.value); applyFilters({ status: e.target.value }); }}
                            className="px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-white"
                        >
                            <option value="">All statuses</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {inquiries.data.length === 0 ? (
                        <EmptyState
                            title="No inquiries yet"
                            description="Customer inquiries and reservation requests will appear here once they are submitted from the contact page."
                            icon={<MessageSquare className="w-8 h-8" />}
                        />
                    ) : inquiries.data.map((inquiry) => (
                        <div
                            key={inquiry.id}
                            className={`bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-opacity ${resolvingId === inquiry.id ? 'opacity-50' : ''}`}
                        >
                            <div
                                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-[#111] transition-colors"
                                onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div>
                                        <p className="font-semibold text-neutral-900 dark:text-white">{inquiry.name}</p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{inquiry.email} · {new Date(inquiry.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{typeLabels[inquiry.type] || inquiry.type}</span>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[inquiry.status] || statusColors.pending}`}>
                                        {inquiry.status}
                                    </span>
                                    {inquiry.status === 'pending' && (
                                        <Button
                                            size="sm"
                                            onClick={e => { e.stopPropagation(); resolve(inquiry); }}
                                            disabled={resolvingId === inquiry.id}
                                            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
                                        >
                                            <CheckCheck className="w-3.5 h-3.5 mr-1" /> Resolve
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {expandedId === inquiry.id && (
                                <div className="px-6 pb-5 pt-1 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111]">
                                    {inquiry.reservation_date && (
                                        <div className="mb-3 flex gap-4 text-sm">
                                            <span className="text-neutral-500 dark:text-neutral-400">Reservation Date:</span>
                                            <span className="font-medium text-neutral-900 dark:text-white">
                                                {new Date(inquiry.reservation_date).toLocaleDateString()} {inquiry.reservation_time && `at ${inquiry.reservation_time}`}
                                            </span>
                                        </div>
                                    )}
                                    {inquiry.phone && (
                                        <div className="mb-3 flex gap-4 text-sm">
                                            <span className="text-neutral-500 dark:text-neutral-400">Phone:</span>
                                            <span className="font-medium text-neutral-900 dark:text-white">{inquiry.phone}</span>
                                        </div>
                                    )}
                                    <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
