import React from 'react'
import './cartItem.css'
import {Link} from 'react-router-dom'
export default function CartItem({item,deleteCartItem}) {
  return (
    <div className="cartItem">
      <img src={item.image} alt='ssa'/>
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={()=>deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  )
}
