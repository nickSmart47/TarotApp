import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CardDetails from './CardDetails';
import { Button } from '@mui/material';
import { ThemeProvider, Grid } from '@mui/material';




const Card = props => {

  const [showDetails, setShowDetails] = useState(false);


  const handleClick = () => {
    setShowDetails(!showDetails);
    props.setSelected(props.card)
  }


  if (props.card) {
    return (
      <ThemeProvider theme={props.theme}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          wrap = "wrap"
          >
          <Grid item xs={12} md = {12} className="d-flex flex-column">
            <h3 className="d-flex justify-content-center align-items-center">{props.card.name} </h3>
            <Button onClick={handleClick}>
              <img src={`./images/Cards/${props.card.nameShort}.png`} className={props.card.upright ? "upright card-image" : "reversed card-image"}></img>
            </Button>
          </Grid>
          {showDetails ? 
            <CardDetails card={props.card} theme={props.theme} />
            : <></>}
        </Grid>
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