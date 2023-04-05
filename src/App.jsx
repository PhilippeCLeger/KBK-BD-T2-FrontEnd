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

function App() {
  const [type, setType] = useState(TYPES_OUVRAGES.LIVRE.toString());
  return (
    <div className="App">
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <TabContext value={type}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(e, val) => setType(val.toString())} aria-label="lab API tabs example">
              <Tab label="Livres" value={TYPES_OUVRAGES.LIVRE.toString()} />
              <Tab label="Périodiques"  value={TYPES_OUVRAGES.PÉRIODIQUE.toString()} />
            </TabList>
          </Box>
          {Object.values(TYPES_OUVRAGES).map(type => (
            <TabPanel value={type.toString()}>
              <OuvragesList type={type}/>
              <ExampleForm/>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>
  )
}

export default App
