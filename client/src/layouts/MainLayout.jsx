import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Navbar sekarang berada dalam router context */}
            <main className="flex-1">
                <Outlet /> {/* Child routes akan dirender di sini */}
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
