import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { comfirmRegisterTopicAction, getDetailTopicAction, getStudentByTopicAction } from '../../Redux/Actions/Topic.Action';


class DetailTopic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            topic: {
                idDeTai: '',
                tenDeTai: '',
                noiDungDT: '',
                tinhTrangDT: ''

            },

        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            topic: { ...this.state.topic, [name]: value }
        }, () => {
            console.log(this.state.topic)
        })
    }
    renderTab(array, isTrue) {

        if (array.length < 1) {
            return (
                <tr>
                    <td></td>
                    <td>Không có sinh viên nào {!isTrue ? "đang chờ" : "đã được"} duyệt</td>
                    <td></td>
                    <td>  </td>
                </tr>
            )
        }

        if (!isTrue) {
            return array.map((ele, index) => {
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{ele.idSV}</td>
                        <td>{ele.tenSV}</td>
                        <td>
                            <div>
                                <button className='btn btn-primary mr-3' onClick={() => this.props.comfirmRegisterTopic(this.props.match.params.id, ele.idSV, 0)}>Duyệt</button>
                                <button className='btn btn-danger'>Từ Chối</button>
                            </div>

                        </td>
                    </tr>
                )

            })
        }
        else {
            return array.map((ele, index) => {
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{ele.idSV}</td>
                        <td>{ele.tenSV}</td>
                        <td>
                            <NavLink to={`/quan-ly-cong-viec/them-cong-viec/${ele.idSV}`} className='btn btn-primary'>Phân Công</NavLink>

                        </td>
                    </tr>
                )

            })
        }



    }
    render() {
        return (
            <div className='DetailTopic container'>
                <div className="DetailTopic-container">
                    <div className="info-topic text-center">
                        <h3>Thông Tin Đề Tài</h3>
                        <p><span>Mã Đề Tài : </span>MDT{this.props.DetailTopic.idDeTai}</p>
                        {/* <p><span>Số Lượng Sinh Viên : </span>{this.state.topic.idDeTai}</p> */}
                        <p><span>Tiêu Đề : </span>{this.props.DetailTopic.tenDeTai}</p>
                        <p><span>Tình Trạng : </span>{this.props.DetailTopic.tinhTrangDT ? <span className='text-success'>Đang mở</span> : <span className='text-danger'>Đang đóng</span>}</p>
                        <p><span>Nội Dung : </span> <span className='content-topic' dangerouslySetInnerHTML={{
                            __html: this.props.DetailTopic.noiDungDT
                        }} />
                        </p>
                        <button className='btn btn-primary'>Cập Nhật</button>
                    </div>

                    <div className="DetailTopic-list-student">


                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active text-danger h-100" id="home-tab" data-toggle="tab"
                                    href="#home" role="tab" aria-controls="home" aria-selected="true">Sinh Viên Đang Chờ Duyệt</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-danger h-100" id="profile-tab" data-toggle="tab"
                                    href="#profile" role="tab" aria-controls="profile" aria-selected="false">Sinh Viên Đã Duyệt</a>
                            </li>
                        </ul>
                        <div className="tab-content p-4" id="myTabContent">

                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã Sinh Viên</th>
                                            <th>Họ Tên</th>
                                            <th>Thao Tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTab(this.props.studentByTopicComfirm, false)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã Sinh Viên</th>
                                            <th>Họ Tên</th>
                                            <th>Thao Tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTab(this.props.studentByTopicComfirmed, true)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.getDetailTopic(this.props.match.params.id);
        }, 1);
       setTimeout(() => {
            this.props.getStudentByTopic(this.props.match.params.id);
       }, 50);

    }
    componentDidUpdate(prevProps, prevState) {


        if (!isEqual(prevProps.DetailTopic, this.props.DetailTopic)) {

            this.setState({
                topic: {
                    idDeTai: this.props.DetailTopic.idDeTai,

                }
            });
        }
    }
}



function mapStateToProps(state) {
    return {
        DetailTopic: state.ManageTopicReducer.DetailTopic,
        studentByTopic: state.ManageTopicReducer.studentByTopic,
        studentByTopicComfirm: state.ManageTopicReducer.studentByTopicComfirm,
        studentByTopicComfirmed: state.ManageTopicReducer.studentByTopicComfirmed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailTopic: (id) => {
            dispatch(getDetailTopicAction(id))
        },
        getStudentByTopic: (id) => {
            dispatch(getStudentByTopicAction(id))
        },
        comfirmRegisterTopic: (idDeTai, idSV, idGV) => {
            dispatch(comfirmRegisterTopicAction(idDeTai, idSV, idGV))
        },

    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(DetailTopic);