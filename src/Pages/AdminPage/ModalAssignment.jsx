// import { isEqual } from 'lodash';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { getListTeacherAndQuantityStudentAction } from '../../Redux/Actions/ManageUsers.Action';



// class ModalAssignment extends Component {

//     constructor(props) {
//         super(props);
//         this.state = ({
//             teacher: {
//                 idGV: "",
//                 idSV: this.props.idSV
//                 // ds_idSV: [this.props.idSV]

//             }
//         })

//     }

//     handleChange = (event) => {
//         let { value, name } = event.target;
//         this.setState({
//             teacher: { ...this.state.teacher, [name]: value },

//         }, () => {
//             console.log(this.state.teacher)
//         })
//     }

//     renderSelectTeacher = (array) => {
//         return array?.map((ele, index) => {

//             return (
//                 <option key={index} value={ele.idGV}>
//                     {ele.tenGV} - đang hướng dẫn : {ele.soLuongSvDangHD} sinh viên
//                 </option>
//             )
//         })
//     }

//     render() {
//         return (
//             <div className="modal fade" id="exampleModalAss" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Danh Sách Giảng Viên</h5>
//                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                 <span aria-hidden="true">×</span>
//                             </button>
//                         </div>
//                         <div className="modal-body d-flex">


//                             <select onChange={this.handleChange}
//                                 value={
//                                     this.state.teacher.idGV

//                                 } id="idGV" name="idGV" style={{ width: "500px" }}>
//                                 <option defaultValue="">---</option>
//                                 {this.renderSelectTeacher(this.props.ListTeacherAndQuantityStudent)}
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//     componentDidMount = () => {
//         this.props.getListTeacherAndQuantityStudent();
//     }
//     componentDidUpdate = (prevProps, prevState) => {
//         if (!isEqual(prevProps.idSV, this.props.idSV)) {

//             this.setState({ idSV: this.props.idSV });

//         }
//     }

// }

// function mapStateToProps(state) {
//     return {
//         ListTeacherAndQuantityStudent: state.ManageUserReducer.ListTeacherAndQuantityStudent
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getListTeacherAndQuantityStudent: () => {
//             dispatch(getListTeacherAndQuantityStudentAction())
//         }
//     };
// }
// export default connect(
//     mapStateToProps, mapDispatchToProps
// )(ModalAssignment);