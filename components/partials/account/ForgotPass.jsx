import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { Form, Input } from 'antd';
import { useState,useEffect } from 'react';
import {forgotApi} from '../../../api/auth/forgotPassword'
import  Router  from "next/router";
import Link from 'next/link';
import ForgetPassword from '../NewAccount/ForgetPassword';
import Head from 'next/head';
import LeftPannel from '../NewAccount/LeftPannel';

function ForgotPassword(){
    const [mail,setMail]=useState("")
    const [forgotSuccess,setForgotSuccess]=useState(false)

   
    const validateMessages = {
        required: '${name} id is required!',
        types: {
          email: 'Invalid Email Id'
        },
      };

    const handleSubmit=()=>{    
        forgotApi(mail,setForgotSuccess)
    }

    return(
      <>
        <div className="ps-my-account" onKeyPress={e => enterKeyEvent(e)}>
            <Head>
                <title>Login</title>
            </Head>
            <main className="form-wrapper flex space-between">
            <div className="login-left flex justify-center text-center">
                <LeftPannel />
            </div>
            <div className="login-right flex justify-center">
                <ForgetPassword />
            </div>
        </main>
        </div>
      </>
    )
}

export default ForgotPassword;
