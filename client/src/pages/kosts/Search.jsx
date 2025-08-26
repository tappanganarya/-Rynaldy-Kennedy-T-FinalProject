import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

    // filter kos berdasarkan nama atau address
    const filteredKos = kosList.filter(
        (kos) =>
            kos.name.toLowerCase().includes(search.toLowerCase()) ||
            kos.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Daftar Kos</h1>

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari nama kos/lokasi/area/alamat"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* List kos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredKos.map((kos) => (
                    <div key={kos.id} className="border p-4 rounded shadow">
                        <h2 className="font-bold">{kos.name}</h2>
                        <p>{kos.address}</p>
                        <p>Harga: {kos.price}</p>
                        <Link
                            to={`/kos/${kos.id}`}
                            className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Detail
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
