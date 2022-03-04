import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';




const Cards = (props) => {

    const [allCards, setAllCards] = useState(null);
    const [showCards, setShowCards] = useState(false);
    const [randomCard, setRandomCard] = useState(null);
    const [showRandomCard, setShowRandomCard] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [selected, setSelected] = useState(null);

    // const changeSelected = (card) => {
    //     setSelected(card);
    // }

    const getAllCards = () => {
        setSelected(null);
        axios.get("/api/cards")
            .then(response => {
                setAllCards(response.data);
                setShowCards(!showCards);
                console.log(allCards);
            })
    }


    const getRandomCard = () => {
        if (showCards) {
            setShowCards(!showCards);
        }
        axios.get("/api/cards/random")
            .then(response => {
                setRandomCard(response.data);
                // console.log(response.data)
                if (!showRandomCard) {

                    setShowRandomCard(true);
                }
                console.log(randomCard);
            })
    }

    const handleSearch = (e) => {
        // e.preventDefault();
        if (allCards == null) {
            getAllCards();
        }
        if (!showCards) {
            setShowCards(true);
        }
        if (showRandomCard) {
            setShowRandomCard(false);
        }
        setSearchTerm(e.target.value)
        // console.log(searchTerm)
    }



    return (
        <ThemeProvider theme={props.theme}>
            <div>
                <h1>Tarot Cards</h1>
                <div className="d-flex gap-3 justify-content-center">
                    <Button variant="contained" color="secondary" onClick={getAllCards}>All Cards</Button>
                    <Button variant="contained" color="secondary" onClick={getRandomCard}>Draw Card</Button>
                    <TextField label="Search for a card" color="secondary" onChange={(e) => handleSearch(e)} type="text" name="search" id="" placeholder="Search for a Card" />
                </div>
                <ul className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                    {/* {selected ? <div><Card card = {selected}></Card></div> : <div></div>} */}
                    {showCards ? allCards.filter((item, i) => {
                        return item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    }).map((item, i) => {
                        return (
                            <li className="list-unstyled" key={i}>
                                <Card card={item} selected={selected} setSelected={setSelected} setShowCards = {setShowCards}theme={props.theme}></Card>
                            </li>
                        )
                    })
                        : <p></p>}
                    {showRandomCard ?
                        <li className="list-inline-item">
                            <Card card={randomCard} theme={props.theme}></Card>
                        </li>
                        : <p></p>}
                </ul>
            </div>
        </ThemeProvider>
    )
}


export default Cards;

