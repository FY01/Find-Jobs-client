/**
 * @Description: navFooter.
 * @author:
 * @date 2021/7/24
*/
import React, {Component} from 'react'
import {TabBar} from "antd-mobile"
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {
    static propTypes = {
        navList:PropTypes.array.isRequired
    }
    render() {
        //filter navList
        let {navList} = this.props
        const newNavList = navList.filter(nav => !nav.hind)

        const path = this.props.location.pathname
        return (
            <TabBar>
                {
                    newNavList.map((nav) => (
                        <Item
                            key ={nav.path}
                            title={nav.text}
                            icon={{uri:require(`./navIcons/${nav.icon}.png`)}}
                            selectedIcon={{uri:require(`./navIcons/${nav.icon}-selected.png`)}}
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

