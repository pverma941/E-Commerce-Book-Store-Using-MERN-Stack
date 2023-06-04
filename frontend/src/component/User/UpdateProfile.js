import React,{useEffect, useState} from 'react'
import './UpdateProfile.css'
import Loader from '../layout/Loader/Loader';
import { Link ,useNavigate} from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import {useSelector,useDispatch} from 'react-redux';
import { updateUserProfile,clearError, load_user } from '../../Actions/UserAction';
import {useAlert} from 'react-alert'
import Metadata from '../layout/Metadata';
import {UPDATE_PROFILE_RESET} from '../../Reducers/UserReducer'
function UpdateProfile() {
    const dispatch= useDispatch();
    const {user} = useSelector((state)=>state.user)
    const {error,isUpdated,loading}=useSelector((state)=>state.profile);
    const alert = useAlert()
    const Navigate=useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("")
    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState("/Profile.png")
    const UpdateProfileSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(updateUserProfile(myForm))

    }
    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if(error){
            alert.error(error)
            dispatch(clearError());
        }
        if(isUpdated)
        {
            alert.success("profile Updated Successfully");
            dispatch(load_user());
            Navigate("/account");
            // here we have to dispatch only one case 
            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        }
    },[dispatch,error,alert,Navigate,user,isUpdated])
    const UpdateProfileDataChange=(e)=>{
        
            const reader = new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
    }
  return (
    <>
    {loading?<Loader/>:<div>
        <Metadata title="Update Profile"/>
      <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
                <h2 className="UpdateProfileHeading">Update Profile</h2>
            <form className="UpdateProfileform"  encType="multipart/form-data" onSubmit={UpdateProfileSubmit} value={name}>
                    <div className="UpdateProfileName">
                        <FaceIcon/>
                        <input type="text" placeholder="Name" required name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="UpdateProfileEmail">
                        <MailOutlineIcon/>
                        <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div id="UpdateProfileImage">
                        <img src={avatarPreview} alt="Avartar preveiw"></img>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={UpdateProfileDataChange}
                        />
                    </div>
                    <input type="submit" value="UpdateProfile" className="UpdateProfileButton" />
                </form>
            </div>
        </div>
    </div>}
    </>
    
  )
}

export default UpdateProfile
