import { useEffect, useState } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';

export function OfflineAlert() {
    const [isOnline, setIsOnline] = useState(true);
    const [showReconnected, setShowReconnected] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowReconnected(true);
            setTimeout(() => setShowReconnected(false), 3000);
        };
        const handleOffline = () => setIsOnline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOnline) {
        return (
            <div className="fixed bottom-20 right-4 bg-destructive text-destructive-foreground p-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right">
                <WifiOff className="h-5 w-5" />
                <span>You're offline</span>
            </div>
        );
    }

    if (showReconnected) {
        return (
            <div className="fixed bottom-20 right-4 bg-green-600 text-white p-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right">
                <Wifi className="h-5 w-5" />
                <span>Back online</span>
            </div>
        );
    }

    return null;
}
