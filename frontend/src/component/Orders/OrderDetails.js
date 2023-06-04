import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getOrderDetail } from '../../Actions/OrderAction';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import { Typography } from '@material-ui/core';
import './OrderDetails.css'
export default function OrderDetails() {
  const {id} = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    // console.log(id)
    dispatch(getOrderDetail(id));
  }, [dispatch, alert, error, id]);
  return (
    <>
      {loading ? (<Loader/>) : 
        (<>
          <Metadata title="Order Details"/>
          <div className="OrderDetailsPage">
            <div className="OrderDetailsContainer">
              <Typography component="h1">Order #{order && order._id}</Typography>
              <Typography>Shipping Information</Typography>
              <div className='OrderDetailsContainerBox'>
                <div>
                  <p>Name:</p>
                  <span>{order && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order && order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{order && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className='OrderDetailsContainerBox'>
                <div>
                  <p className={order && order.paymentInfo.status === "succeeded" ? "greenColor":"redColor"}>{order && order.paymentInfo.status === "succeeded" ? "PAID" : "UNPAID"}</p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="OrderDetailsContainerBox">
                <div>
                  <p className={order && order.orderStatus === "delivered" ? "greenColor":"redColor"}>{order && order.orderStatus}</p>
                </div>
              </div>
            </div>
            <div className='OrderDetailCartItems'>
            {order && 
                        order.orderItems.map((item)=> ( 
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
        </>)
      }
    </>
  )
}
