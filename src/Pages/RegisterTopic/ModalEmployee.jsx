import React from 'react'
import { settings } from '../../Commons/Settings'

export default function ModalEmployee(props) {
    return (
        <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "700px" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thông tin nhân viên</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body d-flex">

                        <div className="modal-body-left w-50">
                            <img src={settings.domain + '/' + props.mentor.hinhAnh} alt="Error" />
                        </div>
                        <div className="modal-body-right w-50">

                            <p><span className='font-weight-bold'>Họ tên</span> : <span>{props.mentor.tenNV}</span></p>
                            <p><span className='font-weight-bold'>Số điện thoại</span> : <span>{props.mentor.sdt}</span></p>
                            <p><span className='font-weight-bold'>Email</span> : <span>{props.mentor.email}</span></p>
                            <p><span className='font-weight-bold'>Công ty</span> : <span>{props.mentor.tenCty}</span></p>
                            <p><span className='font-weight-bold'>Địa chỉ</span> : <span>{props.mentor.diaChi}</span></p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
