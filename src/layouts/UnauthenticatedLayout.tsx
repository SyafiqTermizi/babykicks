import { Outlet } from "react-router";

export function UnauthenticatedLayout() {
    return <>
        <div className="row justify-content-center mt-5 p-1">
            <div className="col-md-4 col-sm-10 mt-5">
                <Outlet />
            </div>
        </div>
    </>
}