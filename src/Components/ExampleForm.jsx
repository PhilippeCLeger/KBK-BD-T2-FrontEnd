import { Box, TextField, Button, Card } from "@mui/material";

const ExampleForm = () => (
    <Card sx={{display:'flex', flexDirection:'column', gap:5, padding:'1rem'}}>
    <TextField error={false} label={"Texte - valide"} variant='outlined' />
    <TextField error={true} label={"Texte - invalide"} helperText={"Ceci est une description de l'erreur"} variant='outlined' />
    <Button variant='contained'>Submit</Button>
    </Card>
);

export default ExampleForm;