import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as constants from '../../common/constants'

export default function Cart() {

    const cartState = useSelector((state: any) => state.cartReducer)
    console.log(cartState);
    
    const [cart, setCart] = useState<any[]>([])

    useEffect(()=> {
        setCart([...cartState])
    }, [cartState])
    
    const mapCart = cart.map((item: any)=> {
        const {product, detail} = item
        return(
            <div className="cart-item" key={product._id} >
                <img src={`${constants.API_ENDPOINT}/${product.img}`} alt="" />
                <span>{product.name}</span>
                <span>{detail.size}</span>
                <span>{detail.quantity}</span>
                <span>{product.price}</span>
                <button>Remove</button>
            </div>
        )
    })

    return (
        <div className="wrapper cart">
            {mapCart}
        </div>
    )
}
