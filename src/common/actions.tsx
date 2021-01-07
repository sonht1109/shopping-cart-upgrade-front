import * as constants from './constants'

export const getUser = (payload: any)=> ({
    type: constants.GET_USER,
    payload
})

export const changeLoading = (payload: boolean) => ({
    type: constants.CHANGE_LOADING,
    payload
})

export const checkLogin = (payload: boolean) => ({
    type: constants.IS_LOGIN,
    payload
  })