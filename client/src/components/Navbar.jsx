import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    Disclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    const navigation = [
        { name: "Home", to: "/" },
        { name: "Search", to: "/kos/search/:id" },
        ...(user?.role === "admin"
            ? [{ name: "Home Admin", to: "/admin" }]
            : []),
        ...(user?.role === "superadmin"
            ? [{ name: "Super Admin", to: "/superAdmin" }]
            : []),
    ];

    return (
        <Disclosure
            as="nav"
            className={classNames(
                scrolled
                    ? "bg-blue-700/90 shadow-lg backdrop-blur"
                    : "bg-transparent",
                "fixed w-full top-0 z-50 transition-all duration-300"
            )}
        >
            {() => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            {/* Left: Logo */}
                            <div className="flex items-center">
                                <Link
                                    to="/"
                                    className={classNames(
                                        scrolled ? "text-white" : "text-black",
                                        "text-xl font-bold"
                                    )}
                                >
                                    🏠 MyKos
                                </Link>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden sm:flex sm:items-center sm:space-x-4">
                                {navigation.map((item) => {
                                    const isActive = location.pathname === item.to;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.to}
                                            className={classNames(
                                                isActive
                                                    ? scrolled
                                                        ? "bg-blue-800 text-white"
                                                        : "bg-gray-200 text-black"
                                                    : scrolled
                                                        ? "text-white hover:bg-blue-500 hover:text-white"
                                                        : "text-black hover:bg-gray-100 hover:text-black",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Right: User / Login */}
                            <div className="flex items-center">
                                {user ? (
                                    <Menu as="div" className="relative ml-3">
                                        <MenuButton
                                            className={classNames(
                                                scrolled ? "text-white" : "text-black",
                                                "font-semibold"
                                            )}
                                        >
                                            {user.name}
                                        </MenuButton>
                                        <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                            <MenuItem>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleLogout}
                                                        className={classNames(
                                                            active ? "bg-gray-100" : "",
                                                            "w-full text-left px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Logout
                                                    </button>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            to="/login"
                                            className={classNames(
                                                scrolled
                                                    ? "bg-white text-blue-600"
                                                    : "bg-blue-600 text-white",
                                                "px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                                            )}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className={classNames(
                                                scrolled
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-white text-blue-600",
                                                "px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                                            )}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
