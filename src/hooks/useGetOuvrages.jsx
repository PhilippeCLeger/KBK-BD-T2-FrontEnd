import { useCallback, useEffect, useState } from "react";
import { getOuvrages } from "../API";

const useGetOuvrages = (type) => {
    const [ouvrages, setOuvrages] = useState([]);

    useEffect(() => console.log("Ouvrages modifiés: ", ouvrages), [ouvrages]);
    const refreshOuvrages = useCallback(
        async () => setOuvrages(await getOuvrages(type)), 
        [setOuvrages, type]
        );
    return {ouvrages, refreshOuvrages};
}

export default useGetOuvrages;