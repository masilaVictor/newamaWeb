import React from 'react'
import './topbar.css'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom";

export default function Topbar() {
    const navigate =  useNavigate();
    const userSignOut = () =>{
        signOut(auth).then(()=>{
          navigate('/');
        }).catch(error=>console.log(error))
      }
  return (
    <div className='topbarWrapper'>
        <div className="topbarLeft">
            <img src="assets/newama2.png" className='logo'alt="" />

        </div>
        <div className="topbarCenter">
            <h2 className="entryTitle">Orders Entry</h2>
        </div>
        <div className="topbarRight">
          <div class="dropdown">
            <button class="dropbtn">Reports</button>
            <div class="dropdown-content">
            <a href="/orders">Customer Orders</a>
              <a href="/pending">Pending</a>
              <a href="/dispatch">Dispatch</a>
              <a href="/transit">onTransit</a>
              <a href="/general">General Report</a>
              <a href="/general">Final Report</a>

            </div>
          </div>
            <button onClick={userSignOut} className='logoutButton'>Logout</button>
        </div>

    </div>
  )
}
