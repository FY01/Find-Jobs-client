/**
 * @Description: Assassin component
 * @author:
 * @date 2021/7/24
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'

import UserList from "../../components/userList/UserList";

import {getUserList} from "../../redux/actionCreator";

class Assassin extends Component {
    static propTypes = {
        userList:PropTypes.array.isRequired,
        user:PropTypes.object.isRequired,
        getUserList:PropTypes.func.isRequired
    }
    componentDidMount() {
        let {type} = this.props.user
        if (type === 'assassin') type = 'header'
        if (type === 'header') type = 'assassin'
        this.props.getUserList(type)
    }

    render() {
        const {userList} = this.props
        return (
            <UserList userList={userList}/>
        );
    }
}
export default connect(
    state => ({userList:state.userList,user:state.user}),
    {getUserList}
)(Assassin)

