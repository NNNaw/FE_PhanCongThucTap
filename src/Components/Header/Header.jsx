
import logo from './../../Assets/Images/hutech-logo.png'

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { LoginUserAction, LogOutAction, onLoadUserAction, getNotifyByAccountAction, markReadNotifyByAccountAction } from '../../Redux/Actions/ManageUsers.Action';
import { NavLink } from 'react-router-dom';

import history from "./../Common/history";
//import { isEqual } from 'lodash';

var dateFormat = require('dateformat')


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {
                username: '',
                password: ''
            },
            text_error: "",
            isMark: false,
        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            account: { ...this.state.account, [name]: value }
        }, () => {
            console.log(this.state.account)
        })
    }

    setText = (text, isTrue) => {

        console.log(text)
        if (isTrue) { // đúng
            this.props.getNotifyByAccount(this.state.account.username);
            history.push(text);
        }
        else { // sai thông tin đăng nhập
            this.setState({ text_error: text });
        }
    }

    component_login() {
        return (
            <div className="header-login row">
                <div className="forget-password col-2">
                    <a href="/">Quên mật khẩu?</a>
                </div>
                <div className="user-name col-4">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input id='username' type="text"
                        name='username' value={this.state.account.username} onChange={this.handleChange}
                    />
                </div>
                <div className="pass-word col-4">
                    <label htmlFor="password">Mật khẩu</label>
                    <input id='password' type="password"
                        name='password' value={this.state.account.password} onChange={this.handleChange}
                    />
                </div>
                <div className="button-login col-2">
                    <button className='btn-login' onClick={() => this.props.LoginUser(this.state.account, this.setText)}>Đăng nhập</button>
                </div>
                <div className="div-alert w-100 h-10">
                    <p className='text-center text-danger'>{this.state.text_error}</p>
                </div>
            </div>
        )
    }

    renderNavStudent = () => {
        return (
            <Fragment>

                <li className='nav-item'>
                    <NavLink className='nav-link' to={`/dang-ky-de-tai/${this.props.User.idSV}`}>Đăng ký đề tài</NavLink>
                </li>
                <li className='nav-item' >
                    <NavLink className='nav-link' to={`/xem-lich-phan-cong/${this.props.User.idSV}`}
                    >Xem lịch phân công</NavLink>
                </li>
                <li className='nav-item' >
                    <NavLink className='nav-link' to={`/xem-nhan-xet/${this.props.User.idSV}`}>
                        Xem nhận xét
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' to={`/thong-tin-ca-nhan/${this.props.User.idSV}`}>
                        Thông tin cá nhân
                    </NavLink>
                </li>
            </Fragment>
        )
    }

    renderNavTeacher = () => {
        return (
            <Fragment>
                <li className='nav-item'>
                    <NavLink className='nav-link' to={`/quan-ly-de-tai/${this.props.User.idGV}`}
                    >Quản Lý Đề Tài</NavLink>
                </li>
                <li className='nav-item' >
                    <NavLink className='nav-link' to={`/quan-ly-phan-cong/${this.props.User.idGV}`}
                    >Quản Lý phân công</NavLink>
                </li>

                <li className='nav-item' >
                    <NavLink className='nav-link' to={`/quan-ly-cong-viec/${this.props.User.idGV}`}
                    >Quản Lý Công Việc</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' to={`/thong-tin-ca-nhan/${this.props.User.idGV}`}>
                        Thông tin cá nhân
                    </NavLink>
                </li>
                <li className='nav-item'>

                    <NavLink className='nav-link' to={`/quan-ly-thong-ke/${this.props.User.idGV}`}>
                        Quản Lý Thống kê
                    </NavLink>
                </li>
            </Fragment>
        )
    }

    renderNavAdmin = () => {

        return (
            <Fragment>
                <li className='nav-item'>
                    <NavLink className='nav-link' to={`/quan-ly-tai-khoan`}
                    >Quản Lý Tài Khoản</NavLink>
                </li>
                <li className='nav-item' >
                    <NavLink className='nav-link' to={`/quan-ly-tin-tuc`}
                    >Quản Lý Tin Tức</NavLink>
                </li>
                {/* <li className='nav-item' >
                    <NavLink className='nav-link' to={`/quan-ly-cong-viec/${this.props.User.idGV}`}
                    >Quản Lý Công Việc</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' to={`/thong-tin-giang-vien/${this.props.User.idGV}`}>
                        Thông tin cá nhân
                    </NavLink>
                </li> */}
            </Fragment>
        )
    }

    renderNav = () => {
        switch (this.props.User.tenLoaiTaiKhoan) {
            case "Sinh Viên":
                console.log("object")
                return this.renderNavStudent();

            case "Giảng Viên":
                return this.renderNavTeacher();
            case "Admin":
                return this.renderNavAdmin();
            default:
                break;
        }
    }
    renderHello = () => {
        return (
            <div className='div-hello'>
                <p className=''>
                    Xin chào , {this.props.User.tenSV !== undefined ?
                        <span>    {this.props.User.tenSV}({this.props.User.idSV})</span>
                        : <span>{this.props.User.tenGV}</span>}
                </p>

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <NavLink to="/" type='button' className='btn-login dropdown-item'
                            onClick={() => this.props.LogOut()}>Đăng xuất</NavLink>

                        <NavLink to="/" className="dropdown-item">Thay đổ mật khẩu</NavLink>
                        {/* <a className="dropdown-item" href="#">Something else here</a> */}
                    </div>
                </div>
            </div>


        )
    }
    showFullNotifyction(content, index) {
        // var x = document.getElementById('extra_' + index);

        // x.innerHTML = content;

    }
    renderNotify = (array) => {

        if (array.length === 0) {
            return (
                <p className='text-info text-center'>Bạn không có thông báo.</p>
            )
        }
        return array.map((ele, index) => {
            return (
                // dropdown-item
                <div key={index} className='item-notify checkbox'>
                    <input type="checkbox" className='checkbox_Notify' value={ele.idTB} />
                    <div className="item-notify-image">
                        <img src={'http://localhost:9999/uploads/avatarDefault.png'} alt="error" />
                    </div>
                    <div className="item-notify-text">
                        {ele.noiDungTB &&
                            <div>
                                <p className='item-content-notify'>
                                    {ele.noiDungTB.length > 70 ?
                                        <span> {ele.noiDungTB.substring(0, 70)}
                                            <span className='text-primary'> [xem thêm]</span>

                                        </span> :
                                        ele.noiDungTB}
                                </p>

                                <p className='item-date-notify'>{

                                    dateFormat(ele.ngayTaoTB.replace("Z", ""), "HH:MM") + " , " +
                                    dateFormat(ele.ngayTaoTB.replace("Z", ""), "dd/mm/yy")
                                }

                                </p>
                            </div>
                        }

                    </div>


                </div>
            )
        })
    }

    showCheckboxNotify(isMark) {
        var list_checkBox = document.getElementsByClassName('checkbox_Notify');
        console.log(list_checkBox);
        for (let i = 0; i < list_checkBox.length; i++) {
            list_checkBox[i].style.opacity = "1";
        }
    }
    render() {
        return (
            <div className='header'>

                <div className="header-container container">
                    <div className="header-logo">
                        <img src={logo} alt="Error" />
                    </div>
                    <div className="header-color-banner">
                        {/* <button onClick={() => this.props.onLoadUser()}>Test</button> */}
                    </div>

                    <div className="header-nav " >

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul id='list-nav-header' className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item" id='nav-item-home'>
                                            <NavLink to={"/trang-chu"} className="nav-link">Trang Chủ</NavLink>
                                        </li>
                                        {this.props.User !== null &&
                                            this.renderNav()
                                        }

                                    </ul>

                                </div>

                                {this.props.User !== null &&
                                    <div className="dropdown div-notification">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <p className='lbl_notifyBtn'>{this.props.notifyByAccount.length}</p>
                                            <i className="fa fa-bell"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <div className="top-notify">
                                                <p className='text-info' onClick={() => this.props.markReadNotifyByAccount(JSON.parse(localStorage.getItem('infoUser')).taiKhoan)}>Đọc Tất Cả</p>
                                                {/* {!this.state.isMark ?
                                                    <p className='text-info' onClick={() => this.showCheckboxNotify(false)}>Đánh dấu</p> :
                                                    <p className='text-warning' onClick={() => this.showCheckboxNotify(true)}>Hủy bỏ</p>
                                                } */}
                                            </div>
                                            {this.renderNotify(this.props.notifyByAccount)}
                                        </div>
                                    </div>
                                }
                            </div>
                        </nav>

                    </div>

                    <div className="header-color-banner-reverse">
                        {/* <button onClick={() => this.props.onLoadUser()}>Test</button> */}
                    </div>
                    {this.props.User == null ?
                        this.component_login() :
                        this.renderHello()

                    }

                </div>


            </div>
        )
    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem('infoUser'))) {
            this.props.getNotifyByAccount(JSON.parse(localStorage.getItem('infoUser')).taiKhoan)
        }
        var list_checkBox = document.getElementsByClassName('checkbox_Notify');
        console.log(list_checkBox);
        for (let i = 0; i < list_checkBox.length; i++) {
            list_checkBox[i].style.opacity = "0";
        }
    }
    componentDidUpdate(prevState, prevProps) {

    }
}
const mapStateToProps = state => {
    return {
        User: state.ManageUserReducer.User,
        notifyByAccount: state.ManageUserReducer.notifyByAccount,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        LoginUser: (account, setText) => {
            dispatch(LoginUserAction(account, setText))
        },
        LogOut: () => {
            dispatch(LogOutAction())
        },
        onLoadUser: () => {
            dispatch(onLoadUserAction())
        },
        getNotifyByAccount: (username) => {
            dispatch(getNotifyByAccountAction(username))
        },

        markReadNotifyByAccount: (username) => {
            dispatch(markReadNotifyByAccountAction(username))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

