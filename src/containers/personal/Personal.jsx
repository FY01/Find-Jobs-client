/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:21:47
 */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import {
    Result,
    List,
    WhiteSpace,
    Button,
    Modal,
} from 'antd-mobile'
import Cookies from 'js-cookie'

import { resetUser } from '../../redux/actionCreator'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    }

    update = () => {
        const type = this.props.user.type
        if (type === 'leader') {
            this.props.history.push('/leaderInfo')
        } else {
            this.props.history.push('/assassinInfo')
        }

    }

    logout = () => {
        Modal.alert('退出', '退出登陆吗？', [
            {
                text: '取消',
            },
            {
                text: '确认',
                onPress: () => {
                    // remove cookie
                    Cookies.remove('userId')
                    // reset redux state
                    this.props.resetUser('')
                }
            }
        ])
    }
    render() {
        const { username, info, header, company, task, salary, type } = this.props.user
        return (
            <div style={{ marginBottom: 50, marginTop: 50 }}>
                <Result
                    img={header ?
                        <img src={require(`../../assets/headers/${header}.png`)} style={{ width: 50 }} alt="header" /> :
                        <img src={require(`../../assets/headers/doNotExist.png`)} style={{ width: 50 }} alt="header" />
                    }
                    title={username}
                    message={company}
                />

                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        {type === 'leader' ? <Brief>所属组织: {company}</Brief> : null}
                        {type === 'leader' ? <Brief>已发布任务: {task}</Brief> : <Brief>寻找任务: {task}</Brief>}
                        {type === 'leader' ? <Brief>任务要求: {info}</Brief> : <Brief>能力介绍: {task}</Brief>}
                        {type === 'leader' ? <Brief>赏金金额: {salary}</Brief> : <Brief>目标赏金: {salary}</Brief>}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='primary' onClick={this.update}>更新信息</Button>
                    <WhiteSpace />
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        );
    }
}
export default connect(
    state => ({ user: state.user }),
    { resetUser }
)(Personal)


