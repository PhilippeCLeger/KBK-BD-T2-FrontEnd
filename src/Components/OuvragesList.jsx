import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TYPES_OUVRAGES } from "../Enums";
import { getOuvrages } from "../API";
import useGetOuvrages from '../hooks/useGetOuvrages';
import OuvrageListItem from "./OuvrageListItem";

const OuvragesList = () => {
    const {ouvrages, refreshOuvrages} = useGetOuvrages();
    return <>
        <Button onClick={refreshOuvrages}>REFRESH</Button>
        {ouvrages && 
        ouvrages.map(
            (ouvrage) => (
            <OuvrageListItem key={ouvrage._id} ouvrage={ouvrage}/>
            ))}
    </>
}

export default OuvragesList;