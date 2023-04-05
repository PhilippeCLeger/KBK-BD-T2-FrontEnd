import { Box, Card, Grid, Typography } from "@mui/material";

const OuvrageListItem = ({ouvrage}) => {
    const estDisponible = ouvrage.exemplaires.findIndex(ex => ex.estDisponible) >= 0;
    return <Box>
        <Card sx={{
            borderLeft:8,  
            borderColor: estDisponible ? "success.main" : "error.main", 
            p:"0.5rem",
            }}>
            <Grid container direction={"column"}>
                <Grid item>
                    <Typography sx={{fontWeight:"bold", fontSize:"1.25rem", color:"primary.main"}}>
                        {ouvrage.titre}
                    </Typography>
                </Grid>
            </Grid>

        </Card>
    </Box>
}

export default OuvrageListItem;