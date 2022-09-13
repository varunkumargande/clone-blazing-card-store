import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import  Router  from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import { MoreOutlined } from '@ant-design/icons';
import {addressListApi, delAddressApi} from '../../../api';
import {editDetail} from '../../../store/setting/action';
import Head from 'next/head'


function AddCard() {
    const [addressData,setAddressData]=useState()
    const [delStatus,setDelStatus]=useState(0)
    const [addressLoader,setAddressLoader]=useState(true)
    const [mousehowedit,setmousehowedit]=useState(true)
    const dispatch=useDispatch()

    useEffect(()=>{
        setDelStatus(0)
        addressList()
    },[delStatus])

    const addressList=()=>{
        setAddressLoader(true)
        addressListApi(setAddressData,setAddressLoader)
    }

    const deleteAddress=(id)=>{
        setmousehowedit(false)
        delAddressApi(id,setDelStatus)
    }

    const editAddess = (detail) =>{
        
        dispatch(editDetail(detail));
        Router.push('/account/addaddresses_edit/[eaid]',`/account/addaddresses_edit/${detail.addressId}`)
    }

    const  mouseOverFunc=()=>{
        setmousehowedit(true)
      
           }

    return(
        <section className="cus-account-container">
        <div className="cus-account-subcontainer">
        <Head>
                <title>My Card Details</title>
            </Head>
            <div className="cus-position-container">
                <AccountNav keyValue={3}/>
                <div className="cus-right-position">
                    <div className="adr-subcontainer">
                        <div className="adr-main-contain">
                            <button onClick={e=>Router.push('/account/addcarddetails')}>+ ADD NEW CARD</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    )
}

export default AddCard