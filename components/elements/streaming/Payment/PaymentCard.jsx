import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';
import axios from 'axios';

import { getStreamingCardDetail } from '../../../../api/stream/cardApi';

function PaymentCard(props) {
    const { setPaymentFormOpen, setAddPayInfo, customerId } = props;

    let countries = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]

    const [cardList, setCardList] = useState([])
    const [cardDetail, setCardDetail] = useState(null)

    useEffect(() => {
        getCardList()
    }, [])

    const getCardList = () => {
        getStreamingCardDetail(setCardList)
    }

    const handleSelectCardDetail = (e) => {
        if (e.target.value != null) {
            setCardDetail(cardList[e.target.value])
        }
    }

    const handleSubmitCard = () => {
        console.log(cardDetail)
    }

    return (
        <>
            <div className='payment_form'>
                <div>
                    <Row>
                        <Col span={10}>
                            <h3 className='payment_header'>Payment Info</h3>
                        </Col>
                        <Col span={11} push={7}>
                            <button className='payment_close' onClick={() => props.close(false)}>X</button>
                        </Col>
                    </Row>
                </div>
                <div className="ps-section__content">
                    <div align="left">
                        <h3 className='payment_method_header'>Payment Method</h3>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <select
                                className="form-control stream_payment_card_select"
                                onChange={handleSelectCardDetail}
                                defaultValue={
                                    1
                                }>
                                <option>Select An Existing Card</option>
                                {cardList.map((item, index) => {
                                    return (
                                        <>
                                            <option value={index}>{item.card.brand} : XXXX XXXX XXXX {item.card.last4}</option>
                                        </>
                                    )
                                })}

                            </select>
                            {countryError !== "" && <p className='field-error-row-country'>{countryError}</p>}
                        </div>

                        {cardDetail != null ? (
                            <>
                                <div className="row">
                                    <div className='col-6'>
                                        <input type="text" disabled value={cardDetail.card.exp_month + "/" + cardDetail.card.exp_year} className="form-control stream_payment_card_expiary" />
                                    </div>
                                    <div className='col-6'>
                                        <input type="number" className="form-control stream_payment_card_cvc" placeholder='XXX' disabled />
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <select
                                        className="form-control stream_payment_card_select" disabled>
                                        <option value={cardDetail.card.country}>{cardDetail.card.country}</option>
                                    </select>
                                </div>
                                <div className='col-4' align="left">
                                    <button className='payment_submit'>Submit</button>
                                </div>
                            </>
                        ) : (
                            <>

                            </>
                        )}

                        <div className='col-8' align="left">
                            <button className='payment_submit'>Add Card</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentCard;
