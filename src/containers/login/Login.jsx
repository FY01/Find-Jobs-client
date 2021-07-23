/**
 * @Description: login component
 * @author:
 * @date 2021/7/21
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {
    NavBar,
    WingBlank,
    List,
    Button,
    InputItem,
    WhiteSpace
} from 'antd-mobile'
import Logo from '../../components/logo/Logo'
import {login} from "../../redux/actionCreator";
import {Redirect} from "react-router-dom";
import '../../assets/errroMsg.less'

class Login extends Component {
    static propTypes = {
        login:PropTypes.func.isRequired,
        user:PropTypes.object
    }
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
        this.props.login(this.state)
    }
    render() {
        const {redirectTo,msg} = this.props.user
        if (redirectTo){
            return (
                <Redirect to = {redirectTo}>
                </Redirect>
            )
        }
        return (
            <div>
                <NavBar>刺&nbsp;客&nbsp;直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    {msg?<div className={"errorMsg"}><p>{msg}</p></div>:null}
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
export default connect(
    state => ({user:state.user}),
    {login}
)(Login)
