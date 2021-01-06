import React from 'react'
import { UncontrolledCollapse } from 'reactstrap'
import {IoChevronDownOutline, IoCloseSharp} from 'react-icons/io5'
import './style.css'

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
            <div className="sidebar-item">Home</div>
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

            <div className="sidebar-item">About us</div>
            {renderBorder()}
            <div className="sidebar-item">Log in</div>
        </div>
    )
}
