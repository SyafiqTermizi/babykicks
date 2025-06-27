import { useStore } from "./store";

export function Navbar() {
    const { username, clear } = useStore();

    function logout() {
        clear();
        window.location.reload();
    }

    return <div className="container mt-3">
        <div className="row">
            <div className="col-6">
                <p>Welcome, {username}</p>
            </div>
            <div className="col-6 text-end">
                <p className="text-end" onClick={logout}>
                    <a style={{ textDecoration: 'none' }} href="#">Logout</a>
                </p>
            </div>
        </div>
    </div >
}