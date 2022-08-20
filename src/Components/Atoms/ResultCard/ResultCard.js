import React from 'react'
import './ResultCard.css'

function ResultCard(props) {
    return (
        <div className='ResultCard'>
            <div className='ResultCardShadow'></div>
            <img src={props.image_url}/>
            <div className='ResultCardTitle'>{props.title}</div>
            {/* <div className='ResultCardTitle'>
                {props.title}
                <span>
                <i> (id: {props.mal_id})</i>
                </span>
            </div> */}
        </div>
    )
}

export default ResultCard
