import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { api } from '../../common/axios';
import * as constants from '../../common/constants'
import './style.css'
import { Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Collections() {

    const params:any = useParams()
    const cateState = useSelector((state: any)=> state.categoryReducer)

    const [products, setProducts] = useState([])

    useEffect(()=> {
        api("GET", params.category !== "all" ? `${constants.GET_PRODUCTS_URL}/${params.category}` : constants.GET_PRODUCTS_URL, null)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [params])
    
    const renderItem = (item: any)=> {
        return(
            <Col xs="12" sm="6" lg="4" key={item._id}>
                <Link to={`product/${item._id}`} className="product-item" style={{textDecoration: "none", color: "black"}}>
                    <img src={`${constants.API_ENDPOINT}/${item.img}`} alt={item.name} />
                    <div className="item-detail">
                        <span>{item.name}</span>
                        <span style={{textAlign: "right"}}>
                            {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: "VND"}).format(item.price)}
                        </span>
                    </div>
                </Link>
            </Col>
        )
    }

    const mapProducts = products.map((item: any) => {
        return renderItem(item)
    })

    const category = cateState.filter((item: any)=> {
        if(params.category !== "all"){
            return item._id === params.category
        }
    })
    
    return (
        <div className="wrapper products">
            <h3 className="title">{category.length > 0 ? category[0].name : "All"}</h3>
            <Container>
                <Row>
                    {mapProducts}
                </Row>
            </Container>
        </div>
    )
}