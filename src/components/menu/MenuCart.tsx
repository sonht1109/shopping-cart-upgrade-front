import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MenuCart() {
    const cartState = useSelector((state: any) => state.cartReducer)
    return (
        <Link to="/cart" style={{textDecoration: "none", color: "inherit"}} className="menu-cart">
            Cart {cartState.length}
        </Link>
    )
}
