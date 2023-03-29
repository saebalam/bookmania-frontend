import React, { useState, useEffect } from 'react'
import styles from './productDetails.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import CardSmall from '../../../../Shared_Components/CardSmall'
import { motion } from "framer-motion"
import s_thumbnail from '../../../../../Assets/Images/card.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faRuler } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import RelatedProducts from './RelatedProducts/RelatedProducts'

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
    title: "Ikigai_sim",
    src: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    rating: "4",
    price: "260",
    category: 'tshirt'
  }])

  const pName = useParams().productName
  const [active, setActive] = useState([true, false, false, false])
  const [view, setView] = useState([])
  // console.log('in prod details list params', pName)

  useEffect(() => {
    axios.get(`/products/${pName}`)
      .then(res => {
        if (res.data.length != null && res.data.length > 0) {
          setListOfProducts([...listOfProducts, res.data])
        }
      })
  }, [])


  const handleView = (view) => {
    if (view == 'new_arrival') {
      setActive([true, false, false, false])
    }
    else if (view == 'trending') {
      setActive([false, true, false, false])
    }
    else if (view == 'best_selling') {
      setActive([false, false, true, false])
    }
    else if (view == 'popular') {
      setActive([false, false, false, true])
    }

    axios.get(`/${view}`)
      .then(res => {
        setView(res.data)
      })
  }


  return (
    <div className='product_details'>
      <div className='head'>
        <h2>Product Details</h2>
        <div className='details_breadcrumb'>
          <Link to='/' className='link' >Homeeee / </Link>
          <span>Product Details</span>
        </div>
      </div>
      {/* <div className='myBreadcrumb'>
        <Link to='/' className='link' >Home / </Link>
        <span>{pName}</span>
      </div> */}

      <div className='mycontainer' style={{ display: 'flex', marginBottom: '10px' }}>
        <div className={styles.left} style={{ marginTop: '40px' }}>
          <div style={{ display:'flex',gap:'5px', width: '70px', height: '70px', margin: '0 3px 3px 0' }}>
            <img src={s_thumbnail} alt="" style={{ width: '100%', height: '100%', marginBottom: '7px', borderRadius: '5px' }} />
            <img src={s_thumbnail} alt="" style={{ width: '100%', height: '100%', marginBottom: '7px', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '410px', height: '450px' }}>
            <img src={s_thumbnail} alt="" style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
          </div>
        </div>
        <div className='right' style={{ width: '45%' }}>
          <div>
            Home / Products / suit / cotton
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '45px' }}>
            <h3>{pName}</h3>
            <div style={{ margin: '7px 0' }}><span style={{ padding: '1px 10px', borderRadius: '3px', marginRight: '5px', backgroundColor: 'seagreen' }}>3 * </span><span> (1280)</span></div>
            <div style={{ margin: '7px 0' }}><span style={{ marginRight: '12px' }}>$400</span><del style={{ marginRight: '7px', textDecoration: '' }}>$450</del><span style={{ padding: '2px 10px', borderRadius: '3px', marginRight: '5px', backgroundColor: 'seagreen' }}>11% off</span></div>
            <p style={{ color: 'seagreen' }}>in stock</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* <p>size:s</p>
            <div style={{ display: 'flex' }}>
              <div><FontAwesomeIcon icon={faRuler} /></div>
              <p>size chart</p>
            </div> */}
            {/* <div style={{ display: 'flex' }}>
              <div style={{ width: '50px', height: '50px', border: '1px solid red' }}>s</div>
              <div style={{ width: '50px', height: '50px', border: '1px solid red' }}>m</div>
              <div style={{ width: '50px', height: '50px', border: '1px solid red' }}>l</div>
            </div> */}
            <p>Quantity : </p>
            <div style={{ display: 'flex', marginTop: '-5px' }}>
              <FontAwesomeIcon style={{ backgroundColor: 'black', color: 'white', padding: '4px' }} icon={faPlus} />
              <input type="number" name="" id="" />
              <FontAwesomeIcon style={{ backgroundColor: 'black', color: 'white', padding: '4px' }} icon={faMinus} />
            </div>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>
            <button style={{width:'40%'}} className='btn btn-primary' >Add To Cart</button>
            <button style={{width:'40%'}} className='btn btn-primary'>Buy Now</button>
          </div>
          <div className="share" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
            <FontAwesomeIcon style={{ margin: '5px', padding: '7px 9px', background: '#1873eb', color: 'white' }} icon={faFacebookF} />
            <FontAwesomeIcon style={{ margin: '5px', padding: '7px 9px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white' }} icon={faInstagram} />
            <FontAwesomeIcon style={{ margin: '5px', padding: '7px 9px', background: '#44c654', color: 'white' }} icon={faWhatsapp} />
            <FontAwesomeIcon style={{ margin: '5px', padding: '7px 9px', background: '#179cf0', color: 'white' }} icon={faTwitter} />
          </div>
        </div>
      </div>

      <div className='listview'>
        <ul >
          <li className={active[3] == true ? 'active' : ''} onClick={() => handleView('new_arrival')}>NEW ARRIVAL</li>
          <li className={active[1] == true ? 'active' : ''} onClick={() => handleView('trending')}>TRENDING</li>
          <li className={active[2] == true ? 'active' : ''} onClick={() => handleView('best_selling')}>BEST SELLING</li>
          <li className={active[3] == true ? 'active' : ''} onClick={() => handleView('popular')}>POPULAR</li>
        </ul>
        <div className='listdata'>
          {view.length > 0
            ? view.map(product => {
              return <CardSmall props={product} />
            })
            : <h2 style={{ 'margin': '10px 0',padding:'30px 0'  }}>lorem ipsum</h2>

          }
        </div>

      </div>

      <div>
          <RelatedProducts />
      </div>

    </div>
  )
}

export default ListOfProducts