import React from 'react'
import './newsletter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <div className='left'>
            <h5 style={{margin:'0'}}>SIGN UP TO NEWSLETTER</h5>
        </div>
        <div className='right'>
            <input style={{paddingLeft:'10px'}} type="text" name="" id="" placeholder='Enter your email' />
            <button>Send</button>
        </div>
    </div>
  )
}

export default NewsLetter