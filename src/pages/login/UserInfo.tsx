import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.css'
import * as actions from '../../common/actions'
import { useHistory } from 'react-router-dom';
import { apiToken } from '../../common/axios';
import * as constants from '../../common/constants'
import { Table } from 'reactstrap';

export default function UserInfo() {

    const userState = useSelector((state: any) => state.userReducer)
    const dispatch = useDispatch()
    const history = useHistory()

    const [purchaseHistory, setHistory] = useState([])

    useEffect(() => {
        let jwt = localStorage.getItem("jwt") || ""
        apiToken("GET", constants.PURCHASE_HISTORY_URL, null, jwt)
            .then(res => setHistory(res.data))
            .catch(err => console.log(err))
    }, [userState])

    const onLogout = () => {
        dispatch(actions.getUser({}))
        localStorage.removeItem("jwt")
        history.replace("/login")
    }

    const mapHistory = purchaseHistory.map((history: any, index: number) => {
        return history.products.map((product: any, index: number) => {
            return (
                <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.size}</td>
                    <td>{product.quantity}</td>
                    <td>{new Date(history.date).toUTCString()}</td>
                </tr>
            )
        })
    })

    return (
        <div className="wrapper user-info">
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <div>
                    <span style={{ color: "rgb(150 150 150)" }}>Account : </span><br />
                    <span>{userState.email}</span>
                </div>
                <button
                    onClick={onLogout}
                    style={{ width: "auto", padding: "10px 15px", marginLeft: "auto" }}
                >
                    Log out
                </button>
            </div>
            {
                purchaseHistory.length > 0 &&
                <Table bordered responsive style={{ marginTop: "20px", minWidth: "500px" }}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapHistory}
                    </tbody>
                </Table>
            }
        </div>
    )
}
