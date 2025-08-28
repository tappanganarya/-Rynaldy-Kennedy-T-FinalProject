import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function KosList() {
    const [kosts, setKosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;

    useEffect(() => {
        fetch("http://localhost:3000/api/kos", {
            headers: {
                "Content-Type": "application/json",
                access_token: token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("DATA DARI BACKEND:", data);
                setKosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("ERROR FETCH:", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Yakin mau hapus kos ini?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:3000/api/kos/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    access_token: token,
                },
            });

            if (res.ok) {
                setKosts(kosts.filter((k) => k.id !== id));
                Swal.fire("Terhapus!", "Kos berhasil dihapus.", "success");
            } else {
                Swal.fire("Gagal!", "Kos gagal dihapus.", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Terjadi kesalahan pada server.", "error");
        }
    };


    if (loading) return <p className="text-gray-600">Loading daftar kos...</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">🏠 Daftar Kost</h1>
                <Link
                    to="/admin/create"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-600 transition"
                >
                    + Tambah Kos
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-300 text-black text-left">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Nama Kost</th>
                            <th className="py-3 px-4">Owner</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(kosts) && kosts.length > 0 ? (
                            kosts.map((kost, index) => (
                                <tr key={kost.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 font-medium text-gray-700">{kost.name}</td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {kost.User?.name || kost.user?.name || "Tidak ada owner"}
                                    </td>
                                    <td className="py-3 px-4 flex justify-center gap-2">
                                        <Link to={`/kos/${kost.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-blue-600">
                                            View
                                        </Link>
                                        <Link to={`/admin/update/${kost.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-yellow-600">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(kost.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-3 px-4 text-center text-gray-500">
                                    Belum ada kos tersedia
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}