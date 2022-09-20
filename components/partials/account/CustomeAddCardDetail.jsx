import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector, connect } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import APIServices from '../../../services'
import { modalSuccess, modalWarning } from "../../../api/intercept";

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
    }, [cardNumber, expiary, cvc])

    const options = [
        { value: 'Usa', label: 'USA' },
        { value: 'UK', label: 'UK' },
    ];

    const validate = () => {

        let validateObj = { cardNumber: true, expiary: true, cvc: true }
        if (cardNumber === "") {
            setCardNumberError("Card Number is required")
            validateObj.cardNumber = false;
        }
        else {
            setCardNumberError("")
            validateObj.cardNumber = true;
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
        if (validateObj.cardNumber && validateObj.cvc && validateObj.expiary) {
            return true
        } else {
            return false
        }
    }

    const apiCallAdd = async () => {
        let expDate = ""
        let year = expiary.split("-")[0].slice(-2)
        let month = expiary.split("-")[1]
        expDate = month + "/" + year
        if (validate()) {
            const data = JSON.stringify({
                "cardNumber": cardNumber,
                "expireDate": expDate,
                "cvc": cvc,
                "customerId": String(JSON.parse(sessionStorage.getItem("spurtUser")).id),
                "name": JSON.parse(sessionStorage.getItem("spurtUser")).firstName,
                "emailId": JSON.parse(sessionStorage.getItem("spurtUser")).email
            })
            const result = await APIServices.create('customer-card-details/addCard', data)
            if (result.status == 200) {
                modalSuccess('success', result.data.message)
                Router.push('/account/card-details');
            } else {
                modalWarning('error', result.data.message)
            }
            console.log(result.data.data)
        }
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
                                        <p>Expiary Date*</p>
                                        <input
                                            type="month"
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
                            </div>

                            <div className="aa-form-container">

                                <div className="aa-input-main">
                                    <div className="aa-input-container">
                                        <p>CVC</p>
                                        <input
                                            type="text"
                                            placeholder="XXXX"
                                            onChange={(e) => setCVC(e.target.value)}
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

const mapStateToProps = state => {
    return state.setting;

}
    export default connect(mapStateToProps)(CustomAddCardDetail);
