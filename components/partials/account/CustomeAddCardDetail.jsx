import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import { Radio, Space } from 'antd';
import FormAddressAddEdit from './modules/FormAddress';
import { countryListApi, editAddressApi, UserAddAddress } from '../../../api';
import { zoneListApi } from '../../../api/account/zoneList';
import { useTranslation } from '../../../i18n'
import Select from "react-select";

function CustomAddCardDetail({ type, addressId }) {
    const [cardNumber, setCardNumber] = useState("")
    const [country, setCountry] = useState("")
    const [expiary, setExpiary] = useState("")
    const [cvc, setCVC] = useState("")


    const [cardNumberError, setCardNumberError] = useState("")
    const [countryError, setCountryError] = useState("")
    const [expiaryError, setExpiaryError] = useState("")
    const [cvcError, setCVCError] = useState("")

    useEffect(() => {
        validate()
    }, [cardNumber, country, expiary, cvc])

    const options = [
        { value: 'Usa', label: 'USA' },
        { value: 'UK', label: 'UK' },
      ];

    const validate = () => {

        let validateObj = { cardNumber: true, country: true, expiary: true, cvc: true }
        if (cardNumber === "") {
            setCardNumberError("Card Number is required")
            validateObj.cardNumber = false;
        }
        else {
            setCardNumberError("")
            validateObj.cardNumber = true;
        }

        if (country === "") {
            setCountryError("Country is required")
            validateObj.country = false;
        }
        else {
            setCountryError("")
            validateObj.country = true;
        }


        if (expiary === "") {
            setExpiaryError("Expiary Date is required")
            validateObj.expiary = false;
        }
        else {
            setExpiaryError("")
            validateObj.expiary = true;
        }

        if (cvc === "") {
            setCVCError("CVC number is required")
            validateObj.cvc = false;
        }
        else {
            setCVCError("")
            validateObj.cvc = true;
        }


        if (validateObj.cardNumber && validateObj.country && validateObj.cvc && validateObj.expiary) {
            return true
        } else {
            return false
        }
    }

    const apiCallAdd = () => {
        console.log(validate())
    }

    const CancelClick = () => {
        Router.push("/account/card-details");
    };

    return (
        <section className="cus-account-container">

            <div className="cus-account-subcontainer">
                <div className="cus-position-container">
                    <AccountNav keyValue={"0"} />
                    <div className="cus-right-position">
                        <div className="aa-container">
                            <h3>Add Card Detail</h3>
                            <div className="aa-form-container">
                                <div className="aa-input-main">
                                    <div className="aa-input-container">
                                        <p>Card Number*</p>
                                        <input
                                        onChange={(e) => setCardNumber(e.target.value)}
                                            placeholder="XXXX XXXX XXXX XXXX"
                                        // value={fname}
                                        // onChange={(e) => validNameFill(e.target.value)}
                                        // style={{ border: submit === 1 && fnameError !== "" && "1px solid red" }}
                                        />
                                    </div>
                                    {cardNumberError !== "" && (
                                        <span className="error-span">{cardNumberError}</span>
                                    )}
                                </div>

                                <div className="aa-input-main">
                                    <div className="aa-input-container">
                                        <p>Country*</p>
                                        <Select
                                            placeholder="Country *"
                                            options={options}
                                            isSearchable={true}
                                            onChange={(e) => setCountry(e.value)}
                                        />
                                    </div>
                                    {countryError !== "" && (
                                        <span className="error-span">{countryError}</span>
                                    )}
                                </div>
                            </div>

                            <div className="aa-form-container">
                                <div className="aa-input-main">
                                    <div className="aa-input-container">
                                        <p>Expiary Date*</p>
                                        <input
                                            type="month"
                                            placeholder="XXXX XXXX XXXX XXXX"
                                            onChange={(e) => setExpiary(e.target.value)}
                                        // value={fname}
                                        // onChange={(e) => validNameFill(e.target.value)}
                                        // style={{ border: submit === 1 && fnameError !== "" && "1px solid red" }}
                                        />
                                    </div>
                                    {expiaryError !== "" && (
                                        <span className="error-span">{expiaryError}</span>
                                    )}
                                </div>

                                <div className="aa-input-main">
                                    <div className="aa-input-container">
                                        <p>CVC</p>
                                        <input
                                            type="text"
                                            placeholder="XXXX"
                                            onChange={(e) => setCVC(e.target.value)}
                                        // value={fname}
                                        // onChange={(e) => validNameFill(e.target.value)}
                                        // style={{ border: submit === 1 && fnameError !== "" && "1px solid red" }}
                                        />
                                    </div>
                                    {cvcError !== "" && (
                                        <span className="error-span">{cvcError}</span>
                                    )}
                                </div>
                            </div>


                        </div>

                        <div className="aa-input-button">
                            <button
                                className="aa-input-save-button"
                                onClick={(e) => apiCallAdd()}
                            >
                                Submit
                            </button>
                            <button
                                className="aa-input-cancel-button"
                                onClick={(e) => CancelClick()}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
export default CustomAddCardDetail;