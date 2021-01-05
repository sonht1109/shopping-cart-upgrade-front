import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const menus = [
    {name: "Store"},
    {name: "Collections"},
    {name: "About us"},
    {name: "Log In"},
]

const mapMenus = menus.map((item, index) => {
    return (
        <div className="menu-item" key={index}>
            <IoIosArrowForward className="icon" />
            {item.name}
        </div>
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
