export function Kick() {
    return <>
        <div className="row justify-content-center text-center mt-5">
            <div className="col-4 mt-5">
                <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg" type="button" style={{ lineHeight: 2.5 }}>
                        Baby kicked!
                    </button>
                </div>
            </div>
        </div>
        <div className="row justify-content-center mt-2">
            <div className="col-4">
                <div className="progress" role="progressbar">
                    <div className="progress-bar" style={{ width: '25%' }}></div>
                </div>
            </div>
        </div>

        <div className="row justify-content-center mt-2">
            <div className="col-4">
                <ul className="list-group">
                    <li className="list-group-item border-bottom" aria-current="true">
                        An active item
                    </li>
                    <li className="list-group-item border-bottom">
                        A second item
                    </li>
                    <li className="list-group-item border-bottom">
                        A third item
                    </li>
                    <li className="list-group-item border-bottom">
                        A fourth item
                    </li>
                    <li className="list-group-item border-bottom">
                        And a fifth one
                    </li>
                </ul>
            </div>
        </div>
    </>
};