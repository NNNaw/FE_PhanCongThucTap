import DataTable from 'react-data-table-component';
import React, { Component, Fragment } from 'react';
import { settings } from '../../Commons/Settings';

var dateFormat = require('dateformat')


const Button = () => {
  return (
    <div>
      <button className='btn btn-success mr-3' type="button">Xem</button>
      <button className='btn btn-danger' type="button">Xóa</button>
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
    cell: () => <Button></Button>,
    button: true,
    center: true,
  },
];

const handleChange = (state) => {
  // You can use setState or dispatch with something like Redux so we can use the retrieved data
  console.log('Selected Rows: ', state.selectedRows);

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

export default class MyDataTable extends Component {



  render() {
    return (
      <Fragment>

       
        <DataTable
          striped="true"
          highlightOnHover="true"
          pointerOnHover="true"
          noDataComponent="Không có data"
        
          Clicked

          onSelectedRowsChange={handleChange}



          selectableRowsHighlight="true"
          selectableRowsVisibleOnly="true"
          pagination="true"
          title="Danh Sách Tài Khoản Đã Duyệt"
          // progressPending="true"

          expandableRows
          expandableRowsComponent={<ExpandableComponent />}
          columns={columns}
          data={this.props.data}

        // expandableRows
        // expandableRowsComponent={<ExpandableComponent />}

        />
      </Fragment>

    )
  }
};

