
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTodoAction } from '../../Redux/Actions/ManageUsers.Action';

class ModalAddTodo extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            todo: {
                tencv: '',
                noidungCV: '',
            }
        })

    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            DetailAssignment: { ...this.state.DetailAssignment, [name]: value },

        }, () => {
            console.log(this.state.DetailAssignment)
        })
    }



    handleSubmit = (e) => {
        e.preventDefault();

        this.props.addMission(this.state.DetailAssignment)
    }
    render() {
        console.log("Model add todo!")

        return (
            <div className="modal fade" id="exampleModalAddTodo" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thông Tin Công Việc</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='form' onSubmit={this.handleSubmit}>



                                <div className="form-group">
                                    <label htmlFor="tuNgay">Tên công việc:</label>
                                    <input onChange={this.handleChange} type="text" className="form-control" id="tencv" name="tencv" value={this.state.todo.tencv} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="denNgay">Nội dung:</label>
                                    <textarea rows="4" cols="50" onChange={this.handleChange} type="text" className="form-control" id="noiDungCV" name="noiDungCV" value={this.state.todo.noiDungCV} />
                                </div>
                                <input type="submit" className='btn btn-success' value='Thêm' />
                            </form>
                        </div>
                    </div>
                </div>
             
            </div>
        );
    }
    componentDidMount() {


    }
    componentDidUpdate(prevProps, prevState) {

    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

        createTodo: (data) => {
            dispatch(createTodoAction(data));
        },

    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(ModalAddTodo);