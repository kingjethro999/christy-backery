import React from 'react';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    retryText?: string;
}

export function ErrorState({ 
    title = 'An Error Occurred', 
    message, 
    onRetry, 
    retryText = 'Try Again' 
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6 border border-amber-200/50 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl max-w-md mx-auto text-center shadow-sm backdrop-blur-sm">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-600 dark:text-amber-400 mb-4 animate-pulse">
                <AlertCircle className="h-6 w-6" />
            </div>
            
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {title}
            </h3>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                {message}
            </p>
            
            <div className="flex gap-3 w-full justify-center">
                {onRetry && (
                    <Button 
                        onClick={onRetry}
                        variant="default"
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        {retryText}
                    </Button>
                )}
                
                <Button 
                    variant="outline" 
                    asChild
                >
                    <Link href="/" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
