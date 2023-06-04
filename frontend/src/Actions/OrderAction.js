import axios from 'axios';
export const createOrder = (order)=> async (dispatch)=>{
    try {
        dispatch({
            type:"CREATE_ORDER_REQUEST"
        })
        
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post("/api/v1/order/new", order, config);
        dispatch({
            type:"CREATE_ORDER_SUCCESS",
            payload:data
        })
    } catch (error) {
        dispatch({
            type:"CREATE_ORDER_FAIL",
            payload:error.response.data.message
        })
    }
}
//my orders
export const myOrders = ()=> async (dispatch)=>{
    try {
        dispatch({
            type:"MY_ORDER_REQUEST"
        })
        
          const { data } = await axios.get("/api/v1/orders/me");
        dispatch({
            type:"MY_ORDER_SUCCESS",
            payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:"MY_ORDER_FAIL",
            payload:error.response.data.message
        })
    }
}
//Order Details
export const getOrderDetail = (id) => async (dispatch) => {
    try {
        // console.log("bg gb ")
        dispatch({
            type:"ORDER_DETAIL_REQUEST"
        })
        
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch({
            type:"ORDER_DETAIL_SUCCESS", 
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type:"ORDER_DETAIL_FAIL",
            payload:error.response.data.message
        })
    }
}

// get All Orders -- Admin
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({
            type:"ALL_ORDER_REQUEST"
        })
        
        const { data } = await axios.get(`/api/v1/admin/orders`);
        dispatch({
            type:"ALL_ORDER_SUCCESS", 
            payload: data.orders
        }) 
    } catch (error) {
        dispatch({
            type:"ALL_ORDER_FAIL",
            payload:error.response.data.message
        })
    }
}
// update Order 
export const updateOrder = (id,order)=> async (dispatch)=>{
    try {
        dispatch({
            type:"UPDATE_ORDER_REQUEST"
        })
        
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);
        dispatch({
            type:"UPDATE_ORDER_SUCCESS",
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:"UPDATE_ORDER_FAIL",
            payload:error.response.data.message
        })
    }
}
// Delete Order 
export const deleteOrder = (id)=> async (dispatch)=>{
    try {
        dispatch({
            type:"DELETE_ORDER_REQUEST"
        })
       
          const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch({
            type:"DELETE_ORDER_SUCCESS",
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:"DELETE_ORDER_FAIL",
            payload:error.response.data.message
        })
    }
}
export const clearError=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR",
    
    })
}