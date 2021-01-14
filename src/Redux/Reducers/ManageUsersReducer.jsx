import { actionTypes } from '../Contants/MagageUsers.Constant'

const intialState = {
    // user: JSON.parse(localStorage.getItem('inforUser')) || null,
    // isLogOut: JSON.parse(localStorage.getItem('inforUser')) !== null ? true : false,
    User: JSON.parse(localStorage.getItem('inforUser')) ? JSON.parse(localStorage.getItem('inforUser')) : null,
    isAuthenticated: JSON.parse(localStorage.getItem('inforUser')) ? true : false,
    teacher: {
        idGV: "", tenGV: "", hhhv: "", sdt: "", email: "", tenChucVu: "", tenBoMon: "", hinhAnh: ""
    },
    mentor: {}, userDetail: {},
    teachers: [], mentors: [], assignments: [],assignmentStudentNotDone:[]
}

export const ManageUserReducer = (state = intialState, action) => {

    switch (action.type) {

        case actionTypes.LOGIN: {
            // state.isLogOut = false; // set false cho isLogin

            return {
                ...state,
                User: action.User,
                isAuthenticated: true
            }
        }


        // case actionTypes.GETINFOUSER: {
        //     state.user = JSON.parse(localStorage.getItem('infoUser'));
        //     return { ...state }
        // }

        case actionTypes.GET_DETAIL_USER: {

            state.DetailUser = action.DetailUser;
            return { ...state }
        }
        case actionTypes.LOG_OUT: {
            localStorage.removeItem('infoUser');
            return {
                ...state,
                User: null,
                isAuthenticated: false
            }
        }
        case actionTypes.USER_LOAD: {

            console.log("on load")
            return {
                ...state,
                User: action.User,
                isAuthenticated: true
            }
        }
        case actionTypes.GET_DETAIL_TEACHER: {
            return {
                ...state,
                teacher: action.teacher,
            }
        }
        case actionTypes.GET_DETAIL_MENTOR: {
            return {
                ...state,
                mentor: action.mentor,
            }
        }
        case actionTypes.GET_ALL_MENTOR: {
            return {
                ...state,
                mentors: action.mentors,
            }
        }
        case actionTypes.GET_ALL_TEACHER: {
            return {
                ...state,
                teachers: action.teachers,
            }
        }
        case actionTypes.GET_ASSIGNMENT_BY_STUDENT: {
            return {
                ...state,
                assignments: action.data,
            }
        }

        case actionTypes.GETINFOUSER: {
            return {
                ...state,
                userDetail: action.data,
            }
        }
        case actionTypes.GET_ASSIGNMENT_STUDENT_NOT_DONE: {

            return {
                ...state,
                assignmentStudentNotDone: action.data
            }
        }
        default:
            return { ...state }
    }
}


