import {createReducer} from '@reduxjs/toolkit'
export const UPDATE_PROFILE_RESET="UPDATE_PROFILE_RESET";
export const UPDATE_PASSWORD_RESET="UPDATE_PASSWORD_RESET";
export const UPDATE_USER_RESET="UPDATE_USER_RESET";
export const DELETE_USER_RESET="DELETE_USER_RESET";

const initialState={
    user:{}
}
export const UserReducer = createReducer(initialState,{
    LOGIN_REQUEST:(state,action)=>{
        state.loading=true;
        state.isAuthenticated=false;
    },
    
    LOGIN_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload,
        }
    },
    LOGIN_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload,
        }
    },
    REGISTER_REQUEST:(state,action)=>{
        state.loading=true;
        state.isAuthenticated=false;
    },
    
    REGISTER_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload,
        }
    },
    REGISTER_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload,
        }
    },
    LOAD_USER_REQUEST:(state,action)=>{
        state.loading=true;
        state.isAuthenticated=false;
    },
    
    LOAD_USER_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload,
        }
    },
    LOAD_USER_FAIL:(state,action)=>{
        return {
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload,
        }
    },
    LOGOUT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.user=null;
        state.isAuthenticated=false;
    },
    LOGOUT_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            error:action.payload,

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
    
}
export const profileReducer = createReducer(initialStat,{
    UPDATE_PROFILE_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }

    },
    UPDATE_PROFILE_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            isUpdated:action.payload,
        }
    },
    UPDATE_PROFILE_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            
            error:action.payload,
        }
    },
    UPDATE_PROFILE_RESET:(state,action)=>{
        return {
            ...state,
            isUpdated:false
        }
    },
    UPDATE_PASSWORD_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }

    },
    
    UPDATE_PASSWORD_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            isUpdated:action.payload,
        }
    },
    UPDATE_PASSWORD_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            
            error:action.payload,
        }
    },
    UPDATE_PASSWORD_RESET:(state,action)=>{
        return {
            ...state,
            isUpdated:false
        }
    },
    UPDATE_USER_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }
    },
    UPDATE_USER_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            isUpdated:action.payload,
        }
    },
    UPDATE_USER_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    UPDATE_USER_RESET:(state,action)=>{
        return {
            ...state,
            isUpdated:false
        }
    },
    DELETE_USER_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }

    },
    DELETE_USER_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            isDeleted:action.payload
        }
    },
    DELETE_USER_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    DELETE_USER_RESET:(state,action)=>{
        return {
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

const initialSta={
    users:[]
}
export const allUsersReducer = createReducer(initialSta,{
    ALL_USERS_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }

    },
    
    ALL_USERS_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            users:action.payload,
        }
    },
    ALL_USERS_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }
})

const initialSt={
    user:{}
}
export const userDetailsReducer = createReducer(initialSt,{
    USER_DETAIL_REQUEST:(state,action)=>{
        return {
            ...state,
            loading:true,
        }

    },
    USER_DETAIL_SUCCESS:(state,action)=>{
        return {
            ...state,
            loading:false,
            user:action.payload,
        }
    },
    USER_DETAIL_FAIL:(state,action)=>{
        return {
            ...state,
            loading:false,
            
            error:action.payload,
        }
    },
  
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    }
})

// UPDATE_PROFILE_RESET:(state,action)=>{
//     return {
//         ...state,
//         isUpdated:false
//     }
// }