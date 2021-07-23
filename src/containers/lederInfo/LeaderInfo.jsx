/**
 * @Description: complete assassin's information
 * @author:
 * @date 2021/7/23
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {
    List,
    NavBar,
    InputItem,
    TextareaItem,
    WingBlank, WhiteSpace, Button
} from "antd-mobile";

import HeaderSelector from "../../components/headerSelector/HeaderSelector";

class LeaderInfo extends Component {
    static propTypes = {

    }
    state = {
        header: '',
        task: '',
        info: '',
        company: '',
        salary: ''
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

    save = () => {
        console.log(this.state)
    }
    setHeader= (header) => {
        this.setState({
            header
        })
    }
    render() {
        return (
            <List>
                <NavBar>完 善 首 领 信 息</NavBar>
                <WingBlank>
                    <HeaderSelector setHeader = {this.setHeader}/>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <InputItem placeholder={'请输入招聘任务'} onChange={(val)=>{this.handleChange('task',val)}}>招聘任务:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder={'请输入组织名称'} onChange={(val)=>{this.handleChange('company',val)}}>组织名称:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder={'请输入佣金待遇'} onChange={(val)=>{this.handleChange('salary',val)}}>佣金待遇:</InputItem>
                    <WhiteSpace/>
                    <TextareaItem
                        title={'职位要求:'}
                        rows={3}
                        onChange={(val)=>{this.handleChange('info',val)}}
                    >
                    </TextareaItem>
                    <Button type={'primary'} onClick={this.save}>保存</Button>
                </WingBlank>
            </List>
        );
    }
}
export default connect(
    state => ({}),
    {}
)(LeaderInfo)

