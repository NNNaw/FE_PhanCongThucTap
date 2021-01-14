import React from 'react'

export default function CommonInfo() {
    return (
        <div className='CommonInfo container'>
            <div className="CommonInfo-container">
                <div className="div-title">
                    <h4 className='CommonInfo-title'>Thông tin chung</h4>
                </div>
                <div className="CommonInfo-local">
                    <h5 className='text-underline'>Một số lưu ý quan trọng:</h5>
                    <ul>
                        <li>
                            <h5 className='text-red'>
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                Địa chỉ các cơ sở học của trường:</h5>

                            <ul>
                                <li className='text-red'>
                                    Địa điểm học học phần CIS103 - Hệ thống thông tin ngân hàng:
                                    Trung tâm đào tạo Sacombank - 270B Bạch Đằng, P.24, Q. Bình Thạnh,
                                    TP.HCM. SCB_TANG4: Phòng học lý thuyết: Phòng Saphire, tầng 4; SCB_HTLAU3:
                                    Phòng học thực hành: Hội trường lầu 3.
                                </li>
                                <li>
                                    <span className='text-highlight' >Ký hiệu phòng: A, B</span>: 475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM
                                </li>
                                <li>
                                    <span className='text-highlight'> Ký hiệu phòng: U</span>: 31/36 Ung Văn Khiêm, P.25, Q.Bình Thạnh, TP.HCM.
                                    </li>
                                <li >
                                    <span className='text-highlight'> Ký hiệu phòng: E</span>: Lô E1, Phân khu đào tạo E1,
                                    Khu Công Nghệ cao TP.HCM, Phường Hiệp Phú, Quận 9, TP.HCM.
                                </li>
                                <li>
                                    <span className='text-highlight'>Ký hiệu phòng: R</span>: Viện Công nghệ Cao Hutech, Lô E2B4, đường D1,
                                    Phường Long Thạnh Mỹ, khu Công Nghệ Cao, Quận 9, TP.HCM.
                                </li>
                                <li>
                                    <span className='text-highlight'>Ký hiệu phòng: D</span>: 276 Điện Biên Phủ, P.17, Q. Bình Thạnh, TP.HCM.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h5 className='text-red'>
                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                Thời gian học:</h5>
                            <ul>
                                <li> Buổi sáng: Ca 1
                                (tiết 1,2,3): từ 06g45' đến 09g00' -
                                     Ca 2 (tiết 4,5,6): từ 09g20' đến 11g35'</li>
                                <li>
                                    Buổi chiều: Ca 3 (tiết 7,8,9): từ 12g30' đến 14g45'
                                    - Ca 4 (tiết 10,11,12): từ 15g05' đến 17g20'
                                </li>
                                <li>
                                    Buổi tối: Ca 5 (tiết 13,14,15): từ 18g00' đến 20g15'
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h5 className='text-red'>
                                <i className="fa fa-sticky-note" aria-hidden="true"></i>Một số lưu ý:</h5>
                            <ul>
                                <li>
                                    Để được tư vấn, hướng dẫn đăng kí đề tài, sinh viên cần liên hệ Văn phòng Khoa, trụ sở chính của Trường
                                </li>
                                <li>
                                    Giờ làm việc ở trường: buổi sáng 7g30 - 11g30 (T2 đến T6) ;
                                    buổi chiều 13g30 - 16g30 (T2 đến T6); buổi tối 17g - 19g30 (T2 đến T6)

                                </li>
                                <li>
                                    Nộp đơn đăng ký đề tài thực tập tại Phòng Đào tạo. Thời gian trực buổi tối: từ 17g - 19g30.

                                </li>
                                <li>
                                    Sau khi đăng kí đề tài thành công, sinh viên cần phải in kết quả đăng ký

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
