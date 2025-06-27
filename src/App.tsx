import { createBrowserRouter, RouterProvider } from "react-router";

import { Home } from "./pages/Home";
import { Kick } from "./pages/Kick";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { AuthenticatedLayout } from "./layouts/AuthenticatedLayout";
import { UnauthenticatedLayout } from "./layouts/UnauthenticatedLayout";

function App() {
    const router = createBrowserRouter([
        {
            path: "", Component: Home,
        },
        {
            path: "kicks",
            Component: AuthenticatedLayout,
            children: [
                { index: true, Component: Kick },
            ],
        },
        {
            path: "auth",
            Component: UnauthenticatedLayout,
            children: [
                {
                    path: "signin",
                    Component: Signin
                },
                {
                    path: "signup",
                    Component: Signup
                }
            ]
        }
    ]);

    return <>
        <div className="container">
            <RouterProvider router={router} />
        </div>
    </>
};

export default App;
