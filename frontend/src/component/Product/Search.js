import React, { useState } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom';
import Metadata from '../layout/Metadata';

export default function Search() {
    const Navigate = useNavigate();
    const [Keyword,setKeyword] = useState("");
    const serchSubmitHandler = (e)=>{
        e.preventDefault();      // from submit karne pe reload nhi hoga..
        if(Keyword.trim()){   // trim() remove all the spaces in keyword
            Navigate(`/products/${Keyword}`)
            // history.push(`/products/${Keyword}`);
        }else{
            Navigate('/products')
            // history.push('/products');
        }
    };
  return (
    <>
    <Metadata title="Search-Product"/>
    <form className='searchBox' onSubmit={serchSubmitHandler}>
        <input
            type="text"
            placeholder='Search a Book'
            onChange={(e)=>setKeyword(e.target.value)}
        />
        <input type="submit" value="Search"/>
    </form>
    </>
  )
}
