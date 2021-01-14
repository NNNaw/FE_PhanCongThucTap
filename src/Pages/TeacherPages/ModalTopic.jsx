import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTopicAction } from '../../Redux/Actions/Topic.Action';




class ModalTopic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            topic: {
                idGV: this.props.idGV,
                noiDungDT: '',
                tenDeTai: '',
                tinhTrangDT: 0,

            }


        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            topic: { ...this.state.topic, [name]: value }
        }, () => {
            console.log(this.state.topic)
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTopic(this.state.topic)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModalTopic" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thêm Đề Tài</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex">

                            <form className='form' onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="tenDeTai">Tên Đề Tài:</label>
                                    <input type="text" onChange={this.handleChange} className="form-control" id="tenDeTai" name="tenDeTai" value={this.state.topic.tenSV} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="noiDungDT">Nội Dung Đề Tài:</label>
                                    <textarea onChange={this.handleChange} type="text" className="form-control" id="noiDungDT" name="noiDungDT" value={this.state.topic.noiDungDT} rows="4" cols="50"></textarea>
                                </div>


                                <input type="submit" className='btn btn-success' value='Thêm' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.idGV, this.props.idGV)) {
            this.setState({
                topic: {
                    idGV: this.props.idGV
                }
            });
        }
    }
}



function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTopic: (data) => {
            dispatch(addTopicAction(data))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(ModalTopic);