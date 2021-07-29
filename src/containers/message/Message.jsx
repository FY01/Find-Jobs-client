/**
 * @Description: Message component
 * @author:
 * @date 2021/7/24
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import {List, Badge} from 'antd-mobile'
import PropTypes from 'prop-types'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs,userId){
    //1.find every single user's last msg,put in to object {chat_id:msg}
    let lastMsgsObject = {}
    chatMsgs.forEach(msg => {
        //single msg.unReadCount


        if(msg.to===userId && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }

        let chatId = msg.chat_id
        let lastMsg = lastMsgsObject[chatId]
        if (!lastMsg){
            lastMsgsObject[chatId] = msg
        }else{
            // count single suer has how many unreadCount
            const unReadCount = msg.unReadCount + lastMsg.unReadCount
            if (msg.create_time>lastMsg.create_time){
                lastMsgsObject[chatId] = msg
            }
            //mount unreadCount
            lastMsgsObject[chatId].unReadCount = unReadCount
        }
    })

    //2. get lastMsgs
    let lastMsgs = Object.values(lastMsgsObject)

    //3.sort lastMsgs by create_time
    lastMsgs.sort((pre,cur) => {
        return cur.create_time - pre.create_time
    })
    return lastMsgs
}

class Message extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired,
        chat:PropTypes.object.isRequired
    }
    render() {
        const {user,chat} = this.props
        const {users,chatMsgs} = chat
        //find ever last msg from single targetUser to me
        const lastMsgs = getLastMsgs(chatMsgs,user._id)

        return (
            <List style={{marginBottom:45,marginTop:50}}>

                {
                    lastMsgs.map(lastMsg => {
                        const targetId = lastMsg.to === user._id ? lastMsg.from: lastMsg.to
                        const targetUser = users[targetId]

                        return (
                            <Item
                                key ={lastMsg._id}
                                extra={<Badge text={lastMsg.unReadCount}/>}
                                thumb={targetUser.header?require(`../../assets/headers/${targetUser.header}.png`) :require( `../../assets/headers/doNotExist.png`) }
                                arrow={'horizontal'}
                                onClick={() => {this.props.history.push(`/chat/${targetId}`)}}
                            >
                                {lastMsg.content}
                                 <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }

            </List>
        );
    }
}
export default connect(
    state => ({user:state.user,chat:state.chat}),
)(Message)


