
import APIServices from '../../services'
export async function vendorProductApi(vendorId, setVendorProduct,setVendorLoading) {

    // fetch(apiUrl + '/vendor-store/vendor-product-list/'+vendorId+'?limit=&offset=&count=&vendorId='+vendorId, {
    //     method: 'GET',  
    // })
    //     .then(json => {
    //         if(json.data){
    //             setVendorProduct(json.data)
    //             setVendorLoading(false)
    //         } 
    //     })

    const result = await APIServices.get('vendor-store/vendor-product-list',vendorId+'?limit=0&offset=0&count=0&vendorId='+vendorId)
    if(result && result.data && result.data.data){
       
        setVendorProduct(result.data.data)
        setVendorLoading(false)
    }
}