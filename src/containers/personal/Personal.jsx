/**
 * @Description: Personal component
 * @author:
 * @date 2021/7/24
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {
    Result,
    List,
    WhiteSpace,
    Button,
    Modal,
} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actionCreator'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired
    }

    logout = () => {
        Modal.alert('退出','退出登陆吗？',[
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
        const {username, info, header, company, task, salary} = this.props.user
        return (
            <div style={{marginBottom:50, marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/headers/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={company}
                />

                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>任务: {task}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>佣金: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        );
    }
}
export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)


