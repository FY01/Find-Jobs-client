/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:20:39
 */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import UserList from "../../components/userList/UserList";

import { getUserList } from "../../redux/actionCreator";

class Assassin extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        getUserList: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getUserList('leader')
    }

    render() {
        const { userList } = this.props
        return (
            <UserList userList={userList} />
        );
    }
}
export default connect(
    state => ({ userList: state.userList, user: state.user }),
    { getUserList }
)(Assassin)

