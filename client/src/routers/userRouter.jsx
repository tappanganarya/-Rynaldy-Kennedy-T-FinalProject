import Home from "../pages/users/Home";
import Login from "../pages/Login";

const userRouter = [
    {
        path: "/",       // ✅ ini anaknya MainLayout
        element: <Home />,
    },
    {
        path: "/login",  // kalau mau tanpa layout, nanti bisa dibuat root sendiri
        element: <Login />,
    },
];

export default userRouter;
