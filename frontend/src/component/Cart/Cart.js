import React from 'react'
import CartItem from './CartItem'
import {useDispatch,useSelector} from 'react-redux'
import './cart.css'
import { addItemToCart, removeFromCart } from '../../Actions/CartAction';
import {Typography} from '@material-ui/core';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {cartItems} = useSelector((state)=>state.cart);
  const increaseQuentity = (id,quentity,stock)=>{
    if(stock<=quentity) return;
    const newqty=quentity+1;
    dispatch(addItemToCart(id,newqty));
  }
  const decreaseQuentity = (id,quentity)=>{
    if(1>=quentity) return;
    const newqty=quentity-1;
    dispatch(addItemToCart(id,newqty));
  }
  const removeFromCartButton =(id)=>{
    dispatch(removeFromCart(id))
  }
  const CheckOutHandler=()=>{
    Navigate("/login?redirect=/shiping");
  }
  return (
    <>
      {cartItems.length===0?<div className='emptyCart'>
        <RemoveShoppingCartIcon/>
        <Typography>No Product In Your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>:<>
      <div className="cartPage">
        <div className="cartHeader">
            <p>Product</p>
            <p>Quentity</p>
            <p>Subtotal</p>
        </div>
        {cartItems && cartItems.map((item)=>(
          <div className="cartContainer" key={item.product}>
          <CartItem item={item} deleteCartItem ={removeFromCartButton}/>
          <div className="cartInput">
              <button onClick={()=>decreaseQuentity(item.product,item.quentity)}>-</button>
              <input type="number" value={item.quentity} readOnly/>
              <button onClick={()=>increaseQuentity(item.product,item.quentity,item.stock)}>+</button>
          </div>
          <p className='cartSubTotal'>{`₹${item.price*item.quentity}`}</p>
      </div>
        ))}
        <div className='cartGrossTotal'>
          <div></div>
          <div className='cartGrossTotalBox'>
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce(
              (acc,item)=>acc+item.quentity*item.price,0
            )}`}</p>
          </div>
          <div></div>
          <div className='checkOutbtn'>
            <button onClick={CheckOutHandler}>Check Out</button>
          </div>

        </div>
      </div>
    </>}
    </>
  )
}
