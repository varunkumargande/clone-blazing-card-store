import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import  Router  from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import { Radio,Space } from 'antd';
import FormAddressAddEdit from './modules/FormAddress';
import {countryListApi, editAddressApi, UserAddAddress} from '../../../api';
import {zoneListApi} from '../../../api/account/zoneList';
import { useTranslation } from '../../../i18n'


function CustomAddAddress({type,addressId}){

    const [fname,setFname]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState("")
    const [address1,setAddress1]=useState("")
    const [city,setCity]=useState("")
    const [postCode,setPostCode]=useState("")
    const [num,setNum]=useState("")
    let currentColor=useSelector(s=>s.palette.currentColor)
    const [countryId,setCountryId]=useState("")
    const [countryData,setCountryData]=useState([])
    const [countryName,setCountryName] = useState("")
    const [fnameError,setFnameError] =useState("")
    const [numError,setNumError]=useState("")
    const [emailError,setEmailError] = useState("")
    const [addressError,setAddressError] =useState("")
    const [addressError1,setAddressError1] =useState("")
    const [cityError,setCityError] =useState("")
    const [postalError,setPostalError]=useState("")
    const [countryError,setCountryError]=useState("")
    const [zoneData,setZoneData]=useState([])
 
    const [zoneId,setZoneId]=useState("")
    const [zoneName,setZoneName]=useState("")
    const [zoneError,setZoneError]=useState("")
    const [addressType,setAddressType]=useState(1)
    const [submit,setSubmit]=useState(0)
    const [zoneComp,setZoneComp]=useState([])
    const { t } = useTranslation('common');
    const editAddress =useSelector(s=>s.setting).editDetail;


    const apiCallFunc=()=>{
        countryListApi(setCountryData)
        zoneListApi(setZoneData)
    }
    

    useEffect(()=>{
        apiCallFunc()
        if(type==="edit") {
            if(editAddress && editAddress.address1) {
                setFname(editAddress.company)
                setAddress(editAddress.address1)
                setAddress1(editAddress.address2)
                setCity(editAddress.city)
                setCountryId(editAddress.countryId)
                setPostCode(editAddress.postcode)
                setZoneName(editAddress.state)
                setAddressType(editAddress.addressType)
            }
        } else {
            setFname("")
            setAddress("")
            setAddress1("")
            setCity("")
            setCountryId("")
            setPostCode("")
            setZoneName("")
            setAddressType(1)
            setCountryName("")
        }
        
    },[])

   
    useEffect(()=>{
        validate()
    },[fname,address,address1,countryId,zoneName,postCode,city])

    const validate = () => {
        let validateObj = {fnameSub:true,addressSub:true,citySub:true,countryNameSub:true,postCodeSub:true,zoneNameSub:true,addressSub1:true}
        if(fname === ""){
            setFnameError("Name is required")
            validateObj.fnameSub = false;
        }
         else {
            setFnameError("")
            validateObj.fnameSub = true;
        }


        if(address===""){
            setAddressError("Address is required")
            validateObj.addressSub = false;
        } else {
            setAddressError("")
            validateObj.addressSub = true;
        }

        if(address1===""){
            setAddressError1("Address is required")
            validateObj.addressSub1 = false;
        } else {
            setAddressError1("")
            validateObj.addressSub1 = true;
        }

        if(city === "") {
            setCityError("City is required")
            validateObj.citySub = false;
        } else {
            setCityError("")
            validateObj.citySub = true;
        }

        if(countryName === "") {
            setCountryError("Country is required")
            validateObj.countryNameSub = false;
        } else {
            setCountryError("")
            validateObj.countryNameSub = true;
        }

        if(postCode === "") {
            setPostalError("Post code is required")
            validateObj.postCodeSub = false;
        } else {
            setPostalError("")
            validateObj.postCodeSub = true;
        }

        if(zoneName === "") {
            setZoneError("State is required")
            validateObj.zoneNameSub = false;
        } else {
            setZoneError("")
            validateObj.zoneNameSub = true;
        }

        if(validateObj.fnameSub  && validateObj.addressSub && validateObj.postCodeSub  && validateObj.zoneNameSub && validateObj.addressSub1 && validateObj.countryNameSub && validateObj.citySub) {
                return true;
        } else {
            return false;
        }
    }

    const apiCallAdd=()=>{
        setSubmit(1);
        validate();
        
        if(validate()) {
            if(type === "add") {
                UserAddAddress(address,address1,city,countryId,zoneName,postCode,Router,addressType,fname,setFname,setAddress,setAddress1,setCity,setCountryId,setZoneName,setPostCode,setAddressType)
            } else {
                editAddressApi(addressId,address,address1,city,countryId,zoneName,postCode,Router,addressType,fname,setFname,setAddress,setAddress1,setCity,setCountryId,setZoneName,setPostCode,setAddressType)

            }

        }
    }

    return(
        <section className="cus-account-container">
            
            <div className="cus-account-subcontainer">
              <div className="cus-position-container">
                <AccountNav keyValue={"0"}/>
                <div className="cus-right-position">
                    <div className="aa-container">
                        <h3>{t('account.AddAddress')}</h3>
                        <FormAddressAddEdit fname={fname} setFname={setFname} address={address} setAddress={setAddress} address1={address1} setAddress1={setAddress1}
                        city={city} setCity={setCity} postCode={postCode} setPostCode={setPostCode} zoneData={zoneData} countryData={countryData} zoneId={zoneId} setZoneId={setZoneId} zoneName={zoneName} setZoneName={setZoneName}
                        zoneComp={zoneComp} setZoneComp={setZoneComp} setCountryId={setCountryId} countryId={countryId} countryName={countryName} setCountryName={setCountryName} addressType={addressType} setAddressType={setAddressType}
                        fnameError={fnameError} cityError={cityError} countryError={countryError} zoneError={zoneError} addressError={addressError} postalError={postalError} submit={submit} addressError1={addressError1} apiCallAdd={apiCallAdd} type={type}/>
                    </div>

                </div>
              </div>
            </div>
        </section>
    )
}
export default CustomAddAddress;