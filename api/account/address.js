import {modalSuccess} from "../intercept"
import APIServices from '../../services'
export async function UserAddAddress(address1,address2,city,countryId,states,postCode,Router,addressType,fname,setFname,setAddress,setAddress1,setCity,setCountryId,setZoneName,setPostCode,setAddressType) {
    // fetch(apiUrl+'/CustomerAddress/add-address', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "address1": address1,
    //         "address2": address2,
    //         "city": city,
    //         "state": states,
    //         "countryId":countryId,
    //         "postcode":postCode,
    //         "addressType":addressType,
    //         "company":fname
    //     })
    // })
    //     .then(json => {
    //         if (json) {
    //             setAddress("")
    //             setAddress1("")
    //             setCity("")
    //             setCountryId("")
    //             setFname("")
    //             setZoneName("")
    //             setPostCode("")
    //             setAddressType(1)
    //             if (json.status===1) {
    //                 modalSuccess('success',json.message)
    //                 Router.push('/account/addresses');
    //             }
    //         }
    //     })


    const data = JSON.stringify({
         
                address1: address1,
                address2: address2,
                city: city,
                state: states,
                countryId:countryId,
                postcode:postCode,
                addressType:addressType,
                company:fname
    })

const result =await APIServices.create('CustomerAddress/add-address',data)

if (result&&result.data) {
                setAddress("")
                setAddress1("")
                setCity("")
                setCountryId("")
                setFname("")
                setZoneName("")
                setPostCode("")
                setAddressType(1)
                if (result.data.status===1) {
                    modalSuccess('success',result.data.message)
                    Router.push('/account/addresses');
                }
            }


}