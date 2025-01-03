// components/Layout.tsx
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export function Layout() {
    return (
        <div>
            <Header />
            <main >
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}



export default Layout