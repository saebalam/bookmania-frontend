import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import homePageProducts from '../Action_Creators/homePageProducts';

const Tempp = () => {
  
    const count=useSelector(state=>state.count)
    const dispatch = useDispatch()

  return (
    <div>
        <button onClick={()=>{dispatch(homePageProducts());console.log("hello")}}>clicked {count} times</button>
    </div>
  )
}

export default Tempp