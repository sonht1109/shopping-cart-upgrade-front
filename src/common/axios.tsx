import axios from "axios";
import * as constants from '../common/constants'
import * as actions from '../common/actions'
import store from '../redux/index'

// INTERCEPTORS
const interceptorInstance = axios.create()
interceptorInstance.interceptors.request.use(
    function(config){
        //do sth before sending request
        store.dispatch(actions.changeLoading(true))
        return config;
    },
    function(err){
        //do sth with request err
        store.dispatch(actions.changeLoading(false));
        return Promise.reject(err)
    }
)

interceptorInstance.interceptors.response.use(
    function(response){
        //do sth with response data
        store.dispatch(actions.changeLoading(false))
        return response
    },
    function(err){
        //do sth with response err
        store.dispatch(actions.changeLoading(false));
        return Promise.reject(err)
    }
)

// ====> INTERCEPTORS with token
export const apiTokenInterceptor = async(method:any, url:string, data:any, token: string) => {
    // let jwt = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
    return interceptorInstance({
        method: method,
        url: `${constants.API_ENDPOINT}/${url}`,
        data,
        headers: {
            Authorization: token,
        }
    })
}
// ====> INTERCEPTOR without token
export const apiInterceptor = async(method:any, url:string, data:any) => {
    return interceptorInstance({
        method : method,
        url: `${constants.API_ENDPOINT}/${url}`,
        data
    })
}

// WITHOUT INTERCEPTORS
const instance = axios.create();

// ====> without token
export const api = (method:any, url:string, data:any) => {
  return instance({
    method: method,
    url: `${constants.API_ENDPOINT}/${url}`,
    data: data,
    // headers: { "Access-Control-Allow-Origin": "*" },
  });
};

// ====> with token
export const apiToken = (method:any, url:string, data:any, token: string) => {
  let jwt = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
  return instance({
    method: method,
    url: `${constants.API_ENDPOINT}/${url}`,
    data: data,
    headers: {
      Authorization: token,
    },
  });
};