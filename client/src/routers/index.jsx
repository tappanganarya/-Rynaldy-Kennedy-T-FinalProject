import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout"; // ✅ sidebar admin
import kosRouter from "./kosRouter";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";

// gabungkan semua router
const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            ...userRouter,
            ...kosRouter,
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,   // ✅ punya sidebar
        children: [
            ...adminRouter,
        ],
    },
]);

export default routers;
