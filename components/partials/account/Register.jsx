import React, { useEffect } from 'react';
import Head from 'next/head'
import Signup from '../NewAccount/Signup';
import LeftPannel from '../NewAccount/LeftPannel';


export default function Register(auth) {
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
                    <Signup />
                </div>
            </main>
        </div>
    );

}

