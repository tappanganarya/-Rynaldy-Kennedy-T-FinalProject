import KosList from "../pages/admin/KosList";
import UpdateKost from "../pages/admin/UpdateKos";
import CreateKost from "../pages/admin/CreateKos";
import UserList from "../pages/admin/UserList";


const adminRouter = [
    {
        path: "kos",
        element: <KosList />,
    },
    {
        path: "update/:id",
        element: <UpdateKost />,
    },
    {
        path: "create",
        element: <CreateKost />,
    },
    {
        path: "users",
        element: <UserList />,
    }
];


export default adminRouter;




