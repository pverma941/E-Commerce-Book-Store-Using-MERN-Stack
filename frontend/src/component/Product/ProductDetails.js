import React, { useEffect ,useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader'
import { useSelector ,useDispatch } from 'react-redux'
import { clearError, getProductDetails, newReview } from '../../Actions/ProductAction'
import ReviewCart from './ReviewCart.js'
import {useAlert} from 'react-alert';
import Metadata from '../layout/Metadata';
import { addItemToCart } from '../../Actions/CartAction'
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../../Reducers/ProductReducer';
export default function ProductDetails({match}) {
    const dispatch = useDispatch()
    const {id} = useParams();
    // console.log(id)
    const alert = useAlert(); 
    const {product,error,loading} = useSelector((state)=>state.productDetails)
    const {success,error:reviewError} = useSelector((state)=>state.newReview)

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearError());
        }
        if(success){
            alert.success("Review Added Successfully");
            dispatch({
                type:NEW_REVIEW_RESET
            })
        }
        dispatch(getProductDetails(id))
    },[dispatch,id,alert,error,reviewError,success])

    const options={
        
        size:"large",
        value:product.ratings,
        readOnly:true,
        precision:0.5
    }
    const [quentity,setQuentity]=useState(1);
    const IncreaseQuentity=()=>{
        if(product.stock <= quentity) return;
        const qty = quentity+1
        setQuentity(qty);
    }
    const DecreaseQuentity=()=>{
        if(quentity <=1) return;

        const qty = quentity-1
        setQuentity(qty);
    }
    const AddToCartHandler=()=>{
        dispatch(addItemToCart(id,quentity))
        alert.success("Item Adde To Cart")
    }
    const [open,setOpen]=useState(false);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("");
    const submitReviewTogle=()=>{
        open ? setOpen(false):setOpen(true);
    }
    const ReviewSubmitHandler=()=>{
        const myForm = new FormData();

        myForm.set("rating",rating)
        myForm.set("comment",comment)
        myForm.set("productId",id)
        // console.log(`${id},${comment},${rating}`)
        dispatch(newReview(myForm));
        setOpen(false);
    }
  return (
    <>
    {loading ? <Loader/> : 
    <>
    <Metadata title={`${product.name} --details`}/>
    <div className='ProductDetails'>
        <div>
            <Carousel>
                {product.image &&
                    product.image.map((item,i)=>(
                        <img 
                        className='CarouselImage'
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                        />
                    ))
                }
            </Carousel>
        </div>
        <div>
            <div className='detailsBlock-1'>
                <h1>{product.name}</h1>
                <p>Product #{product._id}</p>
            </div>
            <div className='detailsBlock-2'>
                <Rating {...options}/>
                <span className="detailsBlock-2-span">({product.numOfReviwes} Reviews)</span>
            </div>
            <div className='detailsBlock-3'>
                    <h1>{`₹${product.price}`}</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                        <button onClick={DecreaseQuentity}>-</button>
                        <input value={quentity} type="number" />
                        <button onClick={IncreaseQuentity}>+</button>
                        </div>{" "}
                        <button disabled={product.stock < 1 ? true : false} onClick={AddToCartHandler}>Add To Cart</button>
                    </div>
                    <p>
                Status:{" "}
                <b className={product.stock<1?"redColor":"greenColor"}>
                    {product.stock < 1 ? "OutOfStock":"InStock"}
                </b>
            </p>
            </div>
            <div className='detailsBlock-4'>
                Description :  <p>{product.description}</p>
            </div>
            <button onClick={submitReviewTogle} className='submitReview'>Submit Review</button>
        </div>
    </div>
    <h3 className='ReviewHeading'>REVIEWS </h3>
                <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewTogle}>
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className='submitDialog'>
                        <Rating size='large' value={rating} onChange={(e)=>setRating(e.target.value)}/>
                        <textarea className='submitDialogTextArea' cols="30" rows='5' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={submitReviewTogle}>Cancel</Button>
                        <Button color="primary" onClick={ReviewSubmitHandler}>Submit</Button>

                    </DialogActions>
                </Dialog>
        {product.reviwes && product.reviwes[0] ?(
        <div className='reviews'>
            {product.reviwes && 
            product.reviwes.map((review) => <ReviewCart review={review}/>)}
        </div>
        ):(
            <p className='noReviews'>No Review Yet</p>
        )
}
    </>
    }
    
    </>
  )
}
