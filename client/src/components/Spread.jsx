import React, { useState, useEffect } from "react";
import Card from "./Card";
import CardDetails from "./CardDetails";
import {
  TextField,
  ThemeProvider,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import axios from "axios";

const Spread = (props) => {
  const [intention, setIntention] = useState("");
  const [cardsInSpread, setCardsInSpread] = useState([]);
  const [numCards, setNumCards] = useState(0);
  const [showSpread, setShowSpread] = useState(false);
  const [notes, setNotes] = useState("");

  const [selected, setSelected] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  const [count, setCount] = useState(0);

  const [newSpread, setNewSpread] = useState(false);

  const [allowReversals, setAllowReversals] = useState(false);

  useEffect(() => {
    if (count === 0) {
    } else {
      if (
        cardsInSpread.some((element) => {
          if (element.id === currentCard.id) {
            console.log("current card is a duplicate", currentCard.name);
            return true;
          }
        })
      ) {
        drawCard();
      } else
        setCardsInSpread((cardsInSpread) => [...cardsInSpread, currentCard]);
    }
  }, [count, newSpread]);

  const saveSpread = (e) => {
    e.preventDefault();

    let spreadObj = {
      intention,
      numCards,
      notes,
      cardsInSpread,
      credentials: "include",
    };

    axios
      .post("/api/spreads", spreadObj)
      .then((res) => {
        console.log("response after post request --->", res);

        if (res.data.errors) {
          console.log("errors here --->", res.data.errors);
        } else {
          console.log("success!");
        }
      })
      .catch((err) => {
        console.log("errors with post request", err);
        console.log(spreadObj);
      });
  };

  const handleNumCards = (e) => {
    setNumCards(e.target.value);
  };

  const handleSpreadButton = () => {
    setNewSpread(!newSpread);
    if (cardsInSpread !== []) {
      setCardsInSpread([]);
    }
    if (count > 0) {
      setCount(0);
    }
    let numCardsAsInt = parseInt(numCards);
    generateSpread(numCardsAsInt);
  };

  const generateSpread = (numCards) => {
    for (let i = 0; i < numCards; i++) {
      drawCard();
    }
    setShowSpread(true);
  };

  const handleAllowReversals = (e) => {
    if (e.target.checked) setAllowReversals(true);
    else setAllowReversals(false);
    console.log({ allowReversals });
  };

  const drawCard = () => {
    if (allowReversals) {
      axios
        .get("/api/cards/random")
        .then((response) => {
          let card = response.data;
          setCurrentCard(card);
        })
        .then(() => {
          setCount((count) => count + 1);
        });
    } else {
      axios
        .get("/api/cards/random/upright")
        .then((response) => {
          let card = response.data;
          setCurrentCard(card);
        })
        .then(() => {
          setCount((count) => count + 1);
        });
    }
  };

  return (
    <ThemeProvider theme={props.theme}>
      <div className="mt-3">
        <h1>Spread</h1>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <div className="d-flex gap-3 align-items-center justify-content-center mt-3 flex-column">
            <TextField
              label="Set your intention"
              color="secondary"
              onChange={(e) => setIntention(e.target.value)}
              type="text"
              name="intention"
              id=""
              placeholder="Set your intention"
            />
            <TextField
              label="Number of Cards"
              color="secondary"
              onChange={(e) => handleNumCards(e)}
              type="number"
              name="intention"
              id=""
              placeholder="Number of Cards"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleAllowReversals} />}
              label="Allow Reversals?"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSpreadButton}
            >
              Draw Cards
            </Button>
          </div>
          <div className="">
            {showSpread ? (
              <div className="d-flex flex-column gap-3">
                <TextField
                  label="Enter your notes"
                  multiline
                  rows={5}
                  color="secondary"
                  onChange={(e) => setNotes(e.target.value)}
                  type="textarea"
                  name="notes"
                  id=""
                  placeholder="Enter your notes here"
                />
                {/* <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={saveSpread}>
                                    Save Spread
                                </Button> */}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Grid
          className="d-flex justify-content-center align-items-center flex-wrap "
          container
          direction="row"
          justifyContent="start"
          alignItems="start"
          wrap="wrap"
        >
          {showSpread ? (
            cardsInSpread.map((item, i) => {
              return (
                <>
                  <Grid
                   item
                   xs={item && item == selected ? 12 : 4}
                   sm={4}
                   md={4}
                   lg={item && item == selected ? 12 : 3}
                    className="Gridst-inline-item"
                    key={i}
                  >
                    <Card
                      
                      card={item}
                      theme={props.theme}
                      selected={selected}
                      setSelected={setSelected}
                    ></Card>
                  </Grid>
                </>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Spread;
