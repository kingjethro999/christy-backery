import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Package, Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import EmptyState from '@/components/empty-state';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    is_available: boolean;
    image_path?: string | null;
    category: Category | null;
    created_at: string;
}

interface AdminProductsIndexProps {
    products: { data: Product[]; links: Record<string, unknown>[] };
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Products', href: '/admin/products' },
];

export default function AdminProductsIndex({ products, filters }: AdminProductsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const applySearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search }, { preserveScroll: true });
    };

    const deleteProduct = (product: Product) => {
        if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
        setDeletingId(product.id);
        router.delete(route('admin.products.destroy', product.id), {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin – Products" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Products</h1>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <form onSubmit={applySearch} className="flex gap-2 flex-1 sm:flex-none">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f53003]/30"
                                />
                            </div>
                            <Button type="submit" variant="outline" size="sm">Search</Button>
                        </form>
                        <Button asChild className="bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white whitespace-nowrap">
                            <Link href={route('admin.products.create')}>
                                <Plus className="w-4 h-4 mr-1.5" /> Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-50 dark:bg-[#111] border-b border-neutral-200 dark:border-neutral-800">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Product</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Category</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Price</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Stock</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {products.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>
                                            <EmptyState
                                                title="No products yet"
                                                description="Start adding products to your store so customers can browse and order."
                                                icon={<Package className="w-8 h-8" />}
                                                actionLabel="Add Product"
                                                actionUrl={route('admin.products.create')}
                                            />
                                        </td>
                                    </tr>
                                ) : products.data.map((product) => (
                                    <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-[#111] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-md bg-orange-50 dark:bg-orange-900/20 overflow-hidden flex-shrink-0">
                                                    {product.image_path ? (
                                                        <img src={product.image_path} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-orange-300">🍞</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-neutral-900 dark:text-white">{product.name}</p>
                                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{product.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{product.category?.name || '—'}</td>
                                        <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">₦{Number(product.price).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-medium ${product.stock <= 5 ? 'text-red-600 dark:text-red-400' : 'text-neutral-900 dark:text-white'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.is_available ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                    <ToggleRight className="w-3 h-3" /> Available
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                                                    <ToggleLeft className="w-3 h-3" /> Unavailable
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('admin.products.edit', product.id)}>
                                                        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => deleteProduct(product)}
                                                    disabled={deletingId === product.id}
                                                    className="text-red-500 hover:text-red-700 hover:border-red-300 dark:hover:border-red-700"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                                                </Button>
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
