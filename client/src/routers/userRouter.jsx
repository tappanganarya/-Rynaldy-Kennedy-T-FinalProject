import Home from "../pages/users/Home";
import Login from "../pages/Login";
import Regis from "../pages/register";

const userRouter = [
    {
        path: "/",       // ✅ ini anaknya MainLayout
        element: <Home />,
    },
    {
        path: "/login",  // kalau mau tanpa layout, nanti bisa dibuat root sendiri
        element: <Login />,
    },
    {
        path: "/register",  // kalau mau tanpa layout, nanti bisa dibuat root sendiri
        element: <Regis />,
    },
];

export default userRouter;
