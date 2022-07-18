import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        url: 'promisson/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const createUser = () => {
    return axios.request({
        url: '/user/createUser'
    })
}
