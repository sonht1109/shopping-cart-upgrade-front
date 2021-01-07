import React from 'react'
import { UncontrolledCollapse } from 'reactstrap'
import { IoChevronDownOutline } from 'react-icons/io5'
import './style.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface Category {
    _id: string,
    name: string
}

const renderBorder = () => {
    return (
        <div
            style={{
                height: "0.5px",
                backgroundColor: "rgb(233, 232, 232)",
            }}>
        </div>
    )
}

export default function SidebarContent(props: any) {

    const onCloseSidebar = () => {
        props.onCloseSidebar()
    }

    const cateState = useSelector((state: any) => state.categoryReducer)
    const userState = useSelector((state: any) => state.userReducer)

    const menus = [
        { name: "Home", to: "/" },
        { name: "Collections", to: "/products" },
        { name: "About us", to: "/about" },
        { name: userState.email ? userState.email : "Log in", to: userState.email ? "/me" : "/login" }
    ]

    const renderDropdown = cateState.map((item: Category) => {
        return (
            <Link
            to={`/products/${item._id}`}
            className="sidebar-item"
            key={item._id}
            style={{ textDecoration: 'none' }}
            onClick={onCloseSidebar}
            >
                {item.name}
            </Link>
        )
    })

    const mapMenus = menus.map((item: any, index: number) => {
        if (item.name !== "Collections") {
            return (
                <div key={index}>
                    <Link
                        to={item.to}
                        className="sidebar-item"
                        style={{ textDecoration: 'none' }}
                        onClick={onCloseSidebar}
                    >
                        {item.name}
                    </Link>
                    {index !== menus.length - 1 &&
                        renderBorder()}
                </div>
            )
        }
        return (
            <div key={index}>
                <div id="toggle" className="sidebar-item">
                    {item.name}
                    <IoChevronDownOutline style={{ marginLeft: "auto" }} />
                </div>
                {renderBorder()}
                <UncontrolledCollapse toggler="#toggle" className="collapse-menu">
                    <Link
                    to="/products"
                    className="sidebar-item"
                    style={{ textDecoration: 'none' }}
                    onClick={onCloseSidebar}
                    >
                        All
                    </Link>
                    {renderDropdown}
                </UncontrolledCollapse>
            </div>
        )
    })

    return (
        <div className="sidebar-content">
            {mapMenus}
        </div>
    )
}
