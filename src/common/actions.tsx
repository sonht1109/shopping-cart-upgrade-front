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

export const updateCart = (product: any, quantity: any) => ({
    type: constants.UPDATE_CART,
    payload: {
        product, quantity
    }
})