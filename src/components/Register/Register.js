import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'
import './register.css'

const validate = values => {
    const errors = {}

    if (!values.firstname) {
        errors.firstname = "Required";
    }

    if (!values.lastname) {
        errors.lastname = "Required";
    }

    if (!values.email) {
        errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email";
    }

    if (!values.password) {
        errors.password = "Required"
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)) {
        errors.password = "Password must meet minimum criteria";
    }

    return errors;
}

function Register() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    // const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    const [btndisable,setBtndisable]=useState(true)
    const nav=useNavigate()

    const handleRegisterForm = (e) => {
        e.preventDefault()
        console.log(fname, lname);
        const data = { "userInfo": { "email": formik.values.email, "password": formik.values.password } }
        const API_DATA = JSON.stringify(data)
        axios.post('/register',API_DATA,{ headers: { 'Content-Type': 'application/json' } })
        .then(res=>{
            console.log(res.data);
            if(res.data==true){
                toast('User registered successfully, Please Login')
                setTimeout(() => {
                    nav('/')
                }, 2500);
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''

        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    return (
        <div style={{ marginTop: '100px' }}>
            <form className='m-auto col-lg-3 regForm'>
                <Toaster />
                <h3>Register</h3>
                <div className="form-group">
                    <label htmlFor="firstname" className=''>First Name</label>
                    <input type="text" className='form-control' name="firstname" id="" placeholder='Enter first name'
                        value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.firstname && formik.errors.firstname ? <div style={{ color: "#bd0707" }}>{formik.errors.firstname}</div> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input type="text" className='form-control' name="lastname" id="" placeholder='Enter last name'
                        value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.lastname && formik.errors.lastname ? <div style={{ color: "#bd0707" }}>{formik.errors.lastname}</div> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="">email</label>
                    <input type="text" className='form-control' name="email" id="" placeholder='Enter your email'
                        value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ? <div style={{ color: "#bd0707" }}>{formik.errors.email}</div> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" className='form-control' name="password" id="" placeholder='Set your password'
                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ? <div style={{ color: "#bd0707" }}>{formik.errors.password}</div> : null}
                </div>
                {/* <div className="form-group">
                <label htmlFor="">Confirm Password</label>
                <input type="text" className='form-control' name="" id="" placeholder='Enter your password'
                value='' onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div> */}
                <div>
                {(!formik.errors.firstname && formik.touched.firstname) 
                 && (!formik.errors.lastname && formik.touched.lastname)
                 && (!formik.errors.email && formik.touched.email)
                 && (!formik.errors.password && formik.touched.password)
                ?
                    <button className='btn btn-primary' style={{width:'330px',marginTop:'20px'}} onClick={(e)=>handleRegisterForm(e)} >Register</button>
                :
                    // <button className='btn btn-primary'  style={{width:'330px',marginTop:'20px',cursor:'not-allowed',backgroundColor:'#0d6efd'}} >Register</button>}
                    <div className='btn btn-primary' style={{width:'330px',marginTop:'20px',cursor:'not-allowed',backgroundColor:'#0d6efd'}}>Register</div>}
                </div>
            </form>
        </div>
    )
}

export default Register