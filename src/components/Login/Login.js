import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { BrowserRouter as Redirect, Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Home from '../Home/Home'
import google_signin from '../../Assets/Images/google_signin.png'
import {useFormik} from 'formik'

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
        <div className='login' style={{ marginTop: '100px', margnBottom: "20px" }}>
            {isLoggedin &&
                <div>
                    <form onSubmit={handleForm} className='m-auto col-lg-3'>
                        <h3>Login</h3>
                        <div className="form-group">
                            <label htmlFor="email" className=''>Email</label>
                            <input type="email" className='form-control' name="email" id="" placeholder='Enter email or number'
                                value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email ? <div style={{color:"#bd0707"}}>{formik.errors.email}</div> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" className='form-control' name="password" id="" placeholder='Enter your password'
                                value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            {formik.touched.password && formik.errors.password ? <div style={{color:"#bd0707"}}>{formik.errors.password}</div> : null}
                            <div className="forgot-password"><Link replace to='/register'>Forgot Password ?</Link></div>
                        </div>
                        <div className="form-group" id='login-btn'>
                            <button className='btn btn-primary' >Submit</button>
                        </div>
                        <hr></hr>
                        <div className="signup" style={{ marginTop: "3rem" }}>
                            <div><h6>Or</h6></div>
                            <div>
                                <div><a href="#"><img src={google_signin} alt="" style={{ width: "10rem", height: "2rem" }} /></a></div>
                            </div>
                            <div>
                                <Link replace to='/register' style={{ color: "black" }}>SIGN UP</Link>
                                <button >click</button>
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