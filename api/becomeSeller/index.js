import { getPostsDetail } from "../../store/post/action";
import APIServices from '../../services'

export async function basicDteailsApi(payload) {
  const result = await APIServices.create('vendor-store/basic-details', payload)
  if (result && result.data && result.data.data) {
    return result.data.data;
  }
}

export async function guideLinesApi(payLoad) {
  const result = await APIServices.create('vendor-store/basic-details', payLoad)
  if (result && result.data && result.data.data) {
    return result.data.data;
  }
}

export async function paymentDetailsApi(payLoad) {
  const result = await APIServices.create('vendor-store/payment-details', payLoad)
  if (result && result.data && result.data.data) {
    return result.data.data;
  }
}

export async function shippingDetails(payLoad) {
  const result = await APIServices.create('vendor-store/shipping-details', payLoad)
  if (result && result.data && result.data.data) {
    return result.data.data;
  }
}

export async function getDetails() {
  const result = await APIServices.create('vendor-store/get-details')
  if (result && result.data && result.data.data) {
    return result.data.data;
  }
}