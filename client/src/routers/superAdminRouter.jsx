import { UserList, Fasilitas } from "../pages/superAdmin";



const superAdminRouter = [
    {
        path: "users",
        element: <UserList />,
    },
    {
        path: "fasilitas",
        element: <Fasilitas />,
    },
];



export default superAdminRouter;




