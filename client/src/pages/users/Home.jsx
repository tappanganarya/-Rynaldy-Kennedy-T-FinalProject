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
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Cari Kost Impianmu
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Temukan kost nyaman, aman, dan sesuai budget kamu.
                    </p>
                </div>

                {kosts.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        Tidak ada kost tersedia.
                    </p>
                ) : (
                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {kosts.map((kost) => (
                            <div
                                key={kost.id}
                                className="rounded-2xl shadow-lg bg-white hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
                            >
                                {/* Jika ada image tampilkan, kalau tidak pakai dummy */}
                                <img
                                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Kos"
                                    className="w-full h-48 object-cover"
                                />


                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {kost.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{kost.address}</p>
                                    <p className="mt-2 text-lg font-bold text-indigo-600">
                                        Rp {kost.price?.toLocaleString()} / bulan
                                    </p>
                                    <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                                        {`Kost ${kost.type}` || "Tidak ada"}
                                    </p>
                                    <div className="mt-4 text-sm">
                                        <p className="font-medium text-gray-800">
                                            Pemilik: {kost.User?.name || "Tidak diketahui"}
                                        </p>
                                        <p className="text-gray-500">
                                            Telp: {kost.owner_phone || "-"}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/kos/${kost.id}`}
                                        className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition text-center"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
