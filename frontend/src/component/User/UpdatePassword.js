import React,{useEffect, useState} from 'react'
import './UpdatePassword.css'
import Loader from '../layout/Loader/Loader';
import { Link ,useNavigate} from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {useSelector,useDispatch} from 'react-redux';
import { updateUserPassword,clearError } from '../../Actions/UserAction';
import {useAlert} from 'react-alert'
import Metadata from '../layout/Metadata';
import {UPDATE_PASSWORD_RESET} from '../../Reducers/UserReducer'

function UpdatePassword() {
    const dispatch= useDispatch();
    const {error,isUpdated,loading}=useSelector((state)=>state.profile);
    const alert = useAlert()
    const Navigate=useNavigate();

    const [oldPassword,SetOldPassword]=useState("");
    const [newPassword,SetNewPassword]=useState("");
    const [confirmPassword,SetConfirmPassword]=useState("");


    const UpdatePasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(updateUserPassword(myForm)) 

    }
    useEffect(()=>{
        
        if(error){
            alert.error(error)
            dispatch(clearError());
        }
        if(isUpdated)
        {
            alert.success("profile Updated Successfully");
            
            Navigate("/account");
            // here we have to dispatch only one case 
            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
        }
    },[dispatch,error,alert,Navigate,isUpdated])
    
  return (
    <>
      {loading?<Loader/>:<div>
        <Metadata title="Change Password"/>
      <div className="UpdatePasswordContainer">
            <div className="UpdatePasswordBox">
                <h2 className="UpdatePasswordHeading">Update Password</h2>
            <form className="UpdatePasswordform"  encType="multipart/form-data" onSubmit={UpdatePasswordSubmit} >
            <div className="loginPassword"> 
                        <VpnKeyIcon/>
                        <input type="password" placeholder="Old Password" required value={oldPassword} onChange={(e)=>SetOldPassword(e.target.value)}/>
                    </div>
                    <div className="loginPassword"> 
                        <LockOpenIcon/>
                        <input type="password" placeholder="New Password" required value={newPassword} onChange={(e)=>SetNewPassword(e.target.value)}/>
                    </div>
                    <div className="loginPassword"> 
                        <LockIcon/>
                        <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e)=>SetConfirmPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value="Change Password" className="UpdatePasswordButton" />
                </form>
            </div>
        </div>
    </div>}
    </>
  )
}

export default UpdatePassword
