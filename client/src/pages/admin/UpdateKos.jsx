import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateKost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;

    const [form, setForm] = useState({
        name: "",
        address: "",
        price: "",
        type: "",
    });

    const [facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/kos/${id}`, {
            headers: {
                "Content-Type": "application/json",
                access_token: token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setForm({
                    name: data.name || "",
                    address: data.address || "",
                    price: data.price || "",
                    type: data.type || "",
                });

                if (data.Facilities) {
                    setSelectedFacilities(data.Facilities.map((f) => f.id));
                }
            })
            .catch((err) => console.error("Gagal fetch detail kos:", err));

        fetch("http://localhost:3000/api/facilities", {
            headers: {
                "Content-Type": "application/json",
                access_token: token
            }
        })
            .then((res) => res.json())
            .then((data) => setFacilities(data))
            .catch((err) => console.error("Gagal fetch fasilitas:", err));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFacilityChange = (facilityId) => {
        setSelectedFacilities((prev) =>
            prev.includes(facilityId)
                ? prev.filter((id) => id !== facilityId)
                : [...prev, facilityId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resKos = await fetch(`http://localhost:3000/api/kos/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    access_token: token
                },
                body: JSON.stringify(form),
            });

            if (!resKos.ok) {
                throw new Error("Gagal update data kos");
            }

            if (selectedFacilities.length > 0) {
                const resFacilities = await fetch(`http://localhost:3000/api/kos/${id}/facilities`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: token,
                    },
                    body: JSON.stringify({ facilityIds: selectedFacilities }),
                });

                if (!resFacilities.ok) {
                    throw new Error("Gagal update fasilitas kos");
                }
            }

            Swal.fire({
                title: "Berhasil!",
                text: "Data kos berhasil diupdate.",
                icon: "success",
                confirmButtonColor: "#2563eb"
            });
            navigate("/admin/kos");
        } catch (err) {
            console.error(err);
            Swal.fire("Gagal!", "Terjadi error saat update kos.", "error");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">✏️ Edit Kost</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-1">Nama Kost</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama kost"
                            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Alamat</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Masukkan alamat"
                            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Harga</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Masukkan harga"
                            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Tipe</label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">-- Pilih Tipe --</option>
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                            <option value="Campur">Campur</option>
                        </select>
                    </div>

                    {/* Fasilitas */}
                    <div>
                        <h2 className="font-semibold mb-2">Fasilitas</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {facilities.map((f) => (
                                <label key={f.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg shadow-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedFacilities.includes(f.id)}
                                        onChange={() => handleFacilityChange(f.id)}
                                    />
                                    <span>{f.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-md"
                    >
                        Simpan Perubahan
                    </button>
                </form>
            </div>
        </div>
    );
}
