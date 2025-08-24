import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateKos() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        address: "",
        price: "",
        type: "",
        ownerId: "", // nanti otomatis isi
    });

    const [loading, setLoading] = useState(false);

    // ambil data user dari localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setForm((prev) => ({
                ...prev,
                ownerId: user.id, // isi otomatis sesuai id user yg login
            }));
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/kos/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Gagal menambahkan kos");
            const data = await res.json();

            alert("Kos berhasil ditambahkan!");
            console.log(data);
            navigate("/admin/kos");
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Tambah Kos</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nama Kos"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Alamat"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Harga"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                >
                    <option value="">-- Pilih Tipe --</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                    <option value="Campur">Campur</option>
                </select>

                {/* OwnerId jadi hidden input */}
                <input type="hidden" name="ownerId" value={form.ownerId} />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    {loading ? "Menyimpan..." : "Tambah Kos"}
                </button>
            </form>
        </div>
    );
}
