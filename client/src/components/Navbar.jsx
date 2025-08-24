import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
            {/* Kiri: Logo */}
            <div className="text-xl font-bold">
                <Link to="/">🏠 MyKos</Link>
            </div>

            {/* Tengah: Search */}
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-white text-black rounded-lg overflow-hidden">
                    <Link
                        to="/kos/search/:id"
                        className="bg-blue-600 text-white px-4 py-1 font-semibold hover:bg-blue-700 transition"
                    >
                        Search
                    </Link>
                </div>
            </div>

            {/* Kanan: Role + Logout/Login */}
            <div className="flex items-center gap-4">
                {user?.role === "admin" && (
                    <Link
                        to="/admin"
                        className="font-bold hover:underline"
                    >
                        Admin
                    </Link>
                )}

                {user?.role === "user" && (
                    <Link
                        to="/"
                        className="font-bold hover:underline"
                    >
                        User
                    </Link>
                )}

                {user ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
