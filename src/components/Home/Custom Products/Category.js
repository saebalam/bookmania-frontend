import React from 'react'
import './category.css'
import car2 from '../../../Assets/Images/car2.jpeg'
import pattern from '../../../../src/Assets/Images/pattern.png'
import custom1 from '../../../../src/Assets/Images/arrival/custom1.jpeg'
import custom2 from '../../../../src/Assets/Images/arrival/custom2.jpeg'
import custom3 from '../../../../src/Assets/Images/arrival/custom3.jpeg'
import { Link } from 'react-router-dom'

const CustomProducts = () => {
  return (
    <div style={{ marginTop: '10px' }} className='category'>
      <div className="row1">
        <div className='col1'>
          <Link to='/category' style={{ width: '100%' }}>
            <div className='img-wrapper'>
              <img src={custom1} alt="" srcset="" />
            </div>
          </Link>
          <div className='text'>
            <p>SAREE COLLECTION</p>br
            <h3>FESTIVE <br /> SEASON</h3>
            <a href="">SHOP NOW</a>
          </div>
        </div>
        <div className='col2'>
          <img src={pattern} alt="" />
        </div>
      </div>

      <div className="row2">
        <div className='col1'>
          <img src={pattern} alt="" />
        </div>
        <div className='col2'>
          <div className='text'>
            <p>dupatta COLLECTION</p>
            <h3>FESTIVE <br /> SEASON</h3>
            <a href="">SHOP NOW</a>
          </div>
          <Link to='/category' style={{ width: '100%' }}>
            <div className='img-wrapper'>
              <img src={custom2} alt="" srcset="" />
            </div>

          </Link>
        </div>
      </div>
      <div className="row3">
        <div className='col1'>
          <div className='text'>
            <p>dupatta COLLECTION</p>
            <h3>FESTIVE <br /> SEASON</h3>
            <a href="">SHOP NOW</a>
          </div>
          <div className='img-wrapper'>
            <img src={custom3} alt="" srcset="" />
          </div>
        </div>
        <div className='col2'>
          <img src={pattern} alt="" />

        </div>
      </div>
    </div>
  )
}

export default CustomProducts