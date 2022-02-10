import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { Dashboard } from "../pages/dashboard";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/sobre' element={<Dashboard/>} />
        </Routes>
    );
}