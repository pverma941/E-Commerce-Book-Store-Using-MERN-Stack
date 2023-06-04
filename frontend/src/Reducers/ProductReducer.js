import {createReducer} from '@reduxjs/toolkit'
export const NEW_REVIEW_RESET = "NEW_REVIEW_RESET";
export const NEW_PRODUCT_RESET = "NEW_PRODUCT_RESET";
export const DELETE_PRODUCT_RESET ="DELETE_PRODUCT_RESET" ;
export const UPDATE_PRODUCT_RESET ="UPDATE_PRODUCT_RESET";
const initialState ={
    products:[]
}

export const ProductsReducer = createReducer(initialState,{
    ALL_PRODUCT_REQUEST:(state,action)=>{
        state.loading=true;
        state.products=[];
    },
    All_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.productsCount=action.payload.productsCount;
        state.resultPerPage=action.payload.resultPerPage;
        // state.filterProductsCount=action.payload.filterProductsCount;
    },
    All_PRODUCT_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    ADMIN_PRODUCT_REQUEST:(state,action)=>{
        state.loading=true;
        state.products=[];
    },
    ADMIN_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
    },
    ADMIN_PRODUCT_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }

});


const initialStates ={
    product:{}
}
export const ProductDetailReducer = createReducer(initialStates,{
    PRODUCT_DETAILS_REQUEST:(state,action)=>{
        return {
            loading:true,
            ...state   
        }
        
    },
    PRODUCT_DETAILS_SUCCESS:(state,action)=>{
        state.loading=false;
        state.product=action.payload
    },
    PRODUCT_DETAILS_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }

});


const initialStat ={
    state:{}
}
export const newReviewReducer = createReducer(initialStat,{
    NEW_REVIEW_REQUEST:(state,action)=>{
        return {
            ...state ,
            loading:true 
        }
    },
    NEW_REVIEW_SUCCESS:(state,action)=>{
        state.loading=false;
        state.success=action.payload
    },
    NEW_REVIEW_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    NEW_REVIEW_RESET:(state,action)=>{
        return{
            ...state,
            success:false
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }

});

// admin

const initialSta ={
        product:{}
}
export const newProductReducer = createReducer(initialSta,{
    NEW_PRODUCT_REQUEST:(state,action)=>{
        return {
            ...state ,
            loading:true 
        }
    },
    NEW_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.success=action.payload.success;
        state.product=action.payload.product;
    },
    NEW_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    NEW_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            success:false
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }

});

// deleting a product

const initialSt ={
    state:{}
}
export const productReducer = createReducer(initialSt,{
    DELETE_PRODUCT_REQUEST:(state,action)=>{
        return {
            ...state ,
            loading:true 
        }
    },
    DELETE_PRODUCT_SUCCESS:(state,action)=>{
        return {
            ...state ,
            loading:false ,
            isDeleted:action.payload
        }
    },
    DELETE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    DELETE_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            isDeleted:false
        }
    },
    UPDATE_PRODUCT_REQUEST:(state,action)=>{
        return {
            ...state ,
            loading:true 
        }
    },
    UPDATE_PRODUCT_SUCCESS:(state,action)=>{
        return {
            ...state ,
            loading:false ,
            isUpdated:action.payload
        }
    },
    UPDATE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    UPDATE_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            isUpdated:false
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }

});