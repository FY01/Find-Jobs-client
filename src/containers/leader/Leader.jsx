import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'

class Leader extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired
    }
    render() {
        return (
            <div>
                Leader
            </div>
        );
    }
}
export default connect(
    state => {user:state.user},
    {}
)(Leader)


