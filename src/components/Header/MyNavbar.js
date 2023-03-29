import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import filteredProducts from '../../Action_Creators/filteredProducts';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/jquery/dist/jquery'
import { useAuth0 } from '@auth0/auth0-react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown, NavDropdown, Form, Button } from 'react-bootstrap';
// import DropdownMenu from 'react-bootstrap/NavDropdown';
// import NavLink from 'react-bootstrap/NavDropdown';
import { createBrowserHistory } from '@remix-run/router';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faUser, faBagShopping, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import EachSuggestion from '../Shared_Components/EachSuggestion/EachSuggestion';

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
    const [suggestions, setSuggestions] = useState([{
        id: 1,
        title: "Lenovo",
        src: 'https://unsplash.com/photos/Px0X7g1mc8k',
        rating: 4,
        price: 250,
        category: 'laptop'
    }])
    const [inputFocus, setInputFocus] = useState(true)
    const [loggedin, setLoggedin] = useState(localStorage.getItem('loggedin'))
    const [wishlistQuantity, setWishlistQuantity] = useState([])
    const [cartQuantity, setCartQuantity] = useState([])
    const [searchActive, setSearchActive] = useState(false)
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

    const cartQuantity_ = useSelector(state => state.cartQuantityReducer.cartQuantity)
    const wishlistQuantity_ = useSelector(state => state.wishlistQuantityReducer.wishlistQuantity)
    let button;
    const [color,setColor]=useState('transparent')
    const [position,setPosition]=useState('relative')

    const listenScrollEvent = e => {
        if(window.scrollY >= 0 && window.scrollY<300){
            setColor('transparent')
            setPosition('relative')
        }
        else {
          setColor('white')
          setPosition('fixed')
        } 
      }
    
      useEffect(()=>{
          window.addEventListener('scroll',listenScrollEvent)
      },[])
      
    

    useEffect(() => {
        // console.log('in useeff');
        setLoggedin(props.userData)
    }, [props.userData])


    const onSearchItemClick = (productName) => {
        // console.log('searched clicked is', productName);
        setSearch('')
        nav(`/products/${productName}`)
        setInputFocus(false)
    }

    useEffect(() => {

        if (search !== '') {
            setSearchActive(true)
            axios.post(`/products/${search}`)
                .then(res => {
                    // console.log("filteredres", res.data)
                    setSuggestions(res.data)
                    // const temp_suggestions = [...new Set(res.data)]
                    // setSuggestions(temp_suggestions)
                    // console.log("sugg nav", temp_suggestions);
                })
        } else {
            setSuggestions([])
            setSearchActive(false)
        }
    }, [search])

    const handleUserModal = () => {

    }

    return (
        <div className='head-wrapper' style={{background:color, position: 'fixed', zIndex: '999', width: '100vw'}}>

            <div className='top-header'>
                <div className='left'><p>+91 987654321</p></div>
                <div className='right'>
                    <select className='language'>
                        <option value="English">Eng</option>
                        <option value="English">Fra</option>
                    </select>

                    <select className='currency'>
                        <option value="English">Inr</option>
                        <option value="English">Doll</option>
                    </select>

                </div>
            </div>
            {/* <hr /> */}

            <Navbar sticky="top" expand="lg" style={{ padding: '5px 20px', borderTop: '1px solid white' }}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">MereSilk</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/" className='nav-link'>HOME</Nav.Link>
                            <Nav.Link as={Link} to="/" className='nav-link'>PRODUCTS</Nav.Link>
                            <Nav.Link as={Link} to="/" className='nav-link'>CONTACT</Nav.Link>
                        </Nav>
                        <form className='nav-right' style={{ marginRight: '10px' }}>
                            <div style={{ paddingLeft: '7px' }}>
                                <input type="text" placeholder='search product for' value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setInputFocus(true)} />
                                {(suggestions.length > 0 && inputFocus == true) &&
                                    <div className='suggestion-box' style={{ position: 'absolute', top: '48.4px', paddingTop: '7px', backgroundColor: 'white', zIndex: "5", width: "300px" }}>
                                        <div style={{ position: 'relative', top: '0px' }}>
                                            {(suggestions.length > 0) &&
                                                suggestions.map(eachSuggestion => {
                                                    return <EachSuggestion props={eachSuggestion} onSearchItemClick={onSearchItemClick} />
                                                    {/* <img src={eachSuggestion.src} width={60} alt="" />
                                                        <li className='search-li' onClick={() => onSearchItemClick(eachSuggestion)} style={{ color: '#ed4a6f', width: '100%', paddingBottom: '5px' }}>{eachSuggestion.title} </li> */}

                                                })
                                            }
                                        </div>

                                    </div>
                                }
                            </div>
                            <div>
                                <select name="" id="" style={{ padding: '8px 8px' }}>
                                    <option value="">All category</option>
                                    <option value="">saree</option>
                                    <option value="">saree</option>
                                </select>
                            </div>
                            <button>se</button>

                        </form>
                        <div className='links-icon' style={{ margin: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '15px' }}>
                            <div className='user-icon-wrapper'>
                                <FontAwesomeIcon onClick={() => handleUserModal} style={{ fontSize: '1.5em', width: '25px', height: '25px' }} icon={faUser} />
                                <div className="user-modal">
                                    <Link to='/login'>Sign</Link>
                                    <Link to='/category'>products</Link>
                                </div>
                            </div>
                            <Link to='/wishlist'><FontAwesomeIcon title='view wishlist' style={{ fontSize: '1.5em', width: '25px', height: '25px' }} icon={faHeart} /></Link>
                            <Link to='/cart'><FontAwesomeIcon title='view cart' style={{ fontSize: '1.5em', width: '25px', height: '25px' }} icon={faCartShopping} /></Link>
                        </div>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <motion.div
                style={{ display: 'none' }}
                initial="initial"
                animate="animate"
                variants={blackBox}>


                <div style={{ zIndex: '3', border: '2px solid pink' }}>
                    <Navbar bg="light" expand="lg" style={{}} >

                        <Navbar.Brand style={{ color: '#ed4a6f' }}><Link to='/' className='navbar-brand' >BookMania</Link></Navbar.Brand>

                        {/* <div id='search' >
                            <input className="form-control" style={{ position: 'relative', top: '0px' }} type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setInputFocus(true)} />
                            {(suggestions.length > 0 && inputFocus == true) &&
                                <div className='suggestion-box' style={{ position: 'absolute', top: '48.4px', paddingTop: '7px', backgroundColor: 'white', zIndex: "5", width: "76%" }}>
                                    <ul style={{ position: 'relative', top: '0px' }}>
                                        {(suggestions.length > 0) &&
                                            suggestions.map(eachSuggestion => {
                                                // console.log("each", eachSuggestion);
                                                return <li className='search-li' onClick={() => onSearchItemClick(eachSuggestion)} style={{ color: '#ed4a6f', width: '100%', paddingBottom: '5px' }}>{eachSuggestion} </li>
                                            })
                                        }
                                    </ul>

                                </div>
                            }
                        </div> */}

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* {button} */}




                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                </div>
            </motion.div>

        </div>
    )
}

export default MyNavbar