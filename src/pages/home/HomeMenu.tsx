import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const menus = [
    {name: "Store", to: "/collections"},
    {name: "About us", to: "/about"},
    {name: "Log In", to: "/login"},
]

const mapMenus = menus.map((item, index) => {
    return (
        <Link to={item.to} className="menu-item" key={index} style={{textDecoration: 'none'}}>
            <IoIosArrowForward className="icon" />
            {item.name}
        </Link>
    )
})

export default function HomeMenu() {
    return (
        <div className="home-menu">
            <span
            style={{color: "white", fontWeight: 800, marginBottom: 20, fontSize: "28px", letterSpacing: 3}}>
                CND
            </span>
            {mapMenus}
        </div>
    )
}
