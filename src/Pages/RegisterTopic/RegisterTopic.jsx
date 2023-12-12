import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getALLMentorAction, getAllTeacherAction, getMentorAction, getTeacherAction } from '../../Redux/Actions/ManageUsers.Action'
import { cancleTopicAction, filterTopicAction, getAllTopicAction, getTopicByIdStudentAction, registerTopicAction } from '../../Redux/Actions/Topic.Action'
import ModalEmployee from './ModalEmployee'
import ModalTeacher from './ModalTeacher'
import ReactPaginate from 'react-paginate';
import './paginate.css'
import { isEqual } from 'lodash'
import { NavLink } from 'react-router-dom'


var dateFormat = require('dateformat');

class RegisterTopic extends Component {




    constructor(props) {
        super(props);
        this.state = ({

            filter: {
                id_GV: "",
                id_NV: "",
            },
            page: {
                offset: 0,
                perPage: 4,
                currentPage: 0,
                pageCount: 0,
            },
            offset: 0,
            perPage: 4,
            currentPage: 0,
            pageCount: 0,
        })

    }

    set = (count) => {

        this.setState({
            pageCount: count
        });

    }

    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({

            currentPage: selectedPage,
            offset: offset

        }, () => {
            this.props.getAllTopic(this.set)
        });

    };
    renderPageIndex = () => {
        const settings = {
            previousLabel: "Trước",
            nextLabel: "Sau",
            breakLabel: "...",
            breakClassName: "break-me",
            pageCount: this.state.pageCount,
            marginPagesDisplayed: 2,
            pageRangeDisplayed: 5,
            onPageChange: this.handlePageClick,
            containerClassName: "pagination",
            subContainerClassName: "pages pagination",
            activeClassName: "active",
        }
        return (

            <ReactPaginate {...settings} />

        )
    }


    renderListTopic = (array) => {

        const dataSliced = array.slice(this.state.offset, this.state.offset + this.state.perPage)
        return dataSliced.map((ele, index) => {
            return (
                <tr key={index}>
                    <td >{index}</td>
                    <td>MDT{ele.idDeTai}</td>
                    <td>{ele.tenDeTai}</td>
                    <td className='content-topic' dangerouslySetInnerHTML={{
                        __html: ele.noiDungDT.length > 200 ?
                            ele.noiDungDT.substring(0, 200) + "..." : ele.noiDungDT
                    }} />
                    <td>{ele.tinhTrangDT === false ? <p className='text-danger'>Đã Đóng</p> :
                        <p className='text-success'>Đang Mở</p>}</td>
                    <td className='text-center'>

                        {ele.idGV == null ?
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal1"
                                onClick={() => this.props.getMentor(ele.idNV)}
                            >Xem TT NV  </button>
                            :
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                onClick={() => this.props.getTeacher(ele.idGV)}
                            > Xem TT GV   </button>


                            // <button>Xem TT GV</button>
                        }
                    </td>
                    <td className='text-center'>
                        {ele.soLuongSvDT}
                    </td>
                    <td>
                        {!ele.tinhTrangDT || ele.soLuongSvDT <= 0 ?
                            <button className='btn btn-success' disabled >Đăng ký</button> :
                            <button className='btn btn-success' onClick={() => this.props.registerTopic(parseInt(this.props.match.params.id), ele.idDeTai)} >Đăng ký</button>
                        }
                    </td>
                </tr>
            )

        })
    }

    renderSelectTeacher = (array) => {
        return array.map((ele, index) => {
            return (
                <option key={index} value={ele.idGV}>{ele.tenGV}</option>
            )
        })
    }
    renderSelectMentor = (array) => {
        return array.map((ele, index) => {
            return (
                <option key={index} value={ele.idNV}>{ele.tenNV}</option>
            )
        })
    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            filter: { ...this.state.filter, [name]: value },

        }, () => {
            console.log(this.state.filter)
        })
    }
    render() {
        return (
            <div className='RegisterTopic container'>

                <div className="RegisterTopic-container">


                    <div className="filter-topic my-4 p-3" style={{ backgroundColor: "#f8f9fa" }}>
                        <h3>Bộ lọc</h3>
                        <div className="filter-topic-container row">

                            <div className="filter-teacher col-4">
                                <h5 className='d-inline'>Giảng Viên : </h5>
                                <select onChange={this.handleChange}
                                    value={
                                        this.state.filter.id_GV

                                    } id="id_GV" name="id_GV">
                                    <option defaultValue="">---</option>
                                    {this.renderSelectTeacher(this.props.teachers)}
                                </select>
                            </div>
                            <div className="filter-mentor col-4">
                                <h5 className='d-inline'>Nhân Viên Cty : </h5>
                                <select onChange={this.handleChange}
                                    value={
                                        this.state.filter.id_NV

                                    } id="id_GV" name="id_NV">
                                    <option defaultValue="">---</option>
                                    {this.renderSelectMentor(this.props.mentors)}
                                </select>
                            </div>
                            <div className="btn-filter col-4">
                                <button className='btn-login' onClick={() => this.props.filterTopic(this.state.filter)}>Lọc</button>

                            </div>
                        </div>

                    </div>

                    <div className="RegisterTopic-list my-4 p-3" style={{ backgroundColor: "#f8f9fa" }}>
                        <h3>Danh Sách Đề Tài</h3>
                        <table className="table table-striped" style={{ width: '100%', height: '600px'}}>
                            <colgroup>
                                <col span={1} style={{ width: '3%' }} />
                                <col span={1} style={{ width: '10%' }} />
                                <col span={1} style={{ width: '20%' }} />
                                <col span={1} style={{ width: '25%' }} />

                                <col span={1} style={{ width: '10%' }} />
                                <col span={1} style={{ width: '10%' }} />
                                <col span={1} style={{ width: '10%' }} />

                                <col span={1} style={{ width: '15%' }} />

                            </colgroup>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã Đề Tài</th>
                                    <th>Tiêu Đề</th>
                                    <th>Nội Dung Đề Tài</th>
                                    <th>Tình Trạng</th>
                                    <th>Người HD</th>
                                    <th>S.L Còn</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderListTopic(this.props.TopicFilter.length > 0 ? this.props.TopicFilter : this.props.Topics)}
                            </tbody>
                        </table>
                        <div className="row">
                            {this.renderPageIndex()}
                        </div>
                    </div>


                    <div className="RegisterTopic my-4 p-3" style={{ backgroundColor: "#f8f9fa" }}>
                        <h3>Đề Tài Đã Đăng Ký</h3>
                        <table className="table table-striped" style={{ width: '100%' }}>
                            <colgroup>
                                <col span={1} style={{ width: '3%' }} />
                                <col span={1} style={{ width: '10%' }} />
                                <col span={1} style={{ width: '20%' }} />
                                <col span={1} style={{ width: '25%' }} />

                                <col span={1} style={{ width: '10%' }} />
                                <col span={1} style={{ width: '10%' }} />


                                <col span={1} style={{ width: '10%' }} />

                            </colgroup>

                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã Đ.T</th>
                                    <th>Tiêu Đề</th>
                                    <th>Nội Dung Đề Tài</th>
                                    <th>T.Trạng ĐK</th>
                                    <th>Ngày ĐK</th>
                                    <th>Người HD</th>

                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.TopicByStudent.idDeTai &&
                                    <tr>
                                        <td><p>1</p></td>
                                        <td><p>MDT{this.props.TopicByStudent.idDeTai}</p></td>
                                        <td><p>{this.props.TopicByStudent.tenDeTai}</p></td>
                                        <td><p>{this.props.TopicByStudent.noiDungDT}</p></td>
                                        <td>{!this.props.TopicByStudent.tinhTrang ?
                                            <p className='text-danger'>Đang chờ duyệt</p> :
                                            <p className='text-success'>Đã duyệt</p>}</td>
                                        <td><p>{dateFormat(this.props.TopicByStudent.ngayDangKy, 'dd/mm/yyyy')}</p></td>
                                        <td className='text-center'>

                                            {this.props.TopicByStudent.idGV == null ?
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal1"
                                                    onClick={() => this.props.getMentor(this.props.TopicByStudent.idNV)}
                                                >
                                                    Xem TT NV
                                      </button> :
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                                    onClick={() => this.props.getTeacher(this.props.TopicByStudent.idGV)}
                                                >
                                                    Xem TT GV
                                        </button>
                                                // <button>Xem TT GV</button>
                                            }
                                        </td>

                                        <td>
                                            {!this.props.TopicByStudent.tinhTrang ?
                                                <button className='btn btn-danger'
                                                    onClick={() => this.props.cancleTopic(parseInt(this.props.match.params.id), this.props.TopicByStudent.idDeTai)}
                                                >Hủy</button> :
                                                <NavLink to={`/xem-lich-phan-cong/${this.props.match.params.id}`} className='btn btn-success'>Xem Lịch PC</NavLink>
                                            }
                                        </td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>

                </div>

                <ModalTeacher teacher={this.props.teacher}></ModalTeacher>
                <ModalEmployee mentor={this.props.mentor}></ModalEmployee>
            </div>
        )
    }

    componentDidMount() {
      //  console.log("componentDidMount Register Topic")
      setTimeout(() => {
      this.props.getAllTopic(this.set);
          
      }, 1);
       setTimeout(() => {
        this.props.getTopicByIdStudent(this.props.match.params.id);   
      }, 50);
      setTimeout(() => {
              this.props.getALLMentor();
      }, 100);
      setTimeout(() => {
       this.props.getAllTeacher()
      }, 150);
        
    }
    componentDidUpdate(prevProps, prevState) {


        if (!isEqual(prevProps.TopicFilter, this.props.TopicFilter))
            this.setState({
                pageCount: Math.ceil(this.props.TopicFilter.length / this.state.page.perPage)
            })
    }


}

