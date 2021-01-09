import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap'
import { apiTokenInterceptor } from '../../common/axios'
import './style.css'
import * as constants from '../../common/constants'

interface Product {
    name: string,
    category: string
    inStock: {
        M: number,
        L: number,
        freesize: number
    },
    price: number,
    img: string
}

export default function ManageProducts() {

    const [sizeType, setSizeType] = useState("")
    const cateState = useSelector((state: any) => state.categoryReducer)

    const [product, setProduct] = useState<Product>({
        name: "",
        category: cateState[0]._id,
        inStock: {
            M: 0,
            L: 0,
            freesize: 0
        },
        price: 0,
        img: ""
    })

    const onChange = (e: any) => {
        let target = e.target
        let value = target.value
        let name = target.name
        if (target.name !== "M" && target.name !== "L" && target.name !== "freesize") {
            setProduct({ ...product, [name]: value })
        }
        else {
            let inStock = { ...product.inStock, [name]: value }
            setProduct({ ...product, inStock })
        }
    }

    const checkProduct = (): boolean => {
        const { name, img, inStock, price } = product
        if (name === "" || img === "" || inStock.L < 0 || inStock.M < 0 || inStock.freesize < 0 || price < 0) {
            return false
        }
        return true
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        let token = localStorage.getItem("jwt") || ""
        if (checkProduct()) {
            apiTokenInterceptor("POST", constants.ADD_PRODUCT_URL, product, token)
                .then(() => alert("Product uploaded !"))
                .catch((err) => console.log(product))
        }
        else {
            alert("Please fill fields !")
        }
    }

    const onSetSizeType = (e: any) => {
        setSizeType(e.target.value)
    }

    return (
        <div className="wrapper manage-products">
            <Form encType="multipart/form-data" method="POST" >

                <FormGroup>
                    <Label for="name">Product name</Label>
                    <Input type='text' placeholder="Name" name="name"
                        onChange={onChange} value={product.name} />
                </FormGroup>

                <FormGroup>
                    <Label for="category">Category</Label>
                    <CustomInput type="select" name="category" id="category"
                        onChange={onChange} value={product.category} >
                        {cateState.map((item: any) => {
                            return <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        })}
                    </CustomInput>
                </FormGroup>

                <FormGroup>
                    <Label for="instock">In stock</Label>
                    <CustomInput type="radio" id="freesize" name="size" label="Freesize"
                        onChange={onSetSizeType}
                        value="0"
                    />
                    <CustomInput type="radio" id="multisize" name="size" label="Multisize"
                        onChange={onSetSizeType}
                        value="1"
                    />
                </FormGroup>

                {
                    sizeType === "1" &&
                    <FormGroup>
                        <Label for="M">Size M</Label>
                        <Input type="number" id="M" name="M" placeholder="M"
                            onChange={onChange} value={product.inStock.M} />
                        <Label for="L">Size L</Label>
                        <Input type="number" id="L" name="L" placeholder="L"
                            onChange={onChange} value={product.inStock.L} />
                    </FormGroup>
                }

                {
                    sizeType === "0" &&
                    <FormGroup>
                        <Input type="number" id="freesize" name="freesize" placeholder="Freesize"
                            onChange={onChange} value={product.inStock.freesize} />
                    </FormGroup>
                }
                <FormGroup>
                    <Label for="img">Image</Label>
                    <Input type="file" name="img" onChange={onChange} />
                </FormGroup>
                <Button onClick={onSubmit} style={{ backgroundColor: "rgb(41, 107, 194)" }}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}
