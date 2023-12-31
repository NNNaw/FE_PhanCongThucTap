import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMarkAction, getAssignmenByIdAction } from '../../Redux/Actions/ManageUsers.Action';
import { getDetailStudentWaitingAddMissionAction } from '../../Redux/Actions/Topic.Action';
import './../Assignment/Assignment.css'
import ModalAddMission from './ModalAddMission';
import {downloadFile} from '../../Components/Common/utilities'

var dateFormat = require('dateformat')



class AddMision extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mark: {
                idSV: this.props.match.params.id,
                idCV: '',
                diemNX: 0,
                NhanXetGV: ''
            },

        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            mark: { ...this.state.mark, [name]: value }
        }, () => {
            console.log(this.state.mark)
        })
    }

    renderAssignment = (array) => {
        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td><p>{index}</p></td>

                    <td><p>{ele.tenCV}</p></td>

                    <td><p>{dateFormat(ele.tuNgay, 'dd/mm/yyyy')}</p></td>
                    <td>
                        <p>{dateFormat(ele.denNgay, 'dd/mm/yyyy')}</p>
                        {/* {ele.NdThucTap !== "" ?
                            <p>{dateFormat(ele.denNgay, 'dd/mm/yyyy')}</p> :
                            <p className='text-danger'>Chờ xử lý</p>
                        } */}

                    </td>
                    <td>
                        {ele.NhanXetGV === null ?
                             <p>{ele.NhanXetNV}</p> :
                            <p>{ele.NhanXetGV}</p>
                        }
                    </td>
                    {/* <td>{ele.NhanXetNV === null ?
                        <p className='text-danger'>Chờ xử lý</p> :
                        <p>{ele.NhanXetNV}</p>

                    }</td> */}
                    <td>{ele.diemNX === null ?
                        <p className='text-danger'>---</p> :
                        <p>{ele.diemNX}</p>

                    }</td>
                    <td>
                        {ele.NdThucTap !== "" ?
                            <button className='btn-downloadfile' onClick={() => downloadFile(ele.NdThucTap)}><i className="fa fa-download" />  Download File</button> :
                            <p className='text-danger'>---</p>
                        }
                    </td>
                    <td>
                        {this.renderColumStatus(ele.idCV, ele.NdThucTap, ele.diemNX, ele.NhanXetGV)}

                    </td>

                </tr>
            )

        })

    }
    renderColumStatus = (idCV, noiDungCV, diemNX, NhanXetGV) => {
        if (diemNX === null || NhanXetGV === null) {
            if (noiDungCV !== "")
                return (<p className='text-cham-diem'
                    type="button" data-toggle="modal" data-target="#exampleModalThemDiem" onClick={() => this.setState({ mark: { ...this.state.mark, idCV: idCV } })}>Chấm Điểm</p>)

            else
                return (<p className='text-warning'>Đang Thực Hiện</p>)
        } else {
            return (<p className='text-success'>Hoàn Thành</p>)
        }

    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addMarkByTeacher(this.state.mark)

    }
    render() {

        return (
            <div className='AddMision container'>

                <div className="info-ddetail-student-waiting-mission text-center my-5" style={{ backgroundColor: "#f8f9fa" }}>
                    <h3>Thông Tin Chung</h3>


                    <div className="detail-text-student-add-mission">
                        <p><span>Mã Đề Tài : </span>{this.props.detailStudentWaitingAddmission.idDeTai}</p>

                        <p><span>Tiều Đề : </span>{this.props.detailStudentWaitingAddmission.tenDeTai}</p>

                        <p><span>Mã Sinh Viên : </span>{this.props.detailStudentWaitingAddmission.idSV}</p>
                        <p><span>Tên Sinh Viên : </span>{this.props.detailStudentWaitingAddmission.tenSV}</p>
                        <p><span>Email : </span>{this.props.detailStudentWaitingAddmission.email}</p>
                        <p><span>Số Điện Thoại : </span>{this.props.detailStudentWaitingAddmission.sdt}</p>

                        <p><span>Tình Trạng : </span>{this.props.detailStudentWaitingAddmission.tinhTrang ?
                            <span className='text-success'>Đã Hoàn Thành</span>
                            : <span className='text-danger'>Đang Thực Tập</span>
                        }</p>
                    </div>

                </div>

                <div className="list-student-added-mission" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="list-student-header">

                        <h3>Danh Sách Phiếu Phân Công Của Sinh Viên</h3>
                        <button className='btn btn-success btn-addmission'
                            type="button" data-toggle="modal" data-target="#exampleModalAddMission">
                            <i className="fa fa-plus"></i> Thêm Phân Công</button>

                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Công Việc</th>
                                <th>Từ Ngày</th>
                                <th>Đến Ngày</th>
                                <th>Nhận Xét</th>
                               
                                <th>Điểm</th>
                                <th>Bài Làm SV</th>
                                <th>Tình Trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderAssignment(this.props.assignments)}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}

                <ModalAddMission detailStudentWaitingAddmission={this.props.detailStudentWaitingAddmission}></ModalAddMission>

                <div className="modal fade" id="exampleModalThemDiem" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm Nhận Xét Và Chấm Điểm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="diemNX">Điểm Số:</label>
                                        <input min="0" max="10" onChange={this.handleChange} type="number" className="form-control" id="diemNX" name='diemNX' value={this.state.mark.diemNX} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="NhanXetGV">Nhận Xét:</label>
                                        <textarea onChange={this.handleChange}
                                            type="text" rows="5" cols="50" className="form-control" id="NhanXetGV" name='NhanXetGV' value={this.state.mark.NhanXetGV} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                
            </div >

        );
    }
    componentDidMount() {
        console.log("addmission componentDidMount")
        setTimeout(() => {
            this.props.getDetailStudentWaitingAddMission(this.props.match.params.id)
        }, 11);
       setTimeout(() => {
            this.props.getAssignmenById(this.props.match.params.id)
       }, 111);
    }
}
function mapStateToProps(state) {
    return {
        detailStudentWaitingAddmission: state.ManageTopicReducer.detailStudentWaitingAddmission,
        assignments: state.ManageUserReducer.assignments

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailStudentWaitingAddMission: (id) => {
            dispatch(getDetailStudentWaitingAddMissionAction(id))
        },
        getAssignmenById: (idSV) => {
            dispatch(getAssignmenByIdAction(idSV))
        },
        addMarkByTeacher: (data) => {
            dispatch(addMarkAction(data))
        },

    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(AddMision);
