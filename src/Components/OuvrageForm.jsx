import { Card, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material";
import { TYPES_OUVRAGES, PÉRIODICITÉ } from "../Enums";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect, useCallback } from 'react';
import ValidatedTextField from "./ValidatedTextField";
import ExemplaireForm from "./ExemplaireForm";
import { estNoExemplaireLibre, insertOuvrage } from '../API';


const isValidDate = (strDate) => {
    if(!strDate) return false;
    try{
        console.log('strDate: ', strDate);
        const date = new Date(strDate);
        console.log('valid date');
        return true;
    }catch (e){
        console.log('invalid date');
        return false;
    }
}

const validateExemplaire = async (exemplaire) => {
    const errors = {};
    if(!exemplaire.no) errors.no = "Requis";
    else if (!estNoExemplaireLibre(exemplaire.no)) errors.no = `${exemplaire.no} est déjà utilisé`;
    return errors;
}

const addValidateExemplaire = async (ouvrage, errors, index) => {
    const errorsExemplaire = await validateExemplaire(ouvrage.exemplaires[index]);
    if(Object.values(errorsExemplaire).length > 0){
        errors.exemplaires[index] = errorsExemplaire;
    }
}

const getDefaultErrors = (type) => ({exemplaires: type === TYPES_OUVRAGES.LIVRE ? [{}, {}, {}] : [{}]});

const validateOuvrage = async (ouvrage) => {
    const errors = getDefaultErrors(ouvrage.type);
    if(!ouvrage.titre) errors.titre = "Requis";
    addValidateExemplaire(ouvrage, errors, 0);
    if(ouvrage.type === TYPES_OUVRAGES.LIVRE){
        addValidateExemplaire(ouvrage, errors, 1);
        addValidateExemplaire(ouvrage, errors, 2);
        if(!ouvrage.annee) errors.annee = "Requise";
        if(!!ouvrage.annee && isNaN(parseInt(ouvrage.annee))) errors.annee = "Année invalide";
        if(!ouvrage.maison) errors.maison = "Requise";
        if(!ouvrage.auteur) errors.auteur = "Requis";
        if(!ouvrage.exemplaires[1] || !ouvrage.exemplaires[1].no) errors.exemplaireNo1 = "Requis";
        if(!ouvrage.exemplaires[2] || !ouvrage.exemplaires[2].no) errors.exemplaireNo1 = "Requis";
    }
    else{
        if(
            ouvrage.periodicite === undefined || ouvrage.periodicite === null || 
            !Object.values(PÉRIODICITÉ).includes(ouvrage.periodicite)
            ) 
            errors.periodicite = "Périodicité invalide";
        if(!ouvrage.dateParution)  errors.dateParution = "Requise";
        else if(!isValidDate(ouvrage.dateParution)) errors.dateParution = "Année invalide";
    }

    return errors;
}

const isValid = (errors) => {
    return Object.values(errors).length === 1 && errors.exemplaires.findIndex(exemplaire => Object.values(exemplaire).length > 0) === -1
}

const defaultExemplaire = { no: "", estDisponible: true };

const getDefaultExemplaires = (type) => (
    type === TYPES_OUVRAGES.LIVRE ? 
    [{...defaultExemplaire}, {...defaultExemplaire}, {...defaultExemplaire}] : 
    [{...defaultExemplaire}]);

const getDefaultOuvrage = (type) => (
    {type, exemplaires: getDefaultExemplaires(type) }
);

const OuvrageForm = ({type}) => {
    const [ouvrage, setOuvrage] = useState(getDefaultOuvrage(type));
    const [errors, setErrors] = useState(getDefaultErrors(type));

    const submit = useCallback(() => {
        const f = async () => {
            try{
                const res = await insertOuvrage(ouvrage);
                setOuvrage(getDefaultOuvrage(type));
            } catch(e){
                console.error(e);
                alert("Une erreur est survenue...");
            }

        }
        f();
    }, [ouvrage, setOuvrage, type])

    useEffect(() => {
        const f = async () => {
            if(!!ouvrage)
                setErrors(await validateOuvrage(ouvrage));
        }
        f();
    }, [ouvrage])

    return (
        <Card sx={{p:"0.5rem", display:'flex', flexDirection:'column', gap:1}}>
            <Typography sx={{ fontWeight:"bold", fontSize:"1.25rem", color:"primary.main" }}>
                {`Ajouter un ${type === TYPES_OUVRAGES.LIVRE ? "livre" : "périodique" }`}
            </Typography>

            <ValidatedTextField 
                label="Titre"
                fieldName="titre"
                object={ouvrage}
                setObject={setOuvrage}
                errors={errors}
            />

            {
                type === TYPES_OUVRAGES.LIVRE && (
                <ValidatedTextField 
                    label="Année"
                    fieldName="annee"
                    object={ouvrage}
                    setObject={setOuvrage}
                    errors={errors}
                    fieldType="number"
                />
            )}
            {
                type === TYPES_OUVRAGES.LIVRE && (
                <ValidatedTextField 
                    label="Maison d'édition"
                    fieldName="maison"
                    object={ouvrage}
                    setObject={setOuvrage}
                    errors={errors}
                />
            )}
                        {
                type === TYPES_OUVRAGES.LIVRE && (
                <ValidatedTextField 
                    label="Auteur"
                    fieldName="auteur"
                    object={ouvrage}
                    setObject={setOuvrage}
                    errors={errors}
                />
            )}
            {type === TYPES_OUVRAGES.PÉRIODIQUE && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    name="dateParution" 
                    label="Date de parution" 
                    value={!!ouvrage.dateParution ? dayjs(ouvrage.dateParution) : undefined} 
                    onChange={(e) => setOuvrage({...ouvrage, dateParution: e['$d'].toISOString()})}
                    slotProps={{textField:{error:!!errors.dateParution, helperText:errors.dateParution ?? ''}}}/>
            </LocalizationProvider>       
            )}    
            {type === TYPES_OUVRAGES.PÉRIODIQUE && (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Périodicité</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ouvrage.periodicite}
                  onChange={(e) => {setOuvrage({...ouvrage, periodicite: e.target.value})}}
                  error={!!errors.periodicite}
                  helperText={errors.periodicite ?? ''}
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
            <ExemplaireForm 
                ouvrage={ouvrage} 
                setOuvrage={setOuvrage} 
                errors={errors} 
                index={0}
            />
            {type === TYPES_OUVRAGES.LIVRE && (
            <ExemplaireForm 
                ouvrage={ouvrage} 
                setOuvrage={setOuvrage} 
                errors={errors} 
                index={1}
            />
            )} 
            {type === TYPES_OUVRAGES.LIVRE && (
            <ExemplaireForm 
                ouvrage={ouvrage} 
                setOuvrage={setOuvrage} 
                errors={errors} 
                index={2}
            />
            )}  
            <Button onClick={async () => {if(isValid(await validateOuvrage(ouvrage))) submit();}} variant="contained">Envoyer</Button>           
        </Card>
    );
}

export default OuvrageForm;