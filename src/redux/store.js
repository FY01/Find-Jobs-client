/**
 * @Description: redux core module
 * @author:
 * @date 2021/7/21
*/

import {createStore,applyMiddleware} from "redux";
//to realize async action,work with applyMiddleware
import thunk from 'redux-thunk'
//to use browser devTools
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from "./reducers";

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))