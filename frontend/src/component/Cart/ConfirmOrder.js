import React from 'react';
import Metadata from '../layout/Metadata';
import { useNavigate } from 'react-router-dom';
import './ConfirmOrder.css';
import {useSelector} from 'react-redux'
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CheckOutStep from './CheckOutStep';
export default function ConfirmOrder() {
    const Navigate = useNavigate();
    const {user} = useSelector((state)=>state.user)
    const {shipingInfo,cartItems}=useSelector((state)=>state.cart);
    const subtotal=cartItems.reduce(
        (acc,item)=>acc+item.quentity*item.price,0 
    )
    const shipingCharges=subtotal>1000?0:200;
    const tax=subtotal*0.18;
    const totalPrice=subtotal+shipingCharges+tax;
    const address=`${shipingInfo.address},${shipingInfo.city},${shipingInfo.state},${shipingInfo.pinCode},${shipingInfo.country}`

    const ProceedToPaymentHandler=()=>{
        const data = {
            subtotal,shipingCharges,tax,totalPrice
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        Navigate("/payment/process")
    }
  return (
    <>
    <Metadata title="Confirm Order"/>
    <CheckOutStep  activeState={1}/>
      <div className='confirmOrderPage'>
        <div>
            <div className='confirmshipingArea'>
                <Typography>Shiping Info</Typography>
                <div className='confirmShpingAreaBox'>
                    <p>Name:</p>
                    <span>{user.name}</span>
                </div>
                <div className='confirmShpingAreaBox'>
                    <p>Phone:</p>
                    <span>{shipingInfo.phoneNo}</span>
                </div>
                <div className='confirmShpingAreaBox'>
                    <p>Address:</p>
                    <span>{address}</span>
                </div>
            </div>
            <div className='confirmCartItems'>
                <Typography>Your Cart Items: </Typography>
                <div className='confirmCartItemsContainer'>
                    {cartItems && 
                        cartItems.map((item)=> (
                            <div key={item.product}>
                                <img src={item.image} alt='Product'/>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                <span>
                                    {item.quentity} X ₹{item.price} = <b>₹{item.quentity * item.price}</b>
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
        <div>
            <div className='orderSummary'>
                <Typography>Order Summary</Typography>
                <div>
                    <div>
                        
                        <p><b>Sub Total:</b></p>
                        <span>₹{subtotal}</span>
                    </div>
                    <div>
                        <p><b>Shiping Charges:</b></p>
                        <span>₹{shipingCharges}</span>
                    </div>
                    <div>
                        <p><b>GST:</b></p>
                        <span>₹{tax}</span>
                    </div>
                    
                </div>
                <div className='orderSummaryTotal'>
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>₹{totalPrice}</span>
                </div>
                <button onClick={ProceedToPaymentHandler}>Proceed To Payment</button>
            </div>
        </div>
      </div>
    </>
  )
}
