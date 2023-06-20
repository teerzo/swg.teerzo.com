
import Link from "next/link";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
    
            {children}
        </section>
    )
}