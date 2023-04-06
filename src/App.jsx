import {Box, Button, TextField, Tab} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import OuvragesList from './Components/OuvragesList'
import ExampleForm from './Components/ExampleForm'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Card, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TYPES_OUVRAGES } from './Enums'
import {useState} from 'react'
import OuvrageForm from './Components/OuvrageForm';

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
                  <OuvrageForm type={type} />
                  <OuvragesList type={type}/>
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
