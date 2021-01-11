import React from 'react'
import { IoMenuOutline } from "react-icons/io5";
import logo from '../../assets/images/logo.png'
import MenuCart from './MenuCart';
import './style.css'

export default function Menu(props:any) {

    const openSidebar = ()=> {
        props.onOpenSidebar()
    }

    return (
        <div className="header">
            <IoMenuOutline
            style={{marginRight: "auto", cursor: "pointer"}}
            color="black"
            size={28}
            onClick={openSidebar}
            />
            <img src={logo} width={80} height={80}
            style={{marginRight: "auto"}}
            alt="logo"
            />
            <MenuCart />
        </div>
    )
}
