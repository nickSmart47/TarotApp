import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CardDetails from './CardDetails';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, Modal, Box } from '@mui/material';




const Card = props => {

  const [showDetails, setShowDetails] = useState(false);


  const handleClick = () => {
    setShowDetails(!showDetails);
    if (props.selected){
      props.setSelected(props.card);

    }
  }


  if (props.card) {
    return (
      <ThemeProvider theme={props.theme}>
        <div className="d-flex mt-5 justify-content-center align-items-start">
          <div className="d-flex flex-column">
            <h3 className="d-flex justify-content-center align-items-center">{props.card.name} </h3>
            <Button onClick={handleClick}>
              <img src={`./images/Cards/${props.card.nameShort}.png`} className={props.card.upright ? "upright" : "reversed"}></img>
            </Button>

          </div>
          {showDetails ? <div className="mt-3 w-50">
            <CardDetails card={props.card} theme={props.theme} />
          </div> : <></>}

        </div>
      </ThemeProvider>
    )
  }
  else {
    return (
      <></>)
  }
}

Card.propTypes = {}

export default Card;