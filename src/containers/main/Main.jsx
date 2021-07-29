/**
 * @Description: main component
 * @author:
 * @date 2021/7/21
*/
import React, {Component} from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import {NavBar} from "antd-mobile";

import LeaderInfo from "../lederInfo/LeaderInfo";
import AssassinInfo from "../assassinInfo/AssassinInfo";
import Assassin from "../assassin/Assassin";
import Leader from "../leader/Leader";
import Message from "../message/Message";
import Personal from "../personal/Personal";
import NotFound from "../../components/notFound/NotFound";
import NavFooter from "../../components/navFooter/NavFooter";
import Chat from "../chat/Chat";

import getRedirectTo from "../../utils/getRedirectTo";
import {getUser} from "../../redux/actionCreator";

class Main extends Component {
    navList = [ // include all the information about navRoute
        {
            path: '/leader', 
            component: Leader,
            title: '刺客列表',
            icon: 'leader',
            text: '领袖',
        },
        {
            path: '/assassin', 
            component: Assassin,
            title: '领袖列表',
            icon: 'assassin',
            text: '刺客',
        },
        {
            path: '/message', 
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', 
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]
    
    static propTypes = {
        user:PropTypes.object.isRequired,
        unreadCount:PropTypes.number.isRequired,
        getUser:PropTypes.func
    }

    componentDidMount() {
        const userId = Cookies.get("userId")
        const {_id} = this.props.user
        if (userId && !_id){
            this.props.getUser()
        }
    }

    render() {

        const userId = Cookies.get('userId')
        // !userId => /login
        if (!userId){
            this.props.history.replace('/login')
            return null
        }
        const {_id,type,header} = this.props.user
        // userId && !_id => auto reqGetUser after componentDidMount
        if (!_id){
            return null
        // _id => Redirect to someWhere
        }else {
            let path = this.props.location.pathname
            if (path === '/'){
                path = getRedirectTo(type,header)
                return <Redirect to = {path}/>
            }
        }

        //find current nav
        let {navList} = this
        let path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)

        //filter nav, if nav.hind=true,filter in the NavFooter
        const {user,unreadCount} = this.props
        if (currentNav){
            if (user.type === 'leader'){
                navList[1].hind = true
            }else if (user.type === 'assassin'){
                navList[0].hind = true
            }
        }




        return (
            <div>
                {/*some Route does not need to show NavBar*/}
                {currentNav?<NavBar className={'sticky-header'}>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav => <Route path ={nav.path} key= {nav.path} component = {nav.component}/>)
                    }
                    <Route path = '/assassinInfo' component = {AssassinInfo}/>
                    <Route path = '/leaderInfo' component = {LeaderInfo}/>

                    {/*path = '/chat/:userId'  ==> in Chat component,can get userId by this.props.match.params.userId*/}
                    <Route path = '/chat/:userId' component = {Chat}/>

                    <Route component = {NotFound}/>
                </Switch>
                {/*some Route does not need to show NavFooter*/}
                {currentNav?<NavFooter navList = {navList} unreadCount = {unreadCount}/>:null}
            </div>
        );
    }
}
export default connect(
    state => ({user:state.user,unreadCount:state.chat.unreadCount}),
    {getUser}
)(Main)

