import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

function CheckEmail() {
  const [email, setEmail] = useState('')
  const [emailExist, setEmailExist] = useState(false)    //to proceed for forgot password
  const [showWarning, setShowWarning] = useState(false)

  const changeHandler = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const checkEmail = (e) => {
    e.preventDefault()
    const data = { 'email': email }
    const API_DATA = JSON.stringify(data)
    axios.post('/checkEmail', API_DATA, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        if (res.data == true) {
          setEmailExist(true)
        } else {
          setShowWarning(true)
        }
      })
  }

  return (
    <div style={{ margin:'0 auto',marginTop: '150px',width:'22%',padding:'40px 5px', display: 'flex', justifyContent: 'center' , borderRadius:'5px',boxShadow: 'rgba(149, 142, 142, 0.521) 0px 3px 8px', backgroundColor:'#f1eaec' }} >
      <form action="" >
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div><h4>Trouble signing in ?</h4></div>
          <div><h6>Please enter your <br />registered email</h6></div>

            <div style={{marginTop:'20px'}}>
              {(!emailExist && showWarning)
                ? <div><p style={{ color: 'red' }}>No account found with this email</p></div>
                : <div><p style={{visibility:'hidden'}}>-----</p></div>
              }
            </div>

          <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
            <input type="email" name="" id="" size={30} autoFocus placeholder='Enter your registered email' value={email} onChange={(e) => changeHandler(e)} />
            <button className='btn btn-primary' style={{ marginTop: '10px' }} onClick={(e) => checkEmail(e)}>Continue</button>
            <Link to='/' style={{color:'tomato',marginTop:'5px'}}>or cancel ?</Link>
          </div>

        </div>
      </form>
      {(emailExist) &&
        <Navigate to='/resetPassword' replace={true} />
      }

    </div>
  )
}

export default CheckEmail