import React, { useEffect } from 'react';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import ForgotPassword from '../../components/partials/account/ForgotPass';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
// import NavigationList from '../../components/shared/navigation/NavigationList';
import useNetwork from '../../components/reusable/NetworkCheck';
import Router from 'next/router';
import { useSelector } from "react-redux";
import { TostMessage } from "../../components/partials/ToastMessage/ToastMessage";
const ForgotPasswordPage = () => {
    const toast = useSelector((state) => state?.toast?.toast);
    const network = useNetwork()

    useEffect(() => {
        if (network === false) { Router.push('/network-error') }
    }, [])



    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'forgot password',
        },
    ];
    return (
        <div className="site-content">
            {/* <HeaderDefault />
            <HeaderMobile />
            <NavigationList /> */}
            <div className="ps-page--simple">
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                <ForgotPassword />
            </div>
            {!!toast.message && <TostMessage data={toast}></TostMessage>}
            {/* <FooterDefault /> */}
        </div>
    );
};

export default ForgotPasswordPage;