import React, { useEffect, useState } from 'react'
import './newProduct.css';
import Metadata from '../layout/Metadata';
import SideBar from './SideBar';
import { useNavigate ,useParams} from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonIcon from '@material-ui/icons/Person'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

import {NEW_PRODUCT_RESET} from '../../Reducers/ProductReducer'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { newProduct,clearError } from '../../Actions/ProductAction';
import { UPDATE_USER_RESET } from '../../Reducers/UserReducer';
import { getUserDetails, updateUser } from '../../Actions/UserAction';
import Loader from '../layout/Loader/Loader';
function UpdateUser() {
    const dispatch=useDispatch();
    const alert = useAlert();
    const Navigate=useNavigate()
    const {id}=useParams();
    const {loading:updateLoading , error:updateErro, isUpdated} = useSelector((state)=> state.profile);
    const {loading , error, user} = useSelector((state)=> state.userDetail);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole]=useState("");
    

    useEffect(()=>{
        if(user && user._id!==id){
            dispatch(getUserDetails(id));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

        }
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        if(updateErro){
            alert.error(updateErro)
            dispatch(clearError())
        }
        if(isUpdated){
            alert.success("User Updated Successfully");
            Navigate("/admin/users")
            dispatch({
                type:UPDATE_USER_RESET
            })
        }
    },[dispatch,error,isUpdated,alert,Navigate,updateErro,id,user])
    const updateUserSubmitHandler=(e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("role",role);
       
        dispatch(updateUser(id,myForm))

    }
    
  return (
    <React.Fragment>
      <Metadata title="Update User"/>
      <div className='dashboard'>
        <SideBar/>
        <div className='newProductContainer'>
            {loading?<Loader/>:<form className='createProductform' encType='multipart/form-data' onSubmit={updateUserSubmitHandler}>
                <h1>Update User</h1>
                <div>
                    <PersonIcon/>
                    <input type='text' placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <MailOutlineIcon/>
                    <input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                
                <div>
                    <VerifiedUserIcon/>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value=''>Choose Role</option>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                        
                    </select>
                </div>
                
                
                <Button id="createProductBtn" type="submit" disabled={updateLoading && updateLoading ? true:false || role==="" ? true :false}>Update</Button>
            </form>}
        </div>
      </div>
    </React.Fragment>
  )
}


export default UpdateUser
