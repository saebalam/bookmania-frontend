import React from 'react'
import './footer.css'
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-left">
                <ul>
                    <li><FontAwesomeIcon icon={faMapMarker} /> Bengaluru</li>
                    <li><FontAwesomeIcon icon={faPhone} /> 9876543210</li>
                    <li><FontAwesomeIcon icon={faEnvelope} /> test@test.com</li>
                </ul>
            </div>
            <div className="footer-mid">
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Shop</li>
                    <li>services</li>
                    <li>Help</li>
                </ul>
            </div>
            <div className="footer-right">
                <h3>About company</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing <br />
                    elit. Fuga dicta autem deleniti nobis commodi quam,<br />  
                    modi omnis enim dolorum sit culpa, eligendi fugit  <br />
                    Molestiae ex necessitatibus sed minus repudiandae?</p>
            </div>
        </div>
    )
}

export default Footer