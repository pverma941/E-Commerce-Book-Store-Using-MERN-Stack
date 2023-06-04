import React, { useState } from 'react'
import {SpeedDial, SpeedDialAction} from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom';
import {useAlert} from 'react-alert'
import {useDispatch} from 'react-redux'
import {logout} from '../../../Actions/UserAction';
import './UserOptions.css'

export default function UserOptions({user}) {
  const Navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open,setOpen]=useState(false);
  const orders = ()=>{
    Navigate("/orders")
  }
  const dashboard = ()=>{
    Navigate("/admin/dashboard")
  }
  const account = ()=>{
    Navigate("/account")
  }
  const loagoutUser = ()=>{
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  const option =[
    { icon : <ListAltIcon/> , name : "Orders" , func :orders },
    { icon : <PersonIcon/> , name : "Profile" , func :account },
    { icon : <ExitToAppIcon/> , name : "Logout" , func :loagoutUser },

  ]
  if(user.role==="admin"){
    option.unshift(
    { icon : <DashboardIcon/> , name : "Dashboard" , func :dashboard }
    )
  }

  return (
    <>
    <Backdrop open={open} />
  <SpeedDial 
    ariaLabel="SpeedDial tooltip example"
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    className="speedDial"
    direction="down"
    icon={
      <img className="speedDialIcon" alt="avatar" src={user.avatar.url ? user.avatar.url : "/Profile.png"}/>
    }
  >
    
    {option.map((item)=>(
      <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
    ))}
  </SpeedDial> 
  </>
  )
}
