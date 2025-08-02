import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { OfflineAlert } from '@/components/shared/OfflineAlert';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';
import { Toaster } from '@/components/ui/toaster';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';
import '@/app/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <AuthProvider>
                    <ChatProvider>
                        <Component {...pageProps} />
                        <FloatingChatButton />
                        <OfflineAlert />
                        <Toaster />
                    </ChatProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
