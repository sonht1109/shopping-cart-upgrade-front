import React, { useState } from 'react'
import './style.css'
import { apiInterceptor } from '../../common/axios';
import * as constants from '../../common/constants'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../common/actions'

export default function Login() {
    const [login, setLogin] = useState<boolean>(true)
    const [info, setInfo] = useState({
        email: '',
        password: '',
        repassword: ''
    })

    const history = useHistory()
    const dispatch = useDispatch()

    const onChange = (e: any) => {
        var target = e.target
        var name = target.name
        var value = target.value
        setInfo({
            ...info,
            [name]: value
        })
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (login) {
            apiInterceptor("POST", constants.LOGIN_URL, { ...info })
                .then(res => {
                    if (res.status === 200) {
                        const { user, token } = res.data
                        localStorage.setItem("jwt", token)
                        dispatch(actions.getUser(user))
                        history.replace("/me")
                    }
                })
                .catch(() => {
                    alert("Wrong password")
                })
        }
        else {
            if(!login && info.password !== info.repassword){
                alert("Password not match !")
            }
            else if(info.password.length < 4){
                alert("Password must be at least 4 characters !")
            }
            else{
                apiInterceptor("POST", constants.SIGNUP_URL, { ...info })
                .then(() => {
                    setLogin(true)
                    alert("Signed up !")
                })
                .catch(err => alert("This email is used ! Try another !"))
            }
        }
    }

    return (
        <div className="login wrapper">
            <p style={{ fontSize: 20 }}>{login ? "Log In" : "Sign Up"}</p>
            <form className="login-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={onChange}
                        value={info.email}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                        value={info.password} />
                </div>
                {
                    !login &&
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm password"
                            name="repassword"
                            onChange={onChange}
                            value={info.repassword}
                            style={{borderColor: info.password === info.repassword ? "rgb(233, 232, 232)" : "#e68888"}}
                        />
                    </div>
                }
                <span
                    className="switch-login"
                    onClick={() => setLogin(!login)}
                >
                    {login ? "or Sign up" : "or Log in"}
                </span>
                <button
                type="submit"
                onClick={onSubmit}
                >
                    {login ? "Log in" : "Sign up"}
                </button>
            </form>
        </div>
    )
}
