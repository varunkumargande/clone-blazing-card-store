import APIServices from '../../services'

export async function basicDteailsApi(payload) {
  return await APIServices.create('vendor-store/basic-details', payload)
}

export async function guideLinesApi(payLoad) {
  return await APIServices.create('vendor-store/basic-details', payLoad)
}

export async function paymentDetailsApi(payLoad) {
   return APIServices.create('vendor-store/payment-details', payLoad)
}

export async function shippingDetails(payLoad) {
  return await APIServices.create('vendor-store/shipping-details', payLoad)
}

export async function getDetails() {
  return await APIServices.getAll('vendor-store/get-details')
}