import React, { Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './Admintemplate.css'

let user = JSON.parse(localStorage.getItem('infoUser'))

const openNav = () => {
  //console.log("name")
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}



const AdminLayout = (props) => {

  return <Fragment>
    <div>
      <div id="mySidenav" className="sidenav">
        <p className="closebtn" onClick={() => closeNav()}>x</p>
        <NavLink to={'/quan-ly-tai-khoan'} >Quản Lý Tài Khoản</NavLink>
        <NavLink to={'/TabQuanLyNguoiDung'}  >Quản lý người dùng</NavLink>
      </div>
      <div id="main">
        <div className="container-fluid">
          <div className="row admin-top">
            <span style={{ fontSize: 30, cursor: 'pointer' }} onClick={() => openNav()}>☰ Menu</span>
            <div className='d-flex'>
              <span> Xin chào , {user ? user.taiKhoan : "None"}</span>

              <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
               
                <NavLink to={`/CapNhatNguoiDung/`} className="dropdown-item" >Cập nhật thông tin</NavLink>
                <NavLink to={'/'} onClick={() => localStorage.clear()} className="dropdown-item" >Đăng xuất</NavLink>
              </div>
            </div>
          </div>

          <div className="row admin-content">
            {props.children}
          </div>
        </div>

      </div>
    </div>

  </Fragment>
}


export const AdminTemplate = ({ Component, ...props }) => (
  <Route {...props} render={(propComponent) => (
    <AdminLayout>
      <Component {...propComponent} />
    </AdminLayout>
  )} />
)