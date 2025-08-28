import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Fasilitas() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch Data
    const fetchFacilities = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/facilities", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            const data = await res.json();
            setFacilities(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacilities();
    }, []);

    // Tambah Fasilitas
    const handleAdd = async () => {
        const { value: name } = await Swal.fire({
            title: "Tambah Fasilitas",
            input: "text",
            inputLabel: "Nama Fasilitas",
            inputPlaceholder: "Masukkan nama fasilitas",
            showCancelButton: true,
        });

        if (name) {
            await fetch("http://localhost:3000/api/facilities/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({ name }),
            });
            fetchFacilities();
            Swal.fire("Berhasil!", "Fasilitas berhasil ditambahkan.", "success");
        }
    };

    // Edit Fasilitas
    const handleEdit = async (facility) => {
        const { value: name } = await Swal.fire({
            title: "Edit Fasilitas",
            input: "text",
            inputLabel: "Nama Fasilitas",
            inputValue: facility.name,
            showCancelButton: true,
        });

        if (name) {
            await fetch(`http://localhost:3000/api/facilities/update/${facility.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({ name }),
            });
            fetchFacilities();
            Swal.fire("Berhasil!", "Fasilitas berhasil diperbarui.", "success");
        }
    };

    // Delete Fasilitas
    const handleDelete = async (facility) => {
        const confirm = await Swal.fire({
            title: "Yakin hapus?",
            text: `Fasilitas "${facility.name}" akan dihapus!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Hapus!",
        });

        if (confirm.isConfirmed) {
            await fetch(`http://localhost:3000/api/facilities/delete/${facility.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            fetchFacilities();
            Swal.fire("Terhapus!", "Fasilitas berhasil dihapus.", "success");
        }
    };

    // View Detail
    const handleView = (facility) => {
        Swal.fire({
            title: "Detail Fasilitas",
            html: `
                <p><b>ID:</b> ${facility.id}</p>
                <p><b>Nama:</b> ${facility.name}</p>
            `,
            icon: "info",
        });
    };

    // Pagination
    const totalPages = Math.ceil(facilities.length / itemsPerPage);
    const currentData = facilities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <p>Loading fasilitas...</p>;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">📋 Daftar Fasilitas</h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                    + Tambah Fasilitas
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Nama Fasilitas</th>
                            <th className="py-3 px-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((facility, index) => (
                            <tr
                                key={facility.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4 border-t">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="py-3 px-4 border-t">{facility.name}</td>
                                <td className="py-3 px-4 border-t flex justify-center gap-2">
                                    <button
                                        onClick={() => handleView(facility)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEdit(facility)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(facility)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-md shadow-sm transition ${currentPage === i + 1
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );

}
