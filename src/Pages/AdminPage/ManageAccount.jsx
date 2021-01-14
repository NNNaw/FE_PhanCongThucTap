import React, { Component } from 'react';
import { connect } from 'react-redux';

import {registerByFileAction} from './../../Redux/Actions/ManageUsers.Action'

class ManageAccount extends Component {



    constructor(props) {
        super(props);
        this.state = {
            fileSelected: null,
        }
    }
    handleChangeFile = (event) => {
        this.setState({
            fileSelected: event.target.files[0],
        }, () => {
            console.log(this.state.fileSelected)
        });
    }

    renderButton = () => {



        if (this.state.fileSelected === null) {
            return (
                <span className="btn-choosefile ">
                    <i className="fa fa-paperclip"></i> Thêm Tài Khoản bằng excel
                    <input onChange={this.handleChangeFile} type="file" id="file" name="file" />
                </span>
            )

        } else {
            return (
                <div>
                    <button className='btn-submitfile' onClick={() => this.props.registerByFile(this.state.fileSelected)}>
                        <i className="fa fa-paper-plane"></i> Submit File</button>
                    <button className='btn-cancel-file' onClick={() => this.setState({ fileSelected: null })}>X</button>
                </div>
            )
        }


    }

    render() {
        return (
            <div>
                {this.renderButton()}
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
        registerByFile : (data)=>{
            dispatch(registerByFileAction(data))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(ManageAccount);