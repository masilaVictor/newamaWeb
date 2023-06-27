import StartFirebase from "../firebase2";
import React from "react";
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
var total;

export class General extends React.Component{
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
                        <th>Order#</th>
                        <th>Order Status</th>
                        <th>Customer</th>
                        <th>Contacts</th>
                        <th>Rider</th>
                        <th>Outlet</th>

                        <th>Date</th>
                        <th>Assigned</th>
                        <th>AcceptTime</th>
                        <th>Dispatched</th>
                        <th>Delivered</th>
                        <th>Total Time</th>
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
                        
                            return(
                                <tr>
                                    <td>{row.key}</td>
                                    <td>{row.data.status}</td>
                                    <td>{row.data.Customer}</td>
                                    <td>{row.data.Contacts}</td>
                                    <td>{row.data.RiderMail}</td>
                                    <td>{row.data.outlet}</td>
                                    <td>{d1.toLocaleDateString()}</td>
                                    <td>{d}</td>
                                    <td>{d2}</td>
                                    <td>{d3}</td>
                                    <td>{d4}</td>
                                    <td>{total}</td>
                                </tr>
                            )
                        
                    
                    
                    


                    })}

                </tbody>
            </Table>
            </>
        )

    }
}
