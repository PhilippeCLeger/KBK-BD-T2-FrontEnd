import { Box, Card, Grid, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { PÉRIODICITÉ, TYPES_OUVRAGES } from "../Enums";


const OuvrageListItem = ({ouvrage}) => {
    const estDisponible = ouvrage.exemplaires.findIndex(ex => ex.estDisponible) >= 0;
    return <Accordion sx={{
            borderLeft:8,  
            borderColor: estDisponible ? "success.main" : "error.main", 
            p:"0.5rem",
            maxWidth: "40rem"
            }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={ouvrage.id}
            >
            <Typography sx={{fontWeight:"bold", fontSize:"1.25rem", color:"primary.main"}}>
                {ouvrage.titre}
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {ouvrage.type === TYPES_OUVRAGES.LIVRE && <Box>Année d'édition: {ouvrage.annee}</Box>}
            {ouvrage.type === TYPES_OUVRAGES.LIVRE && <Box>Maison d'édition: {ouvrage.maison}</Box>}
            {ouvrage.type === TYPES_OUVRAGES.LIVRE && <Box>Auteur: {ouvrage.auteur}</Box>}
            {ouvrage.type === TYPES_OUVRAGES.PÉRIODIQUE && <Box>Périodicité: {getPeriodicite(ouvrage.periodicite)}</Box>}
            {ouvrage.type === TYPES_OUVRAGES.PÉRIODIQUE && <Box>Date de parution: {toShortDate(ouvrage.dateParution)}</Box>}
            {ouvrage.exemplaires.map((ex => 
                <Box key={ex.no} sx={{display:"flex", gap: 1}}>
                    <Box sx={{borderRadius: "50%", width: "1rem", height: "1rem", backgroundColor: ex.estDisponible ? "success.main" : "error.main"}}/>
                    <Box key="no">No: {ex.no}</Box>
                </Box>))}
          </Box>
        </AccordionDetails>
    </Accordion>
}

const getPeriodicite = (periodicite) => {
    switch(periodicite){
        case PÉRIODICITÉ.HEBDOMADAIRE:
            return "Hebdomadaire"
        case PÉRIODICITÉ.MENSUELLE:
            return "Mensuelle"
        case PÉRIODICITÉ.JOURNALIÈRE:
            return "Journalière"
    }
}

const toShortDate = (date) => {
    return date.toString().split("T")[0]; 
}

export default OuvrageListItem;