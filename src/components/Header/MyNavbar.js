import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import filteredProducts from '../../Action_Creators/filteredProducts';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/NavDropdown';
import DropdownMenu from 'react-bootstrap/NavDropdown';
import NavLink from 'react-bootstrap/NavDropdown';
import { createBrowserHistory } from '@remix-run/router';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion'

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
    const dispatch = useDispatch()
    const nav = useNavigate()

    // if(props.userData==null){
    //     throw new Error('')
    // }

    let button;
    console.log("my navbar userData is", props.userData)
    console.log('loggedin',loggedin)

    useEffect(()=>{
        console.log('in useeff');
        setLoggedin(props.userData)
    },[props.userData])

    const logout = () => {
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('loggedin')
        props.setUser(false)
    }

    const onSearchItemClick = (productName) => {
        console.log('searched clicked is', productName);
        nav(`/productsList/${productName}`)
        setInputFocus(false)
    }

    useEffect(() => {

        if (search !== '') {
            axios.post(`/products/${search}`)
                .then(res => {
                    console.log("filteredres", res.data)
                    setSuggestions([])
                    setSuggestions(res.data)
                    console.log("sugg nav", suggestions);
                })
        } else {
            setSuggestions([])
        }
    }, [search])



    if (loggedin == true) {
        console.log('logged is true');
        button = <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
                <Link to="/" onClick={logout} className='nav-link' id='navlink'>Logout</Link>
            </li>
            <li className='nav-item'>
                <Link to='/wishlist' className='nav-link' id='navlink'>Wishlist</Link>
            </li>
            <li className='nav-item'>
                <Link to='/cart' className='nav-link' id='navlink'>Cart</Link>
            </li>
        </ul>

    } else {
        button = <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
                <Link to="/login" className='nav-link' id='navlink'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link to='/wishlist' className='nav-link' id='navlink'>Wishlist</Link>
            </li>
            <li className='nav-item'>
                <Link to='/cart' className='nav-link' id='navlink'>Cart</Link>
            </li>

        </ul>
    }


    
    return (
            <motion.div
            initial="initial"
            animate="animate"
            variants={blackBox}>


            <div style={{ zIndex: '3',border:'2px solid pink' }}>
                <Navbar bg="light" expand="lg" fixed='top' style={{}} >

                    <Navbar.Brand style={{ color: '#ed4a6f' }}><Link to='/' className='navbar-brand' >BookMania</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div id='search' >
                        <input class="form-control mr-sm-2" style={{ position: 'relative', top: '0px' }} type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} onFocus={() => setInputFocus(true)} />
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
        </motion.div>
    )
}

export default MyNavbar