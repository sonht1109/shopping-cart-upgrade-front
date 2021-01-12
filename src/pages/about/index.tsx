import React from 'react'
import img from '../../assets/images/about-us.jpg'
import './style.css'
import {IoArrowBackOutline, IoMail, IoMap, IoPhonePortrait} from 'react-icons/io5'
import { useHistory } from 'react-router-dom';

export default function About() {

    const history = useHistory()

    return (
        <div className="about-us">
            <IoArrowBackOutline size={22} style={{alignSelf: "flex-start", cursor: "pointer"}}
            onClick={()=> history.goBack()} />
            <img alt="" src={img} />
            <div className="contact">

                <div style={{marginBottom: "10px"}}>
                    <IoPhonePortrait style={{marginRight: "10px"}} size={20} />
                    <span>0938054350</span>
                </div>

                <div style={{marginBottom: "10px"}}>
                    <IoMail style={{marginRight: "10px"}} size={20} />
                    <span>colkidsclub@gmail.com</span>
                </div>

                <div style={{display: "flex", alignItems: "flex-start"}}>
                    <IoMap style={{marginRight: "10px"}} size={20} />
                    <div>
                        <span>The New Playground, Ha Noi</span><br/>
                        <span>Doan Thi Diem, Ho Chi Minh City</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
