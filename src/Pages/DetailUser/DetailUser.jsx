
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { settings } from '../../Commons/Settings';
import { getStudenByIdAction, getTeacherAction } from '../../Redux/Actions/ManageUsers.Action';
import ModaUser from './ModaUser';



var dateFormat = require('dateformat');
class DetailUser extends Component {

    constructor(props) {
        super(props);
        this.state = ({

            userInfo: {
                gioiTinh: false,
                sdt: "",
                email: "",
                queQuan: "",
                namSinh: ""
            },
            isLogin: {
                idSV: JSON.parse(localStorage.getItem("infoUser")).idSV ? JSON.parse(localStorage.getItem("infoUser")).idSV : false,
                idGV: JSON.parse(localStorage.getItem("infoUser")).idGV ? JSON.parse(localStorage.getItem("infoUser")).idGV : false,
            }

        })

    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            userInfo: { ...this.state.userInfo, [name]: value },

        }, () => {
            console.log(this.state.userInfo)
        })
    }


    renderStuden = (userDetail) => {
        return (
            <Fragment>
                <div className="infoUser-static">
                    <p><span className='label-user-text'>Khoa</span> : <span>{userDetail.tenKhoa}</span></p>
                    <p><span className='label-user-text'>Khóa Học</span>  : <span>{userDetail.tenKhoaHoc} -
                   ( {dateFormat(this.props.userDetail.tuNamHoc, 'yyyy')}-{dateFormat(userDetail.denNamHoc, 'yyyy')} )</span>
                    </p>
                    <p><span className='label-user-text'>Lớp</span> : <span>{userDetail.tenLop}</span></p>

                    <p><span className='label-user-text'>Mã Số</span> : <span>{userDetail.idSV}</span></p>

                    <p><span className='label-user-text'>Họ Tên</span> : <span>{userDetail.tenSV}</span></p>
                    <p><span className='label-user-text'>Tài Khoản</span> : <span>{userDetail.taiKhoan}</span></p>

                </div>

                <div className="infoUser-dynamic">
                    <p><span className='label-user-text'>Email</span> : <span>{userDetail.email}</span></p>
                    <p><span className='label-user-text'>Số Điện Thoại</span> : <span>{userDetail.sdt}</span></p>
                    <p><span className='label-user-text'>Năm Sinh</span> : <span>{dateFormat(userDetail.namSinh, 'dd/mm/yyyy')}</span></p>
                    <p><span className='label-user-text'>Quê Quán</span> : <span>{userDetail.queQuan}</span></p>
                    <p><span className='label-user-text'>Giới Tính</span>  : {userDetail.gioiTinh ? <span>Nam</span> : <span>Nữ</span>}</p>

                </div>


                <p><span className='label-user-text'>Tình Trạng</span> :  {userDetail.tinhTrang ?
                    <span className='text-success'>Đã hoàn thành thực tập.</span> :
                    <span className='text-danger'>Đang trong quá trình thực tập.</span>
                }</p>

                <button
                    type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalUser">
                    Cập Nhật
        </button>
            </Fragment>
        )
    }
    renderTeacher = (userDetail) => {
        return (
            <Fragment>
                <div className="infoUser-static">
                    {/* <p><span className='label-user-text'>Khoa</span> : <span>{userDetail.tenKhoa}</span></p>
                    <p><span className='label-user-text'>Khóa Học</span>  : <span>{userDetail.tenKhoaHoc} -
                   ( {dateFormat(this.props.userDetail.tuNamHoc, 'yyyy')}-{dateFormat(userDetail.denNamHoc, 'yyyy')} )</span>
                    </p>
                    <p><span className='label-user-text'>Lớp</span> : <span>{userDetail.tenLop}</span></p>

                    <p><span className='label-user-text'>Mã Số</span> : <span>{userDetail.idSV}</span></p> */}

                    <p><span className='label-user-text'>Họ Tên</span> : <span>{userDetail.tenGV}</span></p>
                    <p><span className='label-user-text'>Tài Khoản</span> : <span>{userDetail.taiKhoan}</span></p>

                </div>

                <div className="infoUser-dynamic">
                    <p><span className='label-user-text'>Email</span> : <span>{userDetail.email}</span></p>
                    <p><span className='label-user-text'>Số Điện Thoại</span> : <span>{userDetail.sdt}</span></p>
                    <p><span className='label-user-text'>Năm Sinh</span> : <span>{dateFormat(userDetail.namSinh, 'dd/mm/yyyy')}</span></p>
                    <p><span className='label-user-text'>Quê Quán</span> : <span>{userDetail.queQuan}</span></p>
                    <p><span className='label-user-text'>Giới Tính</span>  : {userDetail.gioiTinh ? <span>Nam</span> : <span>Nữ</span>}</p>

                </div>


                <button
                    type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalUser">
                    Cập Nhật
        </button>
            </Fragment>
        )
    }

    render() {
        return (
            <div className='DetailUser container'>
                <div className="DetailUser-container row">
                    <div className="col-5 DetailUser-container-left">
                        
                        {
                            this.state.isLogin.idSV !== false && <img src={settings.domain + '/' + this.props.userDetail.hinhAnh} alt="Error" />
                        }
                         {
                            this.state.isLogin.idGV !== false && <img src={settings.domain + '/' + this.props.teacher.hinhAnh} alt="Error" />
                        }
                    </div>
                    <div className="col-7 DetailUser-container-right">
                        <h3>Thông Tin Cá Nhân</h3>
                        {
                            this.state.isLogin.idSV !== false && this.renderStuden(this.props.userDetail)
                        }
                        {
                            this.state.isLogin.idGV !== false && this.renderTeacher(this.props.teacher)
                        }
                    </div>


                </div>
                {this.props.userDetail !== null && <ModaUser userDetail={this.props.userDetail} />}
            </div>
        )
    }
    componentDidMount() {
        let { idGV, idSV } = this.state.isLogin;

        if (idSV) {
            this.props.getStudenById(this.state.isLogin.idSV);
        }
        if (idGV) {
            this.props.getTeacher(this.state.isLogin.idGV);
        }

    }
}

function mapStateToProps(state) {
    return {
        userDetail: state.ManageUserReducer.userDetail,
        teacher :  state.ManageUserReducer.teacher,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStudenById: (idSV) => {
            dispatch(getStudenByIdAction(idSV))
        },
        getTeacher: (idGV) => {
            dispatch(getTeacherAction(idGV))
        },
        
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(DetailUser);