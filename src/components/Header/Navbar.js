import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import filteredProducts from '../../Action_Creators/filteredProducts';

function Navbar(props) {

    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const dispatch = useDispatch()

    let button;
    console.log("userData is", props.userData)

    const logout = () => {
        localStorage.removeItem('token')
        props.setUser(null)
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



    if (props.userData) {
        button = <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
                <Link to="/" onClick={logout} className='nav-link'>Logout</Link>
            </li>
            <li className='nav-item'>
                <Link to='/wishlist' className='nav-link'>Wishlist</Link>
            </li>
            <li className='nav-item'>
                <Link to='/cart' className='nav-link'>Cart</Link>
            </li>
        </ul>
    } else {
        button = <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
                <Link to="/login" className='nav-link'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link to='/wishlist' className='nav-link'>Wishlist</Link>
            </li>
            <li className='nav-item'>
                <Link to='/login' className='nav-link'>Cart</Link>
            </li>

        </ul>
    }


    return (
        <div>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark fixed-top' style={{ padding: "7px" }}>
                {/* <div className='container1'> */}
                <Link to='/' className='navbar-brand'>BookMania</Link>
                <div id='search' >
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                    {(suggestions.length > 0) &&
                        <div className='suggestion-box' style={{ backgroundColor: '#5c5e60', top: "45px", position: 'absolute',paddingTop:"13px", zIndex: "5" ,width:"77%"}}>
                            <ul>
                                {(suggestions.length > 0) &&
                                    suggestions.map(eachSuggestion => {
                                        console.log("each", eachSuggestion);
                                        return <li>{eachSuggestion} <hr /></li>
                                    })
                                }
                            </ul>
                        </div>

                    }
                </div>





                <button className="navbar-toggler" style={{ fontSize: "0.7rem", padding: "0.5rem 0.5rem", marginTop: "0px" }} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id='navbarNav'>
                    {button}
                </div>
                {/* </div> */}
            </nav >
            {/* <Outlet /> */}
        </div>
    )
}

export default Navbar