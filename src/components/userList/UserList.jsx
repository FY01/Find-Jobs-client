/**
 * @Description: show user list
 * @author:
 * @date 2021/7/25
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import QueueAnim from "rc-queue-anim"
import {
    WingBlank,
    WhiteSpace,
    Card,
} from "antd-mobile";

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    render() {
        const {userList} = this.props

        return (
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                <QueueAnim type={'scale'} duration={'300'}>
                    {
                        userList.map(user => {
                            const {_id,type,task,company,salary,info,header,username} = user
                            return (
                                <div key={_id}>
                                    <WhiteSpace/>
                                    <Card onClick={() => {this.props.history.push(`/chat/${_id}`)}}>
                                        {header?
                                            <Header thumb={require(`../../assets/headers/${header}.png`)} extra='' />:
                                            <Header thumb={require( `../../assets/headers/doNotExist.png`)} extra='' />
                                        }
                                        <Body>
                                            <p>{type==='leader'?'领袖':'刺客'}: {username}</p>
                                            <p>{type==='leader'?'赏金任务':'目标任务'}: {task}</p>
                                            {type==='leader'?<p>所属组织:{company}</p>:null}
                                            <p>{type==='leader'?'发布赏金':'目标赏金'}: {salary}</p>
                                            <p>{type==='leader'?'任务要求':'能力介绍'}: {info}</p>
                                        </Body>
                                    </Card>
                                </div>
                                )

                        })
                    }
                </QueueAnim>

            </WingBlank>
        );
    }
}

export default withRouter(UserList)

