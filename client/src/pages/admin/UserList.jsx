import { useEffect, useState } from "react";

export default function KosList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ganti URL sesuai API backendmu
        fetch("http://localhost:3000/api/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading daftar users...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Daftar Users</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">#</th>
                        <th className="py-2 px-4 border">Nama Users</th>
                        <th className="py-2 px-4 border">Email Users</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">
                                {user.email || "Tidak ada owner"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
