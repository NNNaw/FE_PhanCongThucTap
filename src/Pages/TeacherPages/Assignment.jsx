import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllStudentWaitingAddMissionAction } from '../../Redux/Actions/Topic.Action';

var dateFormat = require('dateformat');

class Assignment extends Component {


    renderListStudentWaitAddMission = (array) => {
        if (array.length < 1) {
            return (
                <tr >
                    <td></td>
                    <td></td>
                    <td>Không có sinh viên nào tham gia vào đề tài của bạn.</td>
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
                <tr className='tag-tr' key={index}>
                    <td>{index}</td>
                    <td>MDT{ele.idDeTai}</td>
                    <td>{ele.tenDeTai}</td>
                    <td>MSV{ele.idSV}</td>
                    <td>{ele.tenSV} </td>

                    <td>{dateFormat(ele.ngayBatDau, 'dd/mm/yyyy')}</td>
                    <td>{ele.ngayKetThuc == null ?
                        <span className='text-danger'>Chờ xử lý</span> :
                        <span>{ele.ngayKetThuc}</span>
                    }</td>
                    <td>{ele.tinhTrang ?
                        <span className='text-success'>Đã H.T</span>
                        :
                        <span className='text-danger'>Đang T.T</span>

                    }</td>
                    <td>
                        <div>
                            <NavLink className='btn btn-primary mr-2' to={`/quan-ly-cong-viec/them-cong-viec/${ele.idSV}`} >Thêm PC</NavLink>
                            <NavLink className='btn btn-success' to={`/quan-ly-cong-viec/them-cong-viec/${ele.idSV}`} >Đánh Giá </NavLink>
                        </div>
                    </td>
                </tr >
            )
        })
    }

    render() {
        return (
            <div className='Assignment-Student container'>
                <div className="List-Student-waiting-add-mission py-3" style={{ backgroundColor: "#f8f9fa" }}>

                    <h3 className='my-3'>Danh Sách Sinh Viên Tham Gia Đề Tài Của Bạn</h3>
                    <table className="table table-striped" style={{ width: '100%' }} >
                        <colgroup>
                            <col span={1} style={{ width: '3%' }} />
                            <col span={1} style={{ width: '8%' }} />
                            <col span={1} style={{ width: '20%' }} />
                            <col span={1} style={{ width: '9%' }} />
                            <col span={1} style={{ width: '9%' }} />

                            <col span={1} style={{ width: '10%' }} />
                            <col span={1} style={{ width: '10%' }} />

                            <col span={1} style={{ width: '10%' }} />
                            <col span={1} style={{ width: '19%' }} />

                        </colgroup>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Đ.T</th>
                                <th>Tiêu Đề</th>
                                <th>Mã S.V</th>
                                <th>Tên S.V</th>

                                <th>Ngày B.Đ</th>
                                <th>Ngày K.T</th>

                                <th>Tình trạng</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody className='py-3'>
                            {this.renderListStudentWaitAddMission(this.props.studentWaitingAddmission)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.props.getAllStudentWaitingAddMission(this.props.match.params.id)
    }
}
function mapStateToProps(state) {
    return {
        studentWaitingAddmission: state.ManageTopicReducer.studentWaitingAddmission
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllStudentWaitingAddMission: (id) => {
            dispatch(getAllStudentWaitingAddMissionAction(id))
        },
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(Assignment);