import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Heart, Star, Users, Award } from 'lucide-react';

export default function About() {
    const stats = [
        { value: '10+', label: 'Years of Baking' },
        { value: '5,000+', label: 'Happy Customers' },
        { value: '50+', label: 'Signature Recipes' },
        { value: '100%', label: 'Fresh Daily' },
    ];

    const values = [
        {
            icon: Heart,
            title: 'Made with Love',
            description: 'Every item is baked by hand with genuine care, just like home cooking — because we believe food tastes better when it\'s made with love.',
        },
        {
            icon: Star,
            title: 'Quality Ingredients',
            description: 'We source the finest flour, butter, and fresh produce to ensure every bite is rich, flavourful, and worth savouring.',
        },
        {
            icon: Users,
            title: 'Community First',
            description: 'Christy Bakery is more than a shop — it\'s a gathering place. We\'re proud to serve our community in Abuja with warmth and hospitality.',
        },
        {
            icon: Award,
            title: 'Baking Excellence',
            description: 'Our recipes have been perfected over years of baking, blending traditional techniques with a contemporary touch that keeps customers coming back.',
        },
    ];

    return (
        <GuestLayout>
            <Head title="About Us - Christy Bakery" />

            {/* Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-orange-50 dark:bg-orange-950/20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-5" />
                <div className="container relative mx-auto px-4 sm:px-6 text-center max-w-4xl">
                    <span className="mb-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        Our Story
                    </span>
                    <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-white">
                        Baked With{' '}
                        <span className="text-[#f53003] dark:text-[#FF4433]">Purpose</span>
                    </h1>
                    <p className="text-lg text-gray-600 md:text-xl dark:text-gray-300 max-w-2xl mx-auto">
                        Christy Bakery Services was founded with a simple mission — to bring the warmth of freshly baked goods into every home and heart in Abuja.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-4xl font-extrabold text-[#f53003] dark:text-[#FF4433]">{stat.value}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 bg-[#fff8f5] dark:bg-[#1a1311]">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                A Passion Turned Into a{' '}
                                <span className="text-[#f53003] dark:text-[#FF4433]">Profession</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>
                                    Christy Bakery began as a passion project — weekend baking sessions that quickly became the talk of the neighbourhood. What started in a home kitchen grew into a beloved establishment trusted by families across Abuja.
                                </p>
                                <p>
                                    Today, we bake everything from artisan breads and custom celebration cakes to everyday pastries and sweet treats. Each product reflects our commitment to quality, consistency, and the joy of good food.
                                </p>
                                <p>
                                    Located at No 13 Muneerat Plaza, Azatha Abuja, our doors are always open to anyone who appreciates the art of great baking.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=780&auto=format&fit=crop"
                                    alt="Baker decorating a cake"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-[#1a1311]">
                                <img
                                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"
                                    alt="Fresh bread"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-white dark:bg-[#0a0a0a]">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Our values are baked into everything we do, from how we source ingredients to how we serve our customers.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((val) => {
                            const Icon = val.icon;
                            return (
                                <div key={val.title} className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111] hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-md transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-[#f53003] dark:text-[#FF4433]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{val.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{val.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#f53003] dark:bg-[#c42a02]">
                <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Ready to Taste the Difference?
                    </h2>
                    <p className="text-orange-100 mb-8 text-lg">
                        Browse our full menu and place your order today. Delivery available across Abuja.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={route('products.index')}
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 font-semibold text-[#f53003] shadow-lg transition-transform hover:-translate-y-0.5"
                        >
                            Order Now
                        </Link>
                        <Link
                            href={route('contact')}
                            className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-white px-8 font-semibold text-white transition-all hover:bg-white/10"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
