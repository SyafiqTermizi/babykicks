import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";

import { Api } from "../apiWrapper";
import { useStore } from "../store";

export function Signup() {
    const { authToken } = useStore();

    const navigate = useNavigate();
    useEffect(() => {
        if (authToken) navigate("/");
    });

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password mismatch.");
            return;
        }

        const api = new Api("");
        api.signup({ email, username, password })
            .then(_ => navigate("/"))
            .catch(err => setError(err.message));
    }

    return <>
        <div className="card">
            <div className="card-body">
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmpassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="col-12 d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <div className="row mt-1">
                            <div className="col-12 text-center">
                                <Link to="/auth/signin">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {
            error && <div className="alert alert-danger mt-2">
                <strong>Ooops!</strong> {error}
            </div>
        }
    </>
};