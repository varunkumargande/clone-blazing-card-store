import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getStreamingShippmentDetail } from '../../../../api/stream/shippmentApi';
import { countryListApi } from "../../../../api"

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

    const [addressList, setAddressList] = React.useState([])
    const [addressDetail, setAddressDetail] = React.useState(null)
    const [countryData, setCountryData] = React.useState([])

    useEffect(() => {
        countryListApi(setCountryData);
        getStreamingShippmentDetail(setAddressList)
    }, [])

    const handleSelectAddressDetail = (e) => {
        if (e.target.value != null) {
            setAddressDetail(addressList[e.target.value])
        }
    }

    const shipSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        address1: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        address2: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        country: Yup.string()
            .required('Required'),
        postcode: Yup.string()
            .min(4, 'Invalide PinCode')
            .required('Required'),

        city: Yup.string()
            .required('Required'),
        state: Yup.string()
            .required('Required'),
    });



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
                        <div className="col-12">
                            <select
                                className="form-control stream_payment_card_select"
                                onChange={handleSelectAddressDetail}
                                defaultValue={
                                    1
                                }>
                                <option value={null}>Select An Shipping Address</option>
                                {addressList.map((item, index) => {
                                    return (
                                        <>
                                            <option value={index}>{item.address1}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    {addressDetail != null ? (
                        <>
                            <Formik
                                initialValues={{ name: addressDetail.company, address1: addressDetail.address1, address2: addressDetail.address2, country: addressDetail.country, postcode: addressDetail.postcode, city: addressDetail.city, state: addressDetail.state }}
                                validationSchema={shipSchema}
                                onSubmit={(values) => {
                                    props.setShip(values)
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
                                    /* and other goodies */
                                }) => (
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className='col-12' align="left">
                                                    <input type="text" name="name" value={values.name} onChange={handleChange} className="form-control shippment_name" placeholder='Full Name' />
                                                    <p className='field-error'>{errors.name}</p>
                                                </div>
                                                <div className='col-12' align="left">
                                                    <input type="text" value={values.address1} onChange={handleChange} name="address1" placeholder='Address 1' className="form-control shippment_address" />
                                                    <p className='field-error'>{errors.address1}</p>
                                                </div>
                                                <div className='col-12' align="left">
                                                    <input type="text" value={values.address2} onChange={handleChange} name="address2" placeholder='Address 2' className="form-control shippment_address" />
                                                    <p className='field-error'>{errors.address2}</p>
                                                </div>
                                                <div className="row">
                                                    <div className='col-6' align="left">
                                                        <select
                                                            className="form-control shippment_country"
                                                            name="country"
                                                            onChange={handleChange}
                                                            defaultValue={
                                                                1
                                                            }>
                                                            {countryData.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        {item.countryId == addressDetail.countryId ? (
                                                                            <>
                                                                                <option value={item.countryId}>{item.name}</option>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <option value={item.countryId}>{item.name}</option>
                                                                            </>
                                                                        )}

                                                                    </>
                                                                )
                                                            })}

                                                            {countryData.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.countryId}>{item.name}</option>
                                                                    </>
                                                                )
                                                            })}

                                                        </select>
                                                        <p className='field-error-row-country'>{errors.country}</p>
                                                    </div>
                                                    <div className='col-6' align="left">
                                                        <input type="text" value={values.postcode} onChange={handleChange} name="postcode" className="form-control shippment_postal" placeholder='Postal Code' />
                                                        <p className='field-error-row'>{errors.postcode}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className='col-6' align="left">
                                                        <input type="text" value={values.city} onChange={handleChange} name="city" className="form-control shippment_city" placeholder='City' />
                                                        <p className='field-error-row'>{errors.city}</p>
                                                    </div>
                                                    <div className='col-6' align="left" >
                                                        <input type="text" value={values.state} onChange={handleChange} name="state" className="form-control shippment_state" placeholder='State' />
                                                        <p className='field-error-row'>{errors.state}</p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <button className='payment_submit' type="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                )}

                            </Formik>

                        </>
                    ) : (
                        <>
                        </>
                    )}





                </div>
            </div>



        </>
    )
}

export default ShippmentCard;