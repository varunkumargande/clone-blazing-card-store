import React, { Component, useEffect } from "react";
//import {ConnectPlugin} from '../../../connectPlugins';
import { connect, useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { Radio, Space } from "antd";
// import {Space} from '@ant-design/icons'
import Select from "react-select";
import Head from 'next/head'
import { useTranslation } from '../../../../i18n'
function FormAddressAddEdit({
  fname,
  setFname,
  address,
  setAddress,
  address1,
  setAddress1,
  city,
  setCity,
  postCode,
  setPostCode,
  countryData,
  zoneData,
  zoneId,
  setZoneId,
  zoneName,
  setZoneName,
  zoneComp,
  setZoneComp,
  countryId,
  setCountryId,
  countryName,
  setCountryName,
  addressType,
  setAddressType,
  fnameError,
  cityError,
  countryError,
  zoneError,
  addressError,
  postalError,
  addressError1,
  submit,
  apiCallAdd,
  type,
}) {
  const [defNation, setDefaultNation] = useState("");
  const { t } = useTranslation('common');

  useEffect(() => {
    if (type === "edit") {
      let defaultNationTemp = "";
      if (countryData && countryData.length !== 0) {
        defaultNationTemp =
          countryData &&
          countryData.find((data) => data.countryId === countryId);
       
        setDefaultNation(defaultNationTemp.name);
        setCountryName(defaultNationTemp.name);
      }
    }
  }, [countryData]);

  let arrayComp = [];

  if (countryData !== []) {
    var len = countryData.length;
    for (var i = 0; i < len; i++) {
      arrayComp.push({
        value: countryData[i].countryId,
        label: countryData[i].name,
      });
    }
  }

// useEffect(()=>{
//   setZoneName([])
//   setZoneComp([])
// },[ setZoneName])


  const zoneCreate = (countryValueId)=> {
    setZoneName([])
    // setZoneComp([])
    let zoneArray = zoneData;
    let zoneFilter=[];
    let  zoneFilter1=[]
   
    let zoneMainArray = [];
    if(zoneData.length !== 0 ) {
       
        zoneFilter1 =  zoneArray.filter((zone)=>zone.country != null )
       
        if(zoneFilter1.length !==0){
            zoneFilter =  zoneFilter1.filter((zone)=>zone.country.countryId === countryValueId)
         
    
        if(zoneFilter.length!==0) {
            var zonelength=zoneFilter.length;
            for (var i = 0; i < zonelength; i++) {
                zoneMainArray.push({
                    value: zoneFilter[i].zoneId,
                    label: zoneFilter[i].name,
                });
            }
            setZoneComp(zoneMainArray)
        } else {
            setZoneComp([])
        }
    }
    }
}

  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: state.isFocused ? "#fff" : "transparent",
      color: "#495057",
      // border: "1px solid",
      borderRadius: "0",
      height: "50px",
      boxShadow: state.isFocused ? 0 : 0,
      backgroundColor: "#f6f6f6",
      border: "none",
      // borderColor: state.isFocused
      // ? "#fcb800"
      // : "#ced4da",
      // '&:hover': { borderColor: 'none' }
    }),
  };

  

