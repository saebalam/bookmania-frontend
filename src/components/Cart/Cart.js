
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './cart.css'
import { Link, Navigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import card from '../../Assets/Images/card.jpg'
import empty_cart from '../../Assets/Images/empty_cart2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion'
import { cartQuantityDec, cartQuantityClear } from '../../Action_Creators/cartQuantity'
import Login from '../Login/Login';
import { removeFromcart, increaseQuantity, decreaseQuantity } from '../../Action_Creators/cartActions';


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

const Cart = () => {
    const nav = useNavigate()
    const [cartItems, setCartItems] = useState([])
    // const [cartSize,setCartSize]=useState(cartItems.length)
    const [refreshCart, setRefreshCart] = useState(cartItems.length)
    const [quantity, setQuantity] = useState(0)                            //to track change in quantity for re render
    const [loggedin, setLoggedin] = useState(localStorage.getItem('loggedin'))
    const dispatch = useDispatch()
    const discount = 18
    var arr = []
    const cart = useSelector(state => state.cartReducer.cart)

    console.log('cart', cart)

        let totalPrice=0
        cart.map(cartItem => {
            totalPrice= (parseFloat(cartItem.price) * parseFloat(cartItem.quantity))
        })



    // useEffect(() => {
    //     console.log('useeffect called in cart')
    //     axios.post('/cart', { accessToken: localStorage.getItem('accesstoken') },
    //         { headers: { 'Content-Type': 'application/json' } })
    //         .then(
    //             res => {
    //                 console.log("res", res.data);
    //                 setCartItems(res.data)
    //                 setRefreshCart(cartItems.length + 1)
    //             }
    //         )
    //         .catch(error => {
    //             console.log("error", error)
    //             // nav('/login')
    //             // window.history.pushState({}, undefined, "/cart");
    //         })

    //     axios.get('/getTotalPrice')
    //         .then(res => {
    //             var total = 0
    //             res.data.map(item => {
    //                 total += item.quantity * parseInt(item.price)
    //                 setTotalPrice(total)
    //             })

    //         })

    // }, [refreshCart, quantity, loggedin])

    // const decreaseQuantity = (id) => {
    //     console.log(id)
    //     const quan = cartItems.filter(cartItem => cartItem.id == id)
    //     console.log('quan ', quan);
    //     if (quan[0].quantity > 1) {
    //         axios.post(`/decreaseCartQuantity/${id}`)
    //             .then(setQuantity(quantity + 1))
    //         dispatch(cartQuantityDec({ type: 'DECREASE_QUANTITY' }))
    //     }
    // }

    const increaseQuantityHandler = (_id) => {
        dispatch(increaseQuantity(_id))
    }

    const decreaseQuantityHandler = (_id) => {
        dispatch(decreaseQuantity(_id))
    }

    const handleRemoveFromCart = (_id) => {
        dispatch(removeFromcart(_id))
    }

    return (
        <motion.div
            className="absolute z-50 w-full"
            initial="initial"
            animate="animate"
            variants={blackBox}
            style={{position:'absolute', width:'100vw',top:'125px'}}>

            {/* {(loggedin == 'true') */}
            {/* ?  */}
            <div className='main-div' style={{ background: '#f8f8f8' }}>
                {(cart.length === 0)
                    ?
                    <div style={{ position:'absolute',top:'100px',width:'100vw', margin: "0 auto" }}>
                        <div>
                            <img src={empty_cart} alt="" style={{ background: 'white', height: '22rem' }} />
                        </div>
                        <Link to='/' style={{ color: 'black' }}>Let's go Shopping !!! </Link>
                    </div>
                    :
                    <div className=''>
                        <div className='submain-div'>
                            <table>
                                <tr className='table-heading'>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>


                                {cart.map((cartItem) => {
                                    return <tr key={cartItem.id} className="cartCard">
                                        <td className='td0'>
                                            <div >
                                                <img src={card} alt="" />
                                            </div>
                                        </td>
                                        <td className='td1'>
                                            {/* {console.log("props", props.props)} */}

                                            <div className="my-list-group-flush">
                                                <div>{cartItem.title}</div>
                                                <div style={{ display: 'flex' }}>
                                                    {
                                                        new Array(parseInt(cartItem.rating)).fill(0).map(item => {
                                                            return <div>&#9733;</div>
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        </td>


                                        <td className='td3'>
                                            <div className='amount'>
                                                &#8377; {cartItem.price}
                                            </div>
                                        </td>

                                        <td className='td2'>
                                            <div style={{ display: 'flex' }} className="quantity">
                                                <FontAwesomeIcon icon={faSquareMinus} onClick={() => decreaseQuantityHandler(cartItem._id)} />
                                                <input type="text" name="" id="" value={cartItem.quantity} style={{ width: '45px', lineHeight: '3px', margin: "0px 5px" }} />
                                                <button onClick={() => increaseQuantityHandler(cartItem._id)}><FontAwesomeIcon icon={faSquarePlus} /></button>
                                            </div>
                                        </td>

                                        <td className='td4'>
                                            <div >
                                                <button onClick={() => handleRemoveFromCart(cartItem._id)} className="removeBtn"><FontAwesomeIcon icon={faTrash} /> </button>
                                            </div>
                                        </td>



                                    </tr>
                                }
                                )}

                            </table>

                            <div className='right'>
                                <div className="coupon">
                                    <label htmlFor="couponCode">Have a coupon ?</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="text" name="" id="" placeholder='Coupon Code' />
                                        <button className='btn btn-primary s-sm'>APPLY</button>
                                    </div>
                                </div>
                                <div className="payment">
                                    <div>
                                        <p>Total Price :</p>
                                        <p>&#8377; {totalPrice}</p>
                                    </div>
                                    <div>
                                        <p>Discount</p>
                                        <p>&#8377; {discount}</p>
                                    </div>
                                    <div>
                                        <p>Total</p>
                                        <p>&#8377; {totalPrice - discount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='purchase'>
                            <Link exact to='/'>Continue Shopping</Link>
                            <button className='btn btn-primary'>Purchase</button>
                        </div>

                    </div>



                }
            </div>
            {/* : <Navigate to='/products' replace={true}/>
            } */}

        </motion.div>
    )
}

export default Cart