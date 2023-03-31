import { Box, Card, Grid, Typography } from "@mui/material";

const OuvrageListItem = ({ouvrage}) => {
    const estDisponible = ouvrage.exemplaires.findIndex(ex => ex.estDisponible) >= 0;
    return <Box>
        <Card sx={{borderLeft:8,  borderColor: estDisponible ? "success.main" : "error.main"}}>
            <Grid container direction={"column"}>
                <Grid item>
                    <Typography>
                        {ouvrage.titre}
                    </Typography>
                </Grid>
            </Grid>

        </Card>
    </Box>
}

export default OuvrageListItem;