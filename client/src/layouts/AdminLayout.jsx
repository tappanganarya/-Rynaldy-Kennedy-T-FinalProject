import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login"); // redirect kalau belum login
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="bg-gray-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
                <Link to="/" className="text-xl font-bold">Home Page</Link>
                <div className="flex gap-4 items-center">
                    {user && <span className="font-semibold">👤 {user.email}</span>}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white p-6">
                    <h2 className="text-lg font-bold mb-6">Menu</h2>
                    <nav className="flex flex-col gap-4">
                        <Link to="/admin/kos" className="hover:underline">🏠 Kos List</Link>
                        <Link to="/admin/users" className="hover:underline">👥 User List</Link>
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                    {/* <p>Selamat Datang Home Page Admin</p> */}
                </main>
            </div>
        </div>
    );
}
