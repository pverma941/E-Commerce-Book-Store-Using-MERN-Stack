import {configureStore} from '@reduxjs/toolkit';
import { ProductDetailReducer, ProductReducer, ProductsReducer, newProductReducer, newReviewReducer, productReducer } from './Reducers/ProductReducer';
import { UserReducer, allUsersReducer, profileReducer, userDetailsReducer } from './Reducers/UserReducer';
import { CartReducer } from './Reducers/CartReducer';
import { AllOrderReducer, myOrdersREducer, newOrderREducer, orderDetailReducer, orderReducer } from './Reducers/OrderReducer';
let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
        ,
        shipingInfo: localStorage.getItem("shipingInfo")
        ? JSON.parse(localStorage.getItem("shipingInfo"))
        : {}
    }
};
const store = configureStore({
    
    reducer:{
        products:ProductsReducer,
        productDetails:ProductDetailReducer,
        user:UserReducer,
        profile:profileReducer,
        cart:CartReducer,
        newOrder:newOrderREducer,
        myOrders:myOrdersREducer,
        orderDetails:orderDetailReducer,
        newReview:newReviewReducer,
        newProduct:newProductReducer,
        product:productReducer,
        order:orderReducer,
        allOrders:AllOrderReducer,
        allUsers:allUsersReducer,
        userDetail:userDetailsReducer
    },
    preloadedState: initialState
    
});

export default store;
