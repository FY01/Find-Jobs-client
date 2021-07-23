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
    WingBlank,
    WhiteSpace,
    Button,
    TextareaItem
} from "antd-mobile";

import HeaderSelector from "../../components/headerSelector/HeaderSelector";

class AssassinInfo extends Component {
    static propTypes = {

    }
    state = {
        header: '',
        task: '',
        info: '',
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
                <NavBar>完 善 刺 客 信 息</NavBar>
                <WingBlank>
                    <HeaderSelector setHeader = {this.setHeader}/>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <InputItem placeholder={'请输入佣金任务'} onChange={(val)=>{this.handleChange('task',val)}}>佣金任务:</InputItem>
                    <WhiteSpace/>
                    <TextareaItem
                        title={'自我介绍:'}
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
    state => ({}),
    {}
)(AssassinInfo)

