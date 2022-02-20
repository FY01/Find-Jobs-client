/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:20:19
 */

import React, { Component } from 'react';

import { Button } from "antd-mobile";

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>404~~找不到该页面@*@</h2>
                <Button
                    type={'primary'}
                    onClick={() => { this.props.history.replace('/') }}
                >
                    回到首页
                </Button>
            </div>
        );
    }
}

