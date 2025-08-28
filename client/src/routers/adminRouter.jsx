import KosList from "../pages/admin/KosList";
import UpdateKost from "../pages/admin/UpdateKos";
import CreateKost from "../pages/admin/CreateKos";


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
];


export default adminRouter;




