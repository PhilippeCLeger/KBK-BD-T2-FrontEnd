import { useCallback, useEffect, useState } from "react";
import { TYPES_OUVRAGES } from "../Enums";
import { getOuvrages } from "../API";

const useGetOuvrages = (type) => {
    // const [type, setType] = useState(TYPES_OUVRAGES.LIVRE);
    const [ouvrages, setOuvrages] = useState([]);

    useEffect(() => console.log("Ouvrages modifiés: ", ouvrages), [ouvrages]);
    const refreshOuvrages = useCallback(
        async () => setOuvrages(await getOuvrages(type)), 
        [setOuvrages, type]
        );
    return {ouvrages, refreshOuvrages};
}

export default useGetOuvrages;