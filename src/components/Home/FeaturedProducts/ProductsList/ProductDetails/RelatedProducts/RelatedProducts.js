import React,{useState} from 'react'
import CardSmall from '../../../../../Shared_Components/CardSmall'
import './relatedproducts.css'

const RelatedProducts = () => {
  const [productsList, setProductsList] = useState([{
    id: 2,
    title: "Ikigai-TEMP",
    src: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    rating: "4",
    price: 260,
    category: 'tshirt'
  }])

  return (
    <div className='related_products'>

      <h4>Related Products</h4>
      <hr />
      {productsList.map(product=>{
        return <CardSmall props={product}  />
      })}
    </div>
  )
}

export default RelatedProducts