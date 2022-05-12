import { useState, useEffect } from "react";
import { log } from "../functions/console-log";
import { getAxiosRequest } from "../functions/xhr";

export function useXHR(path: string) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<[] | {}>();

    useEffect(() => {
        const apiCall = async () => {
            setLoading(true);
            getAxiosRequest(path)
                .then((response) => {
                    setData(response.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 9000);
                })
                .catch((error) => {
                    log(error);
                });
        };
        apiCall();
    }, [path]);

    return { loading, data };
}
