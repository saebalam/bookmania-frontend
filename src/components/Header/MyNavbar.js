import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import filteredProducts from '../../Action_Creators/filteredProducts';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/jquery/dist/jquery'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownMenu from 'react-bootstrap/NavDropdown';
// import NavLink from 'react-bootstrap/NavDropdown';
import { createBrowserHistory } from '@remix-run/router';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faUser, faBagShopping, faCartShopping } from '@fortawesome/free-solid-svg-icons';

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

function MyNavbar(props) {

    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [inputFocus, setInputFocus] = useState(true)
    const [loggedin, setLoggedin] = useState(props.userData)
    const [wishlistQuantity, setWishlistQuantity] = useState([])
    const [cartQuantity, setCartQuantity] = useState([])
    const [searchActive,setSearchActive]=useState(false)
    const dispatch = useDispatch()
    const nav = useNavigate()

    const cartQuantity_ = useSelector(state => state.cartQuantityReducer.cartQuantity)
    const wishlistQuantity_ = useSelector(state => state.wishlistQuantityReducer.wishlistQuantity)


    // if(props.userData==null){
    //     throw new Error('')
    // }

    let button;
    console.log("my navbar userData is", props.userData)
    console.log('loggedin', loggedin)

    useEffect(() => {
        console.log('in useeff');
        setLoggedin(props.userData)
    }, [props.userData])

    // useEffect(() => {
    //     axios.post('/getWishlistItems', { accessToken: localStorage.getItem('accesstoken') },
    //         { headers: { 'Content-Type': 'application/json' } })
    //         .then(
    //             res => {
    //                 console.log("res in wishlist", res.data);
    //                 setWishlistQuantity(res.data)
    //             }
    //         )
    //         .catch(error => {
    //             console.log("error", error)
    //         })

    //         // axios.post('/cart', { accessToken: localStorage.getItem('accesstoken') },
    //         // { headers: { 'Content-Type': 'application/json' } })
    //         // .then(
    //         //     res => {
    //         //         console.log("res in wishlist", res.data);
    //         //         setCartQuantity(res.data)
    //         //     }
    //         // )
    //         // .catch(error => {
    //         //     console.log("error", error)
    //         // })
    // },[])


    const logout = () => {
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('loggedin')
        props.setUser(false)
    }

    const onSearchItemClick = (productName) => {
        console.log('searched clicked is', productName);
        setSearch('')
        nav(`/collections/${productName}`)
        setInputFocus(false)
    }

    useEffect(() => {

        if (search !== '') {
            setSearchActive(true)
            axios.post(`/products/${search}`)
                .then(res => {
                    console.log("filteredres", res.data)
                    setSuggestions([])
                    setSuggestions(res.data)
                    console.log("sugg nav", suggestions);
                })
        } else {
            setSuggestions([])
            setSearchActive(false)
        }
    }, [search])



    if (loggedin == true) {
        console.log('logged is true');
        button = <ul className='navbar-nav ms-auto'>
            <li className='nav-item' style={{ width: '78px', height: '41px', display: 'flex', alignItems: 'center', }}>
                {/* <Link to="/" onClick={logout} className='nav-link' id='navlink'>My Account</Link> */}
                <Dropdown id='nav-link'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        My Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Accessories</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Books</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Computers</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Disks</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Electronics</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Fans</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Games</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Home accessories</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li className='nav-item' style={{ width: '166px', height: '41px', display: 'flex', alignItems: 'center', }}>
                {/* <div style={{ position: 'relative', zIndex: '10', width: '15px', height: '15px', position: 'relative', left: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c7378', color: 'white', borderRadius: '50%' }}>
                    {wishlistQuantity_}
                </div> */}
                <Link to='/wishlist' className='nav-link' id='navlink' style={{ display: 'flex' }}><FontAwesomeIcon style={{ fontSize: '1.5em', width: '25px', height: '25px' }} icon={faBagShopping} /> <span>({wishlistQuantity_})</span>
                </Link>
            </li>
            <li className='nav-item' style={{ width: '57px', height: '41px', display: 'flex', alignItems: 'center', }}>
                {/* <div style={{ position: 'relative', zIndex: '10', width: '15px', height: '15px', position: 'relative', left: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c7378', color: 'white', borderRadius: '50%' }}>
                    {cartQuantity_}
                </div> */}
                <Link to='/cart' className='nav-link' id='navlink' style={{ display: 'flex' }}><FontAwesomeIcon style={{ fontSize: '1.5em', width: '25px', height: '25px' }} icon={faCartShopping} /> <span>({cartQuantity_})</span>
                </Link>
            </li>
        </ul>

    } else {
        button = <ul className='navbar-nav ms-auto' style={{ display: 'flex', alignItems: 'center' }}>
            <li className='nav-item' style={{ width: '60px', height: '41px', display: 'flex', alignItems: 'center', }}>
                <Link to="/login" className='nav-link' id='navlink' style={{ fontWeight: 'bold', fontSize: '16px' }}>Login</Link>
            </li>
            <li className='nav-item' >
                {/* <div style={{ position: 'relative',zIndex:'10', width: '15px', height: '15px', position: 'relative', left: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c7378',color:'white', borderRadius: '50%' }}>
                    {wishlistQuantity_}
                </div> */}
                <Link to='/wishlist' className='nav-link' id='navlink' style={{ display: 'flex' }} ><FontAwesomeIcon style={{ fontSize: '1.5em', width: '25px', height: '25px' }} icon={faBagShopping} /> ({wishlistQuantity_}) </Link>
            </li>
            <li className='nav-item'>
                {/* <div style={{ position: 'relative',zIndex:'10', width: '15px', height: '15px', position: 'relative', left: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c7378',color:'white', borderRadius: '50%' }}>
                    {cartQuantity_}
                </div> */}
                <Link to='/cart' className='nav-link' id='navlink' style={{ display: 'flex' }} ><FontAwesomeIcon style={{ fontSize: '1.5em', width: '25px', height: '25px' }} icon={faCartShopping} /> <span>({cartQuantity_})</span>
                </Link>
            </li>

        </ul>
    }



    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={blackBox}>


            <div style={{ zIndex: '3', border: '2px solid pink' }}>
                <Navbar bg="light" expand="lg" fixed='top' style={{}} >

                    <Navbar.Brand style={{ color: '#ed4a6f' }}><Link to='/' className='navbar-brand' >BookMania</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div id='search' >
                        <input class="form-control mr-sm-2" style={{ position: 'relative', top: '0px' }} type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setInputFocus(true)} />
                        {(suggestions.length > 0 && inputFocus == true) &&
                            <div className='suggestion-box' style={{ position: 'absolute', top: '48.4px', paddingTop: '7px', backgroundColor: 'white', zIndex: "5", width: "76%" }}>
                                <ul style={{ position: 'relative', top: '0px' }}>
                                    {(suggestions.length > 0) &&
                                        suggestions.map(eachSuggestion => {
                                            console.log("each", eachSuggestion);
                                            return <li className='search-li' onClick={() => onSearchItemClick(eachSuggestion)} style={{ color: '#ed4a6f', width: '100%', paddingBottom: '5px' }}>{eachSuggestion} </li>
                                        })
                                    }
                                </ul>

                            </div>
                        }
                    </div>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link> */}
                            {button}
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div>

            {/* {(searchActive) &&
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique at quo adipisci eaque, illum delectus sit nostrum, cupiditate dolor hic sequi. Excepturi eius quam quisquam molestias nobis facere repellendus est sunt eveniet voluptate accusantium assumenda perferendis unde, iste neque ipsam impedit consequuntur officiis? Iure a commodi alias doloribus vitae possimus, corrupti nobis aut at repellat dicta exercitationem, aspernatur, in natus distinctio soluta autem inventore quam dolores atque? Distinctio id, quisquam a ab numquam nobis sunt nemo, optio quos voluptas totam consequuntur aliquam velit exercitationem. Molestiae voluptatum, nobis nesciunt expedita voluptate laboriosam obcaecati doloremque facere modi qui amet, dolorum, doloribus nisi commodi quis. Eum, perspiciatis? Ex hic quam, rerum magni adipisci inventore fugiat nostrum incidunt voluptatum officiis ea tempore impedit in officia odio, perspiciatis cum fuga quidem et iste obcaecati? Asperiores blanditiis, tempore doloremque omnis commodi deleniti eos? Accusamus, ullam? Sapiente odit mollitia eligendi, repellat tempore eos quaerat magni libero sequi, eum iure minima beatae possimus. Earum dolorum numquam rem velit dolor eveniet temporibus odit impedit harum eligendi laboriosam veniam cupiditate tenetur, non iure, reiciendis suscipit cumque corrupti. Eaque quasi delectus, sunt quod voluptatibus eveniet accusantium esse rem quis quaerat cum! Ducimus numquam odio dicta quisquam ipsum neque, optio possimus nisi?
                    <Link to='/login'>Login</Link>
                </div>
            } */}

        </motion.div>
    )
}

export default MyNavbar