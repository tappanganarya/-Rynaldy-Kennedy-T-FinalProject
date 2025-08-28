import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data users
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Tambah User
    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: "Tambah User",
            html: `
        <input id="name" class="swal2-input" placeholder="Nama">
        <input id="email" class="swal2-input" placeholder="Email">
        <input id="password" type="password" class="swal2-input" placeholder="Password">
        <input id="role" class="swal2-input" placeholder="Role">
      `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    role: document.getElementById("role").value,
                };
            },
        });

        if (formValues) {
            try {
                await fetch("http://localhost:3000/api/users/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: JSON.stringify(formValues),
                });
                MySwal.fire("Sukses!", "User berhasil ditambahkan!", "success");
                fetchUsers();
            } catch (err) {
                MySwal.fire("Error!", "Gagal menambah user.", "error");
            }
        }
    };

    // Edit User
    const handleEdit = async (user) => {
        const { value: formValues } = await MySwal.fire({
            title: "Edit User",
            html: `
        <input id="name" class="swal2-input" placeholder="Nama" value="${user.name}">
        <input id="email" class="swal2-input" placeholder="Email" value="${user.email}">
        <input id="role" class="swal2-input" placeholder="Role" value="${user.role}">
      `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    role: document.getElementById("role").value,
                };
            },
        });

        if (formValues) {
            try {
                await fetch(`http://localhost:3000/api/users/update/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: JSON.stringify(formValues),
                });
                MySwal.fire("Sukses!", "User berhasil diupdate!", "success");
                fetchUsers();
            } catch (err) {
                MySwal.fire("Error!", "Gagal update user.", "error");
            }
        }
    };

    // Delete User
    const handleDelete = (id) => {
        MySwal.fire({
            title: "Apakah kamu yakin?",
            text: "User akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://localhost:3000/api/users/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    });
                    MySwal.fire("Dihapus!", "User berhasil dihapus.", "success");
                    fetchUsers();
                } catch (err) {
                    MySwal.fire("Error!", "Gagal menghapus user.", "error");
                }
            }
        });
    };

    // View User Detail
    const handleView = (user) => {
        MySwal.fire({
            title: `<strong>Detail User</strong>`,
            html: `
        <p><b>Nama:</b> ${user.name}</p>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Role:</b> ${user.role}</p>
        <p><b>Password:</b> ${user.password || "Hidden"}</p>
      `,
            showCloseButton: true,
            focusConfirm: false,
        });
    };

    if (loading) return <p>Loading daftar users...</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    👥 Manajemen Users
                </h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                    ➕ Tambah User
                </button>
            </div>

            <table className="min-w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                    <tr>
                        <th className="py-3 px-4 border">#</th>
                        <th className="py-3 px-4 border">Nama</th>
                        <th className="py-3 px-4 border">Email</th>
                        <th className="py-3 px-4 border">Role</th>
                        <th className="py-3 px-4 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr
                            key={user.id}
                            className="hover:bg-gray-100 transition duration-150"
                        >
                            <td className="py-2 px-4 border">{i + 1}</td>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">{user.role}</td>
                            <td className="py-2 px-4 border flex gap-2">
                                <button
                                    onClick={() => handleView(user)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    👁 View
                                </button>
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    ✏ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    🗑 Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
