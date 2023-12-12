import DataTable from 'react-data-table-component';
import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux'
import { confirmAccountByAdminAction,insertUserByFileAction } from '../../Redux/Actions/ManageUsers.Action';
import { settings } from '../../Commons/Settings';
import './simple-sidebar.css';

var dateFormat = require('dateformat')

let arrayData = [];


const Button = () => {

    return (
        <div>
            <button className='btn btn-success mr-3' type="button">Duyệt</button>
            <button className='btn btn-danger' type="button">Từ Chối</button>
        </div>
    )

}


const columns = [
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
        name: 'Loại Tài Khoản',
        selector: 'tenLoai',
        // sortable: true,

        // right: true,
    },
    {
        name: 'Thao Tác',
        width: '300px',
        cell: () => <Button></Button>,
        button: true,
        center: true,
    },
];

const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);


    state.selectedRows.forEach(element => {
        arrayData.push(element.taiKhoan)
    });



};

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

class DataTableUnConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileSelected: null,
            indexSelected: -1,
        }
    }
    handleChangeFile = (event) => {
        this.setState({
            fileSelected: event.target.files[0],

        }, () => {
            console.log(this.state.fileSelected)
        });
    }

    render() {
        return (
            <Fragment>

                {this.state.fileSelected === null ?
                    <span className="btn-choosefile ">
                        <i className="fa fa-plus" aria-hidden="true"></i> Thêm Bằng File Excel
                    <input onChange={this.handleChangeFile}
                            type="file" id="file" name="file" />
                    </span> :
                    <button className='btn-submitfile' onClick={() => this.props.insertUserByFile(this.state.fileSelected)}>
                        <i className="fa fa-paper-plane"></i> Submit File
                    </button>

                }

                <DataTable
                    striped="true"
                    highlightOnHover="true"
                    pointerOnHover="true"
                    noDataComponent="Không có data"

                    selectableRows // add for checkbox selection
                    Clicked
                    onSelectedRowsChange={handleChange}

                    selectableRowsHighlight="true"
                    selectableRowsVisibleOnly="true"

                    pagination="true"

                    title="Danh Sách Tài Khoản Chờ Duyệt"

                    // progressPending="true"

                    expandableRows
                    expandableRowsComponent={<ExpandableComponent />}
                    columns={columns}
                    data={this.props.data}

                // expandableRows
                // expandableRowsComponent={<ExpandableComponent />}

                />
            </Fragment>
        );
    }
    componentDidMount() {
        var tagDiv = document.getElementsByClassName('sc-kstrdz')[0];
        
        if (tagDiv.childElementCount === 0) {
            var button = document.createElement('BUTTON');
            // creating text to be 
            //displayed on button 
            var text = document.createTextNode("Duyệt");
            console.log(text)
            // appending text to button 
            button.appendChild(text);
            button.className = "btn btn-success";
            //appending button to div 
            tagDiv.appendChild(button);

            arrayData = [];
            button.addEventListener("click", () => {
                this.props.confirmAccountByAdmin(arrayData);
            });
        }


    }
}
const mapStateToProps = state => {
    return {
        User: state.ManageUserReducer.User,
        notifyByAccount: state.ManageUserReducer.notifyByAccount,
    }
}
const mapDispatchToProps = dispatch => {
    return {

        confirmAccountByAdmin: (data) => {
            dispatch(confirmAccountByAdminAction(data))
        },
        
        insertUserByFile: (file) => {
            dispatch(insertUserByFileAction(file))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTableUnConfirm);