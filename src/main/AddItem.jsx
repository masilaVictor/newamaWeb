import React from 'react'
import Topbar from './Topbar'
import './home.css'
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { db } from '../firebase';
import {uid} from 'uid'
import {set,ref} from 'firebase/database'
import { useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase';


export default function AddItem() {
    
    const[Item, setItemName] = useState('')
    const[Price, setItemPrice] = useState('')
    const[Quantity, setItemQuantity] = useState('')
    const[paymentStatus, setPaymentStatus] = useState('')
    const[paymentMode, setPaymentMode] = useState('')
    const navigate =  useNavigate();
    const location = useLocation();
    

    const orderId = location.state.orderId;

    const addItem = (e) =>{
  
  
        const uuid = uid();
        set(ref(db, `Orders/${orderId}/items/${uuid}`),{
            
            Item,
            Price,
            Quantity,
            
            
        })
        setItemName('')
        setItemPrice('')
        setItemQuantity('')
        
        }
        
        const userSignOut = () =>{
            signOut(auth).then(()=>{
              navigate('/login');
            }).catch(error=>console.log(error))
          }

        const back = () =>{
            navigate('/')
        }



  return (
    <div className='homeWrapper'>
    <Topbar />
    <div className="homeBodyContainer">
      <div className="bodyLeft">
        <img className='leftImage' src="assets/delivertbanner.webp" alt="" />
      </div>
      <div className="bodyRight">
        <h2 className='orderTitle'>Order Details</h2>
       
        <div className="entryForm">
          <div className="orderDetails">
            
            <input type="text" value={Item} onChange={(e)=> setItemName(e.target.value)} className='itemNameInput' placeholder='Item' />
          </div>
          <div className="orderDetails">
          <input type="text" value={Quantity} onChange={(e)=> setItemQuantity(e.target.value)} className='itemQuantity' placeholder='Quantity' />
          <input type="text" value={Price} onChange={(e)=> setItemPrice(e.target.value)} className='itemPrice' placeholder='Total Price' />
          </div>
          <div className="inputButtons">
            <button onClick={addItem} className='addItemButton'>Add Item</button>
            <button onClick={back} className='newOrderButton'>New Order</button>
            <button  onClick={userSignOut} className='finishButton'>Finish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
