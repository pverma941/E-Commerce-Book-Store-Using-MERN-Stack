import React, { useEffect } from 'react'
import Chart from 'chart.js/auto';
import SideBar from './SideBar'
import './dashboard.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from 'react-chartjs-2'
import { clearError, getAllProductAdmin } from '../../Actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../Actions/OrderAction';
export default function Dashboard() {
  const { error, products } = useSelector((state) => state.products);
  const {  orders } = useSelector((state) => state.allOrders);
  const {  users } = useSelector((state) => state.allUsers);

  const dispatch=useDispatch();
  let OutOfStock = 0;
  products && products.forEach((item)=>{
    if(item.stock === 0){
      OutOfStock +=1;
    }
  })
  useEffect(()=>{
    dispatch(getAllProductAdmin());
    dispatch(getAllOrders())
},[dispatch])
let totalAmount =0;
orders && orders.forEach((item)=>{
  totalAmount+=item.totalPrice
})
  const lineState={
    labels:["Initial Amount","Amount Earned"],
    datasets:[
      {
        label:"TOTAL AMOUNT",
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgb(197,72,49)"],
        data:[0,totalAmount],
      }
    ]
  }
  const DoughnutSatate={
    labels:["Out of Stock","In Stock"],
    datasets:[
      {
        backgroundColor:["#00A684","#6800B4"],
        hoverBackgroundColor:["rgb(197,72,49)"],
        data:[OutOfStock,products.length - OutOfStock],
      }
    ]
  }
  return (
    <div className='dashboard'>
      <SideBar/>
      <div className='dashboardcontainer'>
        <Typography component='h1'>Dashboard</Typography>
        <div className='dashboardSummary'>
          <div>
            <p>
              Total Amount <br/> ₹{totalAmount}
            </p>
          </div>
          <div className='dashboardSummaryBox2'>
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
          </div>
        </div>
        <div className='LineComponent'>
          <Line data={lineState}/>
        </div>
        <div className='DoughnutComponent'>
          <Doughnut data={DoughnutSatate}/>
        </div>
      </div>
    </div>
  )
}
