import { Navigate } from "react-router";

import { useStore } from "../store";

export function Home() {
    const { authToken } = useStore();
    const isAuthenticated = Boolean(authToken);

    const toUrl = isAuthenticated ? "kicks" : "auth/signin";
    return <Navigate to={toUrl} />
}