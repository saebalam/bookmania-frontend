import React from 'react'
import {Route,Navigate} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({children,...rest}) => {
  console.log('children',children)
    const {isAuthentiacted}=useAuth0();
  return (
    <div>
        {(isAuthentiacted)
        ? <div>{children}</div>
        : <Navigate to='/login' />
        }
    </div>
  )
}

export default PrivateRoute

