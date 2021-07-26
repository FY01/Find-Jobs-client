/**
 * @Description: Chat component
 * @author:
 * @date 2021/7/26
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import Proptypes from 'prop-types'
import {
    NavBar,
    List,
    InputItem
} from "antd-mobile";

import {sendMsg} from '../../redux/actionCreator'

const Item = List.Item

class Chat extends Component {
    static propTypes = {
        user:Proptypes.object.isRequired,
        sendMsg:Proptypes.func.isRequired
    }
    state = {
        content:''
    }

    send = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userId
        const content = this.state.content.trim()
        if (content){
            this.props.sendMsg({from,to,content})
        }
        this.setState({content:''})

    }
    render() {
        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    <Item thumb={require('../../assets/headers/header1.png')} > 你好 </Item>
                    <Item thumb={require('../../assets/headers/header1.png')} > 你好 2 </Item>
                    <Item className='chat-me' extra='我' > 很好 </Item>
                    <Item className='chat-me' extra='我' > 很好 2 </Item>
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        value={this.state.content}
                        placeholder="请输入"
                        onChange = {value => this.setState({content:value})}
                        extra={ <span onClick={this.send}>发送</span> }
                    />
                </div>
            </div>
        );
    }
}
export default connect(
    state => ({user:state.user}),
    {sendMsg}
)(Chat)

