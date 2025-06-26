export function Login() {
    return <div className="row justify-content-center mt-5">
        <div className="col-4 mt-5">
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
};