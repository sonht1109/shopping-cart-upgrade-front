import React, { useState } from 'react'
import './style.css'
import { api } from '../../common/axios';

export default function Login() {
    const [login, setLogin] = useState<boolean>(true)
    const [info, setInfo] = useState({
        email: '',
        password: '',
        repassword: ''
    })

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
        api("POST", "user/login", {...info})
        .then(res => {
            if(res){
                localStorage.setItem("jwt", res.data)
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
