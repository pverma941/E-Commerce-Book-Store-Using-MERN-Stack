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
import './ProductList.css'
import { getAllUsers,clearError, deleteUser } from '../../Actions/UserAction';
import { DELETE_USER_RESET } from '../../Reducers/UserReducer';
function UserList() {
    const alert = useAlert();
    const dispatch=useDispatch();
    const Navigate=useNavigate()
    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError ,isDeleted,message}=useSelector((state)=>state.profile);
    const deleteUserHandler = (id)=>{
        dispatch(deleteUser(id))
    }
    const columns=[
        {
            field:"id",
            headerName:"User ID",
            minWidth:200,
            flex:0.5
        },
        {
            field:"email",
            headerName:"Email",
            minWidth:350,
            flex:-1
        },
        {
            field:"name",
            headerName:"Name",
            type:"number",
            minWidth:150,
            flex:-1
        },
        {
            field:"role",
            headerName:"Role",
            type:"number",
            minWidth:270,
            flex:-2,
            cellClassName:(params)=>{
                return params.getValue(params.id,"role")==="admin"?"greenColor":"redColor"
            }
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
                        <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </React.Fragment>
                )
            }  
        }
    ]
    const rows=[];
    users && users.forEach((item)=>{
        
        rows.push({
            id:item._id,
            name:item.name,
            email:item.email,
            role:item.role
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
            alert.success("User Deleted");
            Navigate("/admin/users")
            dispatch({
                type:DELETE_USER_RESET
            })
        }
        dispatch(getAllUsers());
    },[dispatch,error,alert,deleteError,isDeleted,Navigate,message])
  return (
    <React.Fragment>
      <Metadata title="All Users --Admin"/>
      <div className='dashboard'>
        <SideBar/>
        <div className='productListContainer'>
            <h1 id="ProductListHeading">ALL USERS</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTabel' autoHeight/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UserList
