import {Box, Tab, Typography} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import OuvragesList from './Components/OuvragesList'

import { TYPES_OUVRAGES } from './Enums'
import {useState} from 'react'
import OuvrageForm from './Components/OuvrageForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

function App() {
  const [type, setType] = useState(TYPES_OUVRAGES.LIVRE.toString());
  return (
    <div className="App">
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "stretch", width:"40rem"}}>
          <TabContext value={type}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(e, val) => setType(val.toString())} aria-label="lab API tabs example">
                <Tab label="Livres" value={TYPES_OUVRAGES.LIVRE.toString()} />
                <Tab label="Périodiques"  value={TYPES_OUVRAGES.PÉRIODIQUE.toString()} />
              </TabList>
            </Box>
            {Object.values(TYPES_OUVRAGES).map(type => (
              <TabPanel key={type} value={type.toString()}>
                <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
                  <Accordion
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p:"0.5rem",
                      maxWidth: "40rem"
                    }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel-header"
                        >
                          <Typography align="center" sx={{width: "100%", fontWeight:"bold", fontSize:"1.25rem", color:"primary.main" }}>
                            {`Ajouter un ${type === TYPES_OUVRAGES.LIVRE ? "livre" : "périodique" }`}
                          </Typography>
                      </AccordionSummary>
                      <OuvrageForm type={type} />
                    </Accordion>
                    <Accordion
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p:"0.5rem",
                        maxWidth: "40rem"
                      }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel2-header"
                        >
                          <Typography align="center" sx={{width: "100%", fontWeight:"bold", fontSize:"1.25rem", color:"primary.main" }}>
                            {`Afficher les ${type === TYPES_OUVRAGES.LIVRE ? "livres" : "périodiques" }`}
                          </Typography>
                      </AccordionSummary>
                      <OuvragesList type={type}/>
                    </Accordion>
                </Box>
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </Box>
    </div>
  )
}

export default App
