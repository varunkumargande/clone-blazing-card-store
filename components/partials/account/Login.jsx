
import React from 'react';
import Head from 'next/head'
import Login from '../NewAccount/Login';
import LeftPannel from '../NewAccount/LeftPannel';
export default function LoginPage(props) {


    return (
        <div className="ps-my-account" onKeyPress={e => enterKeyEvent(e)}>
            <Head>
                <title>Login</title>
            </Head>
            <main className="form-wrapper flex space-between">
            <div className="login-left flex justify-center text-center">
                <LeftPannel />
            </div>
            <div className="login-right flex justify-center">
                <Login/>
            </div>
        </main>
        </div>
    );
}





