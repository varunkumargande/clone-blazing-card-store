import {modalSuccess} from "../intercept"
import APIServices from '../../services'
export async function UserAddAddress(address1,address2,city,countryId,states,postCode,addressType,fname,setFname,setAddress,setAddress1,setCity,setCountryId,setZoneName,setPostCode,setAddressType) {
    console.log("0000000000", address1,address2,city,countryId,states,postCode,addressType,fname)
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
    console.log("dadaaaa",data)

const result =await APIServices.create('CustomerAddress/add-address',data)
console.log("result", result)
// if (result&&result.data) {
//                 setAddress("")
//                 setAddress1("")
//                 setCity("")
//                 setCountryId("")
//                 setFname("")
//                 setZoneName("")
//                 setPostCode("")
//                 setAddressType(1)
//                 if (result.data.status===1) {
//                     modalSuccess('success',result.data.message)
//                     Router.push('/account/addresses');
//                 }
//             }


}