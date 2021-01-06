import React from 'react'
import { UncontrolledCollapse } from 'reactstrap'
import {IoChevronDownOutline} from 'react-icons/io5'
import './style.css'
import { Link } from 'react-router-dom';

const renderBorder = ()=> {
    return(
        <div
        style={{
            height: "0.5px",
            backgroundColor: "rgb(233, 232, 232)",
        }}
        ></div>
    )
}

export default function SidebarContent() {
    return (
        <div className="sidebar-content">
            {/* <IoCloseSharp style={{float: "right", cursor: "pointer"}} /> */}
            <Link to="/" className="sidebar-item" style={{textDecoration: 'none'}}>Home</Link>
            {renderBorder()}
            <div>
                <div id="toggle" className="sidebar-item">
                    Collections <IoChevronDownOutline />
                </div>
                {renderBorder()}
                <UncontrolledCollapse toggler="#toggle" className="collapse-menu">
                    <div className="sidebar-item">Top</div>
                    {renderBorder()}
                    <div className="sidebar-item">Bottom</div>
                    {renderBorder()}
                    <div className="sidebar-item">Accessories</div>
                    {renderBorder()}
                </UncontrolledCollapse>
            </div>

            <Link to="/about" className="sidebar-item" style={{textDecoration: 'none'}}>About us</Link>
            {renderBorder()}
            <Link to="/login" className="sidebar-item" style={{textDecoration: 'none'}}>Log in</Link>
        </div>
    )
}
