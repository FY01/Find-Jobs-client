/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:19:16
 */

import ajax from "./ajax";

//register
// export const reqRegister = (user) => ajax('/register',user,'POST')
export const reqRegister = (user) => ajax('/register', user, 'POST')

//login
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST')

//update user
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

//get user
export const reqGetUser = () => ajax('/getUser')

//get user list
export const reqGetUserList = (type) => ajax('/userList', { type })

//get chat list
export const reqGetChatList = () => ajax('/msgList')

//define msg read
export const reqReadMsg = (from) => ajax('/readMsg', { from }, 'POST')


