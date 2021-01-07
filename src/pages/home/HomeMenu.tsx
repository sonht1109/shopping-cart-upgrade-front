import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function HomeMenu() {

    const menus = [
        {name: "Store", to: "/products"},
        {name: "About us", to: "/about"},
    ]
    
    const mapMenus = menus.map((item, index) => {
        return (
            <Link to={item.to} className="menu-item" key={index} style={{textDecoration: 'none'}}>
                <IoIosArrowForward className="icon" />
                {item.name}
            </Link>
        )
    })

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
