/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:20:06
 */

import React, { Component } from 'react'
import { TabBar } from "antd-mobile"
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        //filter navList
        let { navList, unreadCount } = this.props
        const newNavList = navList.filter(nav => !nav.hind)

        const path = this.props.location.pathname
        return (
            <TabBar>
                {
                    newNavList.map((nav) => (
                        <Item
                            badge={nav.path === '/message' ? unreadCount : 0}
                            key={nav.path}
                            title={nav.text}
                            icon={{ uri: require(`./navIcons/${nav.icon}.png`) }}
                            selectedIcon={{ uri: require(`./navIcons/${nav.icon}-selected.png`) }}
                            selected={path === nav.path}
                            onPress={() => this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
//use this.props.location in a UIComponent,withRouter() is required
//location/history/match
export default withRouter(NavFooter)

