import { modalSuccess, modalWarning } from "../intercept";
import  Router  from "next/router";
import APIServices from '../../services'
export async function getCategoryList(serviceId,name,mail,phone,message) {

   

    const data = JSON.stringify({
        serviceId: serviceId,
        name:name,
        email:mail,
        mobile:phone,
        comments:message
})

    const result = await APIServices.create('store-service/store-enquiry',data)
    if(result.data.status===1){
        Router.push('/services/enquiry-success')
        modalSuccess('success',json.message)
    }
    else{
        modalWarning('error',json.message);

    }

}