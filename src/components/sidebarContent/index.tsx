import React, { useMemo } from 'react'
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
        { name: "Collections", to: "/products/all" },
        { name: "About us", to: "/about" },
        { name: userState.email ? userState.email : "Log in", to: userState.email ? "/me" : "/login" },
        { name: "Manage users", to: "/admin/users"},
        { name: "Manage products", to: "/admin/products"},
    ]

    const renderDropdown = useMemo(()=>{
        return(
            cateState.map((item: Category) => {
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
        )
    }, [onCloseSidebar, cateState])

    const mapMenus = useMemo(()=> {
        return(
            menus.map((item: any, index: number) => {
                if (item.name !== "Collections") {
                    if(item.to.indexOf("admin") === -1 || (item.to.indexOf("admin") !== -1 && userState.role === "admin")){
                        return (
                            <div key={index}>
                                {index !== 0 &&
                                    renderBorder()}
                                <Link
                                    to={item.to}
                                    className="sidebar-item"
                                    style={{ textDecoration: 'none' }}
                                    onClick={onCloseSidebar}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        )
                    }
                }
                else if(item.name === "Collections"){
                    return (
                        <div key={index}>
                            {renderBorder()}    
                            <div id="toggle" className="sidebar-item">
                                {item.name}
                                <IoChevronDownOutline style={{ marginLeft: "auto" }} />
                            </div>
                            
                            <UncontrolledCollapse toggler="#toggle" className="collapse-menu">
                                <Link
                                to="/products/all"
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
                }
            })
        )
    }, [userState, onCloseSidebar])

    return (
        <div className="sidebar-content">
            {mapMenus}
        </div>
    )
}
