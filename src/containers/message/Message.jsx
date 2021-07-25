/**
 * @Description: Message component
 * @author:
 * @date 2021/7/24
*/
import React, {Component} from 'react';
import {connect} from "react-redux";
// import PropTypes from 'prop-types'

class Message extends Component {
    // static propTypes = {
    //     user:PropTypes.object.isRequired
    // }
    render() {
        return (
            <div>
                Message
            </div>
        );
    }
}
export default connect(
)(Message)


