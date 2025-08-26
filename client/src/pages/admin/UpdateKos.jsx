import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

    const [facilities, setFacilities] = useState([]); // semua fasilitas
    const [selectedFacilities, setSelectedFacilities] = useState([]); // fasilitas yang dipilih

    // Ambil data kost berdasarkan ID
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

                // set fasilitas yang sudah ada
                if (data.Facilities) {
                    setSelectedFacilities(data.Facilities.map((f) => f.id));
                }
            })
            .catch((err) => console.error("Gagal fetch detail kos:", err));

        // fetch semua fasilitas
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

    // Handle input form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle checkbox fasilitas
    const handleFacilityChange = (facilityId) => {
        setSelectedFacilities((prev) =>
            prev.includes(facilityId)
                ? prev.filter((id) => id !== facilityId)
                : [...prev, facilityId]
        );
    };

    // Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update kos dulu
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

            // Update fasilitas (opsional kalau ada fasilitas dipilih)
            if (selectedFacilities.length > 0) {
                const resFacilities = await fetch(`http://localhost:3000/api/kos/${id}/facilities`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: JSON.stringify({ facilityIds: selectedFacilities }),
                });

                if (!resFacilities.ok) {
                    throw new Error("Gagal update fasilitas kos");
                }
            }

            alert("Berhasil update kos!");
            navigate("/admin/kos");
        } catch (err) {
            console.error(err);
            alert("Gagal update kos!");
        }
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

                {/* Fasilitas */}
                <div>
                    <h2 className="font-semibold mb-2">Fasilitas</h2>
                    {facilities.map((f) => (
                        <label key={f.id} className="flex items-center space-x-2 mb-1">
                            <input
                                type="checkbox"
                                checked={selectedFacilities.includes(f.id)}
                                onChange={() => handleFacilityChange(f.id)}
                            />
                            <span>{f.name}</span>
                        </label>
                    ))}
                </div>

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