/**
 * @Description:create actions
 * include:
 *      async actions
 *      sync actions
 * @author:
 * @date 2021/7/21
*/
import io from 'socket.io-client'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST
} from "./actionTypes";
import {validatePassword,validateUsername} from "../utils/validate";
import {
    reqLogin,
    reqRegister,
    reqUpdateUser,
    reqGetUser,
    reqGetUserList,
    reqGetChatList,
    reqReadMsg
} from "../api";

//async authSuccess action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//async errorMsg action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})

//async receiveUser action
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
//async resetUser action
export const resetUser = (msg) => ({type:RESET_USER,data:msg})

//async receiveUserList action
const receiveUserList = (userList) => ({type:RECEIVE_USER_LIST,data:userList})

//async receiveMsgList action
const receiveMsgList = (users,chatMsgs) => ({type:RECEIVE_MSG_LIST,data:{users,chatMsgs}})

//async receiveMsg action
const receiveMsg = (chatMsg) => ({type:RECEIVE_MSG,data:{chatMsg}})



/**
 * single object
 * 1: create an object if !object
 * 2: save object after created
 */
function initIo (userId,dispatch){
    if (!io.socket){
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg',(chatMsg) => {
            console.log('浏览器接收到的消息',chatMsg)
            if (userId === chatMsg.from || userId === chatMsg.to){
                dispatch(receiveMsg(chatMsg))
            }
        })
    }
}

export const sendMsg = ({from,to,content}) => {
    return dispatch => {
        console.log('浏览器发送的消息',{from,to,content})
        io.socket.emit('sendMsg',{from,to,content})
    }
}

/****************************************************************************************/

/**
 * tool function : get chat list
 * @param dispatch
 * @returns {Promise<void>}
 */
async function getChatList(userId,dispatch){
    initIo(userId,dispatch)
    const response = await reqGetChatList()
    const result = response.data  // {users:{},chatMsgs:[]}
    if(result.code === 0){
        const {users,chatMsgs} = result.data
        // console.log(users,chatMsgs)
        dispatch(receiveMsgList(users,chatMsgs))
    }
}


/**
 * sync register action
 * @param user
 * @returns {{data, type: string}|(function(*): Promise<void>)}
 */
export const register = (user) => {
    const {username, password, confirmPassword, type} = user
    // validate username
    if (!validateUsername(username)){
        return errorMsg('legal username:length by 1 to 12 , made up of a-Z、0-9 or _')
    }else if (!validatePassword(password)){
        return errorMsg('legal password:length by 4 to 12 ,made up of a-Z、0-9 or _')
    }else if (password !== confirmPassword){
        return errorMsg('confirmPassword must be same with password')
    }

    return async dispatch => {
        const response = await reqRegister({username, password, type})
        const result = response.data  //  {code: 0/1, data: user, msg: ''}
        if (result.code === 0){
            // register success
            dispatch(authSuccess(result.data))
            getChatList(result.data._id,dispatch)
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}
/**
 * sync login action
 * @param user
 * @returns {{data, type: string}|(function(*): Promise<void>)}
 */
export const login = (user) => {
    const {username, password} = user
    //validate username
    if (!validateUsername(username)){
        return errorMsg('legal username:length by 1 to 12 , made up of a-Z、0-9 or _')
    }else if (!validatePassword(password)){
        return errorMsg('legal password:length by 4 to 12 ,made up of a-Z、0-9 or _')
    }

    return async dispatch => {
        const response = await reqLogin({username, password})
        const result = response.data  //  {code: 0/1, data: user, msg: ''}
        if (result.code === 0){
            // login success
            dispatch(authSuccess(result.data))
            getChatList(result.data._id,dispatch)
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}
/**
 * sync update user action
 * @param user
 * @returns {function(*): Promise<void>}
 */
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data  //  {code: 0/1, data: user, msg: ''}
        if (result.code === 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
/**
 * sync get user action
 * @returns {function(*): Promise<void>}
 */
export const getUser = () => {
    return async dispatch => {
        const response = await reqGetUser()
        const result = response.data  //  {code: 0/1, data: user, msg: ''}
        if (result.code === 0){
            // updateUser success
            dispatch(receiveUser(result.data))
            getChatList(result.data._id,dispatch)
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
/**
 * sync get user list action
 * @param type
 * @returns {function(*): Promise<void>}
 */
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqGetUserList(type)
        const result = response.data  //  result:{code: 0, data: users}
        if (result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}




