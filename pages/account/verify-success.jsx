import React from 'react';
import Head from 'next/head';
import LeftPannel from '../../components/partials/NewAccount/LeftPannel';
import Success from '../../components/partials/NewAccount/Success';

const VerifySuccess = () => {
    return (
        <div className="ps-my-account" >
            <Head>
                <title>Login</title>
            </Head>
            <main className="form-wrapper flex space-between">
            <div className="login-left flex justify-center text-center">
                <LeftPannel />
            </div>
            <div className="login-right flex justify-center">
                <Success/>
            </div>
        </main>
        </div>
    );
};

export default VerifySuccess;
