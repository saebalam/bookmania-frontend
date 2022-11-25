import React, { useState, useEffect } from 'react'
import './productDetails.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import CardSmall from '../../../../Shared_Components/CardSmall'
import { motion } from "framer-motion"
import s_thumbnail from '../../../../../Assets/Images/card.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faRuler } from '@fortawesome/free-solid-svg-icons'

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

  const pName = useParams().productName
  console.log('in list params', pName)

  useEffect(() => {
    axios.get(`/productsList/${pName}`)
      .then(res => {
        if (res.data.length != null && res.data.length > 0) {
          setListOfProducts([...listOfProducts, res.data])
        }
      })
  }, [])


  return (
    <div>
      <div className='myBreadcrumb' style={{ marginTop: '60px', marginBottom: '0px' }}>
        <Link to='/' className='link' >Home / </Link>
        <span>{pName}</span>
      </div>

      <div className='container' style={{ display: 'flex', padding: '5px' }}>
        <div className='left' style={{ width: '45%', display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ width: '70px', height: '70px' }}>
            <img src={s_thumbnail} alt="" style={{ width: '100%', height: '100%', marginBottom: '7px', borderRadius: '5px' }} />
            <img src={s_thumbnail} alt="" style={{ width: '100%', height: '100%', marginBottom: '7px', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '410px', height: '500px' }}>
            <img src={s_thumbnail} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div className='right' style={{ width: '45%' }}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
            <p style={{fontSize:'1.5rem'}}>Beige Festive Wear Cotton Short Kurta</p>
            <p>$400</p>
            <p>incl. of all taxes</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
            <p>size:s</p>
            <div style={{display:'flex'}}>
              <div><FontAwesomeIcon icon={faRuler} /></div>
              <p>size chart</p>
            </div>
            <div style={{display:'flex'}}>
              <div style={{width:'50px',height:'50px',border:'1px solid red'}}>s</div>
              <div style={{width:'50px',height:'50px',border:'1px solid red'}}>m</div>
              <div style={{width:'50px',height:'50px',border:'1px solid red'}}>l</div>
            </div>
            <p>Quantity</p>
            <div style={{display:'flex'}}>
              <FontAwesomeIcon icon={faPlus} />
              <input type="number" name="" id="" />
              <FontAwesomeIcon icon={faMinus} />
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignContent:'flex-start'}}>
            <button className='btn btn-primary' >Add To Cart</button>
            <button className='btn btn-primary'>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListOfProducts