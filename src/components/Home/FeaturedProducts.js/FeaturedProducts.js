import React from 'react'
import './FeaturedProducts.css'
import { Link } from 'react-router-dom'
import card from '../../../Assets/Images/card.jpg'
import card2 from '../../../Assets/Images/card2.jpg'
import card3 from '../../../Assets/Images/card3.jpg'
import card4 from '../../../Assets/Images/card4.jpg'
// import card5 from '../../Assets/Images/card5.jpg'
// import card6 from '../../Assets/Images/card6.jpg'
// import card7 from '../../Assets/Images/card7.jpg'
// import card8 from '../../Assets/Images/card2.jpg'

const FeaturedProducts = () => {
    return (
        <div className='row'>
            <div className='row1'>
                <div><Link to={{pathname: `/productsList/jeans`}}><img src={card} alt="" /></Link>  </div>
                <div><Link to={{pathname: `/productsList/tshirt`}}> <img src={card2} alt="" /></Link></div>
                <div><Link to={{pathname: `/productsList/shoes`}}> <img src={card3} alt="" /></Link></div>
                <div><Link to={{pathname: `/productsList/1`}}> <img src={card4} alt="" /></Link></div>
            </div>
            <div className='row2'>
                <div><Link to={{pathname: `/productsList/1`}}> <img src={card} alt="" /> </Link></div>
                <div><Link to={{pathname: `/productsList/1`}}> <img src={card2} alt="" /></Link></div>
            </div>
            <div className='row3'>
                <div className='col1'>
                    <div><Link to={{pathname: `/productsList/1`}}> <img src={card} alt="" /> </Link></div>
                </div>
                <div className='col2'>
                    <div> <Link to={{pathname: `/productsList/1`}}><img src={card} alt="" /></Link> </div>
                    <div><Link to={{pathname: `/productsList/1`}}> <img src={card2} alt="" /></Link></div>
                </div>
                <div className='col3'>
                    <div><Link to={{pathname: `/productsList/1`}}> <img src={card3} alt="" /></Link> </div>
                    <div><Link to={{pathname: `/productsList/1`}}> <img src={card2} alt="" /> </Link></div>
                </div>

            </div>
        </div>
    )
}

export default FeaturedProducts