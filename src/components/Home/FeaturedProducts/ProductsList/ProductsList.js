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
import Dropdown from 'react-bootstrap/Dropdown'

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

  const [filters,setFilters] = useState({
    accessories:true,
    books:true,
    computers:false,
    disks:true
  })

  const pName = useParams().productName

  const handleCheck=(e)=>{
    const key=e.target.name;
    const val=e.target.value
    
    console.log('clicked filter key is',key)
    console.log('clicked filter val is',val)
    setFilters({...filters,accessories:!val})
  }

  useEffect(() => {

    axios.get(`/collections/${pName}`)
      .then(res => {
        console.log('collections res',res);
        if (res.data.length != null && res.data.length > 0) {
          // const res_obj
          setProductsList(res.data)

        }
      })
  }, [pName])


  return (
    <div>
      <div className='myBreadcrumb' style={{ marginTop: '60px', marginBottom: '0px' }}>
        <Link to='/' className='link' >Home / </Link><span>{pName}</span>
      </div>

      <div>
        <p style={{ fontSize: '20px' }}>{pName}</p>
      </div>

      <div style={{ width:'95%',margin:'0 auto',display: 'flex', justifyContent: 'space-between', }}>
        <div style={{ width: '15%' }}>
          <p style={{ width: '147px', textAlign: 'left', marginLeft: '29px', marginBottom: '15px', paddingBottom: '5px', borderBottom: '1px solid #cfc7c7', fontSize: '19px' }}>Filters</p>
          <ul id='filter_ul'>
            <li ><Dropdown id='nav-link' autoClose="outside">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Product Type
              </Dropdown.Toggle>
              <Dropdown.Divider />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"><input onChange={(e)=>handleCheck(e)} type="checkbox" name="accessories" id="" value={filters.accessories} checked={filters.accessories} style={{ marginRight: '3px' }} />Accessories</Dropdown.Item>
                <Dropdown.Item href="#/action-2"><input onChange={handleCheck} type="checkbox" name="" id="" checked={filters.books}/>Books</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><input onChange={handleCheck} type="checkbox" name="" id="" checked={filters.computers}/>Computers</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><input onChange={handleCheck} type="checkbox" name="" id="" checked={filters.disks}/>Disks</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown></li>
            <li><Dropdown id='nav-link' autoClose="outside">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Material
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Accessories</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Books</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Computers</Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Divider />
            </Dropdown></li>
            <li><Dropdown id='nav-link' autoClose="outside">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Color
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
              <Dropdown.Divider />
            </Dropdown></li>
            <li><Dropdown id='nav-link' autoClose="outside">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Size
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
              <Dropdown.Divider />
            </Dropdown></li>
            <li><Dropdown id='nav-link' autoClose="outside">
              <Dropdown.Toggle  id="dropdown-basic">
                Price
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
              <Dropdown.Divider />
            </Dropdown></li>
          </ul>
        </div>

        <div style={{ width: '83%' }} id='products_list'>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 10px' }}>
            <div>{productsList.length} Products</div>
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'flex-end',width:'150px'}}><div>Sort by:</div> <Dropdown id='nav-link'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                any
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Date</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Alphabet</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Price</Dropdown.Item>
              </Dropdown.Menu>
              
            </Dropdown>
            </div>
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={blackBox}>

            <div className='productsListContainer'>
              {
                productsList.map(product => {
                  return <CardSmall props={product} pName={pName}  />
                })
              }
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default ProductsList