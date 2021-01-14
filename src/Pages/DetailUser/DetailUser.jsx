
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settings } from '../../Commons/Settings';
import { getStudenByIdAction } from '../../Redux/Actions/ManageUsers.Action';
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



    render() {
        return (
            <div className='DetailUser container'>
                <div className="DetailUser-container row">
                    <div className="col-5 DetailUser-container-left">
                        <img src={settings.domain + '/' + this.props.userDetail.hinhAnh} alt="Error" />
                    </div>
                    <div className="col-7 DetailUser-container-right">
                        <h3>Thông Tin Cá Nhân</h3>
                        <div className="infoUser-static">
                            <p><span className='label-user-text'>Khoa</span> : <span>{this.props.userDetail.tenKhoa}</span></p>
                            <p><span className='label-user-text'>Khóa Học</span>  : <span>{this.props.userDetail.tenKhoaHoc} -
                                   ( {dateFormat(this.props.userDetail.tuNamHoc, 'yyyy')}-{dateFormat(this.props.userDetail.denNamHoc, 'yyyy')} )</span>
                            </p>
                            <p><span className='label-user-text'>Lớp</span> : <span>{this.props.userDetail.tenLop}</span></p>

                            <p><span className='label-user-text'>Mã Số</span> : <span>{this.props.userDetail.idSV}</span></p>

                            <p><span className='label-user-text'>Họ Tên</span> : <span>{this.props.userDetail.tenSV}</span></p>
                            <p><span className='label-user-text'>Tài Khoản</span> : <span>{this.props.userDetail.taiKhoan}</span></p>

                        </div>

                        <div className="infoUser-dynamic">
                            <p><span className='label-user-text'>Email</span> : <span>{this.props.userDetail.email}</span></p>
                            <p><span className='label-user-text'>Số Điện Thoại</span> : <span>{this.props.userDetail.sdt}</span></p>
                            <p><span className='label-user-text'>Năm Sinh</span> : <span>{dateFormat(this.props.userDetail.namSinh, 'dd/mm/yyyy')}</span></p>
                            <p><span className='label-user-text'>Quê Quán</span> : <span>{this.props.userDetail.queQuan}</span></p>
                            <p><span className='label-user-text'>Giới Tính</span>  : {this.props.userDetail.gioiTinh ? <span>Nam</span> : <span>Nữ</span>}</p>

                        </div>


                        <p><span className='label-user-text'>Tình Trạng</span> :  {this.props.userDetail.tinhTrang ?
                            <span className='text-success'>Đã hoàn thành thực tập.</span> :
                            <span className='text-danger'>Đang trong quá trình thực tập.</span>
                        }</p>
                        <button
                         type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalUser">
                            Cập Nhật
                        </button>
                    </div>


                </div>
                {this.props.userDetail !== null && <ModaUser userDetail={this.props.userDetail} />}
            </div>
        )
    }
    componentDidMount() {
        this.props.getStudenById(3);

    }
}

function mapStateToProps(state) {
    return {
        userDetail: state.ManageUserReducer.userDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStudenById: (idSV) => {
            dispatch(getStudenByIdAction(idSV))
        },
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(DetailUser);