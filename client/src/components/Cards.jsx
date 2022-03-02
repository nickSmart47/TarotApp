import React, { useState, useEffect } from 'react'
import axios from 'axios';




const Cards = (props) => {

    const [allCards, setAllCards] = useState(null);
    const [showCards, setShowCards] = useState(false);

    const getAllCards = () => {
        setShowCards(true);
        console.log(allCards)
    }

    useEffect(() => {
        axios.get("/api/cards")
            .then(response => {
                setAllCards(response.data)
            })
    }, []);


    return (
        <div>
            <h1>Cards</h1>
            <button onClick={getAllCards}>Show Cards!</button>
            <ul className="list-inline mt-2 ">
                {showCards ? allCards.map((item, i) => {
                    return (
                            <li className = "list-inline-item" key={i}>
                                <p>{item.name}</p>
                                <img className="w-50" src={`./images/Cards/${item.nameShort}.png`}></img>
                            </li>
                    )
                }) : <p></p>}
                </ul>
        </div>
    )
}


export default Cards;

