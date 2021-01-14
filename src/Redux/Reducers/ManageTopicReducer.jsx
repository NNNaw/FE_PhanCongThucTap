import { actionTypes } from '../Contants/Topic.constrant'

const intialState = {
    Topics: [],
    DetailTopic: {},
    TopicByStudent: {},
    TopicByTeacher: [],
    TopicFilter: [],

    studentByTopic: [], studentWaitingConfirm: [],
    studentByTopicComfirm: [],
    studentByTopicComfirmed: [],
    ListTodoListByTeach: [],
    studentWaitingAddmission: [], detailStudentWaitingAddmission: {}
}

export const ManageTopicReducer = (state = intialState, action) => {

    switch (action.type) {

        case actionTypes.get_all_topic: {
            return {
                ...state,
                Topics: action.data
            }
        }
        case actionTypes.get_topic_by_id_student: {
            return {
                ...state,
                TopicByStudent: action.data
            }
        }
        case actionTypes.get_topic_by_filter: {


            let arrayTopic = [];

            if (action.data.id_GV !== "" && action.data.id_NV !== "") {
                arrayTopic = state.Topics.filter(x => x.idGV === parseInt(action.data.id_GV) || x.idNV === parseInt(action.data.id_NV))

            }
            else if (action.data.id_NV !== "") {
                arrayTopic = state.Topics.filter(x => x.idNV === parseInt(action.data.id_NV))

            }
            else if (action.data.id_GV !== "") {
                arrayTopic = state.Topics.filter(x => x.idGV === parseInt(action.data.id_GV))
            }
            else {
                arrayTopic = state.Topics
            }

            return {
                ...state,
                TopicFilter: arrayTopic
            }
        }
        case actionTypes.get_topic_by_idTeach: {
            return {
                ...state,
                TopicByTeacher: action.data
            }
        }
        case actionTypes.get_detail_topic: {
            return {
                ...state,
                DetailTopic: action.data
            }
        }
        case actionTypes.get_student_by_topic: {


            let tempConfirm = [];
            let tempConfirmed = [];


            action.data.forEach((ele, index) => {
                if (!ele.tinhTrang) {
                    tempConfirm.push(ele)
                } else {

                    tempConfirmed.push(ele)
                }
            })

            return {
                ...state,
                studentByTopic: action.data,
                studentByTopicComfirm: tempConfirm,
                studentByTopicComfirmed: tempConfirmed
            }
        }
        case actionTypes.get_student_wating_confirm_by_teacher: {
            return {
                ...state,
                studentWaitingConfirm: action.data
            }
        }
        case actionTypes.get_ListTodoListByTeach: {
            return {
                ...state,
                ListTodoListByTeach: action.data
            }
        }
        case actionTypes.get_student_wating_add_mission_by_teacher: {
            console.log(action.data)
            return {
                ...state,
                studentWaitingAddmission: action.data
            }
        }
        case actionTypes.get_detail_student_wating_add_mission_by_teacher: {

            return {
                ...state,
                detailStudentWaitingAddmission: action.data
            }
        }

      
        default:
            return { ...state }
    }
}


