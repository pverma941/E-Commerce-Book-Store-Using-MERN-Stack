import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import { useEffect, useState } from 'react';
import store from './Store'
import { load_user } from './Actions/UserAction';
import Profile from './component/User/Profile'
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import Cart from './component/Cart/Cart';
import Shiping from './component/Cart/Shiping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Orders/MyOrders';
import OrderDetails from './component/Orders/OrderDetails';  
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProducts from './component/Admin/NewProducts';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UserList from './component/Admin/UserList';
import UpdateUser from './component/Admin/UpdateUser';
import AboutUs from './component/layout/About/AboutUs';
import Contact from './component/layout/Contact/Contact';
import PageNotFound from './component/layout/PageNot Found/PageNotFound';
const theme = createTheme({
  status: {
    danger: orange[500],
  }
});
function App() {
  const [stripeApiKey,setStripeApiKey] =useState("");
  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
    // console.log(data.stripeApiKey);
  } 
  useEffect(()=>{
    store.dispatch(load_user());
    getStripeApiKey();
    //console.log(stripeApiKey);
  })
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/login" element={<LoginSignUp/>}/>
        <Route exact path="/about" element={<AboutUs/>} />
        <Route exact path="/contact" element={<Contact/>} />

        <Route exact path='/account' element={<ProtectedRoute/>}>
            <Route exact path='/account' element={<Profile/>}/>
        </Route>
        <Route exact path='/me/update' element={<ProtectedRoute/>}>
            <Route exact path='/me/update' element={<UpdateProfile/>}/>
        </Route>
        <Route exact path='/password/update' element={<ProtectedRoute/>}>
            <Route exact path='/password/update' element={<UpdatePassword/>}/>
        </Route>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/shiping' element={<ProtectedRoute/>}>
            <Route exact path='/shiping' element={<Shiping/>}/>
        </Route>
       <Route exact path='/payment/process' element={<ProtectedRoute/>}>
          <Route exact path="/payment/process" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>
        </Route>
        <Route exact path='/success' element={<ProtectedRoute/>}>
            <Route exact path='/success' element={<OrderSuccess/>}/>
        </Route>
        <Route exact path='/orders' element={<ProtectedRoute/>}>
            <Route exact path='/orders' element={<MyOrders/>}/>
        </Route>
        
          <Route  path='/order/:id' element={<ProtectedRoute/>}>
            <Route  path='/order/:id' element={<OrderDetails/>}/>
          </Route>
          <Route exact path='/order/confirm' element={<ProtectedRoute/>}>
            <Route exact path='/order/confirm' element={<ConfirmOrder/>}/>
          </Route>
          <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route exact path='/admin/products' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/products' element={<ProductList/>}/>
          </Route>
          <Route exact path='/admin/product' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/product' element={<NewProducts/>}/>
          </Route>
          <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/product/:id' element={<UpdateProduct/>}/>
          </Route>
          <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/product/:id' element={<UpdateProduct/>}/>
          </Route>
          <Route exact path='/admin/orders' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/orders' element={<OrderList/>}/>
          </Route>
          <Route exact path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/order/:id' element={<ProcessOrder/>}/>
          </Route>
          <Route exact path='/admin/users' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/users' element={<UserList/>}/>
          </Route>
          <Route exact path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}/>}>
            <Route  exact path='/admin/user/:id' element={<UpdateUser/>}/>
          </Route>
          <Route  path="*" element={ <PageNotFound/>}/>
      </Routes>
      
      
      <Footer/> 
    </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;
