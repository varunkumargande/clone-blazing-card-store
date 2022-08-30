import APIServices from '../../services'
export async function RelatedProductApi(productId,setRelatedProduct) {



    const result = await APIServices.getAll('list/related-product-list?productId='+productId)

    if(result && result.data && result.data.data){
        setRelatedProduct(result.data.data)
    }



}