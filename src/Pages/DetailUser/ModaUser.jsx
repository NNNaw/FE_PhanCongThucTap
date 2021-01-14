import { isEqual } from 'lodash';
import React, { Component } from 'react'
import { settings } from '../../Commons/Settings'


var dateFormat = require('dateformat');
export default class ModaUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                gioiTinh: this.props.userDetail.gioiTinh,
                sdt: this.props.userDetail.sdt,
                email: this.props.userDetail.email,
                queQuan: this.props.userDetail.queQuan,
                namSinh: this.props.userDetail.namSinh,

                hoTen: "",
                idSV: 3,
                hinhAnh: "uploads/avatarDefault.png",
                tinhTrang: false,
                taiKhoan: "sinhvien123",
                idLop: 1,
                idKhoa: 1,
                tenLop: "HTTT14",
                tenKhoa: "Công Nghệ Thông Tin",
                tenKhoaHoc: "Ðại học khóa 13",
                tuNamHoc: "2013-02-03T00:00:00.000Z",
                denNamHoc: "2017-12-21T00:00:00.000Z"


            }

        }

    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            userInfo: { ...this.state.userInfo, [name]: value },

        }, () => {
            console.log(this.state.userInfo)
        })
    }

    renderGender = (gender) => {
        return (


            <div className="form-check form-check-inline d-flex justify-content-between">
                <label htmlFor="">Giới Tính:</label>
                <label className="form-check-label active">
                    <input className="form-check-input" type="radio" name="gender"
                        value="true"
                        checked={gender === true}
                        onChange={this.handleChange}
                    />Nam
                    </label>
                <label className="form-check-label">
                    <input className="form-check-input" type="radio" name="gender"
                        value="false"
                        checked={gender === false}
                        onChange={this.handleChange}
                    />Nữ
                    </label>

            </div>


        )
    }
    handleSubmitModal = (event) => {
        event.preventDefault();//chặn submit của browser

    }

    render() {
        console.log(this.state.userInfo)
        return (
            <div>
                <div className="modal fade" id="exampleModalUser" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thông Tin Cá Nhân</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body d-flex">

                                <div className="modal-body-left w-50">
                                    <img src={settings.domain + '/' + this.props.userDetail.hinhAnh} alt="Error" />
                                </div>
                                <div className="modal-body-right w-50">

                                    {/* <p className='d-flex justify-content-between'>
                                        <span className='font-weight-bold'>Họ tên</span> : <span>{this.props.userDetail.tenSV}</span></p> */}

                                    <form onSubmit={this.handleSubmitModal}>
                                        <div className='DetailUser-item d-flex justify-content-between'>
                                            <label htmlFor="email">Email:</label>
                                            <input type="text" id="email" name="email" value={this.state.userInfo.email} onChange={this.handleChange} />
                                        </div>
                                        <div className='DetailUser-item d-flex justify-content-between'>
                                            <label htmlFor="lphone">Số Điện Thoại:</label>
                                            <input type="text" id="lphone" name="sdt" value={this.state.userInfo.sdt} onChange={this.handleChange} />
                                        </div>

                                        <div className='DetailUser-item d-flex justify-content-between'>
                                            <label htmlFor="laddress">Quê Quán:</label>
                                            <input type="text" id="laddress" name="queQuan" value={this.state.userInfo.queQuan} onChange={this.handleChange} />
                                        </div>
                                        <div className='DetailUser-item d-flex justify-content-between'>
                                            <label htmlFor="lyear">Năm Sinh:</label>
                                            <input type="text" id="lyear" name="namSinh"
                                                value={dateFormat(this.state.userInfo.namSinh, 'dd/mm/yyyy')}
                                                onChange={this.handleChange} />
                                        </div>

                                        <div className='DetailUser-item'>
                                            {this.renderGender(this.state.userInfo.gioiTinh)}
                                        </div>

                                        <input type="submit" defaultValue="Lưu" />
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.userDetail, this.props.userDetail)) {
            this.setState({
                userInfo: this.props.userDetail
            });
        }
    }
}
