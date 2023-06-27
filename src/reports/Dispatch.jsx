import StartFirebase from "../firebase2";
import React from "react";
import {ref, onValue} from "firebase/database";
import { Table } from "react-bootstrap";
import Topbar from "../main/Topbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pending.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const db = StartFirebase();
var d;
var d1;
var d2;
var d3;
var d4;
var d5;
var total;

export class Dispatch extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
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
                filename="Dispatched_Orders"
                sheet="Dispatced_Orders"
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
                    </tr>
                </thead>

                <tbody>
                    {this.state.tableData.sort((a,b)=>a.data > b.data ? 1 : -1).map((row,index)=>{
                        var dte = parseInt(row.data.AssignedTime);
                        d1 = new Date(dte);

                        d= new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(row.data.AssignedTime)
                        d2= new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(row.data.RiderAcceptTime)

                        if(row.data.status == 'Dispatch'){
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
                                </tr>
                            )
                        }
                    
                    
                    


                    })}

                </tbody>
            </Table>
            </>
        )

    }
}
