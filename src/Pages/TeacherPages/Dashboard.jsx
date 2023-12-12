import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuantityStudentByIdTeacherAction } from '../../Redux/Actions/ManageUsers.Action';
import { getAllTopicByIdTeacherAction } from '../../Redux/Actions/Topic.Action';



class Dashboard extends Component {



    renderQuantityStudent_Topic = (array) => {
        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>MDT{ele.idDeTai}</td>
                    <td>{ele.tenDeTai}</td>
                    <td>{ele.soSvTrenDeTai}</td>
                </tr>
            )
        })
    }

    totalStudent = (array) => {
        let total = array.reduce((tal, ele, index) => {
            tal += ele.soSvTrenDeTai;
            return tal;
        }, 0);

        return total;
    }

    render() {


        return (
            <div className="Dashboard container">

                <div className='p-3' style={{ backgroundColor: "#f8f9fa" }}>
                    <h3>Số lượng sinh viên trên đề tài</h3>
                    <table className="table table-striped" style={{ width: '100%' }} >
                        <colgroup>
                            <col span={1} style={{ width: '20%' }} />
                            <col span={1} style={{ width: '20%' }} />
                            <col span={1} style={{ width: '40%' }} />
                            <col span={1} style={{ width: '20%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className='w-20'>STT</th>
                                <th className='w-20'>Mã Đề Tài</th>
                                <th className='w-40'>Tên Đề Tài</th>
                                <th className='w-20'>Số Lượng SV</th>
                            </tr>
                        </thead>
                        <tbody className='py-3'>
                            {this.renderQuantityStudent_Topic(this.props.QuantityStudentByIdTeacher)}

                        </tbody>
                        <tfoot>
                            <tr>
                                <th className='w-20'></th>
                                <th className='w-20'></th>
                                <th className='w-40 font-weight-bold'>Tổng Số Lượng SV Đã Và Đang HD</th>
                                <th className='w-20'>{this.totalStudent(this.props.QuantityStudentByIdTeacher)}</th>
                            </tr>
                        </tfoot>
                    </table>

                </div>


                <div className='p-3' style={{ backgroundColor: "#f8f9fa" }}>
                    <h5>Số đề tài trên giảng viên : {this.props.TopicByTeacher.length} đề tài</h5>
                </div>

            </div>
        );
        
    }
    componentDidMount() {
        this.props.getQuantityStudentByIdTeacher(this.props.match.params.id);
       setTimeout(() => {
            this.props.getAllTopicByIdTeacher(this.props.match.params.id);
       }, 51);
    }
}
function mapStateToProps(state) {
    return {
        QuantityStudentByIdTeacher: state.ManageUserReducer.QuantityStudentByIdTeacher,
        TopicByTeacher: state.ManageTopicReducer.TopicByTeacher,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getQuantityStudentByIdTeacher: (idGV) => {
            dispatch(getQuantityStudentByIdTeacherAction(idGV))
        },
        getAllTopicByIdTeacher: (id) => {
            dispatch(getAllTopicByIdTeacherAction(id))
        },
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(Dashboard);