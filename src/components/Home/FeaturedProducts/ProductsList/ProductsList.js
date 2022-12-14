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
    <div>
      <div className='myBreadcrumb' style={{ marginTop: '60px', marginBottom: '0px' }}>
        <Link to='/' className='link' >Home / </Link><span>{pName}</span>
      </div>

      <div>
        <p style={{ fontSize: '20px' }}>{pName}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', }}>
        <div style={{ width: '15%' }}>
          <p style={{ width: '147px', textAlign: 'left', marginLeft: '29px', marginBottom: '15px', paddingBottom: '5px', borderBottom: '1px solid #cfc7c7', fontSize: '19px' }}>Filters</p>
          <ul id='filter_ul'>
            <li ><Dropdown id='nav-link' autoClose={false}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Product Type
              </Dropdown.Toggle>
              <Dropdown.Divider />

              <Dropdown.Menu>
                <Dropdown.Item>
                  <input type="checkbox" name="accessories" id="" defaultChecked={isChecked.accessories} value={isChecked.accessories}
                    onChange={(e) => handleCheckbox(e)} />Accessories
                </Dropdown.Item>
                <Dropdown.Item>
                  <input type="checkbox" name="books" id="" defaultChecked={isChecked.books} value={isChecked.books} onChange={(e) => handleCheckbox(e)} />Books
                </Dropdown.Item>
                <Dropdown.Item>
                  <input type="checkbox" name="" id="" defaultChecked={isChecked.computer} value={isChecked.computer} onChange={(e) => handleCheckbox(e)} />Computers
                </Dropdown.Item>
                <Dropdown.Item>
                  <input type="checkbox" name="" id="" defaultChecked={isChecked.disks} value={isChecked.disks} onChange={(e) => handleCheckbox(e)} />Disks
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown></li>
            <li><Dropdown id='nav-link'>
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
            <li><Dropdown id='nav-link'>
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
            <li><Dropdown id='nav-link'>
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
            <li><Dropdown id='nav-link'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Price
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

        <div style={{ width: '83%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 10px' }}>
            <div>{productsList.length} Products</div>

            <form style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', width: '15vw' }}>
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