import React from 'react'
import './footer.css'
import logo from '../../Assets/Images/logo.png'
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className='footer'>

            <div className="footer-left">
                <img style={{ width: '130px' }} src={require('../../Assets/Images/logo.png')} alt="logo" />
                <ul>
                    <li><FontAwesomeIcon icon={faMapMarker} /> Bengaluru</li>
                    <li><FontAwesomeIcon icon={faPhone} /> 9876543210</li>
                    <li><FontAwesomeIcon icon={faEnvelope} /> test@test.com</li>
                </ul>
                <ul className='brands'>
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faGoogle} />
                </ul>
            </div>
            <div className="footer-mid1">
                <h5>PAGE LINKS</h5>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Shop</li>
                    <li>services</li>
                </ul>
            </div>
            <div className="footer-mid2">
                <h5>PRODUCT CATEGORY</h5>
                <ul>
                    <li>Saree</li>
                    <li>Suit us</li>
                    <li>Dupatta</li>
                    <li>Bedsheets</li>
                    <li>Towel</li>
                </ul>
            </div>
            <div className="footer-right">
                <h5>ABOUT COMPANY</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing <br />
                    elit. Fuga dicta autem deleniti nobis commodi quam,<br />
                    modi omnis enim dolorum sit culpa, eligendi fugit  <br />
                    Molestiae ex necessitatibus sed minus repudiandae?</p>
            </div>
        </div>
    )
}

export default Footer