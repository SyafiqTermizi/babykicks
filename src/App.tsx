import { useState, useEffect } from "react";

import { Kick } from "./Kick";
import { Login } from "./Login";
import { AUTH_TOKEN_KEY_NAME } from "./constants";

function App() {
    const [authToken, setAuthToken] = useState<string>("");

    useEffect(() => {
        const storedAuthToken = localStorage.getItem(AUTH_TOKEN_KEY_NAME) || "";
        if (storedAuthToken) setAuthToken(storedAuthToken);
    }, [authToken])


    return <>
        {authToken ? <Kick /> : <Login setAuthToken={setAuthToken} />}
    </>
};

export default App;
