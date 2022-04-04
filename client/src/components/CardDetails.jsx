import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material'

const CardDetails = props => {
  return (
    <ThemeProvider theme={props.theme}>
      <Accordion className="accordion"
        sx={{
          bgcolor: 'secondary.main'
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="accordion-text">Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordion-text">
            {props.card.desc}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion"
        sx={{
          bgcolor: 'secondary.main'
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="accordion-text">Upright Meaning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordion-text">
            {props.card.meaningUp}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion"
        sx={{
          bgcolor: 'secondary.main'
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="accordion-text">Reversed Meaning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordion-text">
            {props.card.meaningRev}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  )
}

CardDetails.propTypes = {}

export default CardDetails;

