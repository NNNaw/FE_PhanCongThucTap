import { actionTypes } from '../Contants/MagageUsers.Constant'
import { settings } from '../../Commons/Settings'
import axios from 'axios'
import swal from 'sweetalert'
import { Roles } from '../../Components/Common/variable'





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
            headers: {
                "Content-disposition" : "attachment; filename=[yourFileName]" ,
                "Content-Type" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            },
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

    console.log(account);

    return dispatch => {
        axios({
            url: settings.domain + `/accounts/login`,
            method: 'POST',
            data: account
        }).then(result => {
            console.log(result.data);

            localStorage.setItem(settings.infoUser, JSON.stringify(result.data));
            //localStorage.setItem(settings.token, result.data.token) // set token to localstore
            dispatch({

                type: actionTypes.LOGIN,
                User: result.data
            })

            console.log(result.data)

            switch (result.data.tenLoaiTaiKhoan) {
                case Roles.admin:
                    setText("/admin/quan-ly-tai-khoan", true)
                    break;
                case Roles.giangVien:
                    setText("/", true)
                    break;
                case Roles.sinhVien:
                    setText("/", true)
                    break;
                default:
                    setText("Không tìm thấy role của bạn..", false)
                    break;
            }
            return
        }).catch(error => {
            setText(error.response.data, false)
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

export const getNotifyByAccountAction = (account) => {


    return dispatch => {
        axios({
            url: settings.domain + `/accounts/getNotifyByAccount/${account}`,
            method: 'get',

        }).then(result => {
            console.log(result.data)
            const action = {
                type: actionTypes.GET_NOTIFY_BY_ACCOUNT,
                data: result.data

            };
            dispatch(action);
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}
export const markReadNotifyByAccountAction = (account) => {


    return dispatch => {
        axios({
            url: settings.domain + `/accounts/markReadNotifyByAccount/${account}`,
            method: 'patch',

        }).then(result => {

            dispatch(getNotifyByAccountAction(account));
            mySwal("success", result.data)
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}
export const mySwal = (icon, data) => {
    swal({
        icon: icon,
        title: "Thông báo",
        text: data,
        buttons: false,
        timer: 1200,
    });
}
export const getAllAccountAction = (set) => {

    return dispatch => {
        axios({
            url: settings.domain + `/accounts`,
            method: 'get',

        }).then(result => {
            const action = {
                type: actionTypes.GET_ALL_ACCOUNT,
                data: result.data
            };
            dispatch(action);
            const count = Math.ceil(result.data.length / 11)
            set(count)
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}


export const getAccountsConfirmedAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + `/accounts/getAccountsConfirmed`,
            method: 'get',

        }).then(result => {
            const action = {
                type: actionTypes.getAccountsConfirmed,
                data: result.data
            };
            dispatch(action);


        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const getAccountsUnconfirmAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + `/accounts/getAccountsUnconfirm`,
            method: 'get',

        }).then(result => {
            const action = {
                type: actionTypes.getAccountsUnconfirm,
                data: result.data
            };
            dispatch(action);

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const getDetailListStudentWaitingAssignmentAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + `/accounts/getDetailListStudentWaitingAssignment`,
            method: 'get',

        }).then(result => {
            const action = {
                type: actionTypes.getDetailListStudentWaitingAssignment,
                data: result.data
            };
            dispatch(action);

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}
export const getListTeacherAndQuantityStudentAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + `/admin/getListTeacherAndQuantityStudent`,
            method: 'get',

        }).then(result => {
            const action = {
                type: actionTypes.getListTeacherAndQuantityStudent,
                data: result.data
            };
            dispatch(action);

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}


export const getAllTeacherAction = () => {
    console.log('getALLTeacherAction');
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


export const getQuantityStudentByIdTeacherAction = (idGV) => {
    return dispatch => {
        axios({
            url: settings.domain + `/admin/getQuantityStudentByIdTeacher/${idGV}`,
            method: 'get',
        }).then(result => {
            const action = {
                type: actionTypes.getQuantityStudentByIdTeacher,
                data: result.data

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
    console.log('getALLMentorAction');
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
                timer: 1500,
            });

        }).catch(error => {

            swal({
                icon: "warning",
                title: "Thông báo",
                text: error.response.data,
                buttons: false,
                timer: 2200,
            });
        })
    }
}

export const insertUserByFileAction = (filePath) => {

    console.log(filePath)
    const fd = new FormData();
    fd.append('file', filePath, filePath.name)


    return dispatch => {
        axios({
            url: settings.domain + "/admin/insertFileData",
            method: 'POST',
            data: fd
        }).then(result => {
            dispatch(getDetailListStudentWaitingAssignmentAction())

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

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  
    headers.append('Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    return dispatch => {
        axios({
            url: settings.domain + "/student/downloadFile",
            method: 'get',
            headers: headers
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
            dispatch(getAssignmemStudentNotDoneAction(data.idGV, data.idSV))
          
            dispatch(getAssignmenByIdAction(data.idSV));
                
            
         
            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });

        }).catch(error => {
            mySwal("warning", error.response.data);
        })
    }
}

export const createTodoAction = (data) => {
    return dispatch => {
        axios({
            url: settings.domain + `/admin/addMission`,
            method: 'post',
            data
        }).then(result => {
            dispatch(getAssignmemStudentNotDoneAction(data.idGV, data.idSV))


            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });

        }).catch(error => {
            mySwal("warning", error.response.data);
        })
    }
}


export const addMarkAction = (data) => {

    return dispatch => {
        axios({
            url: settings.domain + "/admin/addMark",
            method: 'PATCH',
            data
        }).then(result => {
            dispatch(getAssignmenByIdAction(data.idSV))
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

export const addAssignmentToTeachAction = (data) => {

    let account = JSON.parse(window.localStorage.getItem('infoUser')).taiKhoan;

    console.log(account);
    return dispatch => {
        axios({
            url: settings.domain + `/admin/addAssignmentToTeach/${account}`, // thêm phân công giảng viên hướng dẫn cho sv
            method: 'post',
            data
        }).then(result => {
          
            dispatch(getListTeacherAndQuantityStudentAction);

        //    setTimeout(() => {
        //         dispatch(getDetailListStudentWaitingAssignmentAction)
        //    }, 51);
           
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


export const confirmAccountByAdminAction = (data) => {

    console.log(data)
    return dispatch => {
        axios({
            url: settings.domain + "/accounts/conFirmAccountByAdmin",
            method: 'PATCH',
            data
        }).then(result => {
            dispatch(getAccountsUnconfirmAction())
            dispatch(getAccountsConfirmedAction())
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


export const rateStudentByMentorAction = (data) => {

    console.log(data)
    return dispatch => {
        axios({
            url: settings.domain + "/admin/rateStudentByMentor",
            method: 'PATCH',
            data
        }).then(result => {

            mySwal("success", result.data)


        }).catch(error => {
            mySwal("warning", error.response.data)
        })
    }
}
