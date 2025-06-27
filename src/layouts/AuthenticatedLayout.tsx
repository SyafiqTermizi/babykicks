import { Outlet } from "react-router";

import { Navbar } from "../components/Navbar";

export function AuthenticatedLayout() {
    return <>
        <Navbar />
        <Outlet />
    </>
}