import React, { memo, useEffect, useState, useRef } from "react";
import { addressListApi } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import { countryListApi, editAddressApi, UserAddAddress } from "../../../api";
import Router from "next/router";
import { Loader } from "../../reusable/Loader";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import { getStateList } from "../../../api/common/common";
import { US_CODE } from "../../Constants";
import { getStateName } from "../../../utilities/utils";
import { useCallback } from "react";
import { useFetchZipCodeList } from "../../../hooks/useFetchZipCodeList";

function ShippingDetails() {
  const dispatch = useDispatch();
  const zoneInput = useRef();
  const [addressData, setAddressData] = useState([]);
  const [addressLoader, setAddressLoader] = useState(false);
  const [delStatus, setDelStatus] = useState(0);
  const [countryData, setCountryData] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [zipCodeList, setZipCodeList] = useState([]);
  const [zipCodeListLoader, setZipCodeListLoader] = useState(false);

  const [setZipCode, isLoading, zipList] = useFetchZipCodeList();

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
    getStateList(setStateList);
  };

  useEffect(() => {
    if (addressData?.length) setZipCode(addressData[0]?.state);
  }, [addressData]);

  const initialShippingValues = {
    address1: addressData?.length != 0 ? addressData[0]?.address1 : "",
    address2: addressData?.length != 0 ? addressData[0]?.address2 : "",
    city: addressData?.length != 0 ? addressData[0]?.city : "",
    state: addressData?.length != 0 ? addressData[0]?.state : "",
    postcode: addressData?.length != 0 ? addressData[0]?.postcode : "",
    countryId: addressData?.length != 0 ? addressData[0]?.countryId : US_CODE,
    addressType: addressData?.length != 0 ? addressData[0]?.addressType : "",
    company: addressData?.length != 0 ? addressData[0]?.company : "",
  };

  const shippingSchema = Yup.object().shape({
    address1: Yup.string().required("Required"),
    // address2: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    postcode: Yup.number()
      .required("Required")
      .typeError("Please enter digits only"),
    countryId: Yup.string().required("Required"),
    company: Yup.string().required("Required"),
  });

  return (
    <div className="profile-detail">
      <h3>Shipping Information</h3>

      {addressLoader ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialShippingValues}
          enableReinitialize
          validationSchema={shippingSchema}
          onSubmit={(values) => {
            setAddressLoader(true);
            if (addressData.length != 0) {
              editAddressApi(
                values,
                addressData[0].addressId,
                setAddressLoader,
                addressList,
                dispatch
              );
            } else {
              UserAddAddress(values, setAddressLoader, addressList, dispatch);
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
            setValues,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="box">
                <div className="inner-box">
                  <div className="discriptionlg">
                    A return address must be added before going live on Blazing
                    Cards. This will be used on your shipment labels.
                  </div>
                  <div className="flex space-between">
                    <div className="input-control">
                      <label>Full Name*</label>
                      <input
                        name="company"
                        placeholder={"Enter here"}
                        className="grey-bg"
                        onChange={handleChange}
                        value={values.company}
                        maxLength={50}
                      />
                      <ErrorMessage
                        errors={errors.company}
                        touched={touched.company}
                      />
                    </div>
                    <div className="input-control wd50">
                      <label>Address Line 1*</label>
                      <input
                        name="address1"
                        placeholder={"Enter here"}
                        className="grey-bg"
                        onChange={handleChange}
                        value={values.address1}
                      />
                      <ErrorMessage
                        errors={errors.address1}
                        touched={touched.address1}
                      />
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
                      {/* <span className="errorMessage">{errors.address2}</span> */}
                    </div>
                    <div className="input-control wd50">
                      <label htmlFor="usr">Country*</label>
                      <select
                        className="grey-bg"
                        name="countryId"
                        onChange={handleChange}
                        value={values.countryId}
                        disabled={true}
                      >
                        {/* <option>Select</option> */}
                        <option>United States</option>
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
                      <ErrorMessage
                        errors={errors.countryId}
                        touched={touched.countryId}
                      />
                    </div>

                    <div className="input-control wd50">
                      <label htmlFor="usr">State*</label>
                      <select
                        className="grey-bg"
                        name="state"
                        onChange={(e) => {
                          e.preventDefault();
                          handleChange(e);
                          setZipCode(e.target.value);
                        }}
                        value={values.state}
                      >
                        <option>Select</option>
                        {stateList.map((item) => {
                          return (
                            <option value={item.code}>
                              {getStateName(stateList, item.code)}
                            </option>
                          );
                        })}
                      </select>
                      <ErrorMessage
                        errors={errors.state}
                        touched={touched.state}
                      />
                    </div>
                    <div className="input-control wd50">
                      <label htmlFor="usr">City*</label>
                      <input
                        name="city"
                        placeholder={"Enter here"}
                        id="usr"
                        className="grey-bg"
                        onChange={handleChange}
                        value={values.city}
                      />
                      <ErrorMessage
                        errors={errors.city}
                        touched={touched.city}
                      />
                    </div>
                    <div className="input-control wd50">
                      <label htmlFor="usr">Postal Code*</label>
                      {isLoading ? (
                        <Loader className={"w-25"} />
                      ) : (
                        <select
                          className="grey-bg"
                          name="postcode"
                          onChange={handleChange}
                          value={values.postcode}
                        >
                          <option>Select</option>
                          {!!zipList &&
                            zipList.map((item, index) => {
                              return (
                                <option value={item?.code}>{item.code}</option>
                              );
                            })}
                        </select>
                      )}

                      <ErrorMessage
                        errors={errors.postcode}
                        touched={touched.postcode}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="button-wrapper flex mb40">
                <button
                  className="border-btn mr16"
                  onClick={(e) => {
                    e.preventDefault();
                    setValues(initialShippingValues, true);
                  }}
                >
                  Cancel
                </button>
                <button className="primary-btn" onSubmit={handleSubmit}>
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default memo(ShippingDetails);
