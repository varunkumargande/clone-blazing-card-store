import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function addToCartApi(id,price,quantity,optionName,productOptionValueId,setButtonLoader,skuName,type,variantId,variantName) {
   
    // fetch(apiUrl+'/customer-cart/add-cart', {
    //         method: 'POST',
    //         body: JSON.stringify({ 
    //             "productId": id,
    //             "productPrice":price, 
    //             "quantity":quantity,
    //             "type":type,
    //             "productOptionValueId":productOptionValueId,
    //             "productVarientOptionId":variantId,
    //             "varientName":variantName,
    //             "skuName":skuName,
    //             "tirePrice": ""
    //         }) 
    // })
    // .then(json=>{
    //     setButtonLoader(false)
    //         if(json.status===1){
    //             modalSuccess('success',json.message)
    //         }
    //         else{
    //             modalWarning('error',json.message);
    //         }
    // })
    

    const data = JSON.stringify({
        productId: id,
        productPrice:price, 
        quantity:quantity,
        type:type,
        productOptionValueId:productOptionValueId,
        productVarientOptionId:variantId,
        varientName:variantName,
        skuName:skuName,
        tirePrice: ""
    })
    const result =await APIServices.create('customer-cart/add-cart',data)
    setButtonLoader(false)
    if(result&&result.data&&result.data.status===1){
        modalSuccess('success',result.data.message)
    }
    else{
        modalWarning('error',result.data.message);
    }



}