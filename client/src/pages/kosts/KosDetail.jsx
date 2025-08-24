import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function KosDetail() {
    const { id } = useParams(); // ambil ID dari URL
    const [kos, setKos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchKos = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/kos/${id}`);
                setKos(response.data);
            } catch (err) {
                console.error(err);
                setError("Gagal mengambil data kos");
            } finally {
                setLoading(false);
            }
        };

        fetchKos();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!kos) return <p>Kos tidak ditemukan</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{kos.name}</h1>

            <p><strong>Alamat:</strong> {kos.address}</p>
            <p><strong>Harga:</strong> Rp {kos.price}</p>
            <p><strong>Type:</strong> {kos.type}</p>

            <p><strong>Owner:</strong> {kos.User?.name || "Tidak diketahui"}</p>


            <p><strong>Dibuat pada:</strong> {new Date(kos.createdAt).toLocaleString()}</p>
            <p><strong>Update terakhir:</strong> {new Date(kos.updatedAt).toLocaleString()}</p>

            {/* Facilities */}
            {kos.Facilities && kos.Facilities.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Fasilitas:</h2>
                    <ul className="list-disc list-inside">
                        {kos.Facilities.map((f) => (
                            <li key={f.id}>{f.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
}

export default KosDetail;
