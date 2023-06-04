import React, { useEffect, useState } from 'react'
import './newProduct.css';
import Metadata from '../layout/Metadata';
import SideBar from './SideBar';
import { useNavigate ,useParams} from 'react-router-dom';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {UPDATE_PRODUCT_RESET} from '../../Reducers/ProductReducer'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError,updateProduct,getProductDetails } from '../../Actions/ProductAction';
function UpdateProduct() {
    const dispatch=useDispatch();
    const alert = useAlert();
    const Navigate=useNavigate()
    const {id}=useParams();
    const {loading , error:updateError, isUpdated} = useSelector((state)=> state.product);
    const {error,product}=useSelector((state)=>state.productDetails)
    
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState(""); 
    const [stock,setStock]=useState(0);
    const [image,setImages]=useState([])
    const [oldImages,setOldImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([]) 

    const categories =[
        "History",
        "science",
        "Giography",
        "Computer",
        "others"
    ];
    useEffect(()=>{
        if(product && product._id!==id){
            dispatch(getProductDetails(id))
        }else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.image);

        }
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        if(updateError){
            alert.error(updateError)
            dispatch(clearError())
        }
        if(isUpdated){
            alert.success("Product Updated Successfully");
            Navigate("/admin/products")
            dispatch({
                type:UPDATE_PRODUCT_RESET
            })
        }
    },[dispatch,error,isUpdated,alert,Navigate,id,product,updateError])
    const createProductSubmitHandler=(e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("stock",stock);
        myForm.set("description",description);
        myForm.set("category",category);

        image.forEach((imag)=>{
            myForm.append("image",imag);
        })
        dispatch(updateProduct(id,myForm))

    }
    const createProductImageChange=(e)=>{
        const files=Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState===2){
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result]);

                }
            }
            reader.readAsDataURL(file);
        })

    }
  return (
    <React.Fragment>
      <Metadata title="Create New Product"/>
      <div className='dashboard'>
        <SideBar/>
        <div className='newProductContainer'>
            <form className='createProductform' encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
                <h1>Create Product</h1>
                <div>
                    <SpellcheckIcon/>
                    <input type='text' placeholder='Product Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <AttachMoneyIcon/>
                    <input type='number' placeholder='Price' required value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <DescriptionIcon/>
                    <textarea placeholder='Description' required value={description} cols='30' rows='1' onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <AccountTreeIcon/>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value=''>Choose Categoru</option>
                        {categories.map((item)=>(
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <StorageIcon/>
                    <input type="number" placeholder='Stock' value={stock} required onChange={(e)=>setStock(e.target.value)}/>

                </div>
                <div id="createProductFormFile">
                    <input type='file' name='avatar' accept='image/*' multiple onChange={createProductImageChange}/>
                </div>
                <div id="createProductFormImage">
                    {oldImages.map((image,index)=>(
                        <img key={index} src={image.url} alt="Old Product Preview"/>
                    ))}
                </div>
                <div id="createProductFormImage">
                    {imagesPreview.map((image,index)=>(
                        <img key={index} src={image} alt="Product Preview"/>
                    ))}
                </div>
                <Button id="createProductBtn" type="submit" disabled={loading ? true:false}>Update</Button>
            </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UpdateProduct
