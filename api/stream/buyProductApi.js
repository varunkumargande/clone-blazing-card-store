import APIServices from "../../services";
import { modalSuccess, modalWarning } from "../intercept";
import { show } from "../../store/toast/action";
import { apiValidation } from "../utils/apiValidation";

async function buyProduct(
  paymentData,
  shipData,
  productDetail,
  openPayment,
  streamUuid,
  dispatch,
  setPaymentSuccessful,
  setPaymentLoader
) {
  const userData = JSON.parse(localStorage.getItem("blazingUser"));
  if (userData) {
    const jsonData = {
      shippingLastName: "",
      shippingCity: shipData.city,
      shippingPostCode: shipData.postcode,
      shippingCompany: shipData.company,
      shippingFirstName: userData.firstName,
      shippingZone: shipData.state,
      gstNo: "",
      phoneNumber: userData.mobileNumber,
      shippingAddressFormat: "",
      shippingAddress_1: shipData.address1,
      shippingAddress_2: shipData.address1,
      emailId: userData.email,
      shippingCountryId: shipData.countryId,
      productDetails: [
        {
          productId: productDetail.product_id,
          quantity: productDetail.quantity,
          price: productDetail.price,
          basePrice: productDetail.price,
          model: productDetail.name,
          name: productDetail.name,
          productVarientOptionId: "",
          taxType: null,
          taxValue: null,
          varientName: "",
          skuName: productDetail.sku,
          vendorId: productDetail.stream_product_id,
        },
      ],
      paymentMethod: 6,
      paymentAddress_1: shipData.address1,
      paymentAddress_2: shipData.address2,
      paymentCity: shipData.city,
      paymentCompany: shipData.company,
      paymentCountryId: shipData.country,
      paymentFirstName: userData.firstName,
      paymentLastName: userData.lastName == null ? "" : userData.lastName,
      paymentPostCode: shipData.postcode,
      paymentZone: shipData.state,
      couponCode: "",
      couponData: "",
      couponDiscountAmount: "",
      password: "",
      paymentMethodId: paymentData.id,
      customerStripeRefId: paymentData.customer,
      streamUUID: streamUuid || "",
    };
    const result = await APIServices.create("orders/customer-pay", jsonData);
    const resp = apiValidation(result, dispatch);
    openPayment(false);
    if (resp) {
      setPaymentSuccessful(true);
      setPaymentLoader(false);
      return result?.data?.data?.orderId
    }
  }
  setPaymentLoader(false)
  return;
}

export { buyProduct };
