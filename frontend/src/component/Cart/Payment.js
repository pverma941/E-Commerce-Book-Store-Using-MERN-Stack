import React, { useEffect, useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements, CardElement} from '@stripe/react-stripe-js';
import './Payment.css';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Metadata from '../layout/Metadata';
import CheckOutStep from './CheckOutStep';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { clearError } from '../../Reducers/OrderReducer';
import { createOrder } from '../../Actions/OrderAction';
export default function Payment() {
    const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch=useDispatch();
    const alert=useAlert();
    const Navigate=useNavigate();
    const stripe= useStripe();
    const element=useElements();
    const {cartItems,shipingInfo}=useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);
    const {error}=useSelector((state)=>state.newOrder)
    const paymentData={
        amount:Math.round(orderInfo.totalPrice*100)
    }
    const order = { 
        shippingInfo:shipingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shipingPrice:orderInfo.shipingCharges,
        totalPrice:orderInfo.totalPrice
    }
    const submitHandler= async (e)=>{
        e.preventDefault();
        payBtn.current.disabled=true;

        try {
            const config={
                headers:{
                    "Content-Type":"application/json"
                },
            }
            const {data} = await axios.post("/api/v1/payment/process",paymentData,config);

            const client_secret=data.client_secret;
            // this both stripe and element are mendatary to progress otherwise simply return
            if(!stripe || !element) return;

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:element.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shipingInfo.address,
                            city:shipingInfo.city,
                            state:shipingInfo.state,
                            postal_code:shipingInfo.pinCode,
                            country:shipingInfo.country
                        }
                    }
                }
            });
            if(result.error){
                payBtn.current.disabled=false;
                alert.error(result.error.message)
            }else{
                if(result.paymentIntent.status==="succeeded"){
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    Navigate("/success");
                }else{
                    alert.error("there is some Problem while processing payment");
                }
            }
            
        } catch (error) {
            payBtn.current.disabled=false;
            alert.error(error.response.data.message);
        }
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError);
        }
    },[dispatch,error,alert])
    const payBtn=useRef(null);
  return (
    <>
      <Metadata title="Payment"/>
      <CheckOutStep activeState={2}/>
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e)=>submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className='paymentInput'/>
            </div>
            <div>
                <EventIcon/>
                <CardExpiryElement className='paymentInput'/>
            </div>
            <div>
                <VpnKeyIcon/>
                <CardCvcElement className='paymentInput'/>
            </div>
            <input 
                type="submit" 
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="PaymentFormBtn"
            />
        </form>
      </div>
    </>
  )
}
