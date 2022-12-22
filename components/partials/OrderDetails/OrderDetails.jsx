import React from "react";
// import IconTrack from "../../Icons/IconTrack";
import IconDownload from "../../Icons/IconDownload";
import { useSelector } from "react-redux";
import { getCardImagesByName } from "../../helper/cardImageHelper";
import Styles from "../../../modular_scss/orderDetails.module.scss";
import { useState } from "react";
import { CustomModal, ModalContent, ModalFooter, ModalHeader } from "../../CustomModal/CustomModal";
import Rating from "../../Rating/Rating";
import { Formik } from "formik";
import { RatingSchema } from "./OrderDetailsSchema";
import { useEffect } from "react";

const ratingDataArray = [
  {
    label: 'Shipping*',
    key: 'shipping'
  },
  {
    label: 'Packaging*',
    key: 'packaging'
  },
  {
    label: 'Accuracy*',
    key: 'accuracy'
  }
]

export default function OrderDetails({submitRatingMutation}) {
  const orderDetail = useSelector((state) => state?.order?.orderDetail);
  const { cardDetails, productData, deliveryStatus, shippingDetails, ratingIsActive } =
    orderDetail ?? "";
  const [_type, CardImage] = orderDetail
    ? getCardImagesByName("", cardDetails?.card?.brand)
    : "";
  const [reviewModal, setReviewModal] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  useEffect(() => {
    if (submitRatingMutation?.data?.data?.status === 1) {
      handleReviewModalClose();
      setShowReviewButton(false);
    }
  }, [submitRatingMutation.data]);

  useEffect(() => {
    // Note: order status id: 5 for delivered and 6 for completed.
    //       buyer can only review the product once it is delivered or completed.
    if (ratingIsActive === 0 && (productData?.orderStatusId === 5 ||  productData?.orderStatusId === 6)) {
      setShowReviewButton(true);
    } else {
      setShowReviewButton(false);
    }
  }, [ratingIsActive, productData?.orderStatusId])

  /**
   * @method: handleReviewClick
   * @description: as the name implies: handles the functionlaity when user click on Write a product review button
   */
  const handleReviewClick = () => {
    setReviewModal(true);
  }

  /**
   * @method: handleReviewModalClose
   * @description: as name implies handles the functionlaity when review modal is
   */
  const handleReviewModalClose = () => {
    setReviewModal(false);
  }

  const renderRatingModalContent = (values, handleChange, handleBlur, setFieldValue, setFieldTouched, errors, touched) => {
    const setRating = (value, valueKey) => {
      setFieldValue(valueKey, value)
    }

    return (
      <div className="prduct-reviews flex space-between">
        <div className="review-left wd50">
          <div className="title">Rate the following aspects of the product</div>
          {ratingDataArray.map((ratingData) => {
            return (
              <Rating
                key={ratingData?.key}
                value={values[ratingData?.key]}
                label={ratingData.label}
                totalRating={5}
                handleOnRatingChange={(ratingValue) => setRating(ratingValue, ratingData?.key)}
              />
            )
          })}
        </div>
        <div className="review-right wd50">
          <div className="input-control mb32">
            <label>Description*</label>
            <textarea
              name="description"
              className="grey-bg"
              placeholder="Enter here"
              value={values?.description}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldTouched('description')
                handleChange(event)
              }} />
            {touched.description &&
              <div className="errorText">{errors?.description}</div>
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {orderDetail && 
        <>
          <div className="order-list-wrap">
            <div className="order-list mb16">
              <div className="order-header flex flex-center space-between">
                <div className="order-head">
                  <strong>Order ID: {productData?.orderId}</strong>
                </div>
                {/* Rating And Review Feature */}
                {/* RatingAndReviewStart */}
                {
                  showReviewButton &&
                  <button className={`${Styles.review_btn}`} onClick={handleReviewClick}>Write a Product Review</button>
                }
                {/* RatingAndReviewEnd */}
              </div>
              <div className="order-body-wrapper">
                <div className="order-body flex space-between">
                  <div className="order-text flex">
                    <div className="order-details">
                      <div className="flex mb12">
                        <div className="order-title">{productData.name}</div>
                        <button className="status delivered">
                          {shippingDetails.orderStatus}
                        </button>
                      </div>
                      <div className="order-disc mb16">
                        {productData.description}
                      </div>
                      <div className="qty-bought-wrap flex">
                        <div className="qty">Qty: {productData.quantity}</div>
                        <span className="divide">|</span>
                        <div className="bought">
                          Bought By: {productData.sellType}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="billing-shipping-wrap flex space-between">
              <div className="billing-shipping wd50 box">
                <div className="heading">Shipping Information</div>
                <div className="body">
                  <div className="bodyText flex flex-center">
                    {shippingDetails?.shippingAddress1 +
                      ", " +
                      shippingDetails?.shippingAddress2 +
                      ", " +
                      shippingDetails?.shippingCity +
                      ", " +
                      shippingDetails?.shippingZone +
                      ", " +
                      shippingDetails?.shippingPostcode}
                  </div>
                </div>
              </div>
              <div className="billing-shipping wd50 box">
                <div className="heading">Billing Information</div>
                <div className="body">
                  <h5>Credit Card</h5>
                  <div className="bodyText flex flex-center">
                    <span className="mastr">{CardImage}</span>{" "}
                    {cardDetails?.card?.brand} ending with{" "}
                    {cardDetails?.card?.last4}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-summery-wrap">
            <div className="order-summery box mb24">
              <div className="heading">Order Summary</div>
              <div className="order-value">
                <div className="flex space-between amount">
                  <div className="label">Subtotal (1 items)</div>
                  <div className="value">${productData?.subTotal}</div>
                </div>
                <div className="flex space-between amount">
                  <div className="label">
                    Tax
                    {/* ({productData?.taxType}%) */}
                  </div>
                  <div className="value">${productData?.tax}</div>
                </div>
                <div className="flex space-between amount">
                  <div className="label">Shipping</div>
                  <div className="value">${shippingDetails.shippingCharge}</div>
                </div>
              </div>
              <div className="total-order flex space-between flex-center">
                <div className="label">Total</div>
                <div className="value">${productData.total}</div>
              </div>
            </div>
            <a href={shippingDetails?.trackingUrl} target="_blank">
              <div className="download-wrap flex space-between flex-center">
                <button
                  className={`border-btn flex flex-center justify-center ${!shippingDetails?.trackingUrl && "disable-opacity"}`}
                  disabled={!shippingDetails?.trackingUrl}
                >
                  {/* ToDo: Keeping this IconTrack code for now if we need to use the icon in future. Can be removed in not needed. */}
                  {/* <IconTrack /> */}
                  Track Package
                </button>
              </div>
            </a>
          </div>
          {reviewModal &&
            <Formik
              initialValues={{
                shipping: 0,
                packaging: 0,
                accuracy: 0,
                description: ""
              }}
              validationSchema={RatingSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                const requestData = {
                  productId: productData.productId,
                  orderProductId: productData.orderProductId,
                  reviews: values.description,
                  shippingRating: values.shipping,
                  packagingRating: values.packaging,
                  accuracyRating: values.accuracy
                }
                submitRatingMutation.mutateAsync(requestData);
              }}
            >
              {({
                values,
                errors,
                isValid,
                handleChange,
                setFieldValue,
                touched,
                setFieldTouched,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <CustomModal className="large" handleOnClose={handleReviewModalClose}>
                    <ModalHeader title="Write a Product Review" handleOnClose={handleReviewModalClose} />
                    <ModalContent>
                      {renderRatingModalContent(values, handleChange, handleBlur, setFieldValue, setFieldTouched, errors, touched)}
                    </ModalContent>
                    <ModalFooter>
                      <button className="border-btn" onClick={handleReviewModalClose}>
                        Cancel
                      </button>
                      <button className={`primary-btn ${(!isValid || submitRatingMutation.isLoading) && "disable"}`} type="submit">
                        Submit Review
                      </button>
                    </ModalFooter>
                  </CustomModal>
                </form>
              )}
            </Formik>
          }
        </>
      }
    </>
  );
}
