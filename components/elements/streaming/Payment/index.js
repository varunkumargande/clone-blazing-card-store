import React from 'react';
import { Col, Row } from 'antd';
import Link from 'next/link';


function PaymentInfo(props) {

    return (
        <>
            {props.open ? (
                <>
                    <div className="payment_popup">
                        <div>
                            <Row>
                                <Col span={14}>
                                    <h3 className='payment_header'>Payment Info</h3>
                                </Col>
                                <Col span={1} push={7}>
                                    <button className='payment_close' onClick={() => props.setOpen(false)}>X</button>
                                </Col>
                            </Row>
                        </div>
                        {props.openOptions ? (
                            <>
                                <div>
                                    <div>
                                        <Row>
                                            <Col span={9}>
                                                <h4 className='option-payment'>Payment</h4>
                                            </Col>
                                            <Col span={12} push={7}>
                                                <button className='option_event' onClick={props.handlePaymentMethod}> - </button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div align="center">
                                        <div className="nav-bar" />
                                    </div>

                                    <div>
                                        <Row>
                                            <Col span={10}>
                                                <h4 className='option-shippment'>Shippment</h4>
                                            </Col>
                                            <Col span={10} push={7}>
                                                <button className='option_event' onClick={props.handleShippmentMethod}> - </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default PaymentInfo;