import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateKost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        address: "",
        price: "",
        type: "",
    });

    // Ambil data kost berdasarkan ID
    useEffect(() => {
        fetch(`http://localhost:3000/api/kos/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setForm({
                    name: data.name || "",
                    address: data.address || "",
                    price: data.price || "",
                    type: data.type || "",
                });
            })
            .catch((err) => console.error("Gagal fetch detail kos:", err));
    }, [id]);

    // Handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit update
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/api/kos/${id}`, {
            method: "PUT", // atau PATCH sesuai backendmu
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Gagal update kos!");
                return res.json();
            })
            .then(() => {
                alert("Berhasil update kos!");
                navigate("/admin/kos"); // balik ke daftar kos
            })
            .catch((err) => {
                console.error(err);
                alert("Gagal update kos!");
            });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Update Kost</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama Kost"
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Alamat"
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Harga"
                    className="w-full border rounded px-3 py-2"
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">-- Pilih Tipe --</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                    <option value="Campur">Campur</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
