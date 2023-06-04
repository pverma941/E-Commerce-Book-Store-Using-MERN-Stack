import React,{useEffect, useRef, useState} from 'react'
import './LoginSignUp.css'
import Loader from '../layout/Loader/Loader';
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import {useSelector,useDispatch} from 'react-redux';
import { login,clearError,register } from '../../Actions/UserAction';
import {useAlert} from 'react-alert'

function LoginSignUp() {
    const dispatch= useDispatch();
    const {error,loading,isAuthenticated} = useSelector((state)=>state.user)
    const alert = useAlert()
    const Navigate=useNavigate();
    const location = useLocation();
    const loginTab=useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null);

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    });
    const {name,email,password}=user;
    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState("/Profile.png")
    const loginSubmit=(e)=>{
        e.preventDefault(); 
        dispatch(login(loginEmail,loginPassword))
    }

    const registerSubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        dispatch(register(myForm))

    }
    const redirect = location.search ? location.search.split("=")[1]:"/account"
    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearError());
        }
        if(isAuthenticated){
            Navigate(redirect);
        }
    },[dispatch,error,alert,Navigate,isAuthenticated,redirect])
    const registerDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader = new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }
    const switchTabs = (e,tab)=>{
        if(tab === "login"){        
            switcherTab.current.classList.add("shiftToNeutral");                         
            switcherTab.current.classList.remove("shiftToRight");
            
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }

    }
  return (
    <div>
        {loading ? <Loader/> : 
             <div className="LoginSgnUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_SignUp_toggle">
                        <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginform" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutlineIcon/>
                        <input type="email" placeholder="Email" required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                    </div>
                    <div className="loginPassword"> 
                        <LockOpenIcon/>
                        <input type="password" placeholder="Password" required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                    </div>
                    <Link to="/password/forget">Forget Password ?</Link>
                    <input type="submit" value="Login" className="loginButton"/>
                </form>
                <form className="signUpform" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit} value={name}>
                    <div className="signUpName">
                        <FaceIcon/>
                        <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange}/>
                    </div>
                    <div className="signUpEmail">
                        <MailOutlineIcon/>
                        <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange}/>
                    </div>
                    <div className="signUpPassword">
                        <LockOpenIcon/>
                        <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange}/>
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avartar preveiw"></img>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                        />
                    </div>
                    <input type="submit" value="Register" className="signUpButton" />
                </form>
            </div>
        </div>}
    </div>
  )
}

export default LoginSignUp
