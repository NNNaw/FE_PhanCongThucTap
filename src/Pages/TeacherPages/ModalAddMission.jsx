import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMissionAction, getAssignmemStudentNotDoneAction } from '../../Redux/Actions/ManageUsers.Action';


class ModalAddMission extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            DetailAssignment: {
                idCV: "---",
                idSV: this.props.detailStudentWaitingAddmission.idSV,
                idGV: JSON.parse(localStorage.getItem('infoUser')).idGV,
                tuNgay: '',
                denNgay: '',

            }
        })

    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            DetailAssignment: { ...this.state.DetailAssignment, [name]: value },

        }, () => {
            console.log(this.state.DetailAssignment)
        })
    }

    renderSelectMission = (array) => {

        return array.map((ele, index) => {
            return (
                <option key={index} value={ele.idCV} >
                    MCV{ele.idCV}-{ele.tenCV}
                </option>
            )
            // if (index % 2 === 0) {
            //     return (
            //         <option className='text-success' key={index} value={ele.idCV} disabled>
            //             MCV{ele.idCV}-{ele.tenCV}
            //         </option>
            //     )
            // } else {
            //     return (
            //         <option key={index} value={ele.idCV} >
            //             MCV{ele.idCV}-{ele.tenCV}
            //         </option>
            //     )
            // }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addMission(this.state.DetailAssignment)
    }
    render() {
        console.log("Modaaddmission")

        return (
            <div className="modal fade" id="exampleModalAddMission" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thông Tin Phân Công</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form className='form' onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="tenSV">Tên Sinh Viên:</label>
                                    <input disabled type="text" className="form-control" id="tenSV" name="tenSV" defaultValue={this.props.detailStudentWaitingAddmission.tenSV} />
                                </div>
                                <div className="form-group">
                                    <select onChange={this.handleChange}
                                        className="form-control"
                                        value={
                                            this.state.DetailAssignment.idCV

                                        } id="idCV" name="idCV">
                                        <option defaultValue="">---</option>
                                        {this.renderSelectMission(this.props.assignmentStudentNotDone)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tuNgay">Từ Ngày:</label>
                                    <input onChange={this.handleChange} type="date" className="form-control" id="tuNgay" name="tuNgay" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="denNgay">Đến Ngày:</label>
                                    <input onChange={this.handleChange} type="date" className="form-control" id="denNgay" name="denNgay" />
                                </div>
                                <input type="submit" className='btn btn-success' value='Thêm' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        console.log("Modaladdmission componentDidMount")

        const id = JSON.parse(localStorage.getItem('infoUser')).idGV;

        console.log(this.state.DetailAssignment.idSV)

        if (this.props.detailStudentWaitingAddmission.idSV) {
            this.props.getAssignmemStudentNotDone(id, this.props.detailStudentWaitingAddmission.idSV);
        }

    }
    componentDidUpdate(prevProps, prevState){
        if(!isEqual(prevProps.detailStudentWaitingAddmission,this.props.detailStudentWaitingAddmission)){
            const idGV = JSON.parse(localStorage.getItem('infoUser')).idGV;
         
            this.setState({
                DetailAssignment:{
                    idSV : this.props.detailStudentWaitingAddmission.idSV
            }
        },()=>{
            this.props.getAssignmemStudentNotDone(idGV, this.props.detailStudentWaitingAddmission.idSV);
        })
        }
    }
}


function mapStateToProps(state) {
    return {
        assignmentStudentNotDone: state.ManageUserReducer.assignmentStudentNotDone,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAssignmemStudentNotDone: (idGV, idSV) => {
            dispatch(getAssignmemStudentNotDoneAction(idGV, idSV))
        },
        addMission: (data) => {
            dispatch(addMissionAction(data))
        },

    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(ModalAddMission);