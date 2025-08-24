import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function KosList() {
    const [kosts, setKosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/kos", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setKosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin hapus kos ini?")) return;
        try {
            const res = await fetch(`http://localhost:3000/api/kos/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            if (res.ok) {
                setKosts(kosts.filter((k) => k.id !== id));
            } else {
                alert("Gagal hapus kos!");
            }
        } catch (err) {
            console.error(err);
            alert("Terjadi error!");
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
                        <tr className="bg-blue-600 text-white text-left">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Nama Kost</th>
                            <th className="py-3 px-4">Owner</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kosts.map((kost, index) => (
                            <tr
                                key={kost.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4 font-medium text-gray-700">
                                    {kost.name}
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                    {kost.User?.name || kost.user?.name || "Tidak ada owner"}
                                </td>
                                <td className="py-3 px-4 flex justify-center gap-2">
                                    <Link
                                        to={`/kos/${kost.id}`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-blue-600"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/admin/update/${kost.id}`}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-yellow-600"
                                    >
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
