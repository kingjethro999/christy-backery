import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastState {
    message: string;
    type: 'success' | 'error';
    id: number;
}

export default function Toast() {
    const { flash } = usePage<SharedData>().props;
    const [toasts, setToasts] = useState<ToastState[]>([]);
    const counterRef = useRef(0);

    useEffect(() => {
        const message = flash?.success || flash?.error;
        const type: 'success' | 'error' = flash?.success ? 'success' : 'error';

        if (!message) return;

        const id = ++counterRef.current;
        setToasts(prev => [...prev, { message, type, id }]);

        const timer = setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash?.success, flash?.error]);

    const dismiss = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border max-w-sm w-full
                        animate-in slide-in-from-right-5 fade-in duration-300
                        ${toast.type === 'success'
                            ? 'bg-white dark:bg-[#1a1a1a] border-green-200 dark:border-green-900/60'
                            : 'bg-white dark:bg-[#1a1a1a] border-red-200 dark:border-red-900/60'
                        }`}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">{toast.type === 'success' ? 'Success' : 'Error'}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => dismiss(toast.id)}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}

