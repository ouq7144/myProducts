import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/user/createUser', userApi.createUser)
Mock.mock('/user/getTableData', userApi.getTableData)
Mock.mock('/user/deleteUser', userApi.deleteUser)
Mock.mock('/user/updateUser', userApi.updateUser)
Mock.mock('/user/searchUser', userApi.searchUser)