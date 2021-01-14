import React from 'react'
import { settings } from '../../Commons/Settings'

export default function ModalTeacher(props) {
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thông tin giảng viên</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body d-flex">

                        <div className="modal-body-left w-50">
                            <img src={settings.domain + '/' + props.teacher.hinhAnh} alt="Error" />
                        </div>
                        <div className="modal-body-right w-50">

                            <p><span className='font-weight-bold'>Họ tên</span> : <span>{props.teacher.tenGV}</span></p>
                            <p><span className='font-weight-bold'>Số điện thoại</span> : <span>{props.teacher.sdt}</span></p>
                            <p><span className='font-weight-bold'>Email</span> : <span>{props.teacher.email}</span></p>
                            <p><span className='font-weight-bold'>Học hàm học vị</span> : <span>{props.teacher.hhhv}</span></p>
                            <p><span className='font-weight-bold'>Bộ môn</span> : <span>{props.teacher.tenBoMon}</span></p>
                            <p><span className='font-weight-bold'>Chức vụ</span> : <span>{props.teacher.tenChucVu}</span></p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
