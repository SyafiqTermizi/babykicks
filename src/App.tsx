import { useStore } from "./store";

import { Kick } from "./pages/Kick";
import { Signin } from "./pages/Signin";
import { Navbar } from "./Navbar";

function App() {
    const { authToken } = useStore();

    return <>
        {authToken ? <Navbar /> : null}
        <div className="container">
            {authToken ? <Kick /> : <Signin />}
        </div>
    </>
};

export default App;
