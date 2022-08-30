
import APIServices from '../../services'
export async function vendorSlugApi(vendorSlug,setVendorInfo ) {

    // fetch(apiUrl + '/vendor-store/vendor-details/'+vendorSlug, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if(json.data){
    //         setVendorInfo(json.data)
   
    //     }
    // })

    const result = await APIServices.get('vendor-store/vendor-details',vendorSlug)

    if(result && result.data && result.data.data){
        setVendorInfo(result.data.data)
    }
}