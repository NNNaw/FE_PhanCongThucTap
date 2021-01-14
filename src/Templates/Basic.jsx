import React, { Fragment } from 'react';
import { Route } from "react-router-dom"
import Header from "../Components/Header/Header"
import Footer from '../Pages/Home/Footer';


const HomeLayout = (props) => {
    return <Fragment>
        <Header />
        {/* <NavHeader /> */}
        {props.children}
        <Footer />

    </Fragment>
}

export const Basictemplate = ({ Component, ...props }) => (
    <Route {...props} render={(propComponent) => (
        <HomeLayout>
            <Component {...propComponent} />
        </HomeLayout>
    )} />
)