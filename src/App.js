import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from './components/Header/MyNavbar';
// import Home from './components/Home/Home';
// import Login from './components/Login/Login';
// import Register from './components/Register/Register';
// import checkEmail from './components/ForgotPassword/CheckEmail'
// import Error from './components/Shared_Components/Error';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom'
import axios from 'axios';
import { Provider } from 'react-redux'
import store from './store';
import Tempp from './components/Tempp';
// import Cart from ;
// import Wishlist from './components/Wishlist/Wishlist';
// import ProductsList from './components/Home/FeaturedProducts/ProductsList/ProductsList';
// import ProductDetails from './components/Home/FeaturedProducts/ProductsList/ProductDetails/ProductDetails'
import ErrorBoundary from './components/Shared_Components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion/dist/framer-motion'
// import CheckEmail from './components/ForgotPassword/CheckEmail';
// import ResetPassword from './components/ForgotPassword/ResetPassword';

import { lazy, Suspense } from 'react'
const Home = React.lazy(() => import('./components/Home/Home'))
const Login = React.lazy(() => import('./components/Login/Login'))
const Wishlist = React.lazy(() => import('./components/Wishlist/Wishlist'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))
const Register = React.lazy(() => import('./components/Register/Register'))
const ProductsList = React.lazy(() => import('./components/Home/FeaturedProducts/ProductsList/ProductsList'))
const ProductDetails = React.lazy(() => import('./components/Home/FeaturedProducts/ProductsList/ProductDetails/ProductDetails'))
const CheckEmail = React.lazy(() => import('./components/ForgotPassword/CheckEmail'))
const ResetPassword = React.lazy(() => import('./components/ForgotPassword/ResetPassword'))
const Error = React.lazy(() => import('./components/Shared_Components/Error'))
// const MyNavbar = React.lazy(() => import('./components/Header/MyNavbar'))


function App() {

  // store.subscribe(()=>console.log("store",store.getState()))
  const [userData, setUserData] = useState(false)                  //to check a user is loggedin
  const [featuredProducts, setFeaturedProducts] = useState(null)
  const [count, setCount] = useState(0);
  const [loggedin, setLoggedin] = useState(localStorage.getItem('loggedin'))

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
        console.log('loggedim', isLoggedin)
        console.log(res.data)
        if (isLoggedin == "true") {
          setFeaturedProducts(res.data)
        }
      })
      .catch(() => { throw new Error('something wrong') })

  }, [])



  return (
    <AnimatePresence>
      <div className="App">
        <Router>


          {/* <ErrorBoundary> */}
          <MyNavbar userData={userData} />
          <Suspense fallback={<div>Loading...</div>}>
            {/* </ErrorBoundary> */}
            <Routes>
              <Route exact path='/' element={<Home userData={userData} />} />
              <Route exact path='/login' element={<Login setUser={setUser} />} />
              <Route exact path='/wishlist' element={<Wishlist />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='register' element={<Register />} />
              <Route exact path='/collections/:productName' element={<ProductsList />} />
              <Route exact path='/productsList/:productName/:listOfProducts' element={<ProductDetails />} />
              <Route exact path='/checkEmail' element={<CheckEmail />} />
              <Route exact path='/resetPassword' element={<ResetPassword />} />
              <Route path='/*' element={<Error />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </AnimatePresence>
  );
}

export default App;