const colourStylesError={

control: (styles,state) => ({ ...styles,
    // border: "1px solid",
    borderColor:"red",
    borderRadius: "0",height: "50px",
    boxShadow: state.isFocused ? 0 : 0,
   
    '&:hover': { borderColor: 'none' }
}),
}
  const CancelClick = () => {
    Router.push("/account/addresses");
  };

  const validNameFill = (value) => {
    var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
    var regex = new RegExp(roleExpression);
    var t = value;
    if (!t.match(regex)) {
      setFname(value);
    }
  };
  const validcityFill = (value) => {
    var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
    var regex = new RegExp(roleExpression);
    var t = value;
    if (!t.match(regex)) {
      setCity(value);
    }
  };

  return (
    // {zoneData.length >0?
    <>
      <div className="aa-subcontainer">
      <Head>
                <title> Add Address</title>
            </Head>
     
      
        <div className="aa-form-container">
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Name')}*</p>
              <input
                placeholder={t('account.Name')}
                value={fname}
                onChange={(e) => validNameFill(e.target.value)}
                style={{border: submit === 1 && fnameError !== ""  && "1px solid red"}}
              />
              {submit === 1 && fnameError !== "" && (
                <span className="error-span">{fnameError}</span>
              )}
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Country')}*</p>
              <Select
                placeholder="Country *"
                onChange={(e) => {
                  setCountryId(e.value);
                  setDefaultNation(e.label);
                  setCountryName(e.label);
                  zoneCreate(e.value);
                }}
                isSearchable={true}
                options={arrayComp}
                // styles={colourStyles}
                styles={submit === 1 && countryError !== "" ?colourStylesError:colourStyles}
                value={{ value: countryId, label: defNation }}
              />
              {submit === 1 && countryError !== "" && (
                <span className="error-span">{countryError}</span>
              )}
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Address')} 1*</p>
              <input
                placeholder={t('account.Address')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{border: submit === 1 && addressError !== ""  && "1px solid red"}}
              />
              {submit === 1 && addressError !== "" && (
                <span className="error-span">{addressError}</span>
              )}
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
            
              <p>{t('account.State')} *</p>
              {zoneComp && zoneComp.length !== 0 ? (
                <Select
                  onChange={(e) => {
                    setZoneId(e.value);
                    setZoneName(e.label);
                    // zoneCreate(e.value);
                   
                   
                  }}
                  isSearchable={true}
                  showSearch
                  options={zoneComp}
                  styles={colourStyles}
                 
                  value={{ label: zoneName }}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  style={{border: submit === 1 && zoneError !== ""  && "1px solid red"}}
                />
              )}
              {submit === 1 && zoneError !== "" && (
                <span className="error-span">{zoneError}</span>
              )}
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Address')}2 *</p>
              <input
                placeholder={t('account.Address')}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                style={{border: submit === 1 && addressError1 !== ""  && "1px solid red"}}
              />
              {submit === 1 && addressError1 !== "" && (
                <span className="error-span">{addressError1}</span>
              )}
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('registerdetail.city')} *</p>
              <input
                placeholder={t('registerdetail.city')}
                value={city}
                onChange={(e) => validcityFill(e.target.value)}
                style={{border: submit === 1 && cityError !== ""  && "1px solid red"}}
              />
              {submit === 1 && cityError !== "" && (
                <span className="error-span">{cityError}</span>
              )}
            </div>
          </div>
          <div className="aa-address-type">
            <label style={{ width: "100%" }}>{t('account.AddressType')}</label>
            <Radio.Group
              name=""
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
            >
              {/* <space direction="vertical"> */}
              <Radio value={1}>{t('Shared.Home')}</Radio>
              <Radio value={2}>{t('account.Work')}</Radio>
              {/* </space> */}
            </Radio.Group>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Pincode')} *</p>
              <input
                placeholder={t('account.Pincode')}
                value={postCode}
                onChange={(e) =>
                  e.target.value.length <= 6 && setPostCode(e.target.value)
                  
                }
                style={{border: submit === 1 && postalError !== ""  && "1px solid red"}}
                type="number"
              />
              {submit === 1 && postalError !== "" && (
                <span className="error-span">{postalError}</span>
              )}
            </div>
          </div>
          <div className="aa-input-button">
            <button
              className="aa-input-save-button"
              onClick={(e) => apiCallAdd()}
            >
              {t('account.SaveAddress')}
            </button>
            <button
              className="aa-input-cancel-button"
              onClick={(e) => CancelClick()}
            >
              {t('account.Cancel')}
            </button>
          </div>
        </div>
      </div>
      "
    </>
  );
}
export default FormAddressAddEdit;
