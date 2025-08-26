import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function Home() {
    const [kosts, setKosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/kos/public")
            .then((res) => {
                setKosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-6xl mx-auto  py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    🏠 Daftar Kost
                </h1>

                {kosts.length === 0 ? (
                    <p className="text-center text-gray-500">Tidak ada kost tersedia.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {kosts.map((kost) => (
                            <div
                                key={kost.id}
                                className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 flex flex-col"
                            >
                                {/* Gambar dummy / nanti bisa pakai kost.image */}
                                <div className="h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400">
                                    <span className="text-sm">No Image</span>
                                </div>

                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {kost.name}
                                </h2>
                                <p className="text-gray-600 text-sm mb-1">
                                    📍 {kost.address}
                                </p>
                                <p className="text-blue-600 font-bold text-lg mb-2">
                                    Rp {kost.price.toLocaleString()}
                                </p>

                                <span
                                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${kost.type === "Putra"
                                        ? "bg-blue-100 text-blue-600"
                                        : kost.type === "Putri"
                                            ? "bg-pink-100 text-pink-600"
                                            : "bg-green-100 text-green-600"
                                        }`}
                                >
                                    {kost.type}
                                </span>

                                <Link
                                    to={`/kos/${kost.id}`}
                                    className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-xl text-center hover:bg-blue-700 transition"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
