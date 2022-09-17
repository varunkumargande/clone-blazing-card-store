import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getStreamingCardDetail } from '../../../../api/stream/cardApi';
import { addCardDetail } from '../../../../api/stream/payment';

function PaymentCard(props) {
    const { setPaymentFormOpen, setAddPayInfo, customerId } = props;

    let countries = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]

    const [cardList, setCardList] = useState([])
    const [cardDetail, setCardDetail] = useState(null)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        getCardList()
    }, [])

    const getCardList = () => {
        // getStreamingCardDetail(setCardList)
    }

    const handleSelectCardDetail = (e) => {
        if (e.target.value != null) {
            setCardDetail(cardList[e.target.value])
        }
    }

    const handleSubmitCard = () => {
        console.log(cardDetail)
    }

    const handleOpenNewCard = () => {
        if (open == false) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const addPaySchema = Yup.object().shape({
        cardNumber: Yup.string().required('Required').matches(phoneRegExp, "Invalid Card Number").max(16),
        expiary: Yup.string().required('Required'),
        cvc: Yup.string().required('Required'),
    });

    const submitCardDetail = async (data) => {
        addCardDetail(setOpen, data)
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
                    {open ? (
                        <>
                            <div className="row">
                                <Formik
                                    initialValues={{ cardNumber: '', expiary: '', cvc: '' }}
                                    validationSchema={addPaySchema}
                                    onSubmit={(values) => {
                                        submitCardDetail(values)
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className='col-12' align={"center"}>
                                                        <input onChange={handleChange} type="string" value={values.cardNumber} name="cardNumber" placeholder='Card Number' className="form-control stream_payment_card_input" />
                                                        <p className='field-error'>{errors.cardNumber}</p>
                                                    </div>
                                                    <div className='col-6' align={"center"}>
                                                        <input onChange={handleChange} type="month" value={values.expiary} name="expiary" className="form-control stream_payment_card_expiary" />
                                                        <p className='field-error'>{errors.expiary}</p>
                                                    </div>
                                                    <div className='col-6'>
                                                        <input onChange={handleChange} type="number" value={values.cvc} name="cvc" className="form-control stream_payment_card_cvc" placeholder='XXX' />
                                                        <p className='field-error'>{errors.cvc}</p>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className='col-4' align="left">
                                                        <button type="submit" className='payment_submit'>Submit</button>
                                                    </div>
                                                    <div className='col-8' align="left">
                                                        <button type="button" className='payment_submit' onClick={() => setOpen(false)}>Cancel</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    )}

                                </Formik>
                            </div>
                        </>
                    ) : (
                        <>
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
                                    <button className='payment_submit' onClick={handleOpenNewCard}>Add Card</button>
                                </div>
                            </div>
                        </>
                    )}





                </div>
            </div>
        </>
    )
}

export default PaymentCard;
