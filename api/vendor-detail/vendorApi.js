
import APIServices from '../../services'
export async function vendorprodus(vendorId,setcount) {
     const result =  await APIServices.getAll('vendor-store/vendor-product-review-list?limit=0&offset=0&count=1&vendorId='+vendorId)

    if(result && result.data && result.data.data){
        setcount(result.data.data)
    }

}
export async function vendorproducreviewApi(vendorId,setvendoreviews,offset) {
       const result = await APIServices.getAll('vendor-store/vendor-product-review-list?limit=10&offset='+offset+'&count=0&vendorId='+vendorId)   

    if(result && result.data && result.data.data){
        setvendoreviews(result.data.data)
    }
}