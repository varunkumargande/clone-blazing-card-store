import React from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';
import APIServices from '../../../../services'
import axios from 'axios';



function ShippmentCard(props) {
    const { setShippmentFormOpen, setAddShippInfo } = props;
    // const [open, setOpen] = React.useState(false)
    // const [openOptions, setOpenOptions] = React.useState(true)
    // const [paymentForm, setPaymentFormOpen] = React.useState(false)
    // const [shippmentForm, setShippmentFormOpen] = React.useState(false)

    const [name, setName] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [postal, setPostal] = React.useState(null)
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [country, setCountry] = React.useState("")

    const [nameError, setNameError] = React.useState("")
    const [addressError, setAddressError] = React.useState("")
    const [postalError, setPostalError] = React.useState("")
    const [cityError, setCityError] = React.useState("")
    const [stateError, setStateError] = React.useState("")
    const [countryError, setCountryError] = React.useState("")

    const POST_ADDRESS = `http://52.72.64.43:9000/api/address/add-address`;

    const validateShippmentForm = () => {
        // if (name.length == 0) { setNameError("Full Name is Required !"); }
        // if (address.length == 0) { setAddressError("Address is Required !") }
        // if (country.length == 0) { setCountryError("Country is Required !") }
        // if (postal?.length == 0) { setPostalError("Postal is Required !") }
        // if (state.length == 0) { setStateError("State is Required !") }
        // if (city.length == 0) { setCityError("City is Required !") }
        // else {
        //     submitShippment()
        // }

         // Error handling of shipping form
        {(name.length == 0) ? setNameError("Card Number is Required !") : setNameError("")}
        {(address.length == 0) ?  setAddressError("Expire Date is Required !") : setAddressError("")}
        {(country.length == 0) ? setCountryError("Country is Required !") : setCountryError("")}
        {(postal?.length == 0) ? setPostalError("CVC is Required !") : setPostalError("") }
        {(state.length == 0) ? setStateError("CVC is Required !") : setStateError("") }
        {(city.length == 0) ? setCityError("CVC is Required !") : setCityError("") }
    }

    // Handle submit of shippment form 
    const submitShippment = async () => {
        let body = {
            "name": name,
            "address": address,
            "country": country,
            "postal": postal,
            "state": state,
            "city": city
        }
        //const res = await APIServices.create(POST_ADDRESS,body);
        const res = await axios.post(POST_ADDRESS,body);
        console.log(res);

        setAddShippInfo(true);
        console.log(body);
        setShippmentFormOpen(false);
    }

    // Validating shipping form 
    React.useEffect(() => {
        validateShippmentForm()
    }, [name, address, postal, city, state, country])
    

    let countries = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]

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
                        <h3 className='payment_method_header'>Shipping Address</h3>
                    </div>
                    <div className="row">
                        <div className='col-12' align="left">
                            <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="form-control shippment_name" name="name" placeholder='Full Name' />
                            {nameError !== "" && <p className='field-error'>{nameError}</p>}
                        </div>

                        <div className='col-12' align="left">
                            <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} name="address" placeholder='Address' className="form-control shippment_address" />
                            {addressError !== "" && <p className='field-error'>{addressError}</p>}
                        </div>

                        <div className="row">
                            <div className='col-6' align="left">
                                <select
                                    className="form-control shippment_country"
                                    id="country"
                                    onChange={(e) => setCountry(e.target.value)}
                                    defaultValue={
                                        1
                                    }>
                                    <option>Country</option>
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
                            <div className='col-6' align="left">
                                <input type="number" id="postal_code" onChange={(e) => setPostal(e.target.value)} name="postal_code" className="form-control shippment_postal" placeholder='Postal Code' />
                                {postalError !== "" && <p className='field-error-row'>{postalError}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className='col-6' align="left">
                                <input type="text" id="city" onChange={(e) => setCity(e.target.value)} name="city" className="form-control shippment_city" placeholder='City' />
                                {cityError !== "" && <p className='field-error-row-city'>{cityError}</p>}
                            </div>
                            <div className='col-6' align="left" >
                                <input type="text" id="state" onChange={(e) => setState(e.target.value)} name="state" className="form-control shippment_state" placeholder='State' />
                                {stateError !== "" && <p className='field-error-row'>{stateError}</p>}
                            </div>
                        </div>

                        <div className='col-12' align="left">
                            <button className='payment_submit' onClick={() => submitShippment()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ShippmentCard;