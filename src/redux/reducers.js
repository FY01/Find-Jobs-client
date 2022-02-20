
// combine reducers
import { combineReducers } from "redux";
import {
    ERROR_MSG,
    AUTH_SUCCESS,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST, UPDATE_READ_MSG
} from "./actionTypes";
import getRedirectTo from "../utils/getRedirectTo";

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''  // redirect to somewhere if AUTH_SUCCESS
}
/**
 * manage user state
 * @param state
 * @param action
 * @returns {(*&{msg: string, redirectTo: string, type: string, username: string})|{msg, redirectTo: string, type: string, username: string}|{msg: string, redirectTo: string, type: string, username: string}}
 */
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data
            return { ...state, ...action.data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return { ...action.data }
        case RESET_USER:
            return { ...initUser, msg: action.data }
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
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data  //action.date : [users]
        default:
            return state
    }
}

const initChat = {
    users: {}, //   all users :   {userId:{}}
    chatMsgs: [],  // current user chat msg [{}...]
    unreadCount: 0     //current user unread msg
}


function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, userId } = action.data
            return {
                users,
                chatMsgs,
                unreadCount: chatMsgs.reduce((totalCount, msg) => (totalCount + (!msg.read && msg.to === userId ? 1 : 0)), 0)
            }
        case RECEIVE_MSG:
            const { chatMsg } = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unreadCount: state.unreadCount + (!chatMsg.read && chatMsg.to === action.data.userId ? 1 : 0)
            }
        case UPDATE_READ_MSG:
            const { from, to, updateCount } = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.to === to && msg.from === from && !msg.read) {
                        return { ...msg, read: true }
                    } else {
                        return msg
                    }
                }),
                unreadCount: state.unreadCount - updateCount
            }
        default:
            return state
    }
}


export default combineReducers(
    {
        user,
        userList,
        chat
    }
)