import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Navbar sekarang berada dalam router context */}
            <main className="flex-1 p-4">
                <Outlet /> {/* Child routes akan dirender di sini */}
            </main>
        </div>
    );
};

export default MainLayout;
