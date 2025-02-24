

import SessionProvider from '@/components/SessionProvider';

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        // <SessionContext.Provider value={{ session: session, userRole: userRole }}>
        <SessionProvider >
            {children}
        </SessionProvider>
    );
}