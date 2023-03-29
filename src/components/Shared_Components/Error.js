import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div style={{marginTop:'200px'}}>
        <h1>oops !!!</h1>
        <Link to='/'>Home</Link>
    </div>
  )
}

export default Error