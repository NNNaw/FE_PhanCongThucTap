import React, { Component } from 'react';
import { connect } from 'react-redux';
import { downloadFileAction, getAssignmenByIdAction, submitFileAction } from '../../Redux/Actions/ManageUsers.Action';
import {downloadFile} from '../../Components/Common/utilities'
import './Assignment.css'
var dateFormat = require('dateformat');

class Assignment extends Component {



    constructor(props) {
        super(props);
        this.state = {
            fileSelected: null,
            indexSelected: -1,
        }
    }
    handleChangeFile = (event) => {
        this.setState({
            fileSelected: event.target.files[0],

        }, () => {
            console.log(this.state.indexSelected)
        });
    }

    renderAssignment = (array) => {

        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td><p>{index}</p></td>

                    <td className='text-left'><p>{ele.tenCV}</p></td>

                    <td>
                        <p>{ele.noiDungCV !== "" ?
                            <button className='btn-downloadfile' onClick={() => downloadFile(ele.noiDungCV)}>
                                <i className="fa fa-download" /> Download File</button>
                            : <p>---</p>
                        }</p>
                    </td>
                    <td><p>{dateFormat(ele.tuNgay, 'dd/mm/yyyy')}</p></td>
                    <td>
                        <p>{dateFormat(ele.denNgay, 'dd/mm/yyyy')}</p>
                        {/* {ele.NdThucTap !== "" ?
                            <p>{dateFormat(ele.denNgay, 'dd/mm/yyyy')}</p> :
                            <p className='text-danger'>Chờ xử lý</p>
                        } */}

                    </td>
                    {/* <td>
                        {ele.NhanXetGV === null ?
                            <p className='text-danger'>Chờ xử lý</p> :
                            <p>{ele.NhanXetGV}</p>
                        }
                    </td>
                    <td>{ele.NhanXetNV === null ?
                        <p className='text-danger'>Chờ xử lý</p> :
                        <p>{ele.NhanXetNV}</p>

                    }</td>
                    <td>{ele.diemNX === null ?
                        <p className='text-danger'>Chờ xử lý</p> :
                        <p>{ele.diemNX}</p>

                    }</td> */}
                    <td>{ele.ngayNop === null ?
                        <p className='text-danger'>Chờ xử lý</p> :
                        <p>{dateFormat(ele.ngayNop, 'dd/mm/yyyy')}</p>

                    }</td>
                    <td>
                        {this.renderButton(ele.NdThucTap, ele.idCV, this.props.match.params.id, ele.denNgay)}
                    </td>
                    <td>
                        {this.renderTextStatus(ele.NdThucTap, ele.denNgay)}

                    </td>
                </tr>
            )

        })

    }

    renderTextStatus = (NdThucTap, denNgay) => {
        var today = new Date();
        var dateCompare = new Date(denNgay);
        if (NdThucTap !== "") {
            return (
                <p className='text-success'><i className="fa fa-check"></i> Hoàn thành</p>
            )
        } else {
            if (dateCompare > today) {
                return (<p className='text-warning'>Đang thực hiện</p>)
            } else {
                return (<p className='text-danger'>Hết hạn</p>)
            }
        }

    }

    shoot() {
        alert('Đã hết hạn nộp bài...')
    }

    renderButton = (filePath, idCV, idSV, denNgay) => {

        var today = new Date();
        var dateCompare = new Date(denNgay);// ngày nộp

        if (filePath === "") {// nếu ssinh viên chưa nộp bài
            if (this.state.fileSelected === null) {

                if (dateCompare > today) {
                    return (
                        <span className="btn-choosefile ">
                            <i className="fa fa-paperclip"></i> Choose File
                            <input onChange={this.handleChangeFile}
                                onClick={() => this.setState({ indexSelected: idCV })} type="file" id="file" name="file" />
                        </span>

                    )
                } else {
                    return (
                        <span className="btn-choosefile" style={{ backgroundColor: "f093e9" }}>
                            <i className="fa fa-paperclip"></i> Choose File
                            <input onClick={this.shoot} type="file" id="file" name="file" disabled />
                        </span>
                    )
                }
            } else {
                if (this.state.indexSelected === idCV) {
                    return (
                        <div>
                            <button className='btn-submitfile' onClick={() => this.props.submitFile(this.state.fileSelected, idCV, idSV)}>
                                <i className="fa fa-paper-plane"></i> Submit File</button>
                            <button className='btn-cancel-file' onClick={() => this.setState({ fileSelected: null })}>X</button>
                        </div>
                    )
                } else {
                    return (
                        <span className="btn-choosefile" style={{ backgroundColor: "f093e9" }}>
                            <i className="fa fa-paperclip"></i> Choose File
                            <input onChange={this.handleChangeFile} type="file" id="file" name="file" disabled />
                        </span>
                    )
                }

            }
        }
        else { // nếu ssinh viên đã nộp bài
            return (
                <button className='btn-downloadfile'
                    // anonymous arrow function
                    onClick={() => downloadFile(filePath)}>
                    <i className="fa fa-download" /> Download File</button>

            )
        }
    }



    render() {
        return (
            <div className='Assignment container'>
                <div className="Assignment-container">



                    <div className="assignment-list my-4 p-3" style={{ backgroundColor: "#f8f9fa" }}>
                        <h3>Danh Sách Công Việc</h3>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tiêu Đề CV</th>
                                    <th>Nội Dung CV</th>
                                    <th>Từ Ngày</th>
                                    <th>Đến Ngày</th>
                                    <th>Ngày Nộp</th>
                                    {/* <th>Nhận Xét GV</th>
                                    <th>Nhận Xét NV</th>
                                    <th>Điểm</th> */}
                                    <th>Bài Làm SV</th>
                                    <th>Tình Trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAssignment(this.props.assignments)}
                            </tbody>
                        </table>
                        <div className="row">
                            {/* {this.renderPageIndex()} */}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    componentDidMount() {
        this.props.getAssignmenById(this.props.match.params.id)
    }
}

function mapStateToProps(state) {
    return {
        assignments: state.ManageUserReducer.assignments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAssignmenById: (idSV) => {
            dispatch(getAssignmenByIdAction(idSV))
        },
        submitFile: (filePath, idCV, idSV) => {
            dispatch(submitFileAction(filePath, idCV, idSV))
        },
        downloadFile: () => {
            dispatch(downloadFileAction())
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(Assignment);