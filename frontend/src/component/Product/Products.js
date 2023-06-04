import React, { useEffect, useState } from 'react'
import './Products.css'
import { useParams } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { clearError, getProduct } from '../../Actions/ProductAction';
import Loader from '../layout/Loader/Loader';
import ProductCart from '../Home/ProductCart';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'
import {useAlert} from 'react-alert'
import Metadata from '../layout/Metadata';
const categories =[
    "History",
    "science",
    "Giography",
    "Computer",
    "others"
];
export default function Products() {
    const dispatch= useDispatch();
    const alert = useAlert();
    const {products,loading,error,productsCount,resultPerPage} = useSelector(state=>state.products)
    const [currentPage,setCurrentPage]=useState(1);
    const[price,setPrice]=useState([0,25000]);
    const[category,setCategory]=useState("");
    const[ratings,setRatings]=useState(0);

    const priceHandler=(e,newPrice)=>{
        setPrice(newPrice);
    }
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    let { keyword } = useParams();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings))
        // dispatch(getProduct())
    },[dispatch,keyword,currentPage,price,category,ratings,alert,error]);

    // let count = filterProductsCount;
  return (
   <>
   {loading ? <Loader/> : 
   <>
        <Metadata title="PRODUCTS"/>
        <h2 className='productheading'>Products</h2>
        <div className='products'>
            {products && 
                products.map((product)=>(
                    <ProductCart key={product._id} product={product}/>
                ))
            }
        </div>

        <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider 
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                
                min={0}
                max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox"> 
                {categories.map((category)=>(
                    <li className="category-link" key={category} onClick={()=> setCategory(category)}>
                        {category}
                    </li>
                ))}
            </ul>
            <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider 
                    value={ratings}
                    onChange={(e,newRating)=>{
                        setRatings(newRating);
                    }}
                    valueLabelDisplay="auto"
                    aria-labelledby="countinuous-slider"
                    min={0}
                    max={5}
                />
            </fieldset>
        </div>
        <div className='paginationBox'>
            {resultPerPage < productsCount  && (
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
            />
            )
            
            }
        </div>
   </>}
   </>
  )
}
