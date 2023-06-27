import React from 'react'
import Topbar from './Topbar'
import './home.css'
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import {uid} from 'uid'
import {set,update,ref} from 'firebase/database'
import { auth } from '../firebase';



export default function Home() {
  const[orderId, setOrderId] = useState('')
  const[Item, setItemName] = useState('')
  const[Price, setItemPrice] = useState('')
  const[Quantity, setItemQuantity] = useState('')
  const[paymentStatus, setPaymentStatus] = useState('')
  const[paymentMode, setPaymentMode] = useState('')
  const[Customer, setCustomerName] = useState('')
  const[Contacts, setCustomerNumber] = useState('')
  const[Town, setCounty] = useState('')
  const[Area, setTown] = useState('')
  const[Landmark, setStreet] = useState('')
  const[outlet, setOutlet] = useState('')
  

  const status = 'Pending';
  const navigate =  useNavigate();


  const addItem = (e) =>{
    
    
        const uuid = uid();
        set(ref(db, `Orders/${orderId}/items/${uuid}`),{
            orderId,
            Item,
            Price,
            Quantity,
            paymentStatus,
            paymentMode,
        })
        addCustomer();
        changeStatus();
        navigate('/additem', {state:{orderId: orderId}});
}
const addCustomer = (e) =>{
  
  
  const uuid = uid();
  set(ref(db, `Orders/${orderId}/customerDetails/${uuid}`),{
      Customer,
      Contacts,
      Town,
      Area,
      Landmark,
      
  })
  update(ref(db, `Orders/${orderId}`),{
    Customer,
    Contacts,
    Town,
    Area,
    Landmark,
    
})
  }
  const changeStatus =(e) =>{
    update(ref(db,`Orders/${orderId}`),{
      outlet,
      status,

    })
  }
  const addOrder = (e) =>{
  
  
    const uuid = uid();
    set(ref(db, `Orders/${orderId}/items/${uuid}`),{
        orderId,
        Item,
        Price,
        Quantity,
        paymentStatus,
        paymentMode,
    })
    
    addCustomer();
    changeStatus();

    setOrderId('')
    setItemName('')
    setItemPrice('')
    setItemQuantity('')
    setPaymentStatus('')
    setPaymentMode('')
    setCustomerName('')
    setCustomerNumber('')
    setCounty('')
    setTown('')
    setStreet('')
    
    }
    const userSignOut = () =>{
      signOut(auth).then(()=>{
        navigate('/login');
      }).catch(error=>console.log(error))
    }

  return (
    <div className='homeWrapper'>
      <Topbar />
      <div className="homeBodyContainer">
        <div className="bodyLeft">
          <img className='leftImage' src="assets/delivertbanner.webp" alt="" />
        </div>
        <div className="bodyRight">
        <input type="text" value={outlet} onChange={(e)=> setOutlet(e.target.value)}   className='orderIdInput' placeholder='Outlet' />
          <h2 className='orderTitle'>Order Details</h2>
          <div className="entryForm">
            <div className="orderDetails">
              <input type="text" value={orderId} onChange={(e)=> setOrderId(e.target.value)}   className='orderIdInput' placeholder='Order Id' />
              <input type="text" value={Item} onChange={(e)=> setItemName(e.target.value)} className='itemNameInput' placeholder='Item' />
            </div>
            <div className="orderDetails">
            <input type="text" value={Quantity} onChange={(e)=> setItemQuantity(e.target.value)} className='itemQuantity' placeholder='Quantity' />
            <input type="text" value={Price} onChange={(e)=> setItemPrice(e.target.value)} className='itemPrice' placeholder='Total Price' />
            </div>
            <div className="orderDetails">
              <select name="paymentStatus" value={paymentStatus} onChange={(e)=> setPaymentStatus(e.target.value)} id="" className="paymentStatus">
                <option value="">Payment status</option>
                <option value="paid">Paid</option>
                <option value="Not Paid">Not Paid</option>
              </select>
              <select name="paymentMode" value={paymentMode} onChange={(e)=> setPaymentMode(e.target.value)} id="" className="paymentMode">
                <option value="">Payment Method</option>
                <option value="Mpesa">Mpesa</option>
                <option value="Credit/Debit Card">Credit/Debit card</option>
              </select>
            </div>
            <h2 className='orderTitle'>Customer Details</h2>
            <div className="customerDetails">
              <input type="text" value={Customer} onChange={(e)=> setCustomerName(e.target.value)} className='itemNameInput' placeholder='Customer Name' />
              <input type="text" value={Contacts} onChange={(e)=> setCustomerNumber(e.target.value)} className='orderIdInput' placeholder='Phone Number' />
            </div>
            <div className="customerDetails">
              <select name="county" value={Town} onChange={(e)=> setCounty(e.target.value)} id="" className="paymentStatus">
                <option value="">Select County</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Machakos">Machakos</option>
                <option value="Kajiado">Kajiado</option>
              </select>
              <input type="text" value={Area} onChange={(e)=> setTown(e.target.value)} className='orderIdInput' placeholder='Town/Area' />
            </div>
            <div className="customerDetails">
            <input type="text" value={Landmark} onChange={(e)=> setStreet(e.target.value)} className='orderIdInput' placeholder='Street/Nearest Landmark' />
            </div>
            <div className="inputButtons">
              <button onClick={addItem} className='addItemButton'>Add Item</button>
              <button onClick={addOrder} className='newOrderButton'>New Order</button>
              <button onClick={userSignOut} className='finishButton'>Finish</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
