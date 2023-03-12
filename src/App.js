import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from './components/Header/MyNavbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import checkEmail from './components/ForgotPassword/CheckEmail'
import Error from './components/Shared_Components/Error';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom'
import axios from 'axios';
import { Provider } from 'react-redux'
import store from './store';
import Tempp from './components/Tempp';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import ProductsList from './components/Home/FeaturedProducts/ProductsList/ProductsList';
import ProductDetails from './components/Home/FeaturedProducts/ProductsList/ProductDetails/ProductDetails'
import ErrorBoundary from './components/Shared_Components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion/dist/framer-motion'
import ScaleLoader from "react-spinners/ScaleLoader";
import CheckEmail from './components/ForgotPassword/CheckEmail';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import { useAuth0 } from '@auth0/auth0-react';
import PrivateRoute from './components/Shared_Components/PrivateRoute';

const override: CSSProperties = {
  position: "absolute",
  top: '300px',
  left: '49%',
  display: "block",
  margin: "0 auto",
  borderColor: "red",

};


function App() {

  // store.subscribe(()=>console.log("store",store.getState()))
  const [userData, setUserData] = useState(localStorage.getItem('loggedin'))                  //to check a user is loggedin
  const [featuredProducts, setFeaturedProducts] = useState(null)
  const [count, setCount] = useState(0);
  const [loggedin, setLoggedin] = useState(localStorage.getItem('loggedin'))
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  // useEffect(() => {
  //   axios.get('user')
  //     .then((res) => {
  //       const isLoggedin = localStorage.getItem('loggedin')
  //       console.log(isLoggedin)
  //       console.log("/user",res.data)
  //       // if (isLoggedin == true) {
  //       //   setUserData(res.data)
  //       // }
  //     })


  // }, [userData])

  const setUser = (val) => {
    setUserData(val)
  }


  useEffect(() => {
    axios.get('user/featuredProducts')
      .then((res) => {
        const isLoggedin = localStorage.getItem('loggedin')
        // console.log('loggedim', isLoggedin)
        // console.log(res.data)
        if (isLoggedin == "true") {
          setFeaturedProducts(res.data)
        }
      })
      .catch(() => { throw new Error('something wrong') })

  }, [])



  return (
    <div>
      {(!isLoading)
        ? <AnimatePresence>
          <div className="App">
            <Router>
              <ErrorBoundary>
                <MyNavbar userData={userData} setUser={setUser} />

              </ErrorBoundary>
              <Routes>
                <Route exact path='/' element={<Home userData={userData} />} />
                <Route exact path='/login' element={<Login setUser={setUser} />} />
                {/* <Route exact path='/wishlist' element={<Wishlist />} /> */}

                <Route exact path='/wishlist' element={<PrivateRoute />}>
                  <Route exact path='/wishlist' element={<Wishlist />} />
                </Route>

                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='register' element={<Register />} />
                <Route exact path='/collections/:collection' element={<ProductsList />} />
                <Route exact path='/products/:productName' element={<ProductDetails />} />
                <Route exact path='/checkEmail' element={<CheckEmail />} />
                <Route exact path='/resetPassword' element={<ResetPassword />} />
                <Route path='/*' element={<Error />} />
              </Routes>
            </Router>
          </div>
        </AnimatePresence>

        : <ScaleLoader color="blue" loading={isLoading} cssOverride={override} size={150} />
      }
    </div>
  );
}

export default App;
