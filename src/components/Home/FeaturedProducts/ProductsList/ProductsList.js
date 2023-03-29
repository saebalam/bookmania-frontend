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
    title: "product",
    src: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    rating: "4",
    price: 260,
    category: 'tshirt'
  }])

  const [sort, setSort] = useState('price (a-z)')

  const [isChecked, setIsChecked] = useState({
    'accessories': 0,
    'books': 0,
    'computer': 0,
    'disks': 0
  }
  )

  const [filterModal, setFilterModal] = useState(false)

  const pName = useParams().collection

  const handleCheckbox = (e) => {
    const key = e.target.name
    const value = Number(e.target.defaultValue)
    console.log('checkbox e ', e)
    console.log('checkbox target name ', key)
    console.log('checkbox val ', value)
    const newValue = value == 1 ? 0 : 1
    // const num_newValue=Number(newValue)
    console.log({ [key]: newValue })
    const obj = { ...isChecked, [key]: newValue }
    setIsChecked(obj)
    // clg
  }

  const updateSort = (e) => {
    const name = e.target.name;
    const value = e.target.value
    console.log('value', value)
    setSort(value)
  }

  //handle small size open filter modal
  const handleFilterModal = (width) => {
    if (width <= 1000) {
      setFilterModal(true)
    }
  }

  useEffect(() => {

    axios.get(`/collections/${pName}`)
      .then(res => {
        console.log('collections res', res);
        if (res.data.length != null && res.data.length > 0) {
          // const res_obj
          setProductsList(res.data)

        }
      })
  }, [pName])

  //for sort
  useEffect(() => {

    let sorted = [...productsList]

    if (sort == 'price-lowest') {
      console.log('lowest');
      sorted = sorted.sort((a, b) => a.price - b.price)
      setProductsList(sorted)
      console.log(sorted)
    }
    if (sort == 'price-highest') {
      console.log('highest')
      sorted = sorted.sort((a, b) => b.price - a.price)
      setProductsList(sorted)
      console.log(sorted)
    }
    if (sort == 'a-z') {
      console.log('a-z')
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title))
      setProductsList(sorted)
      console.log(sorted)
    }
    if (sort == 'z-a') {
      console.log('z-a')
      sorted = sorted.sort((a, b) => b.title.localeCompare(a.title))
      setProductsList(sorted)
      console.log(sorted)
    }
  }, [pName, sort])


  return (
    <div style={{ maxWidth: '100vw' }}>
      <div className='head'>
        <h2>Product</h2>
        <div className='details_breadcrumb'>
          <Link to='/' className='link' >Homeeee / </Link>
          <span>Product</span>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '20px' }}>{pName}</p>
      </div>
      {console.log(window.innerWidth)}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
        {/* <button onClick={()=>handleFilterModal(window.innerWidth)} style={{ width: '15vw', textAlign: 'left', marginBottom: '15px', paddingBottom: '5px', borderBottom: '1px solid #cfc7c7', fontSize: '19px' }}>Filters</button> */}
        <div style={{ marginLeft: '15px', marginRight: '10px', marginTop: '20px' }}>
          <h6 style={{ textAlign: 'left' }}>Products Category</h6>
          <hr />
          <ul id='filter_ul' >
            <li ><Dropdown id='nav-link' autoClose={false}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Saree
              </Dropdown.Toggle>
              <Dropdown.Divider />

              <Dropdown.Menu>
                <Dropdown.Item href='/category'>
                  Linen
                </Dropdown.Item>
                <Dropdown.Item>
                  Cotton
                </Dropdown.Item>
                <Dropdown.Item>
                  tasar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown></li>
            <li><Dropdown id='nav-link'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Suit
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Accessories</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Books</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Computers</Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Divider />
            </Dropdown></li>
            <li><Dropdown id='nav-link'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Bedsheet
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Accessories</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Books</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Computers</Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Divider />
            </Dropdown></li>
            <li><Dropdown id='nav-link'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Kurti
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Accessories</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Books</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Computers</Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Divider />
            </Dropdown></li>
            <li><Dropdown id='nav-link'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Towel
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"><input type="checkbox" name="under 200" id="" defaultChecked={isChecked.accessories} value={isChecked.accessories}
                  onChange={(e) => handleCheckbox(e)} />under 200
                </Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Divider />
            </Dropdown></li>
          </ul>
        </div>

        <div style={{ width: '83%', paddingLeft: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 10px' }}>
            <div>{productsList.length} Products</div>

            <form style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
              <label htmlFor="sort">Sort By:</label>
              <select name="sort" id="" value={sort} onChange={updateSort}>
                <option value="price-lowest">Price (Lowest)</option>
                <option value="price-highest">Price (highest)</option>
                <option value="a-z">name (a-z)</option>
                <option value="z-a">name (z-a)</option>
              </select>
            </form>

          </div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={blackBox}>

            <div className='productsListContainer'>
              {
                productsList.map(product => {
                  return <CardSmall props={product} pName={pName} />
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