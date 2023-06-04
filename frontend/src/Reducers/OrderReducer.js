import {createReducer} from '@reduxjs/toolkit'
export const UPDATE_ORDER_RESET = "UPDATE_ORDER_RESET";
export const DELETE_ORDER_RESET = "DELETE_ORDER_RESET";

const initialState={
    state:{}
}

export const newOrderREducer = createReducer(initialState,{
    CREATE_ORDER_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }
    },
    CREATE_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            order:action.payload
        }
    },
    CREATE_ORDER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }
})
const initialStat={
    state:{
        orders:[]
    }
}
// My Orders
export const myOrdersREducer = createReducer(initialStat,{
    MY_ORDER_REQUEST:(state,action)=>{
        return {
            loading:true,
        }
    },
    MY_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            orders:action.payload
        }
    },
    MY_ORDER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }
})
const initialSta={
    state:{
        order:{}
    }
}
export const orderDetailReducer = createReducer(initialSta,{
    ORDER_DETAIL_REQUEST:(state,action)=>{
        return {
            loading:true,
        }
    },
    ORDER_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            order:action.payload
        }
    },
    ORDER_DETAIL_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }
})

// All Orders -- Admin
const initialSt={
    state:{
        order:[]
    }
}
export const AllOrderReducer = createReducer(initialSt,{
    ALL_ORDER_REQUEST:(state,action)=>{
        return {
            loading:true,
        }
    },
    ALL_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            orders:action.payload
        }
    },
    ALL_ORDER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }
})

// order Reducer For Delete And Edit
const initialS={
    state:{
        
    }
}
export const orderReducer = createReducer(initialS,{
    UPDATE_ORDER_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }
    },
    UPDATE_ORDER_SUCCESS:(state,action)=>{
        return{
            ...state, 
            loading:false,
            isUpdated:action.payload
        }
    },
    UPDATE_ORDER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    UPDATE_ORDER_RESET:(state,action)=>{
        return{
            ...state,
            isUpdated:false
        }
    },
    DELETE_ORDER_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }
    },
    DELETE_ORDER_SUCCESS:(state,action)=>{
        return{
            ...state, 
            loading:false,
            isDeleted:action.payload
        }
    },
    DELETE_ORDER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    DELETE_ORDER_RESET:(state,action)=>{
        return{
            ...state,
            isDeleted:false
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }
})
export const clearError=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR",
    
    })
}