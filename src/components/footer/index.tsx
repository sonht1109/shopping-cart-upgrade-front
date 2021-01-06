import React from 'react'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter} from 'react-icons/io5'
import './style.css';

export default function Footer() {
    return (
        <div className="footer">
            <IoLogoInstagram className="social-icon" />
            <IoLogoFacebook className="social-icon" />
            <IoLogoTwitter className="social-icon" />
        </div>
    )
}
