import { Head, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { useState, useEffect } from 'react';

export default function Contact() {
    const { auth, flash } = usePage<SharedData>().props;
    const [successMsg, setSuccessMsg] = useState(flash.success);

    useEffect(() => {
        setSuccessMsg(flash.success);
    }, [flash.success]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: '',
        type: 'other', // default type
        reservation_date: '',
        reservation_time: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('inquiries.store'), {
            onSuccess: () => {
                reset('message', 'reservation_date', 'reservation_time', 'type');
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Contact & Reservations - Christy Bakery" />
            
            {/* Header */}
            <div className="bg-[#fff8f5] dark:bg-[#1a1311] py-16 border-b border-[#fceee8] dark:border-[#2d211d]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Let's <span className="text-[#f53003]">Connect</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Have a question, want to order a custom cake, or need to book a table? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* Contact Information */}
                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                        
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-[#f53003] dark:text-[#FF4433]" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Location</h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                        No 13 Muneerat Plaza<br />
                                        Azatha, Abuja
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-[#f53003] dark:text-[#FF4433]" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Call Us</h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                        +234 913 029 6719
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-[#f53003] dark:text-[#FF4433]" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Us</h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                        iamchristy@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-[#f53003] dark:text-[#FF4433]" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Opening Hours</h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                        Mon-Fri: 7:00 AM - 7:00 PM<br />
                                        Sat: 8:00 AM - 6:00 PM<br />
                                        Sun: 8:00 AM - 4:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white dark:bg-[#161615] rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800">
                            
                            {successMsg && (
                                <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 flex items-start">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">{successMsg}</p>
                                    </div>
                                </div>
                            )}

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            required
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                            required
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject / Inquiry Type *</label>
                                        <select
                                            value={data.type}
                                            onChange={e => setData('type', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003]"
                                            required
                                        >
                                            <option value="other">General Question</option>
                                            <option value="reservation">Table Reservation</option>
                                            <option value="custom_cake">Custom Cake Order</option>
                                            <option value="feedback">Feedback</option>
                                        </select>
                                        {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                                    </div>
                                </div>

                                {/* Reservation Specific Fields */}
                                {data.type === 'reservation' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-lg">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-orange-500" /> Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={data.reservation_date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={e => setData('reservation_date', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.reservation_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                                required
                                            />
                                            {errors.reservation_date && <p className="mt-1 text-sm text-red-500">{errors.reservation_date}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-orange-500" /> Time *
                                            </label>
                                            <input
                                                type="time"
                                                value={data.reservation_time}
                                                onChange={e => setData('reservation_time', e.target.value)}
                                                className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.reservation_time ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                                required
                                            />
                                            {errors.reservation_time && <p className="mt-1 text-sm text-red-500">{errors.reservation_time}</p>}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                                    <textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder={data.type === 'reservation' ? "Number of people, special requirements..." : "How can we help you?"}
                                        className={`w-full px-4 py-2 border rounded-md dark:bg-[#0a0a0a] dark:text-white focus:ring-[#f53003] focus:border-[#f53003] ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                        required
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-8 bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white h-12 text-base font-bold shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                                    >
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}
