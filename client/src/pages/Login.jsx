import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/users/login", {
                email,
                password,
            });

            const userData = res.data;

            if (!userData.role) {
                alert(userData.message || "Login gagal! Periksa email/password.");
                return;
            }

            localStorage.setItem("user", JSON.stringify(userData));

            if (userData.role === "admin") {
                navigate("/admin");
            } else if (userData.role === "superadmin") {
                navigate("/superAdmin")
            } else {
                navigate("/superAdmin");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Login gagal!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-white-100">
            <div className="bg-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-md">
                {/* Logo / Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Silakan login untuk melanjutkan
                </p>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Register link */}
                <p className="text-center text-gray-600 mt-6 text-sm">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Daftar sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
}
