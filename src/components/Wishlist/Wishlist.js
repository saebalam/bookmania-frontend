import axios from 'axios'
import React, { useEffect, useState } from 'react'
import card from '../../Assets/Images/card.jpg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import empty_wishlist from '../../Assets/Images/empty_wishlist.png'
import './wishlist.css'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion'
import Login from '../Login/Login';

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

const Wishlist = () => {
    const nav = useNavigate()
    const [wishlistItems, setWishlistItems] = useState([])
    const [refreshWishlist, setRefreshWishlist] = useState(0)
    const [loggedin, setLoggedin] = useState(localStorage.getItem('loggedin'))

    useEffect(() => {
        axios.post('getWishlistItems', { accessToken: localStorage.getItem('accesstoken') },
            { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                setWishlistItems(res.data)
            })
            .catch(error => {
                console.log("error", error)
                // nav('/login')
                // window.history.pushState({}, undefined, "/wishlist");
            })
    }, [refreshWishlist, loggedin])

    const removeFromWishlist = (id) => {
        console.log("id wish", id);
        axios.post(`removeFromWishlist/${id}`)
            .then(setRefreshWishlist(refreshWishlist + 1))
    }

    return (
        <motion.div
            className="relative z-50 w-full"
            initial="initial"
            animate="animate"
            variants={blackBox}>

            {(loggedin == 'true')
                ? <div>
                    <div className='myBreadcrumb'>
                        <Link to='/' className='link'>Home / </Link><Link to='/productsList/1' className='link'>Products / </Link><span> ProductName</span>
                    </div>

                    {(wishlistItems.length == 0) &&
                        <div style={{ marginTop: "70px" }}>
                            <img src={empty_wishlist} alt="" /><br />
                            <Link to='/' style={{ color: 'black' }}>Let's Go Shoppping</Link>
                        </div>
                    }
                    {(wishlistItems.length > 0) &&
                        <div className='wishlist-table'>
                            <table>
                                <thead style={{ textAlign: 'left' }}>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Stock status</th>
                                    <th>btn</th>
                                </thead>
                                <tbody>
                                    {wishlistItems.map(item => {
                                        return <tr>
                                            <td><div className='img-div'><img className='product-img' src={card} alt="" /></div></td>
                                            <td>{item.price}</td>
                                            <td>In Stock</td>
                                            <td><button title="Remove from Wishlist" onClick={() => removeFromWishlist(item.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                : <div>{nav('/login')}</div>
            }

        </motion.div>
    )
}

export default Wishlist