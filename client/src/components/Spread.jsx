import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Card from './Card';
import { TextField, ThemeProvider, Theme, Button } from '@mui/material';
import axios from 'axios';

const Spread = props => {

    const [intention, setIntention] = useState("");
    const [cardsInSpread, setCardsInSpread] = useState([]);
    const [numCards, setNumCards] = useState(0);
    const [showSpread, setShowSpread] = useState(false);
    const [notes, setNotes] = useState("");

    const [currentCard, setCurrentCard] = useState(null);



    const saveSpread = (e) => {
        e.preventDefault();

        let spreadObj = {
            intention,
            numCards,
            notes,
            cardsInSpread,
            credentials: "include"
        }

        axios.post("/api/spreads", spreadObj)
            .then(res => {
                console.log("response after post request --->", res)

                if (res.data.errors) {
                    console.log('errors here --->', res.data.errors)
                }
                else {
                    console.log("success!")
                }
            })
            .catch(err => {
                console.log("errors with post request", err)
                console.log(spreadObj)
            })
    }

    const handleNumCards = (e) => {
        setNumCards(e.target.value);
    }

    const handleSpreadButton = () => {
        if (cardsInSpread != []) {
            setCardsInSpread([]);
        }
        let numCardsAsInt = parseInt(numCards)
        generateSpread(numCardsAsInt)
    }

    const generateSpread = (numCards) => {
        for (let i = 0; i < numCards; i++) {
            setCurrentCard(drawCard());
        }
        // setCardsInSpread(cardsInSpread => [...cardsInSpread, currentCard]);
        setShowSpread(true);
    }

    const drawCard = () => {
        let newCard;
        axios.get("/api/cards/random")
            .then(response => {
                newCard = response.data;
                // console.log(newCard)
                setCurrentCard(response.data);

            })
            .then(() => {
                console.log('new card is', newCard);
                console.log('current cards in spread are', cardsInSpread)
                if (cardsInSpread.includes(newCard)) {
                    console.log('duplicate card found');
                }
            })
            .then(() => {
                setCardsInSpread(cardsInSpread => [...cardsInSpread, newCard]);

            })
            // setCardsInSpread(cardsInSpread => [...cardsInSpread, response.data]);
            .catch(err => console.log('error on draw card', err));
    }

    return (
        <ThemeProvider theme={props.theme}>
            <div className="mt-3">
                <h1>Spread</h1><div className="d-flex align-items-center justify-content-center gap-3">

                    <div className="d-flex gap-3 align-items-center justify-content-center mt-3 flex-column">
                        <TextField label="Set your intention" color="secondary" onChange={(e) => setIntention(e.target.value)} type="text" name="intention" id="" placeholder="Set your intention" />
                        <TextField label="Number of Cards" color="secondary" onChange={(e) => handleNumCards(e)} type="number" name="intention" id="" placeholder="Number of Cards" />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSpreadButton}>
                            Draw Cards
                        </Button>
                    </div>
                    <div className="">
                        {showSpread ?
                            <div className="d-flex flex-column gap-3">
                                <TextField label="Enter your notes" multiline rows={5} color="secondary" onChange={(e) => setNotes(e.target.value)} type="textarea" name="notes" id="" placeholder="Enter your notes here" />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={saveSpread}>
                                    Save Spread
                                </Button>
                            </div>
                            : <></>}
                    </div>
                </div>
                <ul className="d-flex justify-content-center align-items-center flex-wrap ">
                    {showSpread ? cardsInSpread.map((item, i) => {
                        return (
                            <>
                                <li className="list-inline-item" key={i}>
                                    <Card card={item} theme={props.theme}></Card>
                                </li>
                            </>
                        )
                    })
                        : <p></p>}


                </ul>

            </div>
        </ThemeProvider>
    )
}

Spread.propTypes = {}

export default Spread