import React, { useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import Metadata from '../layout/Metadata'
import Loader from '../layout/Loader/Loader'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearError } from '../../Reducers/OrderReducer'
import { myOrders } from '../../Actions/OrderAction'
import { Link } from 'react-router-dom'
import LaunchIcon from "@material-ui/icons/Launch";
import './MyOrders.css'
export default function MyOrders() {
    const dispatch=useDispatch();
    const alert = useAlert();
    const {loading,error,orders} = useSelector((state)=>state.myOrders);
    const {user} = useSelector((state)=>state.user);
    const columns=[
        
        {
            field:"id",
            headerName:"Order ID",
            minWidth:300,
            flex:1
        },
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor"
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",minWidth:150,
            flex:0.3
        },
        {
            field:"amount",
            headerName:"Amount",
            minWidth:270,
            flex:0.5
        },
        {
            field:"actions",
            headerName:"Action",
            flex:0.3,
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return (
                    <Link to={`/order/${params.getValue(params.id,'id')}`}><LaunchIcon/></Link>
                )
            }
        }
    ];
    const rows=[];

    orders && orders.forEach((item,index)=>{
        rows.push({
            itemsQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice 
        })
    })
    
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(myOrders())
        
    },[error,dispatch,alert])
  return (
    <>
      <Metadata title={`${user.name} -Orders`}/>
      {loading ? (<Loader/>) : 
      (
        <div className='myOrderPage'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='myOrderTable'
                autoHeight
            />
            <Typography className='myOrdersHeading'>{user.name}'s Orders</Typography>
        </div>
    )}
    </>
  )
}
