/**
 * @Description: reducers:return new state based on old state and action
 * @author:
 * @date 2021/7/21
*/
// combine reducers
import {combineReducers} from "redux";
import {
    ERROR_MSG,
    AUTH_SUCCESS
} from "./actionType";

const initUser = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''  // redirect to somewhere if AUTH_SUCCESS
}
function user(state = initUser,action){
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state,...action.data,redirectTo: '/'}
        case ERROR_MSG:
            return {...state,msg:action.data}
        default:
            return state
    }
}

export default combineReducers(
    {
        user
    }
)