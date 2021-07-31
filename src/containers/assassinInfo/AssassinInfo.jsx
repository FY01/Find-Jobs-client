/**
 * @Description: complete assassin's information
 * @author:
 * @date 2021/7/23
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    List,
    NavBar,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
    TextareaItem
} from "antd-mobile";

import HeaderSelector from "../../components/headerSelector/HeaderSelector";
import {updateUser} from "../../redux/actionCreator";

class AssassinInfo extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired,
        updateUser:PropTypes.func.isRequired
    }
    state = {
        header: '',
        task: '',
        info: '',
        salary:''
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
        this.props.updateUser(this.state)
        this.props.history.replace('/assassin')
    }

    setHeader= (header) => {
        this.setState({
            header
        })
    }

    UNSAFE_componentWillMount() {
        const {user} = this.props
        const {header,task,info,salary} = user
        if (user){
            this.setState({
                header,task,info,salary
            })
        }
    }
    render() {
        const {header,task,info,salary} = this.state
        return (
            <List>
                <NavBar>完 善 刺 客 信 息</NavBar>
                <WingBlank>
                    <HeaderSelector setHeader = {this.setHeader} header = {header}/>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <InputItem placeholder={'请输入目标任务'} value={task} onChange={(val)=>{this.handleChange('task',val)}}>目标任务:</InputItem>
                    <InputItem placeholder={'请输入目标赏金'} value={salary} onChange={(val)=>{this.handleChange('salary',val)}}>目标赏金:</InputItem>
                    <WhiteSpace/>
                    <TextareaItem
                        title={'自我介绍:'}
                        value={info}
                        rows={3}
                        onChange={(val)=>{this.handleChange('info',val)}}
                    >
                    </TextareaItem>
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
)(AssassinInfo)


