import axios from 'axios'
import React, { useEffect, useState } from 'react'
import card from '../../Assets/Images/card.jpg'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import empty_wishlist from '../../Assets/Images/empty_wishlist.png'
import './wishlist.css'

const Wishlist = () => {

    const [wishlistItems, setWishlistItems] = useState([])
    const [refreshWishlist,setRefreshWishlist]=useState(0)

    useEffect(() => {
        axios.get('getWishlistItems')
            .then(res => {
                console.log("wish", res);
                setWishlistItems(res.data)
            })
    }, [refreshWishlist])

    const removeFromWishlist=(id)=>{
        console.log("id wish",id);
        axios.post(`removeFromWishlist/${id}`)
        .then(setRefreshWishlist(refreshWishlist+1))
    }

    return (
        <div>
            <div className='myBreadcrumb'>
                <Link to='/' className='link'>Home / </Link><Link to='/productsList/1' className='link'>Products / </Link><span> ProductName</span>
            </div>
            {console.log("wish length",wishlistItems.length)}
            {(wishlistItems.length==0) &&
                <div style={{marginTop:"70px"}}>
                    <img src={empty_wishlist} alt="" /><br />
                    <Link to='/' style={{color:'black'}}>Let's Go Shoppping</Link>
                </div>
            }
            {(wishlistItems.length>0) &&
                <div className='wishlist-table'>
                    <table>
                    <thead style={{textAlign:'left'}}>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock status</th>
                        <th>btn</th>
                    </thead>
                    <tbody>
                        {wishlistItems.map(item => {
                            return <tr>
                                <td><div className='img-div'><img className='product-img' src={card} alt="" /></div></td>
                                <td>{item.price}</td>
                                <td>In Stock</td>
                                <td><button title="Remove from Wishlist" onClick={()=>removeFromWishlist(item.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                </div>
            }
        </div>
    )
}

export default Wishlist