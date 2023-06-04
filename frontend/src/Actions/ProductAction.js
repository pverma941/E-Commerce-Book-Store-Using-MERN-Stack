import axios from 'axios';
// keyword ="" means if keyword is nothing than it is bydefault "" empty
export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings=0)=> async(dispatch)=>{
    try{
        dispatch({
            type:"ALL_PRODUCT_REQUEST"
        })
        let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if(category){
             link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`

        }

        const {data}= await axios.get(link)
        dispatch({
            type:"All_PRODUCT_SUCCESS",
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:"All_PRODUCT_FAIL",
            payload:error.response.data.message
        })
    }
}

// get All product for Admin
export const getAllProductAdmin = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"ADMIN_PRODUCT_REQUEST"
        })
        const {data} = await axios.get("/api/v1/admin/products")
        dispatch({
            type:"ADMIN_PRODUCT_SUCCESS",
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:"ADMIN_PRODUCT_FAIL",
            payload:error.response.data.message
        })
    }
}
export const getProductDetails = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type:"PRODUCT_DETAILS_REQUEST"
        })
        const {data}= await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:"PRODUCT_DETAILS_SUCCESS",
            payload:data.product,
        })
    }
    catch(error){
        dispatch({
            type:"PRODUCT_DETAILS_FAIL",
            payload:error.response.data.message
        })
    }
}

// Review  
export const newReview = (reviewData)=> async(dispatch)=>{
    try{
        dispatch({
            type:"NEW_REVIEW_REQUEST"
        })
        
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        console.log(reviewData.rating)

        const {data}= await axios.put(`/api/v1/review`,reviewData,config);
        dispatch({
            type:"NEW_REVIEW_SUCCESS",
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:"NEW_REVIEW_FAIL",
            payload:error.response.data.message
        })
    }
}

// new Product  
export const newProduct = (ProductData)=> async(dispatch)=>{
    try{
        dispatch({
            type:"NEW_PRODUCT_REQUEST"
        })
        
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

        const {data}= await axios.post(`/api/v1/admin/product/new`,ProductData,config);
        dispatch({
            type:"NEW_PRODUCT_SUCCESS",
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:"NEW_PRODUCT_FAIL",
            payload:error.response.data.message
        })
    }
}
// Update a Product
export const updateProduct = (id,ProductData)=> async(dispatch)=>{
    try{
        dispatch({
            type:"UPDATE_PRODUCT_REQUEST"
        })
        
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

        const {data}= await axios.put(`/api/v1/admin/product/${id}`,ProductData,config);
        dispatch({
            type:"UPDATE_PRODUCT_SUCCESS",
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:"UPDATE_PRODUCT_FAIL",
            payload:error.response.data.message
        })
    }
}
// Delete a product 
export const deleteProduct = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type:"DELETE_PRODUCT_REQUEST"
        })

        const {data}= await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch({
            type:"DELETE_PRODUCT_SUCCESS",
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:"DELETE_PRODUCT_FAIL",
            payload:error.response.data.message
        })
    }
}
// clear all data
export const clearError=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR",
    
    })
}