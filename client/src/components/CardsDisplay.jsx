import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import CardDetails from "./CardDetails";
import { Button, TextField } from "@mui/material";
import { ThemeProvider, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

const CardsDisplay = (props) => {
  const [allCards, setAllCards] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [randomCard, setRandomCard] = useState(false);
  const [showRandomCard, setShowRandomCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [showSelected, setShowSelected] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const [previousClickedItemPos, setPreviousClickedItemPos] = useState(0);

  /* import useLocation so that useEffect can be invoked on-route-change */
  const location = useLocation();

  /* basically pass this to the list items so you can update position on-click */
  function handleClickList(element) {
    console.log("here, offset is", element);
    setPreviousClickedItemPos(element);
  }

  const cardRef = useRef(null);

//   useEffect(() => {
//     if (selected) {
//         cardRef.current.focus();
//     }
// }, [selected]);


  const getAllCards = () => {
    setSelected(null);
    setShowRandomCard(false);
    if (!shuffled) {
      axios.get("/api/cards").then((response) => {
        setAllCards(response.data);
        if (!showCards) {
          setShowCards(true);
        }
      });
    } else {
      axios.get("/api/cards/shuffled").then((response) => {
        setAllCards(response.data);
        if (!showCards) {
          setShowCards(true);
        }
      });
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);
  const getRandomCard = () => {
    if (showCards) {
      setShowCards(!showCards);
    } else if (showSelected) {
      setShowSelected(false);
    }
    axios.get("/api/cards/random/upright").then((response) => {
      setRandomCard(response.data);
      if (!showRandomCard) {
        setShowRandomCard(true);
      }
    });
  };

  const shuffleCards = () => {
    setShuffled(true);
    getAllCards();
  };

  const allCardsClickHandler = () => {
    setShuffled(false);
    getAllCards();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (allCards == null) {
      getAllCards();
    }
    if (!showCards) {
      setShowCards(true);
    }
    if (showRandomCard) {
      setShowRandomCard(false);
    }
    setSearchTerm(e.target.value);
  };

  return (
    <ThemeProvider theme={props.theme}>
      <div>
        <div className="d-flex gap-3 justify-content-center mt-3">
          <Button
            variant="contained"
            color="secondary"
            onClick={allCardsClickHandler}
          >
            All Cards
          </Button>
          <Button variant="contained" color="secondary" onClick={shuffleCards}>
            Shuffle Cards
          </Button>
          <Button variant="contained" color="secondary" onClick={getRandomCard}>
            Draw Card
          </Button>
          <TextField
            label="Search for a card"
            color="secondary"
            onChange={(e) => handleSearch(e)}
            type="text"
            name="search"
            id=""
            placeholder="Search for a Card"
          />
        </div>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 3 }}
          //   direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {selected && showSelected && !showCards ? (
            <li className="list-inline-item">
              <Card card={selected} theme={props.theme}></Card>
            </li>
          ) : (
            <></>
          )}
          {showCards ? (
            allCards
              .filter((item, i) => {
                return item.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              })
              .map((item, i) => {
                return (
                  <>
                    <Grid
                      item
                      xs={item && item == selected ?  12 : 4}
                      sm={4}
                      md={4}
                      lg={item && item == selected ? 12 :3}
                      key={i}
                      ref = {cardRef}
                    >
                      <Card
                        card={item}
                        selected={selected}
                        setSelected={setSelected}
                        setShowCards={setShowCards}
                        previousClickedItemPos={previousClickedItemPos}
                        setPreviousClickedItemPos={setPreviousClickedItemPos}
                        theme={props.theme}
                        handleClickList={handleClickList}
                        showDetails={showDetails}
                        setShowDetails={setShowDetails}
                      ></Card>
                    </Grid>
                    {/* {selected == item ? (
                      <Grid item xs={6} md={8}>
                        <CardDetails card={item} theme={props.theme} />
                      </Grid>
                    ) : (
                      <></>
                    )} */}
                  </>
                );
              })
          ) : (
            <></>
          )}
          {showRandomCard ? (
            <>
              <Grid item xs={12} md={12}>
                <Card
                  card={randomCard}
                  theme={props.theme}
                  selected={selected}
                  setSelected={setSelected}
                ></Card>
              </Grid>
              {/* {selected == randomCard ? (
                <Grid item xs={7} md={8}>
                  <CardDetails card={randomCard} theme={props.theme} />
                </Grid>
              ) : (
                <></>
              )} */}
            </>
          ) : (
            <></>
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default CardsDisplay;
