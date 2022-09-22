import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getStreamingShippmentDetail } from '../../../../api/stream/shippmentApi';
import { countryListApi } from "../../../../api"

function ShippmentCard(props) {

    const [addressList, setAddressList] = React.useState([])
    const [countryData, setCountryData] = React.useState([])

    useEffect(() => {
        countryListApi(setCountryData);
        getStreamingShippmentDetail(setAddressList)
    }, [])

    const handleSelectAddressDetail = (e) => {
        if (e.target.value != null) {
            props.setShipIndex(e.target.value)
            props.setShipData(addressList[e.target.value])
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
                    {props.shipData != null ? (
                        <>
                            <Formik
                                initialValues={{
                                    name: props.shipData.company,
                                    address1: props.shipData.address1,
                                    address2: props.shipData.address2,
                                    country: props.shipData.country,
                                    postcode: props.shipData.postcode,
                                    city: props.shipData.city,
                                    state: props.shipData.state
                                }}
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
                                                            value={props.shipData.countryId}
                                                        >
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