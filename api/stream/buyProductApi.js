import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../intercept";

async function buyProduct(paymentData, shipData, productDetail) {
    const userData = JSON.parse(sessionStorage.getItem("spurtUser"))


    if (userData) {
        const jsonData = {
            "shippingLastName": "",
            "shippingCity": shipData.city,
            "shippingPostCode": shipData.postcode,
            "shippingCompany": shipData.company,
            "shippingFirstName": userData.firstName,
            "shippingZone": shipData.state,
            "gstNo": "",
            "phoneNumber": userData.mobileNumber,
            "shippingAddressFormat": "",
            "shippingAddress_1": shipData.address1,
            "shippingAddress_2": shipData.address1,
            "emailId": userData.email,
            "shippingCountryId": shipData.countryId,
            "productDetails": [
                {
                    "productId": productDetail.product_id,
                    "quantity": productDetail.quantity,
                    "price": productDetail.price,
                    "basePrice": productDetail.price,
                    "model": productDetail.name,
                    "name": productDetail.name,
                    "productVarientOptionId": "",
                    "taxType": null,
                    "taxValue": null,
                    "varientName": "",
                    "skuName": productDetail.sku,
                    "vendorId": productDetail.stream_product_id
                },
            ],
            "paymentMethod": 6,
            "paymentAddress_1": shipData.address1,
            "paymentAddress_2": shipData.address2,
            "paymentCity": shipData.city,
            "paymentCompany": shipData.company,
            "paymentCountryId": shipData.country,
            "paymentFirstName": userData.firstName,
            "paymentLastName": userData.lastName == null ? "" : userData.lastName,
            "paymentPostCode": shipData.postcode,
            "paymentZone": shipData.state,
            "couponCode": "",
            "couponData": "",
            "couponDiscountAmount": "",
            "password": "",
            "paymentMethodId": paymentData.id,
            "customerStripeRefId": paymentData.customer
        }

        const result = await APIServices.create('orders/customer-pay', jsonData)
        if (result && result.data && result.data) {
            if (result.status == 200) {
                modalSuccess("success", result.data.message)
            } else {
                modalWarning("error", result.data.message)
            }
        }
    }
}

export { buyProduct };
