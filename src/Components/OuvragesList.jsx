import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { TYPES_OUVRAGES } from "../Enums";
import { getOuvrages } from "../API";
import useGetOuvrages from '../hooks/useGetOuvrages';
import OuvrageListItem from "./OuvrageListItem";

const OuvragesList = ({type}) => {
    const {ouvrages, refreshOuvrages} = useGetOuvrages(type);
    return <Box sx={{display:'flex', flexDirection:'column', alignItems: "stretch"}}>
        <Button onClick={refreshOuvrages} variant={"contained"} sx={{marginBottom:'0.5rem'}}>Rafraîchir la liste</Button>
        {ouvrages && 
        ouvrages.map(
            (ouvrage) => (
            <OuvrageListItem key={ouvrage._id} ouvrage={ouvrage}/>
            ))}
    </Box>
}

export default OuvragesList;