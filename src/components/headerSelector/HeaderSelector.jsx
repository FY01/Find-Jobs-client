/**
 * @Description: select header component
 * @author:
 * @date 2021/7/23
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    List,
    Grid
} from "antd-mobile";

export default class HeaderSelector extends Component {
    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }
    state = {
        icon:null
    }
    constructor(props) {
        super(props);
        this.headerList = []
        // create a headerList
        for (let i = 0;i < 20;i ++){
            this.headerList.push({
                text:"header"+(i+1),
                icon:require(`../../assets/headers/header${i + 1}.png`)
            })
        }
    }

    /**
     *
     * @param text
     * @param icon
     */
    handleClick = ({text,icon}) => {
        //update state
        this.setState({
            icon
        })
        //parent component save headers'info
        this.props.setHeader(text)
    }

    render() {
        const {icon} = this.state
        const renderHeader = !icon?'请选择头像':(
            <div>
                已选择头像：<img style={{height:50,width:50}} src={icon} alt="header"/>
            </div>
        )
        return (
            <List
                renderHeader={renderHeader}
            >
                <Grid
                    data={this.headerList}
                    columnNum={5}
                    onClick={this.handleClick}
                >
                </Grid>
            </List>
        );
    }
}

