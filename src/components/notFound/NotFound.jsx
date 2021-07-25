/**
 * @Description: 404 page
 * @author:
 * @date 2021/7/24
*/
import React, {Component} from 'react';

import {Button} from "antd-mobile";

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>404~~找不到该页面@*@</h2>
                <Button
                    type={'primary'}
                    onClick={()=>{this.props.history.replace('/')}}
                >
                    回到首页
                </Button>
            </div>
        );
    }
}

