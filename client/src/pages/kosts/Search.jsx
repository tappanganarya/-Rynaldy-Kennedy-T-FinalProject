import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"; // pake icon dari lucide-react

export default function Home() {
    const [kosList, setKosList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchKos();
    }, []);

    const fetchKos = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/kos/public");
            setKosList(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredKos = kosList.filter(
        (kos) =>
            kos.name.toLowerCase().includes(search.toLowerCase()) ||
            kos.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 mt-10 px-6 py-14">
            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari nama kos / lokasi / alamat..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                </div>
            </div>

            {/* List kos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredKos.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">
                        Tidak ada kos yang cocok dengan pencarian.
                    </p>
                ) : (
                    filteredKos.map((kos) => (
                        <div
                            key={kos.id}
                            className="border rounded-xl shadow-sm hover:shadow-lg transition p-5 bg-white"
                        >
                            <h2 className="font-bold text-lg mb-2">{kos.name}</h2>
                            <p className="text-gray-600 mb-1">{kos.address}</p>
                            <p className="text-blue-600 font-semibold mb-3">Rp {kos.price}</p>
                            <Link
                                to={`/kos/${kos.id}`}
                                className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Detail
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
