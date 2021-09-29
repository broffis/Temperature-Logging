import React from 'react'
import { Link } from 'react-router-dom'

import { FridgeCardProps } from '../assets/types';

export const FridgeCard = ({ id, name, location, latestTemp }: FridgeCardProps ) => {
  return (
    <Link to={`/fridge/${id}`}className="fridge-card">
      <div className="fridge-card__header">
        <p className="fridge-card__name">{ name }</p>
        <p className="fridge-card__location">{ location }</p>
      </div>
      { 
        latestTemp?.temperature ? (
          <div className="fridge-card__info">
            <p className="fridge-card__date">{ latestTemp.logTime }:</p>
            <p className="fridge-card__temp">{ latestTemp.temperature }&#xb0;</p>
          </div>
        ) : (
          <p className="fridge-card__no-temp">No temperature logged</p>
        )
      }
    </Link>
  )
}

