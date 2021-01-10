import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../common/axios';
import * as constants from '../../common/constants'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../common/actions'
import './style.css'
import { Col, Container, Row } from 'reactstrap';

export default function Collections() {

    const params:any = useParams()
    const dispatch = useDispatch()
    const productState = useSelector((state: any)=> state.collectionReducer)

    useEffect(()=> {
        api("GET", params.category ? `${constants.GET_PRODUCTS_URL}/${params.category}` : constants.GET_PRODUCTS_URL, null)
            .then(res => dispatch(actions.getProducts(res.data)))
            .catch(err => console.log(err))
    }, [])
    
    const renderItem = (item: any)=> {
        return(
            <Col xs="12" sm="6" lg="4" key={item._id}>
                <div className="product-item">
                    <img src={`${constants.API_ENDPOINT}/${item.img}`} alt={item.name} />
                    <div className="item-detail">
                        <span>{item.name}</span>
                        <span style={{textAlign: "right"}}>{item.price} VND</span>
                    </div>
                </div>
            </Col>
        )
    }

    const mapProducts = productState.map((item: any) => {
        return renderItem(item)
    })

    return (
        <div className="wrapper products">
            <Container>
                <Row>
                    {mapProducts}
                </Row>
            </Container>
        </div>
    )
}
