import React, { Component } from 'react';
import { connect } from 'react-redux';


class InfoTeacher extends Component {
    render() {
        return (
            <div className='InfoTeacher container'>
                ID - Giảng Viên : {this.props.match.params.id}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(InfoTeacher);