import React,{useEffect} from 'react'
import image1 from '../../home-bg.jpg'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import CardSmall from '../../../Shared_Components/CardSmall';
import './productsList.css'

const ProductsList = () => {
    const [productsList,setProductsList]=useState([{
        id:2,
        title:"Ikigai",
        src:'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
        rating:"4",
        price:"260",
        category:'tshirt'
    }])

    const pName=useParams().productName
    console.log("pname is",pName);

    useEffect(() => {
        console.log("inside use")
      axios.get(`/productsList/${pName}`)
      .then(res=>{
        if(res.data.length!=null && res.data.length>0){
            setProductsList(res.data)
            console.log("plist is",res.data);
        }
      })
    }, [])
    

  return (
    <div>
        {console.log(".map is",productsList)}
        <div className='myBreadcrumb'>
            <Link to='/' className='link'>Home / </Link><span>{pName}</span>
        </div>
        <div className='productsListContainer'>
        {   
            productsList.map(product=>{
                return <CardSmall props={product} />
            })
        }
        </div>
    </div>
  )
}

export default ProductsList