import { Box, Card, Grid, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";


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
            <Box>Année d'édition: {ouvrage.annee}</Box>
            <Box>Maison d'édition: {ouvrage.maison}</Box>
            <Box>Auteur: {ouvrage.auteur}</Box>
            {ouvrage.exemplaires.map((ex => 
                <Box key={ex.no} sx={{display:"flex", gap: 1}}>
                    <Box sx={{borderRadius: "50%", width: "1rem", height: "1rem", backgroundColor: ex.estDisponible ? "success.main" : "error.main"}}/>
                    <Box key="no">No: {ex.no}</Box>
                </Box>))}
          </Box>
        </AccordionDetails>
    </Accordion>
}

export default OuvrageListItem;