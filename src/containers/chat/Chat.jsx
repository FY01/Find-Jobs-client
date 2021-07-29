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
    InputItem,
    Grid,
    Icon
} from "antd-mobile";

import {sendMsg,readMsg  } from '../../redux/actionCreator'
import emojis from "./emojis";

const Item = List.Item

class Chat extends Component {
    static propTypes = {
        user:Proptypes.object.isRequired,
        chat:Proptypes.object.isRequired,
        sendMsg:Proptypes.func.isRequired,
        readMsg:Proptypes.func.isRequired
    }
    state = {
        content:'',
        isShowIcon:false
    }

    //seng msg
    send = () => {

        const from = this.props.user._id
        const to = this.props.match.params.userId
        const content = this.state.content.trim()
        if (content){
            this.props.sendMsg({from,to,content})
        }
        //clear input after send msg (state)
        this.setState({content:'',isShowIcon:false})
    }

    // show icon
    toggleShowIcon = () => {
        const isShowIcon = !this.state.isShowIcon
        this.setState({isShowIcon})
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        },0)
    }


    UNSAFE_componentWillMount() {
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }
    // to the bottom when come in and send msg
    componentDidMount() {
        //keep last mag in the screen bottom
        window.scrollTo(0,document.body.scrollHeight)

        // send req to update unread msg to be read
        const to = this.props.user._id
        const from = this.props.match.params.userId
        this.props.readMsg(from,to)
    }
    componentDidUpdate() {
        //keep last mag in the screen bottom
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentWillUnmount() {
        // send req to update unread msg to be read
        const to = this.props.user._id
        const from = this.props.match.params.userId
        this.props.readMsg(from,to)
    }



    render() {
        const {user,chat} = this.props
        const {users,chatMsgs} = chat
        const {isShowIcon} = this.state


        // find target msgs
        const myId = user._id
        const targetId = this.props.match.params.userId
        const chatId = [myId,targetId].sort().join('_')
        const targetMsgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        if (!users[myId]){
            return null
        }

        //find the other header/username
        const headerName = users[targetId].header
        const username = users[targetId].username
        let header
        if (headerName){
            header = require( `../../assets/headers/${headerName}.png`)
        }else {
            header = require( `../../assets/headers/doNotExist.png`)
        }

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    onLeftClick={() => {this.props.history.goBack()}}
                    className={'sticky-header'}
                >
                    {username}
                </NavBar>
                <List style={{marginBottom:45,marginTop:50}}>
                    {
                        targetMsgs.map((msg) => {
                            if (msg.to !== targetId){
                                return <Item thumb={header} key ={msg._id}> {msg.content} </Item>
                            }else {
                                // todo how to add my header?
                                return <Item className='chat-me' extra={'me'} key ={msg._id}> {msg.content} </Item>
                            }
                        })
                    }
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        //clear input after send msg (from state)
                        value={this.state.content}
                        onFocus={() => {this.setState({isShowIcon: false})}}
                        placeholder="请输入"
                        onChange = {value => this.setState({content:value})}
                        extra={
                            <span>
                                <span onClick={this.toggleShowIcon} role='img'> 😃‍ </span>
                                <span onClick={this.send} >发送</span>
                            </span>
                        }
                    />
                    {
                        isShowIcon ?
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(Item => {
                                    //todo
                                    this.setState({content:this.state.content + Item.text})
                                })}
                            />:null
                    }
                </div>
            </div>
        );
    }
}
export default connect(
    state => ({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)

