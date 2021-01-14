import { actionTypes } from '../Contants/Topic.constrant'
import { settings } from '../../Commons/Settings'
import axios from 'axios'
import swal from 'sweetalert'

export const getAllTopicAction = (set) => {
    return dispatch => {
        axios({
            url: settings.domain + '/topic',
            method: 'get',

        }).then(result => {
            // console.log(result.data);
            // const dataSliced = result.data.slice(offset, offset + perPage)
            dispatch({
                type: actionTypes.get_all_topic,
                data: result.data
            })
            const count = Math.ceil(result.data.length / 4)
            set(count)
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}
export const getDetailTopicAction = (idDeTai) => {
    return dispatch => {
        axios({
            url: settings.domain + `/topic/${idDeTai}`,
            method: 'get'

        }).then(result => {

            dispatch({
                type: actionTypes.get_detail_topic,
                data: result.data
            })

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}
export const getAllTopicByIdTeacherAction = (idGV) => {
    return dispatch => {
        axios({
            url: settings.domain + `/topic/getAllTopicByIdTeacher/${idGV}`,
            method: 'get',

        }).then(result => {
            // console.log(result.data);
            // const dataSliced = result.data.slice(offset, offset + perPage)
            dispatch({
                type: actionTypes.get_topic_by_idTeach,
                data: result.data
            })

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}
export const getStudentByTopicAction = (id) => {
    return dispatch => {
        axios({
            url: settings.domain + `/student/getListStudentByTopic/${id}`,
            method: 'get',

        }).then(result => {

            dispatch({
                type: actionTypes.get_student_by_topic,
                data: result.data
            })

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const getStudentWatingComfirmByTeacherAction = (id) => {

    return dispatch => {
        axios({
            url: settings.domain + `/admin/getAllStudentConfirm/${id}`,
            method: 'get',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.get_student_wating_confirm_by_teacher,
                data: result.data
            })

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}


export const getAllStudentWaitingAddMissionAction = (id) => {

    return dispatch => {
        axios({
            url: settings.domain + `/admin/getAllStudentWaitingAddMission/${id}`,
            method: 'get',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.get_student_wating_add_mission_by_teacher,
                data: result.data
            })

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const getDetailStudentWaitingAddMissionAction = (idSV) => {

    return dispatch => {
        axios({
            url: settings.domain + `/admin/getDetailStudentWaitingAddMission/${idSV}`,
            method: 'get',

        }).then(result => {

            dispatch({
                type: actionTypes.get_detail_student_wating_add_mission_by_teacher,
                data: result.data
            })

        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })

    }
}



export const comfirmRegisterTopicAction = (idDeTai, idSV, idGV) => {
    const data = {
        idDeTai, idSV
    }
    console.log(idDeTai, idSV, idGV)
    return dispatch => {
        axios({
            url: settings.domain + `/admin/comfirmRegisterTopic/${idGV}`,
            method: 'patch',
            data: data
        }).then(result => {

            if (idGV !== 0) {
                console.log("true")
                dispatch(getStudentWatingComfirmByTeacherAction(idGV))
            } else {
                dispatch(getStudentByTopicAction(idDeTai))
            }
            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });

        }).catch(error => {
            console.log(error.response)
            swal("Thông báo!", error.response.data, "error");
        })
    }
}

export const changeStatusTopicAction = (idDetai, idGV, status) => {
    return dispatch => {
        axios({
            url: settings.domain + `/topic/changeStatus/${idDetai}`,
            method: 'patch',
            data: { status }
        }).then(result => {
            dispatch(getAllTopicByIdTeacherAction(idGV))
            swal({
                icon: "success",
                title: "Thông báo",
                text: result.data,
                buttons: false,
                timer: 1200,
            });

        }).catch(error => {
            console.log(error.response)
            swal("Thông báo!", error.response.data, "error");
        })
    }
}

export const getTopicByIdStudentAction = (idSV) => {

    console.log(idSV)
    return dispatch => {
        axios({
            url: settings.domain + `/topic/getTopicByIdStudent/${idSV}`,
            method: 'get',

        }).then(result => {
            dispatch({
                type: actionTypes.get_topic_by_id_student,
                data: result.data
            })
        }).catch(error => {
            console.log(error.response)
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const registerTopicAction = (idSV, idDeTai) => {
    const data = {
        idSV: idSV,
        idDeTai: idDeTai
    }
    console.log(data)
    return dispatch => {
        axios({
            url: settings.domain + `/student/registerTopic`,
            method: 'POST',
            data: data
        }).then(result => {
            dispatch(getTopicByIdStudentAction(idSV))

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
            // swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const cancleTopicAction = (idSV, idDeTai) => {
    const data = {
        idSV: idSV,
        idDeTai: idDeTai
    }
    console.log(data)
    return dispatch => {
        axios({
            url: settings.domain + `/student/cancleTopic`,
            method: 'DELETE',
            data: data
        }).then(result => {
            dispatch(getTopicByIdStudentAction(idSV))
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

export const filterTopicAction = (itemFilter) => {

    return dispatch => {
        dispatch({
            type: actionTypes.get_topic_by_filter,
            data: itemFilter
        })
    }
}

export const getListTodoListByTeachAction = (iGV) => {

    return dispatch => {
        axios({
            url: settings.domain + `/admin/getListTodoListByTeach/${iGV}`,
            method: 'get',

        }).then(result => {
            dispatch({
                type: actionTypes.get_ListTodoListByTeach,
                data: result.data
            })

        }).catch(error => {

        })
    }
}

export const addTopicAction = (data) => {

    return dispatch => {
        axios({
            url: settings.domain + `/admin/addTopic`,
            method: 'Post',
            data
        }).then(result => {
            dispatch(getAllTopicByIdTeacherAction(data.idGV))
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
export const layDanhSachSanPhamPhanTrangAction = (offset, perPage, set) => {
    return dispatch => {
        axios({
            url: settings.domain + "/products",
            method: 'get'
        }).then(result => {
            //Đưa mangDanhMucKhoaHoc => Reducer
            const data = result.data;

            const dataSliced = data.slice(offset, offset + perPage)
            console.log(dataSliced)
            dispatch({
                type: actionTypes.LAY_DANH_SACH_PHAN_TRANG,
                mangSanPhamPhanTrang: dataSliced
            });

            const count = Math.ceil(data.length / perPage)
            set(count)
        }).catch(error => {
            console.log(error.response.data);
        })
    }
}


