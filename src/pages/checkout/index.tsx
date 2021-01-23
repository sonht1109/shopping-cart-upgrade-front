import React, { useState } from 'react'
import { useEffect } from 'react';
import * as constants from '../../common/constants'
import axios from 'axios';
import { Input, Label, CustomInput } from 'reactstrap';
import './style.css'
import { apiTokenInterceptor, checkoutApi } from '../../common/axios';
import { MdCreditCard, MdLocalShipping } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../common/actions'
import { useHistory } from 'react-router-dom';

export default function Checkout() {

    const cartState = useSelector((state: any) => state.cartReducer)
    const dispatch = useDispatch()
    const history = useHistory()

    const productTotalPrice = cartState.reduce((preValue: number, item: any) => {
        return preValue + item.product.price * item.detail.quantity
    }, 0)

    const [provinces, setProvinces] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
    const [wards, setWards] = useState<any>([])

    const [method, setMethod] = useState("COD")
    const [fee, setFee] = useState(0)

    const [address, setAddress] = useState({
        province: "--",
        district: "--",
        ward: "--",
        detail: "",
    })

    useEffect(() => {
        axios({
            method: "GET",
            url: `${constants.CITY_URL}/province`,
            headers: {
                token: constants.token
            }
        })
            .then((res: any) => {
                setProvinces(res.data.data)
            })
            .catch((err: any) => console.log(err))
    }, [])

    const mapProvinces = provinces.map((item: any, index: number) => {
        return (
            <option value={item.ProvinceID} key={Date.now.toString() + index}>
                {item.ProvinceName}
            </option>
        )
    })

    const onChange = (e: any) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "province" && value !== "--") {
            checkoutApi("GET", `${constants.CITY_URL}/district`, { province_id: value })
                .then((res: any) => setDistricts(res.data.data))
                .catch((err: any) => console.log(err))
        }
        else if (name === "district" && value !== "--") {
            checkoutApi("GET", `${constants.CITY_URL}/ward`, { district_id: value })
                .then((res: any) => { setWards(res.data.data) })
                .catch((err: any) => console.log(err))
        }
        else if (name === "ward") {
            if (address.province !== "--" && address.district !== "--") {
                checkoutApi("GET", constants.SHIPMENT_URL, {
                    service_id: constants.by_land_id,
                    coupon: null,
                    from_district_id: constants.district_id,
                    to_district_id: address.district,
                    to_ward_code: value,
                    insurance_value: 500000,
                    height: constants.height,
                    width: constants.width,
                    length: constants.length,
                    weight: constants.weight
                })
                    .then(res => setFee(res.data.data.total))
                    .catch(err => console.log(err))
            }
        }   
        setAddress({ ...address, [name]: value })
    }

    const mapDistricts = districts.map((item: any, index: number) => {
        return (
            <option value={item.DistrictID} key={Date.now.toString() + index}>
                {item.DistrictName}
            </option>
        )
    })

    const mapWards = wards.map((item: any, index: number) => {
        return (
            <option value={item.WardCode} key={Date.now.toString() + index}>
                {item.WardName}
            </option>
        )
    })

    const onSetMethod = (e: any) => {
        setMethod(e.target.value)
    }

    const onBuy = ()=> {
        if(fee === 0 || address.detail === ""){
            alert("Please fill your address !")
        }
        else{
            let jwt = localStorage.getItem('jwt') || ""
            let products = cartState.map((item: any) => {
                return ({
                    productId: item.product._id,
                    productName: item.product.name,
                    size: item.detail.size,
                    quantity: item.detail.quantity
                })
            })
            apiTokenInterceptor("POST", constants.PURCHASE_URL, {
                products, address, fee
            }, jwt)
            .then(() => dispatch(actions.purchaseSuccess()))
            .then(() => {
                alert("Thank for your purchase !")
                history.replace('/cart')
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className="wrapper checkout">

            <div className="address">
                <p>Your address</p>
                <Label>Province</Label>
                <Input
                    type="select"
                    name="province"
                    onChange={onChange}
                    value={address.province}
                >
                    <option>--</option>
                    {mapProvinces}
                </Input>

                <Label>District</Label>
                <Input
                    type="select"
                    name="district"
                    value={address.district}
                    onChange={onChange}
                >
                    <option>--</option>
                    {mapDistricts}
                </Input>

                <Label>Ward</Label>
                <Input
                    type="select"
                    name="ward"
                    onChange={onChange}
                    value={address.ward}
                >
                    <option>--</option>
                    {mapWards}
                </Input>

                <Label>Detail address</Label>
                <Input type="text" placeholder="Your address" name="detail"
                    onChange={onChange} value={address.detail} />
            </div>

            <div className="bill">
                <p>Shipping fee</p>
                <div className="shipment d-flex justify-content-between">
                    <span>{fee === 0 ? "No available shipment" : "By land"}</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: "VND" }).format(fee)}</span>
                </div>
                <p className="mt-3">Method</p>
                <div className="method">
                    <div className="input">
                        <CustomInput
                            type="radio"
                            name="method"
                            label="COD" id="COD"
                            onChange={onSetMethod}
                            value="COD"
                            defaultChecked={true} />

                        <CustomInput
                            type="radio"
                            name="method"
                            label="Visa" id="visa"
                            className="mt-1"
                            onChange={onSetMethod}
                            value="Visa" />
                    </div>

                    {
                        method === 'COD' ?
                            <p><MdLocalShipping color="black" /> You have to pay when receiving</p>
                            : <p><MdCreditCard color="black" /> Have not supported yet !</p>
                    }
                </div>

                <button onClick={onBuy}>
                    Checkout (
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: "VND" }).format(productTotalPrice + fee)})
                </button>
            </div>
        </div>
    )
}
