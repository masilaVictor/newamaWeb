import React from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../main/Topbar';

import { useLocation } from 'react-router-dom';



export default class OrderDetails extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            value:this.props.location.state,
        }
    }

    render(){
        return(
            <h1>Masila</h1>
        )
    }
}

