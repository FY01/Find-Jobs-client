/**
 * @Description:create actions
 * include:
 *      async actions
 *      sync actions
 * @author:
 * @date 2021/7/21
*/
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from "./actionType";
import {validatePassword,validateUsername} from "../utils/validate";
import {
    reqLogin,
    reqRegister,
    reqUpdateUser,
    reqGetUser
} from "../api";

//async authSuccess action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//async errorMsg action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})

//async receiveUser action
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
//async resetUser action
const resetUser = (msg) => ({type:RESET_USER,data:msg})


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
            dispatch(authSuccess(result.data))
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
            dispatch(authSuccess(result.data))
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

export const getUser = () => {
    return async dispatch => {
        const response = await reqGetUser()
        const result = response.data  //  {code: 0/1, data: user, msg: ''}
        if (result.code === 0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}


