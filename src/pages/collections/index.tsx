import React from 'react'
import { useParams } from 'react-router-dom'

export default function Collections() {
    const params = useParams()
    console.log(params)
    return (
        <div>
            this is collectiosn
        </div>
    )
}
