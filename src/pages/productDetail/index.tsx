import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {IoArrowBackOutline} from 'react-icons/io5'
import { useEffect, useState } from 'react';
import { api } from '../../common/axios';
import * as constants from '../../common/constants'
import './style.css'
import { Col, Container, Input, Label, Row } from 'reactstrap';

interface Product{
    name: string,
    category: string,
    img: string,
    price: number,
    inStock: any,
}

export default function ProductDetail() {
    
    const history = useHistory()
    const params:any = useParams()

    const [product, setProduct] = useState<Product>({
        name: "",
        category: "",
        img: "",
        price: 0,
        inStock: {}
    })

    const [size, setSize] = useState("")
    const [quantity, setQuantity] = useState(1)

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
                        src={`${constants.API_ENDPOINT}/${product.img}`}
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
                            <button
                            style={{width: "100%", marginTop: "20px", padding: "10px 0"}}
                            onClick={onAddToCart}
                            >
                                `Add to cart {size !== "" && `(${size})`}`
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
