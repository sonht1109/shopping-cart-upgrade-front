import React, { useState } from 'react'
import './style.css'
import { api } from '../../common/axios';
import * as constants from '../../common/constants'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Login() {
    const [login, setLogin] = useState<boolean>(true)
    const [info, setInfo] = useState({
        email: '',
        password: '',
        repassword: ''
    })

    const history = useHistory()
    // const isLogin = useSelector((state: any) => state.)

    const onChange=(e:any)=>{
        var target = e.target
        var name = target.name
        var value = target.value
        setInfo({
            ...info,
            [name]: value
        })
    }

    const onLogin = ()=> {
        api("POST", constants.LOGIN_URL, {...info})
        .then(res => {
            if(res){
                const {user, token} = res.data
                localStorage.setItem("jwt", token);
                
                history.replace(constants.GET_INFO_URl)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="login wrapper">
            <p style={{ fontSize: 20 }}>{login ? "Log In" : "Sign Up"}</p>
            <div className="login-form">
                <div className="form-control">
                    <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={onChange}
                    value={info.email}
                    />
                </div>
                <div className="form-control">
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                    value={info.password}/>
                </div>
                {
                    !login &&
                    <div className="form-control">
                        <input
                        type="password"
                        placeholder="Confirm password"
                        name="repassword"
                        onChange={onChange}
                        value={info.repassword}
                        />
                    </div>
                }
                <span
                    className="switch-login"
                    onClick={() => setLogin(!login)}
                >
                    {login ? "or Sign up" : "or Log in"}
                </span>
                <button onClick={onLogin}>{login ? "Log in" : "Sign up"}</button>
            </div>
        </div>
    )
}
