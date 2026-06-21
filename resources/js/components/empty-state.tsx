import { FolderOpen } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: ReactNode;
    actionLabel?: string;
    actionUrl?: string;
}

export default function EmptyState({ 
    title, 
    description, 
    icon, 
    actionLabel, 
    actionUrl 
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111] my-8">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20 text-[#f53003] dark:text-[#FF4433] mb-4">
                {icon || <FolderOpen className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">{description}</p>
            
            {actionLabel && actionUrl && (
                <Button asChild className="bg-[#f53003] hover:bg-[#e02b02] dark:bg-[#FF4433] dark:hover:bg-[#ff3322] text-white">
                    <Link href={actionUrl}>
                        {actionLabel}
                    </Link>
                </Button>
            )}
        </div>
    );
}
