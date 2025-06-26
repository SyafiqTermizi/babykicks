import { useState, useEffect } from "react";

import { Kick } from "./pages/Kick";
import { Signin } from "./pages/Signin";
import { Navbar } from "./Navbar";

import { AUTH_TOKEN_KEY_NAME } from "./constants";

function App() {
    const [authToken, setAuthToken] = useState<string>("");

    useEffect(() => {
        const storedAuthToken = localStorage.getItem(AUTH_TOKEN_KEY_NAME) || "";
        if (storedAuthToken) setAuthToken(storedAuthToken);
    }, [authToken])


    return <>
        {authToken ? <Navbar /> : null}
        <div className="container">
            {authToken ? <Kick /> : <Signin setAuthToken={setAuthToken} />}
        </div>
    </>
};

export default App;