const mapStateToProps = (state) => ({
    Topics: state.ManageTopicReducer.Topics,
    teachers: state.ManageUserReducer.teachers,
    teacher: state.ManageUserReducer.teacher,
    mentor: state.ManageUserReducer.mentor,
    mentors: state.ManageUserReducer.mentors,
    TopicByStudent: state.ManageTopicReducer.TopicByStudent,
    TopicFilter: state.ManageTopicReducer.TopicFilter
})

const mapDispatchToProps = dispatch => {
    return {
        getAllTopic: (set) => {
            dispatch(getAllTopicAction(set))
        },
        getTeacher: (idGV) => {
            dispatch(getTeacherAction(idGV))
        },
        getMentor: (idNV) => {
            dispatch(getMentorAction(idNV))
        },
        getTopicByIdStudent: (idSV) => {
            dispatch(getTopicByIdStudentAction(idSV))
        },

        registerTopic: (idSv, idDetai) => {
            dispatch(registerTopicAction(idSv, idDetai))
        },

        cancleTopic: (idSv, idDetai) => {
            dispatch(cancleTopicAction(idSv, idDetai))
        },
        getALLMentor: () => {
            dispatch(getALLMentorAction())
        },
        getAllTeacher: () => {
            dispatch(getAllTeacherAction())
        },
        filterTopic: (filter) => {
            dispatch(filterTopicAction(filter))
        }
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTopic)