import React, { useState, useEffect } from 'react'
import './productDetails.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import CardSmall from '../../../../Shared_Components/CardSmall'
import { motion } from "framer-motion"

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

const ListOfProducts = () => {

  const [listOfProducts, setListOfProducts] = useState([{
    id: 2,
    title: "Ikigai",
    src: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    rating: "4",
    price: "260",
    category: 'tshirt'
  }])

  const pName = useParams()
  console.log('in list params', pName)

  useEffect(() => {
    axios.get(`/productsList/${pName}`)
      .then(res => {
        if (res.data.length != null && res.data.length > 0) {
          setListOfProducts(res.data)
        }
      })
  }, [])


  return (
    <motion.div
      className="relative z-50 w-full"
      initial="initial"
      animate="animate"
      variants={blackBox}>
      <div style={{marginTop:'120px'}}>
        Details
      </div>
    </motion.div>


  )
}

export default ListOfProducts