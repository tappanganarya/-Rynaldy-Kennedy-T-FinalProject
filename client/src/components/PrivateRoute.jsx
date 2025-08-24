import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to="/login" />; // belum login
    }

    if (role && user.role !== role) {
        return <Navigate to="/" />; // role tidak cocok
    }

    return children;
}
