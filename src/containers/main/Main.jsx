/**
 * @Description: main component
 * @author:
 * @date 2021/7/21
*/
import React, {Component} from 'react';
import {Switch,Route} from "react-router-dom";

import LeaderInfo from "../lederInfo/LeaderInfo";
import AssassinInfo from "../assassinInfo/AssassinInfo";

export default class Main extends Component {
    render() {
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

