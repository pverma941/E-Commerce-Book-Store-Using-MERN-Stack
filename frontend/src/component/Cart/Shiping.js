import React, { useState } from 'react';
import './Shiping.css'
import {useDispatch,useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {Country,State} from 'country-state-city'
import CheckOutStep from './CheckOutStep';
import { saveShipingInfo } from '../../Actions/CartAction';
import { useNavigate } from 'react-router-dom';
export default function Shiping() {
    const alert = useAlert();
    const dispatch=useDispatch();
    const Navigate = useNavigate();
    const {shipingInfo} = useSelector((state)=>state.cart);
    const [address,setAddress]=useState(shipingInfo.address);
    const [city,setCity]=useState(shipingInfo.city);
    const [state,setState]=useState(shipingInfo.state);
    const [country,setCountry]=useState(shipingInfo.country);
    const [pinCode,setPinCode]=useState(shipingInfo.pinCode);
    const [phoneNo,setPhoneNo]=useState(shipingInfo.phoneNo);
    const shippingSubmit=(e)=>{
        e.preventDefault();
        if(phoneNo.length > 10 || phoneNo < 10){
            alert.error("Phone Number Should be 10 Digit");
            return;
        }
        dispatch(saveShipingInfo({address,city,state,country,pinCode,phoneNo}));
        Navigate("/order/confirm")
    }
  return (
    <>
    <Metadata title="Shiping Address"/>
        <CheckOutStep activeState={0}/>
        <div className='shipingContainer'>
            <div className='shipingBox'>
                <h2 className='shipingHeading'>Shiping Details</h2>
                <form className='shipingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
                    <div>
                    <HomeIcon/>
                    <input type='text' placeholder='Address' required value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    </div>
                    <div>
                    <LocationCityIcon/>
                    <input type='text' placeholder='City' required value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                    <div>
                    <PinDropIcon/>
                    <input type='number' placeholder='Pin Code' required value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
                    </div>
                    <div>
                    <PhoneIcon/>
                    <input type='number' placeholder='Phone No' required value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>
                    </div>
                    <div>
                        <PublicIcon/>
                        <select required value={country} onChange={(e)=>setCountry(e.target.value)}>
                            <option value="">Country</option>
                            {Country && 
                                Country.getAllCountries().map((item)=>
                                (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))}
                        </select>
                    </div>
                    {/* if country is selected then and then we can select state. */}
                    {country && (
                        <div>
                            <TransferWithinAStationIcon/>
                        <select required value={state} onChange={(e)=>setState(e.target.value)}>
                        <option value="">State</option>
                            {State && 
                                State.getStatesOfCountry(country).map((item)=>
                                (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))}
                        </select>

                        </div>
                    )}
                    <input type="submit" value="Countinue" className="ShipingBtn" disabled={state?false:true}/>
                </form>
            </div>
        </div>
    </>
  )
}
