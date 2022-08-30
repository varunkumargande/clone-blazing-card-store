
import APIServices from '../../services'
export async function vendorprodus(vendorId,setcount) {
  
    // fetch(apiUrl + 'vendor-store/vendor-product-review-list?limit=&offset=&count=1&vendorId='+vendorId, {
    //     method: 'GET',  
    // })
    //     .then(json => {
    //         if(json.data){

    //             setcount(json.data)
    //             console.log(json.data,"setcount")
    //             // setVendorLoading(false)
    //         } 
    //     })

    const result =  await APIServices.getAll('vendor-store/vendor-product-review-list?limit=0&offset=0&count=1&vendorId='+vendorId)

    if(result && result.data && result.data.data){
        setcount(result.data.data)
   
               // setVendorLoading(false)
    }

}