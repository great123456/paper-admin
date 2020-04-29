// home
import fetch from '../config/fetch'
import { API_PATH } from '../config/env'

// 登录
export const apiUserLogin = (obj) => fetch(API_PATH + '/sys/login', obj, 'POST')

// 登出
export const apiUserLoginOut = (obj) => fetch(API_PATH + '/sys/logout', obj, 'GET')

// 用户信息
export const apiGetUserInfo = (obj) => fetch(API_PATH + '/user/queryBaseInfo', obj, 'GET')

// 修改密码
export const apiUserUpdatePassword = (obj) => fetch(API_PATH + '/user/modifyPassword', obj, 'POST')

// 新增账号
export const apiAddAccount = (obj) => fetch(API_PATH + '/userManage/addUser', obj, 'POST')

// 账号列表
export const apiAccountList = (obj) => fetch(API_PATH + '/userManage/userList', obj, 'GET')

// 启用/禁用账号
export const apiUpdateAccountStatus = (obj) => fetch(API_PATH + '/userManage/enableUser', obj, 'POST')

// 修改用户信息
export const apiUpdateUserInfo = (obj) => fetch(API_PATH + '/userManage/modifyUserInfo', obj, 'POST')

// 删除后台账号
export const apiDeleteUserInfo = (obj) => fetch(API_PATH + '/userManage/deleteUser', obj, 'POST')

// 订单列表
export const apiOrderList = (obj) => fetch(API_PATH + '/order/orderList', obj, 'GET')

// 删除订单
export const apiDeleteOrder = (obj) => fetch(API_PATH + '/order/deleteOrder', obj, 'POST')

// 提交论文监测
export const apiSubmitCheck = (obj) => fetch(API_PATH + '/order/submitPaperCheck', obj, 'POST')

// 用户列表
export const apiUserList = (obj) => fetch(API_PATH + '/memberManage/memberInfoList', obj, 'GET')

// 修改注册用户信息
export const apiUpdeteRegisterInfo = (obj) => fetch(API_PATH + '/memberManage/modifyMemberInfo', obj, 'POST')

// 删除注册用户
export const apiDeleteRegisterInfo = (obj) => fetch(API_PATH + '/memberManage/deleteMember', obj, 'POST')

// 价格设置
export const apiPriceSetting = (obj) => fetch(API_PATH + '/price/allPriceDetail', obj, 'GET')

// 今日供货价格
export const apiPriceList = (obj) => fetch(API_PATH + '/price/allSellPrice', obj, 'GET')

// 修改价格公式
export const apiUpdatePrice = (obj) => fetch(API_PATH + '/price/modifyFormula', obj, 'POST')

// 价格变更记录
export const apiPriceRecordList = (obj) => fetch(API_PATH + '/price/priceChangeLog', obj, 'GET')

// 所有论文类型
export const apiPaperTypeList = (obj) => fetch('/common/paperTypeList', obj, 'GET')

// 充值订单
export const apiRechargeOrder = (obj) => fetch('/chargeOrder/chargeLog', obj, 'GET')

