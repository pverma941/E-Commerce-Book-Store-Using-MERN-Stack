import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from '@material-ui/core';
import Metadata from '../layout/Metadata';
import SideBar from './SideBar';
import { DataGrid } from '@material-ui/data-grid';
import { clearError, deleteOrder, getAllOrders } from '../../Actions/OrderAction';
import './ProductList.css'
import { DELETE_ORDER_RESET,UPDATE_ORDER_RESET } from '../../Reducers/OrderReducer';
function OrderList() {
    const alert = useAlert();
    const dispatch=useDispatch();
    const Navigate=useNavigate()
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError ,isDeleted}=useSelector((state)=>state.order);
    const deleteOrderHandler = (id)=>{
        dispatch(deleteOrder(id))
    }
    const columns=[
        {
            field:"id",
            headerName:"Order ID",
            minWidth:300,
            flex:-1
        },
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:-1,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor"
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",minWidth:150,
            flex:-1
        },
        {
            field:"amount",
            headerName:"Amount",
            minWidth:270,
            flex:0.5
        },
        {
            field:"actions",
            headerName:"Actions",
            sortable:false,
            minWidth:150,
            flex:-1,
            renderCell:(params)=>{
                return (
                    <React.Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </React.Fragment>
                )
            }  
        }
    ]
    const rows=[];
    orders && orders.forEach((item)=>{
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus
        })
    })
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError())
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearError())
        }
        if(isDeleted){
            alert.success("Order Deleted Successfully");
            Navigate("/admin/orders")
            dispatch({
                type:DELETE_ORDER_RESET
            })
        }
        dispatch(getAllOrders());
    },[dispatch,error,alert,deleteError,isDeleted,Navigate])
  return (
    <React.Fragment>
      <Metadata title="All Orders --Admin"/>
      <div className='dashboard'>
        <SideBar/>
        <div className='productListContainer'>
            <h1 id="ProductListHeading">ALL ORDERS</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTabel' autoHeight/>
        </div>
      </div>
    </React.Fragment>
  )
}


export default OrderList
