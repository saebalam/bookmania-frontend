import React, { useEffect } from 'react'
import image1 from '../../home-bg.jpg'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import CardSmall from '../../../Shared_Components/CardSmall';
import './productsList.css'
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

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

const ProductsList = () => {
  const [productsList, setProductsList] = useState([{
    id: 2,
    title: "Ikigai",
    src: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    rating: "4",
    price: "260",
    category: 'tshirt'
  }])

  const pName = useParams().productName

  useEffect(() => {

    axios.get(`/productsList/${pName}`)
      .then(res => {
        if (res.data.length != null && res.data.length > 0) {
          setProductsList(res.data)

        }
      })
  }, [])


  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={blackBox}>

        <div style={{marginTop:'70px'}}>
          <div className='myBreadcrumb'>
            <Link to='/' className='link'>Home / </Link><span>{pName}</span>
          </div>
          <div className='productsListContainer'>
            {
              productsList.map(product => {
                return <CardSmall props={product} pName={pName} />
              })
            }
          </div>
        </div>
    </motion.div>

  )
}

export default ProductsList