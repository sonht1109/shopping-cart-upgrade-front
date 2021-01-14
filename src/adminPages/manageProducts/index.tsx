import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, CustomInput, FormGroup, Input, Label } from 'reactstrap'
import { apiTokenFormDataInterceptor } from '../../common/axios'
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
    img: any
}

export default function ManageProducts() {
    
    const [sizeType, setSizeType] = useState("")
    const cateState = useSelector((state: any) => state.categoryReducer)

    const [product, setProduct] = useState<Product>({
        name: "",
        category: "",
        inStock: {
            M: 0,
            L: 0,
            freesize: 0
        },
        price: 0,
        img: {}
    })

    useEffect(() => {
        if (cateState.length > 0) {
            setProduct({ ...product, category: cateState[0]._id })
        }
    }, [cateState])

    const onChange = (e: any) => {
        let target = e.target
        let value = target.value
        let name = target.name
        if(value === "" && target.type === "number") value = 0
        if (name === "img") {
            setProduct({ ...product, img: target.files[0] })
        }
        else if (!["M", "L", "freesize"].includes(name)) {
            setProduct({ ...product, [name]: value })
        }
        else {
            let inStock = { ...product.inStock, [name]: parseInt(value) }
            setProduct({ ...product, inStock })
        }
    }

    const checkProduct = (): boolean => {
        const { name, img } = product
        if (name === "" || img === "") {
            return false
        }
        return true
    }

    const checkImg = (): boolean => {
        if (product.img.type === "image/jpeg" || product.img.type === "image/png") {
            return true
        }
        return false
    }

    const genFormData = () => {
        const form = new FormData()
        Object.entries(product).forEach(([key, value]) => {
            value = key === "inStock" ? JSON.stringify(value) : value
            form.append(key, value)
        })
        return form
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        let token = localStorage.getItem("jwt") || ""
        if (!checkImg()) alert("Wrong image format !")
        else if (checkProduct()) {
            apiTokenFormDataInterceptor("POST", constants.ADD_PRODUCT_URL, genFormData(), token)

                .then(() => {
                    alert("Product uploaded !")
                })
                .catch((err) => console.log(err))
        }
        else {
            alert("Please fill all fields !")
        }
    }

    const onSetSizeType = (e: any) => {
        let inStock = { ...product.inStock, M: 0, L: 0, freesize: 0 }
        setProduct({ ...product, inStock })
        setSizeType(e.target.value)
    }

    return (
        <div className="wrapper manage-products">
            <form encType="multipart/form-data" method="POST" action="/product/add">

                <FormGroup>
                    <Input type='text' placeholder="Product Name" name="name"
                        onChange={onChange} value={product.name} />
                </FormGroup>

                <FormGroup>
                    <CustomInput type="select" name="category" id="category"
                        onChange={onChange} value={product.category}>
                        {cateState.map((item: any) => {
                            return <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        })}
                    </CustomInput>
                </FormGroup>

                <FormGroup>
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
                        <Label for="M">Size M in stock</Label>
                        <Input type="number" id="M" name="M" placeholder="M"
                            onChange={onChange} value={product.inStock.M} min={0}/>
                        <Label for="L">Size L in stock</Label>
                        <Input type="number" id="L" name="L" placeholder="L"
                            onChange={onChange} value={product.inStock.L}
                            min={0}/>
                    </FormGroup>
                }

                {
                    sizeType === "0" &&
                    <FormGroup>
                        <Label for="freesize">Freesize in stock</Label>
                        <Input type="number" id="freesize" name="freesize" placeholder="Freesize"
                            onChange={onChange} value={product.inStock.freesize}
                            min={0}/>
                    </FormGroup>
                }

                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" id="price" name="price" placeholder="Price"
                        onChange={onChange} value={product.price} min={0}/>
                </FormGroup>

                <FormGroup>
                    <Label for="img">Image</Label>
                    <Input type="file" name="img" onChange={onChange} />
                </FormGroup>

                <Button onClick={onSubmit} style={{ backgroundColor: "rgb(41, 107, 194)" }}>
                    Submit
                </Button>

            </form>
        </div>
    )
}
