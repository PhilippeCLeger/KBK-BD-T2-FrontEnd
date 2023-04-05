import { Card, Switch, TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material";
import { TYPES_OUVRAGES } from "../Enums";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const ValidateOuvrage = (ouvrage) => {
    const errors = {};
    if(!ouvrage.titre) errors.titre = "Requis";
    if(ouvrage.type === TYPES_OUVRAGES.LIVRE){
        if(!ouvrage.annee) errors.annee = "Requise";
        if(!!ouvrage.annee && isNaN(parseInt(ouvrage.annee))) errors.annee = "Année invalide";
        if(!ouvrage.maison) errors.maison = "Requise";
        if(!ouvrage.auteur) errors.auteur = "Requis";
    }
    else{
        if(!ouvrage.annee) errors.annee = "Requise";
        if(!!ouvrage.annee && isNaN(parseInt(ouvrage.annee))) errors.annee = "Année invalide";
        if(!ouvrage.maison) errors.maison = "Requise";
        if(!ouvrage.auteur) errors.auteur = "Requis";
    }

    return errors;
}



const OuvrageForm = ({type}) => {

    return (
        <Card sx={{p:"0.5rem", display:'flex', flexDirection:'column', gap:1}}>
            <Typography sx={{fontWeight:"bold", fontSize:"1.25rem", color:"primary.main"}}>
                {`Ajouter un ${type === TYPES_OUVRAGES.LIVRE ? "livre" : "périodique" }`}
            </Typography>
            <TextField name="titre" label="Titre" variant="outlined" />
            {type === TYPES_OUVRAGES.LIVRE && <TextField name="annee" label="Année" type="number" variant="outlined" />}
            {type === TYPES_OUVRAGES.LIVRE && <TextField name="maison" label="Maison d'édition" variant="outlined" />}
            {type === TYPES_OUVRAGES.LIVRE && <TextField name="auteur" label="Auteur" variant="outlined" />}            
            {type === TYPES_OUVRAGES.PÉRIODIQUE && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker name="dateParution" label="Date de parution" />
            </LocalizationProvider>       
            )}    
            {type === TYPES_OUVRAGES.PÉRIODIQUE && (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Périodicité</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={undefined}
                  onChange={() => {}}
                >
                    <MenuItem value={0}>Hebdomadaire</MenuItem>
                    <MenuItem value={1}>Mensuelle</MenuItem>
                    <MenuItem value={2}>Journalière</MenuItem>
                </Select>
            </FormControl>
            )}
            <Typography sx={{fontWeight:"bold", fontSize:"1rem", color:"primary.main"}}>
                Exemplaires
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', gap:1, alignItems:'center'}}>
                <TextField name="exemplaireNo1" label="No" variant="outlined" /> 
                <Switch  name="exemplaireEstDisponible1" label="EstDisponible"/>     
            </Box>            
            {type === TYPES_OUVRAGES.LIVRE && (
            <Box sx={{display:'flex', flexDirection:'row', gap:1, alignItems:'center'}}>
                <TextField name="exemplaireNo2" label="No" variant="outlined" /> 
                <Switch  name="exemplaireEstDisponible2"/>     
            </Box>
            )} 
            {type === TYPES_OUVRAGES.LIVRE && (
            <Box sx={{display:'flex', flexDirection:'row', gap:1, alignItems:'center'}}>
                <TextField name="exemplaireNo3" label="No" variant="outlined" /> 
                <Switch  name="exemplaireEstDisponible3"/>     
            </Box>
            )}  
            <Button onClick={() => {}} variant="contained">Envoyer</Button>           
        </Card>
    );
}

export default OuvrageForm;