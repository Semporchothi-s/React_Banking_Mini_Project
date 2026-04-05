import { useState, useEffect } from 'react';

// Common event emitter to dispatch API Errors to our Custom Toast
export const emitApiError = (message: string) => {
    window.dispatchEvent(new CustomEvent('api-error', { detail: message }));
};

const GlobalToast = () => {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        // Listen for standard API errors
        const handler = (e: Event) => {
            const customEvent = e as CustomEvent;
            setMessage(customEvent.detail);
            
            // Auto hide the toast after 4 seconds
            setTimeout(() => setMessage(null), 4000);
        };
        window.addEventListener('api-error', handler);

        return () => window.removeEventListener('api-error', handler);
    }, []);

    if (!message) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontWeight: 500,
            animation: 'fadeIn 0.3s ease-in-out'
        }}>
            ⚠️ {message}
        </div>
    );
};

export default GlobalToast;
