/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:19:46
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    List,
    Grid
} from "antd-mobile";

export default class HeaderSelector extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    state = {
        icon: null,
        header: ''
    }
    constructor(props) {
        super(props);
        this.headerList = []
        // create a headerList
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: "header" + (i + 1),
                icon: require(`../../assets/headers/header${i + 1}.png`)
            })
        }
    }


    /**
     *
     * @param text
     * @param icon
     */
    handleClick = ({ text, icon }) => {
        //update state
        this.setState({
            icon,
            header: ''
        })
        //parent component save headers'info
        this.props.setHeader(text)
    }

    componentDidMount() {
        const { header } = this.props
        if (header) {
            this.setState({ header })
        }
    }

    render() {
        const { icon, header } = this.state

        if (header) {
            let renderHeader = (
                <div>
                    已使用头像：<img style={{ height: 50, width: 50 }} src={require(`../../assets/headers/${header}.png`)} alt="header" />
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
            )
        }

        let renderHeader = !icon ? '请选择头像' : (
            <div>
                已选择头像：<img style={{ height: 50, width: 50 }} src={icon} alt="header" />
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
        )
    }
}

