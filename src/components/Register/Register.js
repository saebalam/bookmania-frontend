import { useFormik } from 'formik'
import React, { useState } from 'react'
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
    } else if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)) {
        errors.password = "Password must meet minimum criteria";
    }

    return errors;
}

function Register() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegisterForm = (e) => {
        e.preventDefault()
        console.log(fname, lname);
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
            <form onSubmit={handleRegisterForm} className='m-auto col-lg-3 regForm'>
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
                    <input type="text" className='form-control' name="password" id="" placeholder='Set your password'
                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ? <div style={{ color: "#bd0707" }}>{formik.errors.password}</div> : null}
                </div>
                {/* <div className="form-group">
                <label htmlFor="">Confirm Password</label>
                <input type="text" className='form-control' name="" id="" placeholder='Enter your password'
                value='' onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div> */}
                <div>
                    <button className='btn btn-primary' style={{width:'330px',marginTop:'20px'}} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register