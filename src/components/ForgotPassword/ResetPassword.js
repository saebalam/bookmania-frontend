import axios from 'axios'
import React, { useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import toast,{ Toaster} from 'react-hot-toast'

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const nav = useNavigate();

  const changeHandler = (e) => {
    e.preventDefault()
    setNewPassword(e.target.value)
  }

  const data = { 'newPassword': newPassword }
  const API_DATA = JSON.stringify(data)

  const updatePassword = (e) => {
    e.preventDefault()
    axios.post('updatePassword', API_DATA, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log('res', res);
        if (res.data == true) {
          setNewPassword('')
          toast('Password updated succesfully')
          setTimeout(() => {
            nav('/login')
          },2500)
        }
      })
  }
  return (
    <div style={{ margin: '0 auto', marginTop: '150px', width: '22%', padding: '40px 5px', borderRadius: '5px', boxShadow: 'rgba(149, 142, 142, 0.521) 0px 3px 8px', backgroundColor: '#f1eaec' }}>
      <form action="" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}><h4>Update Password</h4></div>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
          <input type="password" autoFocus name="" id="" size={30} value={newPassword} placeholder="Enter new password" onChange={(e) => changeHandler(e)} />
          <button className='btn btn-primary' style={{ marginTop: '10px' }} onClick={(e) => updatePassword(e)}>Update</button>
      <Toaster position="top-center"
        reverseOrder={false} />
        </div>
      </form>
    </div>
  )
}

export default ResetPassword