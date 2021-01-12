import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({index, item}: any) {
    const jwt = localStorage.getItem("jwt")
    return (
        <Route key={index} exact={item.exact} path={item.path}>
            { jwt ? item.main : <Redirect to="/login"/>}
        </Route>
    )
}
