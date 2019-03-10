// home
import fetch from '../config/fetch'
import { API_PATH } from '../config/env'

// 登录
export const apiUserLogin = (obj) => fetch(API_PATH + '/sys/login', obj, 'POST')

// 新增账号
export const apiAddAccount = (obj) => fetch(API_PATH + '/userManage/addUser', obj, 'POST')

// 订单列表
export const apiOrderList = (obj) => fetch(API_PATH + '/order/orderList', obj, 'GET')