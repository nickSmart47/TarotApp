import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import { Button, TextField } from "@mui/material";
import { ThemeProvider, Grid } from "@mui/material";

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

  const refs = {};
  
  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    if (selected) {
      let refId = selected.id;
      scrollToCardRef(refId);
      setPreviousClickedItemPos(selected.id);
    } else scrollToCardRef(previousClickedItemPos);
  }, [selected]);

  const scrollToCardRef = (refId) => {
    if (refs) {
        if (refs[refId]){
            refs[refId].scrollIntoView({ behavior: "smooth" });
        }
    }
  };

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
          justifyContent="center"
          alignItems="center"
        >
          {showCards ? (
            allCards
              .filter((item, i) => {
                return item.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              })
              .map((item, i) => {
                return (
                    <Grid
                      item
                      xs={item && item == selected ? 12 : 4}
                      sm={4}
                      md={4}
                      lg={item && item == selected ? 12 : 3}
                      key={item.id}
                      ref={(ref) => (refs[item.id] = ref)}
                    >
                      <Card
                        card={item}
                        selected={selected}
                        setSelected={setSelected}
                        setShowCards={setShowCards}
                        previousClickedItemPos={previousClickedItemPos}
                        setPreviousClickedItemPos={setPreviousClickedItemPos}
                        theme={props.theme}
                        showDetails={showDetails}
                        setShowDetails={setShowDetails}
                      ></Card>
                    </Grid>
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
