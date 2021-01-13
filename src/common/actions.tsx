import { apiTokenInterceptor } from './axios'
import * as constants from './constants'

export const getUser = (payload: any)=> ({
    type: constants.GET_USER,
    payload
})

export const changeLoading = (payload: boolean) => ({
    type: constants.CHANGE_LOADING,
    payload
})

export const getProducts = (payload: any[]) => ({
    type: constants.GET_PRODUCTS,
    payload
})

export const getCategories = (payload: any[]) => ({
    type: constants.GET_CATES,
    payload
})

export const updateCart = (product: any, detail: any) => ({
    type: constants.UPDATE_CART,
    payload: {
        product, detail
    }
})

export const purchaseRequest = (products: any[])=> {
    let jwt = localStorage.getItem("jwt") || ""
    return (dispatch: any)=> {
        apiTokenInterceptor("POST", constants.PURCHASE_URL, products, jwt)
        .then(() => dispatch(purchaseSuccess()))
        .catch(err => console.log(err))
    }
}

export const purchaseSuccess = () => ({
    type: constants.PURCHASE
})