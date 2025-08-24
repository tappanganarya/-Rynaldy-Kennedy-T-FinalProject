// Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [kosts, setKosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // panggil backend di localhost:3000
        axios
            .get("http://localhost:3000/api/kos") // ganti endpoint sesuai backendmu
            .then((res) => {
                setKosts(res.data); // asumsi data array
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Daftar Kost</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kosts.length === 0 && <p>Tidak ada kost tersedia.</p>}
                {kosts.map((kost) => (
                    <div
                        key={kost.id}
                        className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">{kost.name}</h2>
                        <p className="mb-1">Alamat: {kost.address}</p>
                        <p className="mb-1">Harga: Rp {kost.price}</p>
                        <p className="mb-1">Tipe: {kost.type}</p>
                        {/* <p className="mb-1">Owner: {kost.User?.name}</p> */}

                        {kost.Facilities && kost.Facilities.length > 0 && (
                            <div className="mt-2">
                                <span className="font-medium">Fasilitas: </span>
                                {kost.Facilities.map((f) => f.name).join(", ")}
                            </div>
                        )}

                        <Link
                            to={`/kos/${kost.id}`}
                            className="inline-block mt-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                            Detail
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
