
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserOptions from './UserOptions'
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';



export default function Header() {
  const {isAuthenticated,user} =useSelector((state)=>state.user)
  
  const [toggle, setToggle] = useState(false)
  const togglebtnClick = ()=>{
    if(toggle===false){
      setToggle(true)
    }else{
      setToggle(false)
    }
  }
  return (
    
    <header>
      <div className='navbar'>
        <div className='logo'>
        <Link to="/" > BooksBug </Link>
        </div>
        <ul className='link'>
          <li><Link to="/products" >Products</Link></li>
          <li><Link to="/contact" >Contact Us</Link></li>
          <li><Link to="/about" >About Us</Link></li>
        </ul>
        <div className="actionBtn">
        <Link className="actionBtnAction" to="/search"><SearchIcon sx={{ mx: 1.5}}/></Link>
        <Link className="actionBtnAction" to="/cart"><ShoppingCartIcon  sx={{ mx: 1.5}}/></Link>
        <Link className="actionBtnAction" to="/login"><AccountBoxIcon  sx={{ mx: 1.5}}/></Link>
        </div>
        <div className='toggle-btn'>
        <button 
            onClick={togglebtnClick} 
            >
          <MenuIcon />
      </button>
          
        </div>
        {toggle && (
        <div className='dropDownMenu'>
          <li><Link to="/products" >Products</Link></li>
          <li><Link to="/contact" >Contact Us</Link></li>
          <li><Link to="/about" >About Us</Link></li>
          <li><Link className="actionBtnAction" to="/search"><SearchIcon sx={{ mx: 1.5}}/></Link>
        <Link className="actionBtnAction" to="/cart"><ShoppingCartIcon  sx={{ mx: 1.5}}/></Link>
        <Link className="actionBtnAction" to="/login"><AccountBoxIcon  sx={{ mx: 1.5}}/></Link></li>
        </div>)}
        {isAuthenticated && <UserOptions user={user} />}
      </div>
    </header>
    
  )
}