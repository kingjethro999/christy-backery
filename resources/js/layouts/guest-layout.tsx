import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { CartDrawer } from '@/components/cart-drawer';
import Toast from '@/components/toast';

interface GuestLayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    const { auth, cart_count } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const { url } = usePage();
    const isMenuActive = url.startsWith('/products');

    const navLinkClass = (active: boolean) =>
        `transition-colors ${
            active
                ? 'text-[#f53003] dark:text-[#FF4433] font-semibold'
                : 'text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433]'
        }`;

    return (
        <div className="min-h-screen flex flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC]">
            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-[#e3e3e0] bg-[#FDFDFC] dark:border-[#3E3E3A] dark:bg-[#0a0a0a]">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <AppLogoIcon className="h-8 w-8 shrink-0" />
                            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Christy Bakery
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/" className={navLinkClass(url === '/')}>Home</Link>
                        <Link href={route('products.index')} className={navLinkClass(isMenuActive)}>Menu</Link>
                        <Link href="/about" className={navLinkClass(url === '/about')}>About</Link>
                        <Link href="/contact" className={navLinkClass(url === '/contact')}>Contact</Link>
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full dark:hover:bg-[#161615] transition-colors group">
                            <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white" />
                            {cart_count > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#f53003] text-[10px] font-bold text-white">
                                    {cart_count}
                                </span>
                            )}
                        </button>

                        {/* Auth / Dashboard */}
                        <div className="hidden sm:flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#f53003] dark:hover:text-[#FF4433] hover:underline underline-offset-4"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button 
                            className="md:hidden p-2 -mr-2 text-gray-700 dark:text-gray-300"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[#e3e3e0] bg-[#FDFDFC] px-4 py-4 dark:border-[#3E3E3A] dark:bg-[#0a0a0a] flex flex-col space-y-4">
                        <Link href="/" className={navLinkClass(url === '/')} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link href={route('products.index')} className={navLinkClass(isMenuActive)} onClick={() => setMobileMenuOpen(false)}>Menu</Link>
                        <Link href="/about" className={navLinkClass(url === '/about')} onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link href="/contact" className={navLinkClass(url === '/contact')} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        
                        <div className="pt-4 border-t border-[#e3e3e0] dark:border-[#3E3E3A] flex flex-col space-y-4 sm:hidden">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                                    <Link href={route('register')} className="text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Cart Drawer */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

            <Toast />

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-[#e3e3e0] bg-[#FDFDFC] py-8 dark:border-[#3E3E3A] dark:bg-[#0a0a0a]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <AppLogoIcon className="h-6 w-6 opacity-70" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} Christy Bakery Services. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <Link href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black dark:hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
