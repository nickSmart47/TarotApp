import React, { useState } from "react";
import PropTypes from "prop-types";
import CardDetails from "./CardDetails";
import { Button } from "@mui/material";
import { ThemeProvider, Grid } from "@mui/material";

const Card = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const { selected, setSelected } = props;
  const { previousClickedItemPos, setPreviousClickedItemPos } = props;

  const { handleClickList } = props;

  const handleClick = () => {
    if (!showDetails) setShowDetails(true);
    else setShowDetails(false);
    if (selected == props.card) {
      setSelected(null);
    } else setSelected(props.card);
  };

  if (props.card) {
    return (
      <ThemeProvider theme={props.theme}>
        <Grid
          className="mt-3"
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
        >
          <Grid item xs={12} md={showDetails ? 4: 12} className="d-flex flex-column">
            <h3 className="d-flex justify-content-center align-items-center">
              {props.card.name}{" "}
            </h3>
            <Button onClick={handleClick}>
              <img
                src={`./images/Cards/${props.card.nameShort}.png`}
                className={
                  props.card.upright
                    ? "upright card-image"
                    : "reversed card-image"
                }
              ></img>
            </Button>
          </Grid>
          {showDetails ? (
            <Grid item xs={12} md={showDetails ? 6: 12}>
              <CardDetails card={props.card} theme={props.theme} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </ThemeProvider>
    );
  } else {
    return <></>;
  }
};

Card.propTypes = {};

export default Card;
