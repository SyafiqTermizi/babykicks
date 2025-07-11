import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useStore } from "../store";
import { Api } from "../apiWrapper";

import { Error } from "./Error";

interface Kick {
    id: string;
    created_at: string;
}

export function Kick() {
    const { authToken } = useStore();

    const navigate = useNavigate();
    useEffect(() => {
        if (!authToken) navigate("/");
    });

    const api = new Api(authToken);
    const [shouldFetch, setShouldFetch] = useState<boolean>(true);
    const [kicks, setKicks] = useState<Kick[]>([]);
    const [kickPercent, setKickPercent] = useState<string>("0%");
    const [error, setError] = useState<boolean>(false);

    function getKickPercent(kicksParam: Kick[]): string {
        const kickCount = kicksParam.length < 10 ? kicksParam.length : 10;
        return `${(kickCount / 10) * 100}%`;
    }

    useEffect(() => {
        if (!shouldFetch) return;

        api.getTodayKicks().then(
            kicks => {
                setKicks(kicks);
                setKickPercent(getKickPercent(kicks))
            }
        ).catch(_ => setError(true))

        setShouldFetch(false);
    }, [shouldFetch]);

    function createKick() {
        api.createKick().then(_ => setShouldFetch(true));
    };

    function deleteKick(kickId: string) {
        api.deleteKick(kickId).then(_ => setShouldFetch(true));
    }

    if (error) return <Error />;

    return <>
        <div className="row justify-content-center text-center mt-5">
            <div className="col-md-4 col-sm-10 mt-5">
                <div className="d-grid gap-2">
                    <button
                        className="btn btn-primary btn-lg"
                        type="button"
                        style={{ lineHeight: 2.5 }}
                        onClick={createKick}
                    >
                        Baby kicked!
                    </button>
                </div>
            </div>
        </div>

        {
            Boolean(kicks.length) && <div className="row justify-content-center mt-2">
                <div className="col-md-4 col-sm-10">
                    <div className="progress" role="progressbar">
                        <div className="progress-bar" style={{ width: kickPercent }}></div>
                    </div>
                </div>
            </div>
        }


        <div className="row justify-content-center mt-2 mb-5">
            <div className="col-md-4 col-sm-10">
                <ul className="list-group">
                    {
                        kicks.map(kick => {
                            return <li
                                key={kick.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                {kick.created_at}
                                <span
                                    className="badge bg-primary rounded-pill"
                                    onClick={() => deleteKick(kick.id)}
                                >
                                    Undo
                                </span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    </>
};