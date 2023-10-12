import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

function RoutesList() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
        </Routes>
    )
}

export default RoutesList;