import React from 'react'
import { IoMenuOutline } from "react-icons/io5";
import logo from '../../assets/images/logo.png'
import './style.css'

export default function Menu() {
    return (
        <div className="header">
            <IoMenuOutline style={{marginRight: "auto", cursor: "pointer"}} color="black" size={28} />
            <img src={logo} width={80} height={80} style={{marginRight: "auto"}} />
            <div className="cart">CART</div>
        </div>
    )
}
