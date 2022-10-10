import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function editShipAddressApi(data, fetchShiipmentApi, setShippmentFormOpen) {
    
    
    const dataJson = JSON.stringify({
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postcode: data.postcode,
        country: data.countryId,
        addressType: 1,
        company: data.company,
        emailId: data.email,
        phoneNo: data.phoneNumber
    })

    
    const result = await APIServices.update('CustomerAddress/update-address', data.addressId, dataJson)
    
        if (result.data) {
            if (result.data.status === 1) {
                modalSuccess('success', result.data.message)
                fetchShiipmentApi()
                setShippmentFormOpen(false)
            } else {
                modalWarning('error', result.data.message);
                setShippmentFormOpen(false)
            }
        }
}