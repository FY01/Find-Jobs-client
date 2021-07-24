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

import LeaderInfo from "../lederInfo/LeaderInfo";
import AssassinInfo from "../assassinInfo/AssassinInfo";
import Assassin from "../assassin/Assassin";
import Leader from "../leader/Leader";
import getRedirectTo from "../../utils/getRedirectTo";
import {getUser} from "../../redux/actionCreator";

class Main extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired,
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
        let path = this.props.location.pathname
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
            if (path === '/'){
                path = getRedirectTo(type,header)
                console.log(path)
                return <Redirect to = {path}/>
            }
        }

        return (
            <div>
                <Switch>
                    <Route path = '/assassinInfo' component = {AssassinInfo}/>
                    <Route path = '/leaderInfo' component = {LeaderInfo}/>
                </Switch>
            </div>
        );
    }
}
export default connect(
    state => ({user:state.user}),
    {getUser}
)(Main)

