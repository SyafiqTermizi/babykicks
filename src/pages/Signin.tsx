import { useState } from "react";

import { Api } from "../apiWrapper";
import { useStore } from "../store";

export function Signin() {
    const { setAuthToken, setUsername } = useStore();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const api = new Api("");
        api.signin({ email, password })
            .then(data => {
                setAuthToken(data["access_token"]);
                setUsername(data["username"]);
            })
            .catch(err => setError(err.message));
    }

    return <div className="row justify-content-center mt-5 p-1">
        <div className="col-md-4 col-sm-10 mt-5">
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
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            {
                error && <div className="alert alert-danger mt-2">
                    <strong>Ooops!</strong> {error}
                </div>
            }
        </div>
    </div>
};