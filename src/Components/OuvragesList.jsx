import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { TYPES_OUVRAGES } from "../Enums";
import { getOuvrages } from "../API";
import useGetOuvrages from '../hooks/useGetOuvrages';
import OuvrageListItem from "./OuvrageListItem";

const OuvragesList = ({type}) => {
    const {ouvrages, refreshOuvrages} = useGetOuvrages(type);
    return <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
        <Button onClick={refreshOuvrages}>REFRESH</Button>
        {ouvrages && 
        ouvrages.map(
            (ouvrage) => (
            <OuvrageListItem key={ouvrage._id} ouvrage={ouvrage}/>
            ))}
    </Box>
}

export default OuvragesList;