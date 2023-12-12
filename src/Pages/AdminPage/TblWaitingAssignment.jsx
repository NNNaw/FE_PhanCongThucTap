import memoize from 'memoize-one';
import React, { Component, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { settings } from '../../Commons/Settings';


import { connect } from 'react-redux';
import { addAssignmentToTeachAction, getListTeacherAndQuantityStudentAction } from '../../Redux/Actions/ManageUsers.Action';
import { isEqual } from 'lodash';

var dateFormat = require('dateformat')


// const Button = () => {
//     return (
//         <div>
//             <button className='btn btn-success mr-3' type="button"></button>
//             <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalAss" >
//                 Phân Công
//             </button>
//             <button className='btn btn-danger' type="button">Xóa</button>
//         </div>
//     )

// }



const ExpandableComponent = ({ data }) => <div className="d-flex p-3">
    <div className="DetailUser-container-left ">
        <img src={settings.domain + '/' + data.hinhAnh} alt="Error" style={{ width: "50px", height: "45px" }} />
    </div>
    <div className="DetailUser-container-right d-flex justify-content-around w-100">
        <div className="infoUser-static">
            <p className='item-row-detail'>
                <span className='label-user-text font-weight-bold'>Khoa</span> : <span>{data.tenKhoa}</span></p>

            <p className='item-row-detail'>
                <span className='label-user-text font-weight-bold'>Lớp</span> : <span>{data.tenLop}</span></p>

        </div>
        <div className="div">
            <p className='item-row-detail'>
                <span className='label-user-text font-weight-bold'>Mã Số</span> : <span>{data.idSV}</span></p>
            <p className='item-row-detail'>
                <span className='label-user-text font-weight-bold'>Họ Tên</span> : <span>{data.tenSV}</span></p>
        </div>
        <div className="infoUser-dynamic">
            <p className='item-row-detail'>
                <span className='label-user-text font-weight-bold'>Email</span> : <span>{data.email}</span></p>
            <p className='item-row-detail'>
                <span className='label-user-text font-weight-bold'>Phone</span> : <span>{data.sdt}</span></p>
        </div>
    </div>

</div>


class TblWaitingAssignment extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            detail_ass: {

                idGV: "",
                lst_idSV: []
            },
            isDisabled : true,

        })

    }

    updateState = state => {


        let elems = document.getElementsByClassName("btn-phanCong");

        for (let i = 0; i < elems.length; i++) {
            elems[i].disabled = this.state.isDisabled;
        }

        let arr = [];

        let list = state.selectedRows;

        Array.from(list).forEach(child => {
            arr.push(child.idSV)
        });

        this.setState(
            {
                detail_ass: {
                    ...this.state.detail_ass, lst_idSV: arr,
                    idGV: this.props.ListTeacherAndQuantityStudent[0].idGV
                },
                isDisabled: !this.state.isDisabled
            }, () => {
                console.log(this.state.isDisabled)
            });
    }
    onClickBtn = (idSv) => {
        let arr = [];
        arr.push(idSv)
        this.setState(
            {
                detail_ass: { ...this.state.detail_ass, lst_idSV: arr },
            }, () => {
                console.log(this.state.detail_ass)
            });
    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            detail_ass: { ...this.state.detail_ass, [name]: value },

        }, () => {
            console.log(this.state.detail_ass)
        })
    }

    columns = memoize(handleAction => [
        {
            name: 'Tài Khoản',
            selector: 'taiKhoan[0]',

            // sortable: true,
        },
        {
            name: 'Ngày Lập',
            selector: 'ngayLap',
            format: row => `${dateFormat(row.ngayLap, 'dd/mm/yyyy')}`,
            sortable: true,
        },
        {
            name: 'Ngày Duyệt',
            selector: 'ngayDuyet',
            format: row => `${dateFormat(row.ngayDuyet, 'dd/mm/yyyy')}`,
            sortable: true,
        },
        {
            name: 'Loại Tài Khoản',
            selector: 'tenLoai',
            // sortable: true,

            // right: true,
        },
        {
            name: 'Thao Tác',
            width: '300px',
            cell: row => <div>

                <button onClick={() => this.onClickBtn(row.idSV)}
                    type="button" className="btn btn-primary btn-phanCong" data-toggle="modal" data-target="#exampleModalAss" >
                    Phân Công
            </button>
                <button className='btn btn-danger' type="button">Xóa</button>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,
        },
    ]);


    renderSelectTeacher = (array) => {
        return array?.map((ele, index) => {

            return (
                <option key={index} value={ele.idGV}>
                    {ele.gioiTinh ? "Thầy " : "Cô "} {ele.tenGV} - đang hướng dẫn : {ele.soLuongSvDangHD} sinh viên
                </option>
            )
        })
    }

    render() {
        return (
            <Fragment>
                <DataTable
                    striped="true"
                    highlightOnHover="true"
                    pointerOnHover="true"
                    noDataComponent="Không có data"
                    selectableRows // add for checkbox selection
                    Clicked
                    // onSelectedRowsChange={handleChange}
                    selectableRowsHighlight="true"
                    selectableRowsVisibleOnly="true"
                    pagination="true"
                    title="Danh Sách Tài Khoản Sinh Viên Chờ Phân Công"
                    // progressPending="true"

                    expandableRows
                    expandableRowsComponent={<ExpandableComponent />}
                    className="TblWaitingAssignment"
                    columns={this.columns(this.updateState)}
                    onSelectedRowsChange={this.updateState}
                    data={this.props.data}



                />

                <div className="modal fade" id="exampleModalAss" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Danh Sách Giảng Viên</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <h5>Số lượng sinh viên đang chọn : {this.state.detail_ass.lst_idSV.length}</h5>

                                <select onChange={this.handleChange}
                                    value={
                                        this.state.detail_ass.idGV

                                    } id="idGV" name="idGV" style={{ width: "500px" }}>
                                    {/* <option defaultValue="">---</option> */}
                                    {this.renderSelectTeacher(this.props.ListTeacherAndQuantityStudent)}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className='btn btn-info' onClick={() => this.props.addAssignmentToTeach(this.state.detail_ass)}>Thêm Phân Công</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
    componentDidMount = () => {
        var tagDiv = document.getElementsByClassName('sc-kstrdz')[2];


        if (tagDiv.childElementCount === 0) {
            var button = document.createElement('BUTTON');
            // creating text to be 
            //displayed on button 
            var text = document.createTextNode("Phân Công");
            console.log(text)
            // appending text to button 
            button.appendChild(text);
            button.className = "btn btn-info";
            button.id = '#myBtn';
            //appending button to div 
            tagDiv.appendChild(button);


            // button.addEventListener("click", () => {

            // });

            document.getElementById("#myBtn").setAttribute("data-toggle", "modal");
            document.getElementById("#myBtn").setAttribute("data-target", "#exampleModalAss");
        }


        this.props.getListTeacherAndQuantityStudent();

    }
    componentDidUpdate = (prevProps, prevState) => {
        // console.log(this.props.ListTeacherAndQuantityStudent[0].idGV)
        if (!isEqual(prevProps.ListTeacherAndQuantityStudent, this.props.ListTeacherAndQuantityStudent)) {

            this.setState({
                detail_ass: {
                    ...this.state.detail_ass, idGV:
                        this.props.ListTeacherAndQuantityStudent[0].idGV
                }
            });
        }
    }
}
function mapStateToProps(state) {

    return {
        ListTeacherAndQuantityStudent: state.ManageUserReducer.ListTeacherAndQuantityStudent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListTeacherAndQuantityStudent: () => {
            dispatch(getListTeacherAndQuantityStudentAction())
        },

        addAssignmentToTeach: (data) => {
            dispatch(addAssignmentToTeachAction(data))
        }
    }
}
export default connect(
    mapStateToProps, mapDispatchToProps)(TblWaitingAssignment);