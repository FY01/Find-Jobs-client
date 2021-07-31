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
import {updateUser} from "../../redux/actionCreator";

class LeaderInfo extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired,
        updateUser:PropTypes.func.isRequired
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

    //save update info
    save = () => {
        this.props.updateUser(this.state)
        this.props.history.replace('/leader')
    }
    //cancel update info
    cancel = () => {
        this.props.history.replace('/personal')
    }
    setHeader= (header) => {
        this.setState({
            header
        })
    }

    //save state when will mount
    UNSAFE_componentWillMount() {
        const {user} = this.props
        const {header,task,info,company,salary} = user
        if (user){
            this.setState({
                header,task,info,company,salary
            })
        }
    }

    render() {
        const {header,task,info,company,salary} = this.state

        return (
            <List>
                <NavBar>完 善 首 领 信 息</NavBar>
                <WingBlank>
                    <HeaderSelector setHeader = {this.setHeader} header = {header}/>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <InputItem placeholder={'请发布任务'} value={task} onChange={(val)=>{this.handleChange('task',val)}}>发布任务:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder={'请输入组织名称'} value = {company} onChange={(val)=>{this.handleChange('company',val)}}>组织名称:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder={'请输入赏金金额'} value = {salary} onChange={(val)=>{this.handleChange('salary',val)}}>赏金金额:</InputItem>
                    <WhiteSpace/>
                    <TextareaItem
                        title={'任务要求:'}
                        value={info}
                        rows={3}
                        onChange={(val)=>{this.handleChange('info',val)}}
                    >
                    </TextareaItem>
                    <Button type={'ghost'} onClick={this.cancel}>取消修改</Button>
                    <WhiteSpace/>
                    <Button type={'primary'} onClick={this.save}>保存</Button>
                </WingBlank>
            </List>
        );
    }
}
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(LeaderInfo)

