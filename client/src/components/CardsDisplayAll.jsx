import React, { useState, useEffect } from "react";
import { ThemeProvider, Grid } from "@mui/material";
import Card from "./Card";
import axios from "axios";

const CardsDisplayAll = (props) => {
  const [allCards, setAllCards] = useState(null);

  const { selected, setSelected } = props;
  const [showCards, setShowCards] = useState(false);
  const { searchTerm, setSearchTerm } = props;
  const { previousClickedItemPos, setPreviousClickedItemPos } = props;
  const { refs } = props;
  const { showDetails, setShowDetails } = props;
  const { shuffled, setShuffled } = props;

  useEffect(() => {
    getAllCards();
    console.log(allCards);
  }, []);

  const getAllCards = () => {
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

  return (
    <>
      {showCards ? (
        allCards
          .filter((item, i) => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
                // ref={(ref) => (refs[item.id] = ref)}
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
    </>
  );
};

export default CardsDisplayAll;
