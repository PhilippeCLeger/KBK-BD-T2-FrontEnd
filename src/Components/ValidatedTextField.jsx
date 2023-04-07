import { TextField } from '@mui/material';

const ValidatedTextField = ({
    label, 
    fieldName, 
    object, 
    setObject, 
    errors, 
    fieldType = 'text'
}) => {
    return (
        <TextField 
            type={fieldType}
            name={fieldName} 
            label={label} 
            variant="outlined" 
            value={object[fieldName] ?? ''} 
            error={!!errors[fieldName]} 
            helperText={errors[fieldName] ?? ''} 
            onChange={(e) => setObject({...object, [fieldName]: e.target.value})} />
    )
}


export default ValidatedTextField;