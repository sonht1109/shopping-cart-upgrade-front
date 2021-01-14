import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as constants from '../../common/constants'
import * as actions from '../../common/actions'
import { apiToken } from '../../common/axios';

export default function Cart() {

    const cartState = useSelector((state: any) => state.cartReducer)
    const dispatch = useDispatch()
    const history = useHistory()

    const [cart, setCart] = useState<any[]>([])

    useEffect(() => {
        setCart([...cartState])
    }, [cartState])

    const onUpdateCart = (product: any, detail: any) => {
        dispatch(actions.updateCart(product, detail))
    }

    const mapCart = cart.map((item: any) => {
        const { product, detail } = item
        return (
            <div className="cart-item" key={product._id + detail.size} style={{ textDecoration: 'none', color: "black" }}>
                <Link to={`/products/product/${product._id}`}>
                    <img src={`${constants.API_ENDPOINT}/${product.img}`} alt="" />
                </Link>
                <span className="product-name">{product.name}</span>
                <span>{detail.size}</span>
                <span>{detail.quantity}</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: "VND" }).format(product.price * detail.quantity)}</span>
                <div>
                    <button onClick={() => onUpdateCart(product, detail)}>
                        Remove
                    </button>
                </div>
            </div>
        )
    })

    const total = cart.reduce((previousValue: number, item: any) => {
        return previousValue + item.product.price * item.detail.quantity
    }, 0)

    const onCheckout = () => {
        let jwt = localStorage.getItem('jwt')
        let products = cart.map((item: any) => {
            return ({
                productId: item.product._id,
                productName: item.product.name,
                size: item.detail.size,
                quantity: item.detail.quantity
            })
        })
        if (jwt) {
            let jwt = localStorage.getItem("jwt") || ""
            apiToken("POST", constants.PURCHASE_URL, products, jwt)
                    .then(() => dispatch(actions.purchaseSuccess()))
                    .catch(err => console.log(err))
            alert("Thanks for your purchase !")
        }
        else {
            history.replace('/login')
        }
    }

    return (
        <div className="wrapper cart">
            {cart.length > 0 &&
                <>
                    {mapCart}
                    <div className="total">
                        <div> </div>
                        <div>Total</div>
                        <div> </div>
                        <div> </div>
                        <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: "VND" }).format(total)}</div>
                        <div>
                            <button onClick={onCheckout}>Check out</button>
                        </div>
                    </div>
                </>
            }
            {
                cart.length === 0 &&
                <p style={{ textAlign: "center" }}>Nothing is in your cart.</p>
            }
        </div>
    )
}
