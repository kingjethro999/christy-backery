import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    is_available: boolean;
    image_path?: string | null;
    category_id: number | null;
    slug: string;
}

interface ProductFormProps {
    product: Product | null;
    categories: { data: Category[] };
}

export default function AdminProductForm({ product, categories }: ProductFormProps) {
    const isEditing = product !== null;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Products', href: '/admin/products' },
        { title: isEditing ? 'Edit Product' : 'Add Product', href: '#' },
    ];

    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price?.toString() || '',
        stock: product?.stock?.toString() || '0',
        is_available: product?.is_available ?? true,
        image_path: product?.image_path || '',
        category_id: product?.category_id?.toString() || '',
        slug: product?.slug || '',
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setData(data => ({
            ...data,
            name,
            // Only auto-generate slug if we're creating, or if the user wants it to sync
            slug: isEditing ? data.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.products.update', product!.id));
        } else {
            post(route('admin.products.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Product' : 'Add Product'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 max-w-2xl">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('admin.products.index')}>
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h1>
                </div>

                <form onSubmit={submit} className="bg-white dark:bg-[#161615] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 md:p-8 space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Product Name *</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={handleNameChange}
                            className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.name ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'}`}
                            required
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Slug *</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={e => setData('slug', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.slug ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'}`}
                            required
                        />
                        {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Description *</label>
                        <textarea
                            rows={4}
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.description ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'}`}
                            required
                        ></textarea>
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Price (₦) *</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.price}
                                onChange={e => setData('price', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.price ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'}`}
                                required
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Stock *</label>
                            <input
                                type="number"
                                min="0"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.stock ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'}`}
                                required
                            />
                            {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Category</label>
                        <select
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003]"
                        >
                            <option value="">— No Category —</option>
                            {categories.data.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Image URL</label>
                        <input
                            type="text"
                            value={data.image_path}
                            onChange={e => setData('image_path', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003]"
                        />
                        {errors.image_path && <p className="mt-1 text-sm text-red-500">{errors.image_path}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="is_available"
                            type="checkbox"
                            checked={data.is_available}
                            onChange={e => setData('is_available', e.target.checked)}
                            className="w-4 h-4 text-[#f53003] rounded border-neutral-300 focus:ring-[#f53003]"
                        />
                        <label htmlFor="is_available" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Available for ordering
                        </label>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white px-8"
                        >
                            {processing ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('admin.products.index')}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
