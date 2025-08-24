import KosList from "../pages/kosts/KosList";
import KosDetail from "../pages/kosts/KosDetail";
import SearchKos from "../pages/kosts/Search";


const kosRouter = [
    { path: "/kos", element: <KosList /> },
    { path: "/kos/:id", element: <KosDetail /> },
    { path: "/kos/search/:id", element: <SearchKos /> },

];

export default kosRouter;
