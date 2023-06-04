import axios from 'axios';
export const addItemToCart = (id,quentity)=> async(dispatch,getState)=>{
        const {data}=await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type:"ADD_TO_CART",
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.image[0].url,
                stock:data.product.stock,
                quentity
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
// remove from cart
export const removeFromCart = (id)=> async(dispatch,getState)=>{
    dispatch({
        type:"REMOVE_CART_ITEM",
        payload:id
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}
export const saveShipingInfo = (data)=> async(dispatch,getState)=>{
    dispatch({
        type:"SAVE_SHIPING_INFO",
        payload:data
    })
    localStorage.setItem("shipingInfo", JSON.stringify(data));

}