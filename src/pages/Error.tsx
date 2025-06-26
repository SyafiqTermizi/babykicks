export function Error() {
    return <div className="row justify-content-center mt-5 p-1">
        <div className="col-md-4 col-sm-10 mt-5">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        You're not connected to the internet
                    </h4>
                    <p className="card-text">
                        This page can't be displayed because you're currently offline
                    </p>
                </div>
            </div>

        </div>
    </div>
}