import React from 'react'
import HomeMenu from './HomeMenu'
import Slide from './Slide'
import './style.css'

export default function Home() {
    return (
        <div className="home-slide">
            <HomeMenu />
            <Slide />
        </div>
    )
}
