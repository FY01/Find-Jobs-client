/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:22:19
 */


import { createStore, applyMiddleware } from "redux";
//to realize async action,work with applyMiddleware
import thunk from 'redux-thunk'
//to use browser devTools
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from "./reducers";

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))