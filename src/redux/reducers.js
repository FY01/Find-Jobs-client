/**
 * @Description: reducers:return new state based on old state and action
 * @author:
 * @date 2021/7/21
*/
// combine reducers
import {combineReducers} from "redux";
import {
    ERROR_MSG,
    AUTH_SUCCESS,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST
} from "./actionTypes";
import getRedirectTo from "../utils/getRedirectTo";

const initUser = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''  // redirect to somewhere if AUTH_SUCCESS
}
/**
 * manage user state
 * @param state
 * @param action
 * @returns {(*&{msg: string, redirectTo: string, type: string, username: string})|{msg, redirectTo: string, type: string, username: string}|{msg: string, redirectTo: string, type: string, username: string}}
 */
function user(state = initUser,action){
    switch (action.type){
        case AUTH_SUCCESS:
            const {type,header} = action.data
            return {...state,...action.data,redirectTo: getRedirectTo(type,header)}
        case ERROR_MSG:
            return {...state,msg:action.data}
        case RECEIVE_USER:
            return {...action.data}
        case RESET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }
}

const initUserList = []

/**
 * manage userList state
 * @param state
 * @param action
 * @returns {[]|*}
 */
function userList (state=initUserList,action){
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data  //action.date : [users]
        default:
            return state
    }
}


export default combineReducers(
    {
        user,
        userList
    }
)