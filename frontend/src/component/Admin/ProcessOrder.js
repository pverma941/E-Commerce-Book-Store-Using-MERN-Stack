import React, { useEffect, useState } from 'react';
import Metadata from '../layout/Metadata';
import { useNavigate,useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useDispatch,useSelector } from 'react-redux';
import { clearError, getOrderDetail, updateOrder } from '../../Actions/OrderAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import {Button} from '@material-ui/core'
import { UPDATE_ORDER_RESET } from '../../Reducers/OrderReducer';
import './ProcessOrder.css'
export default function ProcessOrder() {
    const Navigate = useNavigate();
    const {user} = useSelector((state)=>state.user)
    const {order,error,loading}=useSelector((state)=>state.orderDetails);
    const {error:updateError,isUpdated}=useSelector((state)=>state.order);

    const dispatch = useDispatch();
    const {id}=useParams();
    const alert = useAlert()
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearError());
        }
        if(isUpdated){
            alert.success("Order Updated Successfully");
            dispatch({
                type:UPDATE_ORDER_RESET
            });
        }
        dispatch(getOrderDetail(id))
    },[error,alert,dispatch,id,isUpdated,updateError])
    const [status,setStatus]=useState("");
    const updateOrderSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status",status);
        dispatch(updateOrder(id,myForm))
    }
  return (
    <React.Fragment>
      <Metadata title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order && order.orderStatus && order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshipingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div className='confirmShpingAreaBox'>
                      <p>Name:</p>
                      <span>{order && order.user && order.user.name}</span>
                    </div>
                    <div className='confirmShpingAreaBox'>
                      <p>Phone:</p>
                      <span>
                        {order && order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className='confirmShpingAreaBox'>
                      <p>Address:</p>
                      <span>
                        {order && order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div className='confirmShpingAreaBox'>
                      <p
                        className={
                            order && order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order && order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className='confirmShpingAreaBox'>
                      <p>Amount:</p>
                      <span>{order && order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div className='confirmShpingAreaBox'>
                      <p
                        className={
                          order && order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order && order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order && order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quentity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quentity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order && order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order && order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order && order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </React.Fragment>
      
  )
}
