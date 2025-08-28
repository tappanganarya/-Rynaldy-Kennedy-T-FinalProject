import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateKos() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        address: "",
        price: "",
        type: "",
        ownerId: "",
    });

    const [facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;

    useEffect(() => {
        if (user) {
            setForm((prev) => ({ ...prev, ownerId: user.id }));
        }
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/facilities", {
            headers: {
                "Content-Type": "application/json",
                access_token: token,
            },
        })
            .then((res) => res.json())
            .then((data) => setFacilities(data))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFacilityChange = (id) => {
        setSelectedFacilities((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/kos/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    access_token: token,
                },
                body: JSON.stringify({
                    ...form,
                    facilityIds: selectedFacilities, // kirim id fasilitas ke backend
                }),
            });

            if (!res.ok) throw new Error("Gagal menambahkan kos");
            const data = await res.json();

            // ✅ Pakai SweetAlert sukses
            await Swal.fire({
                title: "Berhasil!",
                text: "Kos berhasil ditambahkan 🎉",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#2563eb", // biru
            });

            console.log(data);
            navigate("/admin/kos");
        } catch (err) {
            // ❌ Pakai SweetAlert error
            Swal.fire({
                title: "Oops...",
                text: err.message,
                icon: "error",
                confirmButtonText: "Coba Lagi",
                confirmButtonColor: "#ef4444", // merah
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    🏠 Tambah Kos Baru
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nama Kos"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Alamat"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Harga"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition"
                        required
                    />

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition"
                        required
                    >
                        <option value="">-- Pilih Tipe --</option>
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                        <option value="Campur">Campur</option>
                    </select>

                    <div>
                        <h2 className="font-semibold text-gray-700">Fasilitas</h2>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            {facilities.map((f) => (
                                <label
                                    key={f.id}
                                    className={`flex items-center gap-2 border px-3 py-2 rounded-lg cursor-pointer transition ${selectedFacilities.includes(f.id)
                                        ? "bg-blue-50 border-blue-400"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedFacilities.includes(f.id)}
                                        onChange={() => handleFacilityChange(f.id)}
                                    />
                                    {f.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <input type="hidden" name="ownerId" value={form.ownerId} />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Menyimpan..." : "Tambah Kos"}
                    </button>
                </form>
            </div>
        </div>
    );
}
