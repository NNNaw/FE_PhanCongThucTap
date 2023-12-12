import React, { Component } from 'react';
import { connect } from 'react-redux';
import './simple-sidebar.css'
import './../../Pages/RegisterTopic/paginate.css'
import { getAccountsConfirmedAction, getAccountsUnconfirmAction, getDetailListStudentWaitingAssignmentAction } from './../../Redux/Actions/ManageUsers.Action'
import { isEqual } from 'lodash';
import MyDataTable from './MyDataTable';
import DataTableUnConfirm from './DataTableUnConfirm';
import TblWaitingAssignment from './TblWaitingAssignment';


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            unConfirm: {
                offset: 0,
                perPage: 11,
                currentPage: 0,
                pageCount: 0,
            },
            Confirmed: {
                offset: 0,
                perPage: 11,
                currentPage: 0,
                pageCount: 0,
            },
        })
    }




    render() {


        return (
            <div className='Admin w-100'>

                <div className='Admin container color-bg' style={{ backgroundColor: "#f8f9fa" }}>
                    <ul className="nav nav-tabs d-flex justify-content-center my-5" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tài Khoản Chờ Duyệt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Tài Khoản Đã Duyệt</a>
                        </li>

                    </ul>
                    <div className="tab-content" id="myTabContent">

                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <DataTableUnConfirm data={this.props.accountUnconfirmed} />

                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <MyDataTable data={this.props.accountConfirmed} />
                            <div className="" style={{ height: "100px" }}></div>
                            <TblWaitingAssignment data={this.props.DetailListStudentWaitingAssignment}></TblWaitingAssignment>
                        </div>

                    </div>
                </div>
                {/* {isDisplayed != "" ? 
                <ModalAssignment idSV = {isDisplayed}></ModalAssignment>
                :
                <ModalAssignment idSV = {0}></ModalAssignment> */}
            
            </div >
        );
    }

    componentDidMount() {
        setTimeout(() => {
             this.props.getAccountsConfirmed();
        },5)
        setTimeout(() => {
            this.props.getAccountsUnconfirm();

        },100)
        setTimeout(() => {
              this.props.getDetailListStudentWaitingAssignment();

        },151)
    }
    componentDidUpdate(prevProps, prevState) {

        if (!isEqual(prevProps.accountConfirmed, this.props.accountConfirmed)) {

            this.props.getAccountsConfirmed();

        }
    }
}





function mapStateToProps(state) {
    return {

        accountUnconfirmed: state.ManageUserReducer.accountUnconfirmed,
        accountConfirmed: state.ManageUserReducer.accountConfirmed,
        DetailListStudentWaitingAssignment: state.ManageUserReducer.DetailListStudentWaitingAssignment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccountsConfirmed: () => {
            dispatch(getAccountsConfirmedAction())
        },
        getAccountsUnconfirm: () => {
            dispatch(getAccountsUnconfirmAction())
        },
        getDetailListStudentWaitingAssignment: () => {
            dispatch(getDetailListStudentWaitingAssignmentAction())
        },
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(Admin);