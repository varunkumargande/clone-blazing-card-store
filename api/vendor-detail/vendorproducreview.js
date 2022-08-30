
import APIServices from '../../services'
export async function vendorproducreviewApi(vendorId,setvendoreviews,offset) {
    
    // fetch(apiUrl + 'vendor-store/vendor-product-review-list?limit=10&offset='+offset+'&count=&vendorId='+vendorId, {
    //     method: 'GET',  
    // })
    //     .then(json => {
    //         if(json.data){

    //             setvendoreviews(json.data)
   
    //             // setVendorLoading(false)
    //         } 
    //     })

    const result = await APIServices.getAll('vendor-store/vendor-product-review-list?limit=10&offset='+offset+'&count=0&vendorId='+vendorId)

    

    if(result && result.data && result.data.data){
        setvendoreviews(result.data.data)
    }
}