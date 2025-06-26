import { useState } from "react";

import { Api } from "./apiWrapper";
import { AUTH_TOKEN_KEY_NAME } from "./constants";

interface Param {
    setAuthToken: (token: string) => undefined;
}

export function Login({ setAuthToken }: Param) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const api = new Api();
        api.login({ email, password })
            .then(token => {
                localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
                setAuthToken(token);
            })
            .catch(err => setError(err.message));
    }

    return <div className="row justify-content-center mt-5">
        <div className="col-4 mt-5">
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