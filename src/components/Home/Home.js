import axios from 'axios'
import React, { useState, useEffect, useRef, CSSProperties } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/jquery/dist/jquery'
import ScaleLoader from "react-spinners/ScaleLoader";
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import homePageProducts from '../../Action_Creators/homePageProducts'
import cartProducts from '../../Action_Creators/filteredProducts'
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import carousel11 from '../../Assets/Images/car1.jpg'
import carousel22 from '../../Assets/Images/car2.jpeg'
import carousel33 from '../../Assets/Images/car3.jpg' 
import carousel44 from '../../Assets/Images/car5.jpg' 
import Dropdown from 'react-bootstrap/Dropdown';

import './home.css'
import CardSmall from '../Shared_Components/CardSmall';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion/dist/framer-motion'
import CustomProducts from './Custom Products/Category';
import EasyView from './EasyView/EasyView';
import NewsLetter from '../NewsLetter/NewsLetter';

const override: CSSProperties = {
    position: "relative",
    display: "block",
    margin: "0 auto",
    borderColor: "red",

};

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

const Home = React.memo(({ userData }) => {
    // console.log("in home",props.userData);
    const forOnceRender = useRef(0)
    // const userObject = useMemo(() => first, [second]);

    const location = useLocation();

    const dispatch = useDispatch()
    const featuredProductsObject = useSelector(state => state.homePageReducer)
    console.log('fp',featuredProductsObject)
    const [spinner, setSpinner] = useState(true)
    const [search, setSearch] = useState("")
    const suggestions = useSelector(state => state.filteredReducer)
    const [suggestionsList, setSuggestionList] = useState(suggestions.filteredProducts[0])
    const sugg = suggestions.filteredProducts[0]

    // console.log("suggestions",suggestions);
    // console.log(suggestions.filteredProducts[0]);
    // console.log("suggestionsList",sugg)

    // {
    //     {suggestions.filteredProducts.map((suggestion)=>{
    //         setSuggestionList(suggestion)
    //     })}
    // }

    // useEffect(()=>{
    //     setSuggestionList()
    // },[search])

    const fetchUser = () => {
        return function (dispatch) {
            axios.get('user/featuredProducts')
                .then(res => {
                    setSpinner(false)
                    // const isLoggedin = localStorage.getItem('token')

                    if (featuredProductsObject.featuredProducts.length < 1) { //workaround for stop re-rendering of home
                        res.data.forEach(obj => dispatch(homePageProducts(obj)))
                        setSpinner(false)
                    }

                }
                )
        }

    }

    useEffect(() => {
        // console.log("in useffect");
        dispatch(fetchUser())
    }, [])

    useEffect(() => {

    }, [search])

    // console.log("bbj",featuredProducts);

    return (
        <>
            {/* <motion.div
            initial="initial"
            animate="animate"
            variants={blackBox}> */}

            

            <div style={{width:'100%'}}>

                {(spinner == true)
                    ?
                    <div>
                        <ScaleLoader color="blue" loading={spinner} cssOverride={override} size={150} />
                    </div>
                    :
                    <>
                        {/* <div className='login-text'>
                        <h1><Link to='/login'>Please Login</Link></h1>
                        
                    </div> */}

                        <div className='wrapper' >

                            <Carousel style={{display:''}}>
                                <Carousel.Item interval={1500} style={{width:'100vw'}}>
                                    <img style={{border:'2px solid green',height:'100vh'}}
                                        className="d-block w-100"
                                        src={carousel11}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>

                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum &#9733; .</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img style={{border:'2px solid green',height:'100vh'}}
                                        className="d-block w-100"
                                        src={carousel11}
                                        alt="Second slide"
                                    />

                                    <Carousel.Caption>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img style={{border:'2px solid green',height:'100vh'}}
                                        className="d-block w-100"
                                        src={carousel11}
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>

                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                            <CustomProducts />


                            <EasyView />
                            
                            <NewsLetter />


                            {/* Featured products */}
                            {/* <button onClick={()=>dispatch(fetchUser())}>click</button> */}
                            <div style={{display:'none'}}>
                                <div className='featuredProductsHeading'>
                                    <h5>Featured Products</h5>
                                </div>
                                <div className='featured-products-container'>
                                    <FeaturedProducts />
                                </div>
                            </div>
                        </div>
                    </>
                }

                <div>
                    <Footer />
                </div>
            </div >
        {/* </motion.div> */}
        </>
    )
})

export default Home