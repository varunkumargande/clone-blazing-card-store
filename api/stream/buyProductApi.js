import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../intercept";

async function buyProduct(paymentData, shipData) {
    const userData = JSON.parse(sessionStorage.getItem("spurtUser"))
    const jsonData = {
        "shippingLastName": "",
        "shippingCity": shipData.city,
        "shippingPostCode": shipData.postcode,
        "shippingCompany": shipData.name,
        "shippingFirstName": userData.firstName,
        "shippingZone": shipData.state,
        "gstNo": "",
        "phoneNumber": userData.mobileNumber,
        "shippingAddressFormat": "",
        "shippingAddress_1": shipData.address1,
        "shippingAddress_2": shipData.address1,
        "emailId": userData.email,
        "shippingCountryId": shipData.country,
        "productDetails": [
            {
                "productId": 541,
                "quantity": 1,
                "price": 25200,
                "basePrice": 25200,
                "model": "AMBITION Professional Black Drum Kit - 9 Pcs",
                "name": "AMBITION Professional Black Drum Kit - 9 Pcs()",
                "productVarientOptionId": "",
                "taxType": null,
                "taxValue": null,
                "varientName": "",
                "skuName": "AWE00UI6",
                "vendorId": 0
            },
        ],
        "paymentMethod": 6,
        "paymentAddress_1": shipData.address1,
        "paymentAddress_2": shipData.address2,
        "paymentCity": shipData.city,
        "paymentCompany": shipData.name,
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

export { buyProduct };
