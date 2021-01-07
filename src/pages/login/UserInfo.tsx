import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.css'
import * as actions from '../../common/actions'
import { useHistory } from 'react-router-dom';

export default function UserInfo() {
    
    const userState = useSelector((state: any)=> state.userReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [user, setUser] = useState({
        email: '',
        id: '',
        role: ''
    })

    useEffect(()=> {
        setUser({...userState})
    }, [userState])

    const onLogout = ()=> {
        dispatch(actions.getUser({}))
        localStorage.removeItem("jwt")
        history.replace("/login")
    }

    return (
        <div className="wrapper user-info">
            <div style={{display: "flex", alignItems: "center", flexWrap: "wrap"}}>
                <div>
                    <span style={{color: "rgb(150 150 150)"}}>Account : </span><br/>
                    <span>{user?.email}</span>
                </div>
                <button
                onClick={onLogout}
                style={{width: "auto", padding: "10px 15px", marginLeft: "auto"}}
                >
                    Log out
                </button>
            </div>
        </div>
    )
}
