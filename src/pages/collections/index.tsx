import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { api } from '../../common/axios';
import * as constants from '../../common/constants'

export default function Collections() {
    const params = useParams()
    console.log(params)
    useEffect(()=> {
        api("GET", constants.GET_PRODUCTS_URL, null)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [])
    return (
        <div>
            this is collectiosn
        </div>
    )
}
