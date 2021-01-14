import { actionTypes } from '../Contants/MagageUsers.Constant'
import { settings } from '../../Commons/Settings'
import axios from 'axios'
import swal from 'sweetalert'






export const RegisterAction = (user) => {
    return dispatch => {
        axios({
            url: settings.domain + '/accounts/register',
            method: 'POST',
            data: user
        }).then(result => {
            console.log(result.data);
            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });
        }).catch(error => {
            console.log(error.response)
            swal({
                icon: "warning",
                title: "Thông báo",
                text: error.response.data,
                buttons: false,
                timer: 1200,
            });
        })
    }
}

export const registerByFileAction = (filePath) => {

    const fd = new FormData();
    fd.append('file', filePath, filePath.name)


    return dispatch => {
        axios({
            url: settings.domain + '/accounts/registerByFileAction',
            method: 'POST',
            data: fd
        }).then(result => {
            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });
        }).catch(error => {
            swal({
                icon: "warning",
                title: "Thông báo",
                text: error.response.data,
                buttons: false,
                timer: 1200,
            });
        })
    }
}
export const LoginUserAction = (account, setText) => {

    return dispatch => {
        axios({
            url: settings.domain + `/accounts/login`,
            method: 'POST',
            data: account
        }).then(result => {

            console.log(result.data)
            localStorage.setItem(settings.infoUser, JSON.stringify(result.data));
            //localStorage.setItem(settings.token, result.data.token) // set token to localstore
            dispatch({

                type: actionTypes.LOGIN,
                User: result.data
            }, () => {
                console.log("object")
            })
            // switch (result.data.AccountType.name_AccountType) {
            //     case Roles.Management:

            //         handleLogin("/quanly", Roles.Management)

            //         break;
            //     case Roles.Employee:
            //         handleLogin("/nhanvien/TabQuanLySanPham", Roles.Employee);
            //         break;
            //     default:
            //         handleLogin("/", Roles.Customer)
            //         break;
            // }
            // return
        }).catch(error => {
            console.log(error.response)
            setText(error.response.data)
            // swal("Thông báo đăng nhập!", error.response, "error");
        })
    }
}

export const LogOutAction = () => {

    return dispatch => {
        dispatch({
            type: actionTypes.LOG_OUT,
        })
    }
}

export const onLoadUserAction = () => {

    // console.log(userLogin)
    return dispatch => {
        dispatch({
            type: actionTypes.USER_LOAD,
            // User : userLogin
        })
    }
}

export const getAllTeacherAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/admin/infoTeacher`,
            method: 'get',
        }).then(result => {
            console.log(result.data)
            const action = {
                type: actionTypes.GET_ALL_TEACHER,
                teachers: result.data

            };
            dispatch(action);
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}


export const getTeacherAction = (idGV) => {
    return dispatch => {
        axios({
            url: settings.domain + `/admin/infoTeacher/${idGV}`,
            method: 'get',
        }).then(result => {
            const action = {
                type: actionTypes.GET_DETAIL_TEACHER,
                teacher: result.data

            };
            dispatch(action);
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}


export const getALLMentorAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/admin/infoMentor`,
            method: 'get',
        }).then(result => {
            console.log(result.data)
            const action = {
                type: actionTypes.GET_ALL_MENTOR,
                mentors: result.data

            };
            dispatch(action);
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}
export const getMentorAction = (idNV) => {
    return dispatch => {
        axios({
            url: settings.domain + `/admin/infoMentor/${idNV}`,
            method: 'get',
        }).then(result => {

            const action = {
                type: actionTypes.GET_DETAIL_MENTOR,
                mentor: result.data

            };
            dispatch(action);
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const getAssignmenByIdAction = (idSV) => {
    return dispatch => {
        axios({
            url: settings.domain + `/student/getAssignmenById/${idSV}`,
            method: 'get',
        }).then(result => {
            const action = {
                type: actionTypes.GET_ASSIGNMENT_BY_STUDENT,
                data: result.data
            };
            dispatch(action);
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}


export const getAssignmemStudentNotDoneAction = (idGV, idSV) => {
    console.log(idGV, idSV)
    return dispatch => {
        axios({
            url: settings.domain + `/student/getAssignmenStudentNotDone/${idGV}/${idSV}`,
            method: 'get',
        }).then(result => {
            const action = {
                type: actionTypes.GET_ASSIGNMENT_STUDENT_NOT_DONE,
                data: result.data
            };
            dispatch(action);
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const submitFileAction = (filePath, idCV, idSV) => {

    console.log(filePath)
    const fd = new FormData();
    fd.append('file', filePath, filePath.name)
    fd.append('idCV', idCV);
    fd.append('idSV', idSV);


    return dispatch => {
        axios({
            url: settings.domain + "/student/submitFile",
            method: 'POST',
            data: fd
        }).then(result => {
            dispatch(getAssignmenByIdAction(idSV))
            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });

        }).catch(error => {

            swal({
                icon: "warning",
                title: "Thông báo",
                text: error.response.data,
                buttons: false,
                timer: 1200,
            });
        })
    }
}

export const downloadFileAction = (cb) => {

    return dispatch => {
        axios({
            url: settings.domain + "/student/downloadFile",
            method: 'get',

        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log("result")
            console.log(error.response.data);
        })
    }
}

export const getStudenByIdAction = (id) => {

    return dispatch => {
        axios({
            url: settings.domain + `/student/${id}`,
            method: 'get',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GETINFOUSER,
                data: result.data
            })
        }).catch(error => {
            console.log(error.response.data);
        })
    }
}

export const addMissionAction = (data) => {
    return dispatch => {
        axios({
            url: settings.domain + `/admin/addMission`,
            method: 'post',
            data
        }).then(result => {
            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });

        }).catch(error => {
            console.log(error.response.data);
        })
    }
}
