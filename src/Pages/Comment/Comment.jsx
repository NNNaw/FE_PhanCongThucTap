import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAssignmenByIdAction, rateStudentByMentorAction } from '../../Redux/Actions/ManageUsers.Action';
import './Comment.css'
export class Comment extends Component {


    constructor(props) {
        super(props);
        this.state = {
            rating: {
                idSV: "",
                idPC: '',
                diemNX: 0,
                NhanXetGV: ''
            },

        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            rating: { ...this.state.rating, [name]: value }
        }, () => {
            console.log(this.state.rating)
        })
    }
    renderConsider(nxGV, nxNV) {
        if (nxGV === null && nxNV === null) {
            return (
                <p>---</p>
            )

        } else if (nxGV === null) {
            return (<p>{nxNV}</p>)
        } else {
            return (<p>{nxGV}</p>)
        }
    }
    renderComment = (array) => {

        return array.map((ele, index) => {
            return (
                <tr key={index}>
                    <td className='td-1'><p>{index}</p></td>

                    <td className='text-left td-3' ><p>{ele.tenCV}</p></td>


                    {JSON.parse(localStorage.getItem('infoUser')).idGV &&
                        <td> <button className='btn-downloadfile' onClick={() => this.downloadFile(ele.NdThucTap)}>
                            <i className="fa fa-download" /> Download File</button></td>
                    }


                    <td className='text-left td-3'>
                        {this.renderConsider(ele.NhanXetGV, ele.NhanXetNV)}

                    </td>


                    <td className='td-1'>{ele.diemNX === null ?
                        <p className='text-danger'>---</p> :
                        <p>{ele.diemNX}</p>

                    }</td>

                    {/* <td>
                        {this.renderButton(ele.NdThucTap, ele.idCV, this.props.match.params.id, ele.denNgay)}
                    </td> */}

                    <td className='td-1'>{ele.diemNX === null ?
                        <p className='text-danger'>Chờ xử lý</p> :
                        <p className='text-success'><i className="fa fa-check"></i> Đã Chấm</p>

                    }</td>

                </tr>
            )

        })

    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            rating: { ...this.state.rating, idSV: this.props.match.params.id }
        }, () => {
            this.props.rateStudentByMentor(this.state.rating);
        })


    }
    render() {
        return (
            <div className='Comment container'>
                <div className="Comment-container">



                    <div className="Comment-list my-4 p-3" style={{ backgroundColor: "#f8f9fa" }}>
                        <h3>Danh Sách Công Việc Và Nhận Xét</h3>


                        <table className="table text-center table-striped" style={{ width: '100%' }}>
                            {/* <colgroup>
                                <col span={1} style={{ width: '8%' }} />
                                <col span={1} style={{ width: '24%' }} />
                                <col span={1} style={{ width: '22%' }} />
                                <col span={1} style={{ width: '22%' }} />
                                <col span={1} style={{ width: '8%' }} />
                                <col span={1} style={{ width: '12%' }} />
                            </colgroup> */}
                            {/* Put <thead>, <tbody>, and <tr>'s here! */}
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th className='text-left'>Tiêu Đề CV</th>
                                    {JSON.parse(localStorage.getItem('infoUser')).idGV &&
                                        <th className='text-center'>Nội Dung Bài Làm</th>
                                    }
                                    <th className='text-left'>HD Nhận Xét</th>

                                    <th>Điểm</th>
                                    <th>Tình Trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderComment(this.props.assignments)}
                            </tbody>
                        </table>

                        <div className="div-btn-adnhg text-right">
                            {JSON.parse(localStorage.getItem('infoUser')).idGV &&
                                <button className='btn btn-success mr-4' type="button" data-toggle="modal" data-target="#exampleModalDanhGia" >Đánh Giá</button>
                            }
                        </div>
                    </div>



                </div>


                <div className="modal fade" id="exampleModalDanhGia" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm Nhận Xét Và Chấm Điểm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="diemNX">Điểm Số:</label>
                                        <input min="0" max="10" onChange={this.handleChange} type="number"
                                            className="form-control" id="diemNX" name='diemNX' value={this.state.rating.diemNX} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="NhanXetGV">Nhận Xét:</label>
                                        <textarea onChange={this.handleChange}
                                            type="text" rows="5" cols="50" className="form-control"
                                            id="NhanXetGV" name='NhanXetGV' value={this.state.rating.NhanXetGV} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </form>

                            </div>
                        </div>
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
        rateStudentByMentor: (data) => {
            dispatch(rateStudentByMentorAction(data))
        },


    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
