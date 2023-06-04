import axios from "axios";

//login
export const login = (email,password) => async (dispatch)=>{
    try{
        dispatch({
            type:"LOGIN_REQUEST"
        })
        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.post(`/api/v1/login`,{email,password},config);

        dispatch({
            type:"LOGIN_SUCCESS",
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:"LOGIN_FAIL",
            payload:error.response.data.message
        })
    }
}
//Register
export const register = (userData) => async (dispatch)=>{
    try{
        dispatch({
            type:"REGISTER_REQUEST"
        })
        const config = {headers:{"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(`/api/v1/register`,userData,config);

        dispatch({
            type:"REGISTER_SUCCESS",
            payload:data.user
        })
    }
    catch(error){
        dispatch({ 
            type:"REGISTER_FAIL",
            payload:error.response.data.message
        })
    }
}

//Load User
export const load_user = (email,password) => async (dispatch)=>{
    try{
        dispatch({
            type:"LOAD_USER_REQUEST"
        })

        const {data} = await axios.get("/api/v1/me");

        dispatch({
            type:"LOAD_USER_SUCCESS",
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:"LOAD_USER_FAIL",
            payload:error.response.data.message
        })
    }
}
// Logout

export const logout = () => async (dispatch)=>{
    try{
        await axios.post("/api/v1/logout");

        dispatch({
            type:"LOGOUT_SUCCESS"
        })
    }
    catch(error){
        dispatch({
            type:"LOGOUT_FAIL",
            payload:error.response.data.message
        })
    }
}
// update userProfile
export const updateUserProfile = (userData) => async (dispatch)=>{
    try{
        dispatch({
            type:"UPDATE_PROFILE_REQUEST"
        })
        const config = {headers:{"Content-Type":"multipart/form-data"}};

        const {data} = await axios.put(`/api/v1/me/update`,userData,config);

        dispatch({
            type:"UPDATE_PROFILE_SUCCESS",
            payload:data.success
        })
    }
    catch(error){
        dispatch({ 
            type:"UPDATE_PROFILE_FAIL",
            payload:error.response.data.message
        })
    }
}
// update Password
export const updateUserPassword = (userData) => async (dispatch)=>{
    try{
        dispatch({
            type:"UPDATE_PASSWORD_REQUEST"
        })
        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.put(`/api/v1/password/update`,userData,config);

        dispatch({
            type:"UPDATE_PASSWORD_SUCCESS",
            payload:data.success
        })
    }
    catch(error){
        dispatch({ 
            type:"UPDATE_PASSWORD_FAIL",
            payload:error.response.data.message
        })
    }
}

// get User Details -- Admin
export const getUserDetails = (id) => async (dispatch)=>{
    try{
        dispatch({
            type:"USER_DETAIL_REQUEST"
        })
        const {data}=await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({
            type:"USER_DETAIL_SUCCESS",
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:"USER_DETAIL_FAIL",
            payload:error.response.data.message
        })
    }
}

// get All Users -- Admin
export const getAllUsers = () => async (dispatch)=>{
    try{
        dispatch({
            type:"ALL_USERS_REQUEST"
        })
        const {data}=await axios.get("/api/v1/admin/users");

        dispatch({
            type:"ALL_USERS_SUCCESS",
            payload:data.users
        })
    }
    catch(error){
        dispatch({
            type:"ALL_USERS_FAIL",
            payload:error.response.data.message
        })
    }
}
//update User
export const updateUser = (id,userData) => async (dispatch)=>{
    try{
        dispatch({
            type:"UPDATE_USER_REQUEST"
        })
        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.put(`/api/v1/admin/user/${id}`,userData,config);

        dispatch({
            type:"UPDATE_USER_SUCCESS",
            payload:data.success
        })
    }
    catch(error){
        dispatch({
            type:"UPDATE_USER_FAIL",
            payload:error.response.data.message
        })
    }
}
//Delete User
export const deleteUser = (id) => async (dispatch)=>{
    try{
        dispatch({
            type:"DELETE_USER_REQUEST"
        })

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type:"DELETE_USER_SUCCESS",
            payload:data.success
        })
    }
    catch(error){
        dispatch({
            type:"DELETE_USER_FAIL",
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