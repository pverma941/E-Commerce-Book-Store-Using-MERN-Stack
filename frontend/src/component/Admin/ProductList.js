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
import { clearError, deleteProduct, getAllProductAdmin } from '../../Actions/ProductAction';
import './ProductList.css'
import { DELETE_PRODUCT_RESET } from '../../Reducers/ProductReducer';
function ProductList() {
    const alert = useAlert();
    const dispatch=useDispatch();
    const Navigate=useNavigate()
    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError ,isDeleted}=useSelector((state)=>state.product);
    const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id))
    }
    const columns=[
        {
            field:"id",
            headerName:"Product ID",
            minWidth:200,
            flex:0.5
        },
        {
            field:"name",
            headerName:"Name",
            minWidth:350,
            flex:-1
        },
        {
            field:"stock",
            headerName:"Stock",
            type:"number",
            minWidth:150,
            flex:-1
        },
        {
            field:"price",
            headerName:"Price",
            type:"number",
            minWidth:270,
            flex:-2
        },
        {
            field:"actions",
            headerName:"Actions",
            sortable:false,
            minWidth:150,
            flex:0.3,
            renderCell:(params)=>{
                return (
                    <React.Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </React.Fragment>
                )
            }  
        }
    ]
    const rows=[];
    products && products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name
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
            alert.success("Product Deleted Successfully");
            Navigate("/admin/dashboard")
            dispatch({
                type:DELETE_PRODUCT_RESET
            })
        }
        dispatch(getAllProductAdmin());
    },[dispatch,error,alert,deleteError,isDeleted,Navigate])
  return (
    <React.Fragment>
      <Metadata title="All Products --Admin"/>
      <div className='dashboard'>
        <SideBar/>
        <div className='productListContainer'>
            <h1 id="ProductListHeading">ALL PRODUCTS</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTabel' autoHeight/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductList
