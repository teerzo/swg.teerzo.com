
import Link from "next/link";
import Nav from "./nav";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            {/* <nav>
                Dashboard layout
                <br />

                <Link href="/dashboard">Dashboard</Link> - 
                <Link href="/dashboard/pvp">PVP</Link>
            </nav> */}

            {children}
        </section>
    )
}