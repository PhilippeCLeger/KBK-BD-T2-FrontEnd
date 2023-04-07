import ValidatedTextField from "./ValidatedTextField";
import { Box, Switch } from "@mui/material";

const ExemplaireForm = ({ouvrage, setOuvrage, errors, index}) => {


    return (
        <Box sx={{display:'flex', flexDirection:'row', gap:1, alignItems:'center'}}>
            <ValidatedTextField 
                label="No"
                fieldName="no"
                object={ouvrage.exemplaires[index]}
                setObject={(exemplaire) => {
                    ouvrage.exemplaires[index] = exemplaire;
                    setOuvrage({ ...ouvrage });
                }}
                errors={errors.exemplaires ? errors.exemplaires[index] ?? {} : {}}
            />
            <Switch  name="estDisponible" checked={ouvrage.exemplaires[index].estDisponible} 
            onChange={(e) => {
                ouvrage.exemplaires[index].estDisponible = e.target.checked;
                setOuvrage({...ouvrage});
                }} /> 
        </Box>   
    )
}

export default ExemplaireForm;