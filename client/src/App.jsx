import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import Navbar from "./components/Navbar";

function App() {
    return (
        <RouterProvider
            router={routers}
            fallbackElement={<div>Loading...</div>} // optional
        />
    );
}

export default App;
