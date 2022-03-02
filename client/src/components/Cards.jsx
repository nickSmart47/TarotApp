import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';




const Cards = (props) => {

    const [allCards, setAllCards] = useState(null);
    const [showCards, setShowCards] = useState(false);
    const [randomCard, setRandomCard] = useState(null);
    const [showRandomCard, setShowRandomCard] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");



    const getAllCards = () => {
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
                setShowRandomCard(!showRandomCard);
                console.log(randomCard);
            })
    }

    const handleSearch = (e) => {
        // e.preventDefault();
        if (allCards == null){
            getAllCards()
        }
        setSearchTerm(e.target.value)
        // console.log(searchTerm)
    }



    return (
        <div>
            <h1>Cards</h1>
            <button onClick={getAllCards}>Show All Cards!</button>
            <button onClick={getRandomCard}>Show Random Card</button>
                <input onChange={(e) => handleSearch(e)} type="text" name="search" id="" placeholder = "Search for a Card" />

            <ul className="list-inline mt-2 ">
                {showCards ? allCards.filter((item, i)=>{
                    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    }).map((item, i) => {
                        return (
                            <li className="list-inline-item" key={i}>
                                <Card card={item}></Card>
                            </li>
                        )
                    })
                : <p></p>}
                {randomCard ?
                    <li className="list-inline-item">
                        <Card card={randomCard}></Card>
                    </li>
                    : <p></p>}
            </ul>
        </div>
    )
}


export default Cards;

