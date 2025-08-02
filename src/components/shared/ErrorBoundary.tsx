'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-destructive/10 text-destructive">
                    <AlertCircle className="h-10 w-10 mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
