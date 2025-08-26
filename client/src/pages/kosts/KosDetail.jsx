import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Home, User, Calendar, Wrench, ArrowLeft } from "lucide-react"; // icon dari lucide-react

function KosDetail() {
    const { id } = useParams();
    const [kos, setKos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!kos) return <p className="text-center">Kos tidak ditemukan</p>;

    return (
        <div className="min-h-screen bg-white p-6 flex mt-12 justify-center items-start">
            <div className="bg-gray-100 rounded-2xl shadow-xl p-6 max-w-2xl w-full mt-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{kos.name}</h1>
                    <Link
                        to="#" // supaya tetap pakai Link
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1) || navigate("/");
                            // balik ke halaman sebelumnya
                        }}
                        className="flex items-center text-blue-600 hover:underline"
                    >
                        <ArrowLeft size={18} className="mr-1" /> Kembali
                    </Link>
                </div>

                {/* Info utama */}
                <div className="grid gap-3">
                    <p className="flex items-center text-gray-600">
                        <Home className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{kos.address}</span>
                    </p>
                    <p className="text-lg font-semibold text-green-600">
                        💰 Rp {kos.price.toLocaleString()}
                    </p>
                    <p className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {kos.type}
                    </p>
                    <p className="flex items-center text-gray-600">
                        <User className="w-5 h-5 mr-2 text-gray-500" />
                        <span>Owner: {kos.User?.name || "Tidak diketahui"}</span>
                    </p>
                    <p className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                        <span>Dibuat: {new Date(kos.createdAt).toLocaleDateString()}</span>
                    </p>
                    <p className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                        <span>Update: {new Date(kos.updatedAt).toLocaleDateString()}</span>
                    </p>
                </div>

                {/* Fasilitas */}
                {kos.Facilities && kos.Facilities.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <Wrench className="w-5 h-5 mr-2 text-gray-700" /> Fasilitas
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {kos.Facilities.map((f) => (
                                <div
                                    key={f.id}
                                    className="flex items-center bg-gray-50 p-2 rounded-lg shadow-sm"
                                >
                                    <span className="text-gray-700">{f.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default KosDetail;
