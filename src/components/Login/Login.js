import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { BrowserRouter as Redirect, Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Home from '../Home/Home'
import google_signin from '../../Assets/Images/google_signin.png'
import {useFormik} from 'formik'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import user from '../../Assets/Images/user.png'

const validate = values => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid Email Address';
    }

    if(!values.password){
        errors.password= 'Required'
    }else if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)){
        errors.email = 'Password must meet minimum criteria';
    }
  
    return errors;
  };
  

function Login(props) {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [isLoggedin, setIsLoggedin] = useState(true)

    const nav = useNavigate()


    const handleForm = (e) => {
        e.preventDefault()
        const data = { "userInfo": { "email": formik.values.email, "password": formik.values.password } }
        const API_DATA = JSON.stringify(data)
        // axios.get('http://localhost:9000/')
        // .then((res)=>setEmail(res))
        axios.post('login', API_DATA, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                // console.log(res.data);
                if (res.data == true) {
                    localStorage.setItem('token', res.data);
                    props.setUser(res.data)
                    nav('/')
                } else {
                    alert('wrong credentials')
                    localStorage.setItem('token', false);
                }
            }
            )

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password:''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    return (
        <div className='login' >
            {isLoggedin &&
                <div className='form-container'>
                    <form onSubmit={handleForm} className='col-lg-3'>
                        <div style={{width:'55px',margin:'0 auto',height:'55px',padding:'9px',border:'2px solid #959191',borderRadius:'50%'}}><FontAwesomeIcon icon={faUserLarge} size='2x' style={{filter:'invert(60%)'}} /></div>
                        <div className="form-group">
                            
                            <input type="email" className='form-control' name="email" id="" placeholder='Enter email or number'
                                value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email ? <div style={{color:"red"}}>{formik.errors.email}</div> : null}
                        </div>
                        <div className="form-group">
                            
                            <input type="password" className='form-control' name="password" id="" placeholder='Enter your password'
                                value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            {formik.touched.password && formik.errors.password ? <div style={{color:"red"}}>{formik.errors.password}</div> : null}
                            <div className="forgot-password" style={{marginTop:'3px'}}><Link replace to='/register' style={{color:'blue'}}>Forgot Password ?</Link></div>
                        </div>
                        <div className="form-group">
                            <button id='login-btn'>SUBMIT</button>
                        </div>
                        <hr></hr>
                        <div className="signup" style={{ marginTop: "1.5rem" }}>
                            <div><h6>Or</h6></div>
                            <div style={{display:"flex",justifyContent:"center",height:'2rem',marginBottom:'5px'}}>
                                <div className="g-signin2" data-onsuccess="onSignIn">Signin</div>
                            </div>
                            <div>
                                <Link replace to='/register' style={{ color: "black" }}>SIGN UP</Link>
                            </div>
                        </div>
                    </form>
                
                </div>
            }

            {/* {() => nav("/register")} */}


        </div>
    )
}

export default Login