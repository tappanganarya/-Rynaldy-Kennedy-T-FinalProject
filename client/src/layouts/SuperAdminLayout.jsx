import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, UserPlus, Shield, LogOut, Home } from "lucide-react";

export default function SuperAdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role !== "superadmin") {
                navigate("/"); // kalau bukan SuperAdmin, tendang ke home
            } else {
                setUser(parsedUser);
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    const menuItems = [
        { path: "/superadmin/users", label: "User ", icon: <Users size={18} /> },
        // { path: "/superadmin/users/create", label: "Create User", icon: <UserPlus size={18} /> },
        { path: "/superadmin/fasilitas", label: "Fasilitas", icon: <Shield size={18} /> },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="bg-gradient-to-r from-purple-700 to-pink-600 text-white px-6 py-3 flex justify-between items-center shadow-lg">
                <Link
                    to="/"
                    className="text-xl font-bold tracking-wide hover:text-yellow-300 transition"
                >
                    🏠 Home Page
                </Link>
                <div className="flex gap-4 items-center">
                    {user && (
                        <span className="font-medium bg-white/10 px-3 py-1 rounded-lg shadow">
                            👑 {user.email}
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-950 text-gray-200 p-6 shadow-xl">
                    <h2 className="text-lg font-bold mb-6 text-gray-100 uppercase tracking-wide">
                        Super Admin
                    </h2>
                    <nav className="flex flex-col gap-3">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${location.pathname === item.path
                                    ? "bg-purple-600 text-white font-semibold shadow-md scale-105"
                                    : "hover:bg-gray-800 hover:translate-x-1"
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
