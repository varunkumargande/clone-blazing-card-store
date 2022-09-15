import React from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';
import axios from 'axios';

// request: {
//     "name" : "shayam",
//     "customerId": "2",
//     "emailId": "shyam@gmail.com",
//     "expireDate": "09/25",
//     "cvc": "123",
//     "cardNumber": "4000056655665556"
// }
function PaymentCard(props) {
    const { setPaymentFormOpen, setAddPayInfo, customerId } = props;

    const [cardNumber, setCardNumber] = React.useState("")
    const [expireDate, setExpireDate] = React.useState("")
    const [cvc, setCvc] = React.useState("")
    const [country, setCountry] = React.useState("")

    const [cardNumberError, setCardNumberError] = React.useState("")
    const [expireDateError, setExpireDateError] = React.useState("")
    const [cvcError, setCvcError] = React.useState("")
    const [countryError, setCountryError] = React.useState("")

    //const POST_ADDRESS = "http://52.72.64.43:9000/api/customer-card-details/addCard";
    const POST_ADDRESS = "https://blazing-card-backend-dev.kellton.net/api/customer-card-details/addCard";

    const validatePaymentForm = () => {
        console.log("inside va;idating")
        // if (cardNumber?.length == 0) { setCardNumberError("Card Number is Required !")}
        // if (expireDate.length == 0) { setExpireDateError("Expire Date is Required !") }
        // if (country.length == 0) { setCountryError("Country is Required !") }
        // if (cvc.length == 0) { setCvcError("CVC is Required !") }
        // else {
        //     submitPayment()
        // }

        // Error handling of payment form
        {(cardNumber.length == 0) ? setCardNumberError("Card Number is Required !") : setCardNumberError("")}
        {(expireDate.length == 0) ?  setExpireDateError("Expire Date is Required !") : setExpireDateError("")}
        {(country.length == 0) ? setCountryError("Country is Required !") : setCountryError("")}
        {(cvc.length == 0) ? setCvcError("CVC is Required !") : setCvcError("") }

        // submitPayment()
    }

    // Validate payment form
    React.useEffect(() => {
        validatePaymentForm();
    }, [cardNumber, expireDate, country, cvc])

    // Connvert expire date to required format
    const handleExpireDate = (value) => {
        let date = value;
        const [year,month] = date.split('-');
        year = year.slice(2);
        const result = [month, year].join('/');
        setExpireDate(result);
    }
    
    // Handle submit of payment form
    const submitPayment = async () => {
        // let body = {
        //     "name": name,
        //     "address": address,
        //     "country": country,
        //     "postal": postal,
        //     "state": state,
        //     "city": city
        // }
    
       let body = {
            "name" : "dave",
            "customerId": "512345",
            "emailId": "dave@example.com",
            "expireDate": "03/23",
            "cvc": "453",
            "cardNumber": "4000056655665556",
        }
        // const res = await axios.post(POST_ADDRESS,body);
        // console.log(res);

        // setAddPayInfo(true);
        // setPaymentFormOpen(false);
        // console.log(body)
        try {
            const res = await axios.post(POST_ADDRESS,body);
            // if(res.status(200)) {
            //     setAddPayInfo(true);
            //     setPaymentFormOpen(false);
            //     console.log(res);
            // }   
            setAddPayInfo(true);
            setPaymentFormOpen(false);
            console.log(res);
   
           
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(err.response.status);
                console.log(error.response.header);
                // setIsLoading(false);
            } else {
                console.log(`Error: ${error.message}`);
                // setIsLoading(false)
            }
        }
    }

    let countries = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]

    console.log(expireDate);
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
                                defaultValue={
                                    1
                                }>
                                <option>Select An Existing Card</option>
                            </select>
                        </div>
                        <div className='col-12'>
                            <input type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" maxLength={16} className="form-control stream_payment_card_number" placeholder='1234 1234 1234 1234 1234' onChange={(e) => setCardNumber(e.target.value)}/>
                            {cardNumberError !== "" && <p className='field-error-row-country'>{cardNumberError}</p>}
                        </div>
                        <div className="row">
                            <div className='col-6'>
                                <input type="month" pattern="(?:0[1-9]|1[0-2])/[0-9]{2}" className="form-control stream_payment_card_expiary" onChange={(e) => handleExpireDate(e.target.value)}/>
                                {expireDateError !== "" && <p className='field-error-row-country'>{expireDateError}</p>}
                            </div>
                            <div className='col-6'>
                                <input type="number" maxLength={3} className="form-control stream_payment_card_cvc" placeholder='CVC' onChange={(e) => setCvc(e.target.value)} />
                                {cvcError !== "" && <p className='field-error-row-country'>{cvcError}</p>}
                            </div>
                        </div>
                        <div className='col-12'>
                            <select
                                className="form-control stream_payment_card_select"
                                defaultValue={
                                    1
                                }
                                onChange={(e) => setCountry(e.target.value)}>
                                <option>Select Country</option>

                                {countries.map((item, index) => {
                                    return (
                                        <>
                                            <option value={item}>{item}</option>
                                        </>
                                    )
                                })}
                            </select>
                            {countryError !== "" && <p className='field-error-row-country'>{countryError}</p>}
                        </div>

                        <div className='col-12' align="left">
                            <button className='payment_submit'  onClick={() => submitPayment()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}

export default PaymentCard;