import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material';

const Card = props => {

  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    // console.log(props)
    setShowDetails(!showDetails);
    // props.setSelected(props.card)
    // console.log("selected card is", props.selected.name)
    // props.setShowCards(false);
    console.log(props.card);
  }

  if (props.card) {
    return (
      <ThemeProvider theme={props.theme}>
        <div className="d-flex mt-5 justify-content-center align-items-start">
          <div className="d-flex flex-column">
            <h3 className="d-flex justify-content-center align-items-center">{props.card.name} </h3>
            {props.card.upright ? <p>(Upright)</p>: <p>(Reversed)</p> }
            <Button onClick = {handleClick}>
            <img src={`./images/Cards/${props.card.nameShort}.png`} className = {props.card.upright ? "upright" : "reversed"}></img>
            </Button>
        
          </div>

            {showDetails ? <div className = "mt-3 w-50">
            <Accordion className="accordion">
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
            <Accordion className="accordion">
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
            <Accordion className="accordion">
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
          </div> : <div></div>}
          
        </div>
      </ThemeProvider>
    )
  }
  else {
    return (
      <div></div>)
  }
}

Card.propTypes = {}

export default Card;



