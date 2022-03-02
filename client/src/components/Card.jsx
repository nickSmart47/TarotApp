import React from 'react'
import PropTypes from 'prop-types'

const Card = props => {
  if (props.card) {
    return (
      <div>
        <li className="list-inline-item">
          <p>{props.card.name}</p>
          <img className="w-50" src={`./images/Cards/${props.card.nameShort}.png`}></img>
        </li>
      </div>
    )
  }
  else {
    return (
      <div></div>)
  }
}

Card.propTypes = {}

export default Card;