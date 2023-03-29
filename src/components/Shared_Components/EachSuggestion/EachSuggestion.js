import React from 'react'
import './eachsuggestion.css'

const EachSuggestion = (props) => {
    return (
        <div className='eachsuggestion'>
            <div className='img-wrapper'>
                <img src={props.props.src} alt="" />
            </div>
            <div className='info'>
                <div onClick={() => props.onSearchItemClick(props.props.title)} >{props.props.title} </div>
                <div style={{textAlign:'left'}}>Rs.{props.props.price}</div>
            </div>
        </div>
    )
}

export default EachSuggestion