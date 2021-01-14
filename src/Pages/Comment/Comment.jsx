import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAssignmenByIdAction } from '../../Redux/Actions/ManageUsers.Action';
import './Comment.css'
export class Comment extends Component {


    renderComment = (array) => {

        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td className='td-1'><p>{index}</p></td>

                    <td className='text-left td-3' ><p>{ele.tenCV}</p></td>


                    <td className='text-left td-3'>
                        {ele.NhanXetGV === null ?
                            <p className='text-danger'>---</p> :
                            <p>{ele.NhanXetGV}</p>
                        }
                    </td>
                    <td className='text-left td-3'>{ele.NhanXetNV === null ?
                        <p className='text-danger '>---</p> :
                        <p>{ele.NhanXetNV}</p>

                    }</td>
                    <td className='td-1'>{ele.diemNX === null ?
                        <p className='text-danger'>---</p> :
                        <p>{ele.diemNX}</p>

                    }</td>

                    {/* <td>
                        {this.renderButton(ele.NdThucTap, ele.idCV, this.props.match.params.id, ele.denNgay)}
                    </td> */}

                    <td className='td-1'>{ele.diemNX === null ?
                        <p className='text-danger'>Chờ xử lý</p> :
                        <p className='text-success'><i className="fa fa-check"></i> Hoàn Thành</p>

                    }</td>

                </tr>
            )

        })

    }

    render() {
        return (
            <div className='Comment container'>
                <div className="Comment-container">



                    <div className="Comment-list my-4 p-3" style={{ backgroundColor: "#f8f9fa" }}>
                        <h3>Danh Sách Công Việc</h3>
                        {/* <table className="table text-center table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th className='text-left'>Tiêu Đề CV</th>
                                    <th className='text-left'>Nhận Xét GV</th>
                                    <th className='text-left'>Nhận Xét NV</th>
                                    <th>Điểm</th>
                                    <th>Tình Trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderComment(this.props.assignments)}
                            </tbody>
                        </table> */}

                        <table className="table text-center table-striped" style={{ width: '100%' }}>
                            <colgroup>
                                <col span={1} style={{ width: '8%' }} />
                                <col span={1} style={{ width: '24%' }} />
                                <col span={1} style={{ width: '22%' }} />
                                <col span={1} style={{ width: '22%' }} />
                                <col span={1} style={{ width: '8%' }} />
                                <col span={1} style={{ width: '12%' }} />
                            </colgroup>
                            {/* Put <thead>, <tbody>, and <tr>'s here! */}
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th className='text-left'>Tiêu Đề CV</th>
                                    <th className='text-left'>Nhận Xét GV</th>
                                    <th className='text-left'>Nhận Xét NV</th>
                                    <th>Điểm</th>
                                    <th>Tình Trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderComment(this.props.assignments)}
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        )
    }
    componentDidMount() {
        this.props.getAssignmenById(this.props.match.params.id)
    }
}

function mapStateToProps(state) {
    return {
        assignments: state.ManageUserReducer.assignments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAssignmenById: (idSV) => {
            dispatch(getAssignmenByIdAction(idSV))
        },


    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
