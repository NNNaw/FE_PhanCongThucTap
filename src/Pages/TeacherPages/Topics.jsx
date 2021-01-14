import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { changeStatusTopicAction, comfirmRegisterTopicAction, getAllTopicByIdTeacherAction, getStudentWatingComfirmByTeacherAction } from '../../Redux/Actions/Topic.Action';
import ModalTopic from './ModalTopic';

var dateFormat = require('dateformat')

class Topics extends Component {


    renderListTopic(array) {
        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>MDT{ele.idDeTai}</td>
                    <td>{ele.tenDeTai}</td>
                    <td>{ele.noiDungDT}</td>
                    <td>{ele.tinhTrangDT === false ?
                        <p className='text-danger'>Đã đóng</p> :
                        <p className='text-success'>Đang mở</p>
                    }
                    </td>
                    <td className=''>{ele.tinhTrangDT === false ?
                        <button style={{ width: "70px" }} className='btn btn-success' onClick={() => this.alertChangeStatus(ele.idDeTai, true)}>Mở</button> :
                        <button style={{ width: "70px" }} className='btn btn-warning ' onClick={() => this.alertChangeStatus(ele.idDeTai, false)}>Đóng</button>
                    }
                        <NavLink className='btn btn-primary ml-3' to={`/chi-tiet-de-tai/${ele.idDeTai}`}>Xem</NavLink>

                    </td>
                </tr >
            )
        })
    }

    alertChangeStatus(idDeTai, status) {
        swal({
            title: "Thông báo!!!?",
            text: `Bạn chắc muốn ${!status ? "đóng" : "mở"} đề tài này chứ hả ???`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.changeStatusTopic(idDeTai, this.props.match.params.id, status)
                    // swal("Poof! Sản phẩm đã được xóa !", {
                    //     icon: "success",
                    // });
                    // const action = {
                    //     type: actionTypes.DELETE_PRODUCT_CART,
                    //     id: id
                    // };
                    // dispatch(action);
                } else {
                    swal("Đề tài của bạn không thay đổi!");
                }
            });
    }
    renderListStudentWaitConfirm(array) {

        if (array.length < 1) {
            return (
                <tr >
                    <td></td>
                    <td></td>
                    <td>Không có sinh viên nào đang chờ duyệt đề tài.</td>
                    <td></td>
                    <td></td>

                    <td></td>
                    <td>
                    </td>
                </tr >
            )
        }

        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>MDT{ele.idDeTai}</td>
                    <td>{ele.tenDeTai}</td>
                    <td>{ele.idSV}</td>
                    <td>{ele.tenSV}</td>

                    <td>{dateFormat(ele.ngayDangKy, 'dd/mm/yyyy')}</td>
                    <td>
                        <div>
                            <button className='btn btn-primary mr-3' onClick={() => this.props.comfirmRegisterTopic(ele.idDeTai, ele.idSV, this.props.match.params.id)}>Duyệt</button>
                            <button className='btn btn-danger'>Từ Chối</button>
                        </div>
                    </td>
                </tr >
            )
        })
    }


    render() {
        return (
            <div className='Topics container'>
                <div className="List-Topic-Teacher my-4 p-3" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="header-list-topic-teacher d-flex justify-content-between my-3">

                        <h3>Danh Sách Đề Tài Của Bạn</h3>
                        <button type="button" className="btn btn-primary mr-3" data-toggle="modal" data-target="#exampleModalTopic"  >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            Thêm Đề Tài
                  </button>
                    </div>
                    <table className="table table-striped" style={{ width: '100%' }}>



                        {/* <table style={{ width: '100%' }}>

                            <tbody>
                                <tr>
                                    <td style={{ backgroundColor: '#777' }}>15%</td>
                                    <td style={{ backgroundColor: '#aaa' }}>70%</td>
                                    <td style={{ backgroundColor: '#777' }}>15%</td>
                                </tr>
                            </tbody>
                        </table> */}


                        <colgroup>
                            <col span={1} style={{ width: '3%' }} />
                            <col span={1} style={{ width: '10%' }} />
                            <col span={1} style={{ width: '25%' }} />
                            <col span={1} style={{ width: '35%' }} />

                            <col span={1} style={{ width: '10%' }} />
                            <col span={1} style={{ width: '17%' }} />

                        </colgroup>

                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Đề Tài</th>
                                <th>Tiêu Đề</th>
                                <th>Nội Dung Đề Tài</th>
                                <th>Tình Trạng</th>

                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListTopic(this.props.TopicByTeacher)}
                        </tbody>
                    </table>
                </div>
                <ModalTopic idGV={this.props.match.params.id} />



                <div className="List-Student-waiting-confirm p-3" style={{ backgroundColor: "#f8f9fa" }}>

                    <h3 className='my-3'>Danh Sách Sinh Viên Đang Chờ Duyệt Đăng Ký Đề Tài</h3>
                    <table className="table table-striped"style={{width : '100%'}} >
                        <colgroup>
                            <col span={1} style={{ width: '4%' }} />
                            <col span={1} style={{ width: '10%' }} />
                            <col span={1} style={{ width: '25%' }} />
                            <col span={1} style={{ width: '13%' }} />
                            <col span={1} style={{ width: '13%' }} />
                            <col span={1} style={{ width: '15%' }} />
                            <col span={1} style={{ width: '20%' }} />

                        </colgroup>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Đề Tài</th>
                                <th>Tiêu Đề</th>
                                <th>Mã Sinh Viên</th>
                                <th>Tên Sinh Viên</th>
                                <th>Ngày Đăng Ký</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListStudentWaitConfirm(this.props.studentWaitingConfirm)}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

    componentDidMount() {
        this.props.getAllTopicByIdTeacher(this.props.match.params.id);
        this.props.getStudentWatingComfirmByTeacher(this.props.match.params.id);
    }
}
function mapStateToProps(state) {
    return {
        TopicByTeacher: state.ManageTopicReducer.TopicByTeacher,
        studentWaitingConfirm: state.ManageTopicReducer.studentWaitingConfirm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllTopicByIdTeacher: (id) => {
            dispatch(getAllTopicByIdTeacherAction(id))
        },
        changeStatusTopic: (idDetai, idGV, status) => {
            dispatch(changeStatusTopicAction(idDetai, idGV, status))
        },
        comfirmRegisterTopic: (idDeTai, idSV, idGV) => {
            dispatch(comfirmRegisterTopicAction(idDeTai, idSV, idGV))
        },
        getStudentWatingComfirmByTeacher: (idGV) => {
            dispatch(getStudentWatingComfirmByTeacherAction(idGV))
        },
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(Topics);