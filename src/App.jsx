import {Box, Button, TextField} from '@mui/material'
import OuvragesList from './Components/OuvragesList'
import ExampleForm from './Components/ExampleForm'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Card, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {
  return (
    <div className="App">
      <OuvragesList />
      <ExampleForm />
    </div>
  )
}

export default App
