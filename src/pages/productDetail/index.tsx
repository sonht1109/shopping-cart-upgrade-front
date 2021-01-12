import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {IoArrowBackOutline} from 'react-icons/io5'
import { Col, Container, Input, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import { api } from '../../common/axios';
import * as constants from '../../common/constants'
import errorImage from '../../assets/images/404.jpg'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../common/actions'

interface Product{
    _id: string,
    name: string,
    category: string,
    img: string,
    price: number,
    inStock: any,
}

export default function ProductDetail() {
    
    const history = useHistory()
    const params:any = useParams()
    const dispatch = useDispatch()
    const cartState = useSelector((state: any)=> state.cartReducer)

    const [product, setProduct] = useState<Product>({
        _id: "",
        name: "",
        category: "",
        img: "",
        price: 0,
        inStock: {}
    })

    const [size, setSize] = useState("")
    const [quantity, setQuantity] = useState(1)

    const checkProduct = ()=>{
        let isExist = false
        cartState.forEach((item: any)=> {
            if(product._id === item.product._id){
                if(item.detail.size === size && item.detail.quantity === quantity){
                    isExist = true
                }
            }
        })
        return isExist
    }
    

    useEffect(()=>{
        api("GET", `${constants.GET_PRODUCT_URL}/${params.id}`, null)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err))
    }, [params])

    const mapSizeChoices = Object.entries(product.inStock).map(([key, value])=> {
        return(
            <button
            key={key}
            onClick={()=>setSize(key)}
            className={`size ${size === key ? "size-active" : ""} ${value === 0 ? "size-out": ""}`}
            disabled={value === 0}
            >
                {key}
            </button>
        )
    })

    const onAddToCart = ()=> {
        if(size === "") alert("You have not picked a size !")
        else if(quantity < 1) alert("Quantity is invalid !")
        else{
            dispatch(actions.updateCart(product, {
                size, quantity
            }))
        }
    }

    const onChange = (e:any)=>{
        if(e.target.value === "") e.target.value = 0
        setQuantity(parseInt(e.target.value))
    }

    return (
        <div className="wrapper">
            <IoArrowBackOutline onClick={()=> history.goBack()} size={22}/><br/>
            <Container className="item-detail">
                <Row>
                    <Col xs="12" md="5" sm="6">
                        <img
                        src={product.img !== "" ? `${constants.API_ENDPOINT}/${product.img}` : errorImage}
                        alt="" />
                    </Col>
                    <Col xs="12" md={{size: 6, offset: 1}} sm="6">
                        <div className="item-content">
                            <h3>{product.name}</h3>
                            <p>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: "VND"}).format(product.price)}</p>
                            <div className="size-choices">
                                {mapSizeChoices}
                            </div>
                            {/* <Label for="">Quantity</Label> */}
                            <Input type="number" min={1} placeholder="Quantity" name="quantity" value={quantity} onChange={onChange} />
                            <button className={checkProduct() ? "active" : "inactive" } onClick={onAddToCart}>
                                {checkProduct() ? "Remove from cart" : "Add to cart"}
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
