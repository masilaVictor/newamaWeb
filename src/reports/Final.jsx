import React from 'react'
import StartFirebase from "../firebase2";
import {ref, onValue, orderByChild, orderByKey, orderByPriority} from "firebase/database";
import { Table } from "react-bootstrap";
import Topbar from "../main/Topbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pending.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import {CSVLink} from 'react-csv'


const db = StartFirebase();
var d;
var d1;
var d2;
var d3;
var d4;
var d5;
var d7;
var total;
var distance;


export class Final extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }
    checkdata = () =>{
        console.log(this.state.tableData)
    }
    componentDidMount(){
        const dbRef = ref(db, 'Orders');
        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data":data});
            });
            this.setState({tableData: records});
        })
    }


    render(){
        
        return(
            <>
            <Topbar />
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="downloadBtn"
            table="table-to-xls"
            filename="General_Orders"
            sheet="General_Orders"
            buttonText="Export Data to Excel Sheet"/>
            <Table id="table-to-xls" className="table">
                <thead>
                    <tr className="heading">
                        <th>#</th>
                        <th>Order#</th>
                        <th>Date</th>
                        <th>Order Status</th>
                        <th>Outlet</th>
                        <th>Destination</th>
                        <th>Est.KM</th>
                        
                        
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.sort((a,b)=>a.data > b.data ? 1 : -1).map((row,index)=>{
                        var dte = parseInt(row.data.AssignedTime);
                        d1 = new Date(dte);
                        d= new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(row.data.AssignedTime)
                        d2= new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(row.data.RiderAcceptTime)
                        d3= new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(row.data.DispatchTime)
                        d4= new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(row.data.DeliveryTime)
                        d7 = new Intl.DateTimeFormat('en-US',{month:'2-digit',day:'2-digit', year:'numeric'}).format(row.data.postTime)
                        d5 = (row.data.DeliveryTime) - (row.data.AssignedTime)
                        if(row.data.AssignedTime ==null ||row.data.DeliveryTime == null || row.data.AssignedTime == null || row.data.DispatchTime == null ){
                            d2 = 'Not Yet'
                            d3 = 'Not Yet'
                            d5 = 'Not set'
                            d = 'Not yet'
                            d4 = 'Not Yet'
                            total = 'Not Available'
                        }
                        else{
                            d5 = (row.data.DeliveryTime) - (row.data.AssignedTime)
                            total = new Date(d5).toISOString().slice(11, 19)
                        }
                        if(row.data.Area =='githurai 45'){
                            distance = 'More than 10km'
                        }
                        else{
                            distance = 'Less than 10km'
                        }
                        
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{row.key}</td>
                                    <td>{d7}</td>
                                    <td>{row.data.status}</td>
                                    
                                    
                                    
                                    <td>{row.data.outlet}</td>
                                    <td>{row.data.Area}</td>

                                    <td>{distance}</td>
                                    
                                    
                                    
                                    
                                    
                                </tr>
                            )
                        
                    
                    
                    
                    })}
                </tbody>
            </Table>
            </>
        )
    }

}
