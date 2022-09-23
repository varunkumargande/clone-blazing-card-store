import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
export async function editAddressApi(addressId, address1, address2, city, countryId, states, postCode, Router, addressType, fname, setFname, setAddress, setAddress1, setCity, setCountryId, setZoneName, setPostCode, setAddressType) {

    const data = JSON.stringify({
        address1: address1,
        address2: address2,
        city: city,
        state: states,
        postcode: postCode,
        countryId: countryId,
        addressType: addressType,
        company: fname
    })


    const result = await APIServices.update('CustomerAddress/update-address', addressId, data)
    if (result.data) {
        setAddress("")
        setAddress1("")
        setCity("")
        setCountryId("")
        setFname("")
        setZoneName("")
        setPostCode("")
        setAddressType(1)
    }
    if (result.data.status === 1) {
        Router.push('/account/addresses')
        modalSuccess('success', result.data.message)

    } else {
        modalWarning('error', result.data.message);
    }
    return result.data
}