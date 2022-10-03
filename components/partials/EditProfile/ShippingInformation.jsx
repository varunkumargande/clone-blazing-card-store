import React, { useEffect, useState } from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";
import { addressListApi } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { countryListApi, editAddressApi, UserAddAddress } from "../../../api";
import Router from "next/router";

export default function ShippingDetails() {
  const [addressData, setAddressData] = useState([]);
  const [addressLoader, setAddressLoader] = useState(true);
  const [delStatus, setDelStatus] = useState(0);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    setDelStatus(0);
    addressList();
    apiCallFunc();
  }, [delStatus]);

  const addressList = () => {
    addressListApi(setAddressData, setAddressLoader);
  };
  const apiCallFunc = () => {
    countryListApi(setCountryData);
  };

  const initialShippingValues = {
    address1: addressData.length != 0 ? addressData[0]?.address1 : "",
    address2: addressData.length != 0 ? addressData[0]?.address2 : "",
    city: addressData.length != 0 ? addressData[0]?.city : "",
    state: addressData.length != 0 ? addressData[0]?.state : "",
    postcode: addressData.length != 0 ? addressData[0]?.postcode : "",
    countryId: addressData.length != 0 ? addressData[0]?.countryId : "",
    addressType: addressData.length != 0 ? addressData[0]?.addressType : "",
    company: addressData.length != 0 ? addressData[0]?.company : "",
  };

  const shippingSchema = Yup.object().shape({
    address1: Yup.string().required("Required"),
    address2: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    postcode: Yup.string().required("Required").max(6, "postcode is invalid !"),
    countryId: Yup.string().required("Required"),
    company: Yup.string().required("Required"),
  });

  return (
    <div className="profile-detail">
      <h3>Shipping Information</h3>

      {addressLoader ? (
        <>Loading ...</>
      ) : (
        <>
          <Formik
            initialValues={initialShippingValues}
            validationSchema={shippingSchema}
            onSubmit={(values) => {
              if (addressData.length != 0) {
                editAddressApi(values, addressData[0].addressId);
              } else {
                UserAddAddress(values, Router, addressList);
              }
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
                  <div className="box">
                    <div className="inner-box">
                      <div className="discriptionlg">
                        A return address must be added before going live on
                        Blazing Cards. This will be used on your shipment
                        labels.
                      </div>
                      <div className="flex space-between">
                        <div className="input-control">
                          <label>Full Name *</label>
                          <input
                            name="company"
                            placeholder={"Enter here"}
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.company}
                          />
                          <span className="errorMessage">{errors.company}</span>
                        </div>
                        <div className="input-control wd50">
                          <label>Address Line 1 *</label>
                          <input
                            name="address1"
                            placeholder={"Enter here"}
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.address1}
                          />
                          <span className="errorMessage">{errors.address1}</span>
                        </div>
                        <div className="input-control wd50">
                          <label htmlFor="usr">Address Line 2</label>
                          <input
                            name="address2"
                            placeholder={"Enter here"}
                            id="usr"
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.address2}
                          />
                          <span className="errorMessage">{errors.address2}</span>
                        </div>
                        <div className="input-control wd50">
                          <label htmlFor="usr">Country *</label>
                          <select
                            className="grey-bg"
                            name="countryId"
                            onChange={handleChange}
                            value={values.countryId}
                          >
                            <option>Select</option>
                            {countryData.map((item, index) => {
                              return (
                                <>
                                  <option value={item.countryId}>
                                    {item.name}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                          <span className="errorMessage">{errors.countryId}</span>
                        </div>
                        <div className="input-control wd50">
                          <label htmlFor="usr">Postal Code *</label>
                          <input
                            name="postcode"
                            placeholder={"Enter here"}
                            id="usr"
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.postcode}
                          />
                          <span className="errorMessage">{errors.postcode}</span>
                        </div>
                        <div className="input-control wd50">
                          <label htmlFor="usr">City *</label>
                          <input
                            name="city"
                            placeholder={"Enter here"}
                            id="usr"
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.city}
                          />
                          <span className="errorMessage">{errors.city}</span>
                        </div>
                        <div className="input-control wd50">
                          <label htmlFor="usr">State *</label>
                          <input
                            name="state"
                            placeholder={"Enter here"}
                            id="usr"
                            className="grey-bg"
                            onChange={handleChange}
                            value={values.state}
                          />
                         <span className="errorMessage">{errors.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button-wrapper flex mb40">
                    {/* <button className="border-btn mr16">Cancel</button> */}
                    <button className="primary-btn" onSubmit={handleSubmit}>
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </>
      )}
    </div>
  );
}
