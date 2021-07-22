/**
 * @Description: register component
 * @author:
 * @date 2021/7/21
*/
import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    Button,
    Radio,
    InputItem,
    WhiteSpace
} from 'antd-mobile'
import Logo from '../../components/Logo/Logo'
const Item = List.Item

export default class Register extends Component {
    state = {
        username:'',
        password:'',
        confirmPassword:'',
        type:'assassin'    //assassin/leader
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
     * go to Login route
     */
    login = () => {
        this.props.history.replace('/login')
    }
    register = () => {

    }
    render() {
        const {type} = this.state
        return (
            <div>
                <NavBar>刺&nbsp;客&nbsp;直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder={'敢问尊姓大名'} onChange={(val)=>{this.handleChange('username',val)}}>尊姓大名:</InputItem>
                        <WhiteSpace/>
                        <InputItem type={'password'} placeholder={'请录入通关暗语'} onChange={(val)=>{this.handleChange('password',val)}}>通关暗语:</InputItem>
                        <WhiteSpace/>
                        <InputItem type={'password'} placeholder={'请确认暗语'} onChange={(val)=>{this.handleChange('confirmPassword',val)}}>确认暗语:</InputItem>
                        <WhiteSpace/>
                        <Item>
                            <span>职业:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'assassin'} onChange={()=>{this.handleChange('type','assassin')}}>刺客</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'leader'} onChange={()=>{this.handleChange('type','leader')}}>首领</Radio>
                        </Item>
                        <WhiteSpace/>
                        <Button type={'primary'} onClick={this.register}>加入组织</Button>
                        <WhiteSpace/>
                        <Button onClick={this.login}>已有名号</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

