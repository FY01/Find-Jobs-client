/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:19:56
 */
import React from 'react'

import './logo.less'
import logo from './logo.png'

export default function Logo() {
    return (
        <div className={"logo-container"}>
            <img src={logo} alt="logo" className={"logo-img"} />
        </div>
    )
}