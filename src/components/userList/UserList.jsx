/**
 * @Description: show user list
 * @author:
 * @date 2021/7/25
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    WingBlank,
    WhiteSpace,
    Card,
} from "antd-mobile";

const Header = Card.Header
const Body = Card.Body

export default class UserList extends Component {
    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    render() {
        const {userList} = this.props


        return (
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card>
                                {user.header?<Header thumb={require(`../../assets/headers/${user.header}.png`)} extra='' />:
                                    <p>{user.type==='leader'?'--该领袖':'--该刺客'}隐藏头像</p>
                                }
                                <Body>
                                    <p>{user.type==='leader'?'领袖':'刺客'}: {user.username}</p>
                                    <p>职位: {user.task}</p>
                                    {user.company?<p>组织: {user.company}</p>:null}
                                    {user.salary?<p>佣金: {user.salary}</p>:null}
                                    <p>描述: {user.info}</p>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        );
    }
}

