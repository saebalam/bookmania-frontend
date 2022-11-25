import React from 'react'
import './FeaturedProducts.css'
import { Link } from 'react-router-dom'
import card from '../../../Assets/Images/card.jpg'
import card2 from '../../../Assets/Images/card2.jpg'
import card3 from '../../../Assets/Images/card3.jpg'
import card4 from '../../../Assets/Images/card4.jpg'
import { motion } from "framer-motion"
// import card5 from '../../Assets/Images/card5.jpg'
// import card6 from '../../Assets/Images/card6.jpg'
// import card7 from '../../Assets/Images/card7.jpg'
// import card8 from '../../Assets/Images/card2.jpg'

const blackBox = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
};

const FeaturedProducts = () => {
    return (
        <motion.div className='row' initial="initial"
            animate="animate"
            variants={blackBox}>
            <div className='row1'>
                <div><Link to={{ pathname: `/collections/Bedsheets` }}><img src={card} alt="" /></Link>  </div>
                <div><Link to={{ pathname: `/collections/tshirt` }}> <img src={card2} alt="" /></Link></div>
                <div><Link to={{ pathname: `/collections/shoes` }}> <img src={card3} alt="" /></Link></div>
                <div><Link to={{ pathname: `/collections/1` }}> <img src={card4} alt="" /></Link></div>
            </div>
            <div className='row2'>
                <div><Link to={{ pathname: `/collections/1` }}> <img src={card} alt="" /> </Link></div>
                <div><Link to={{ pathname: `/collections/1` }}> <img src={card2} alt="" /></Link></div>
            </div>
            <div className='row3'>
                <div className='col1'>
                    <div><Link to={{ pathname: `/collections/1` }}> <img src={card} alt="" /> </Link></div>
                </div>
                <div className='col2'>
                    <div> <Link to={{ pathname: `/collections/1` }}><img src={card} alt="" /></Link> </div>
                    <div><Link to={{ pathname: `/collections/1` }}> <img src={card2} alt="" /></Link></div>
                </div>
                <div className='col3'>
                    <div><Link to={{ pathname: `/collections/1` }}> <img src={card3} alt="" /></Link> </div>
                    <div><Link to={{ pathname: `/collections/1` }}> <img src={card2} alt="" /> </Link></div>
                </div>

            </div>
        </motion.div>

    )
}

export default FeaturedProducts