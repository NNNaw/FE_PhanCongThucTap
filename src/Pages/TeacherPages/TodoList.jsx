import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListTodoListByTeachAction } from '../../Redux/Actions/Topic.Action';
import ModalAddTodo from './ModalAddTodo';


class TodoList extends Component {


    renderListTodoList(array) {
        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>MCV{ele.idCV}</td>
                    <td>{ele.tenCV}</td>
                    <td>
                        {ele.noiDungCV !== "" ?
                            <button className='btn-downloadfile'><i className="fa fa-download" />  Download File</button> :
                            <p>---</p>
                        }
                    </td>

                    <td>
                        <div>
                            <button className='btn btn-warning mr-3'>Sửa</button>
                            <button className='btn btn-danger'>Xóa</button>

                        </div>
                    </td>
                </tr >
            )
        })
    }
    render() {
        return (
            <div className='TodoList container'>


                <div className="List-TodoList p-3" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="header-list-todolist d-flex justify-content-between my-3">
                        <h3>Danh Sách Công Việc</h3>
                        <button className='btn btn-primary mr-3'
                            type="button" data-toggle="modal" data-target="#exampleModalAddTodo">
                            <i className="fa fa-plus"></i> Thêm Công Việc
                        </button>

                    </div>

                    <table className="table table-striped text-center" style={{ width: '100%' }} >
                        <col span={1} style={{ width: '10%' }} />
                        <col span={1} style={{ width: '15%' }} />
                        <col span={1} style={{ width: '30%' }} />
                        <col span={1} style={{ width: '20%' }} />
                        <col span={1} style={{ width: '25%' }} />

                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Công Việc</th>
                                <th>Tiêu Đề</th>
                                <th>File Công Việc</th>
                                <th>Thao Tác</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListTodoList(this.props.ListTodoListByTeach)}
                        </tbody>
                    </table>
                </div>
                <ModalAddTodo />
               
            </div>
        );
    }
    componentDidMount() {
        this.props.getListTodoListByTeach(this.props.match.params.id)
    }
}
function mapStateToProps(state) {
    return {
        ListTodoListByTeach: state.ManageTopicReducer.ListTodoListByTeach
    };
}

function mapDispatchToProps(dispatch) {
    return {

        getListTodoListByTeach: (idGV) => {
            dispatch(getListTodoListByTeachAction(idGV))
        }
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(TodoList);