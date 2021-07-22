/**
 * @Description: login component
 * @author:
 * @date 2021/7/21
*/
import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    Button,
    InputItem,
    WhiteSpace
} from 'antd-mobile'
import Logo from '../../components/Logo/Logo'

export default class Login extends Component {
    state = {
        username:'',
        password:'',
    }
    /**
     * handle input's onChange event,collect state's information
     * @param propName
     * @param val
     */
    handleChange = (propName,val) => {
        this.setState({
            [propName]:val
        })
    }
    /**
     * go to Register route
     */
    register = () => {
        this.props.history.replace('/register')
    }
    login = () => {

    }
    render() {
        return (
            <div>
                <NavBar>刺&nbsp;客&nbsp;直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输入尊姓大名'} onChange={(val)=>{this.handleChange('username',val)}}>尊姓大名:</InputItem>
                        <WhiteSpace/>
                        <InputItem type={'password'} placeholder={'请输入通关暗语'} onChange={(val)=>{this.handleChange('password',val)}}>通关暗语:</InputItem>
                        <WhiteSpace/>

                        <Button type={'primary'} onClick={this.login}>登录组织</Button>
                        <WhiteSpace/>
                        <Button onClick={this.register}>注册名号</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}
