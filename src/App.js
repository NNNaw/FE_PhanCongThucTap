

import React, { Fragment } from 'react';
import {  Switch, Route } from 'react-router-dom'
import {Router} from "react-router";
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'


//scss
import './Assets/Scss/main.scss'

import ErrorPage from './Pages/ErrorPage/ErrorPage';
import PrivatePage from './Pages/ErrorPage/PrivatePage';
import Home from './Pages/Home/Home';
import { Basictemplate } from './Templates/Basic';

import { useDispatch } from 'react-redux';
import { actionTypes } from './Redux/Contants/MagageUsers.Constant';
import RegisterTopic from './Pages/RegisterTopic/RegisterTopic';
import Assignment from './Pages/Assignment/Assignment';


import Comment from './Pages/Comment/Comment'
import DetailUser from './Pages/DetailUser/DetailUser';
import Topics from './Pages/TeacherPages/Topics';
import DetailTopic from './Pages/TeacherPages/DetailTopic';
import TodoList from './Pages/TeacherPages/TodoList';

import AssignmentStudent from './Pages/TeacherPages/Assignment';
import AddMision from './Pages/TeacherPages/AddMision';
import InfoTeacher from './Pages/TeacherPages/InfoTeacher';
// import ManageAccount from './Pages/AdminPage/ManageAccount';

import { AdminTemplate } from './Templates/AdminTemplate/Admintemplate';
import Admin from './Pages/AdminPage/Admin';
import history from './Components/Common/history';
import pageAddTopic from './Pages/TeacherPages/pageAddTopic';
import Dashboard from './Pages/TeacherPages/Dashboard';


function App() {


  let userLogin = JSON.parse(localStorage.getItem("infoUser"));
  const dispatch = useDispatch()

  if (userLogin) {
    dispatch({
      type: actionTypes.USER_LOAD,
      User: userLogin
    })
  }

  return (

    <Fragment>
      <Router history={history}>
        <Switch>

          <Basictemplate exact path='/' Component={Home} />
          <Basictemplate exact path='/trang-chu' Component={Home} />
          <Basictemplate exact path='/dang-ky-de-tai/:id' Component={RegisterTopic} />
          <Basictemplate exact path='/xem-lich-phan-cong/:id' Component={Assignment} />
          <Basictemplate exact path='/xem-nhan-xet/:id' Component={Comment} />
          <Basictemplate exact path='/thong-tin-ca-nhan/:id' Component={DetailUser} />

          {/* --teaccher */}

          <Basictemplate exact path='/quan-ly-de-tai/:id' Component={Topics} />
          <Basictemplate exact path='/quan-ly-phan-cong/:id' Component={AssignmentStudent} />
          <Basictemplate exact path='/quan-ly-cong-viec/them-cong-viec/:id' Component={AddMision} />
          <Basictemplate exact path='/quan-ly-cong-viec/:id' Component={TodoList} />
          <Basictemplate exact path='/thong-tin-giang-vien/:id' Component={InfoTeacher} />
          <Basictemplate exact path='/quan-ly-de-tai/them-de-tai/:id' Component={pageAddTopic} />
          <Basictemplate exact path='/quan-ly-de-tai/chi-tiet-de-tai/:id' Component={DetailTopic} />
          <Basictemplate exact path='/quan-ly-thong-ke/:id' Component={Dashboard} />

          {/* admin page */}
          <AdminTemplate exact path='/admin/quan-ly-tai-khoan' Component={Admin} />

          {/* xử lý nghiệp vụ */}
          <Route exact path='/dangnhap' component={Login} />
          <Route exact path='/dangky' component={Register} />

          <Route path="/privatePage" component={PrivatePage} />

          {/* path="*" nên để cuối cùng vì có độ ưu tiên thấp nhất...*/}
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </Fragment>


  );
}

export default App;
