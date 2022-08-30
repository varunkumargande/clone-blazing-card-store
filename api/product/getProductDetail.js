import { getProductsById, getProductByLoading } from "../../store/product/action";
import { questionsApi } from "./question";
import { ViewAllQuestionApi } from "./viewAllQuestionApi";
import { productRatingCountStarApi } from "./productRatingCountStar";
import APIServices from '../../services'
export async function getProductDetApi(productSlug,categorySlug,dispatch,setPriceChartInfo,setQuestionInfo,setBreadCategory,setstarcoutid) {
    let dummyKeyword=""
    let dummyLoader=false
   {console.log(productSlug,'productSlug')}

    // fetch(apiUrl + '/product-store/productdetail/'+productSlug, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if(json.data){
           
    //         dispatch(getProductsById(json.data))
    //         setBreadCategory(json.data.Category)
    //         console.log(json.data.productId,"234234234234234234")
    //         questionsApi(json.data.productId, setQuestionInfo, dummyKeyword, dummyLoader, 3)
    //         productRatingCountStarApi(json.data.productId,setstarcoutid)
    //         // ViewAllQuestionApi(json.data.productId)
    //         dispatch(getProductByLoading(false))
    //         setPriceChartInfo(json.data.productTirePrices)
    //     }
       
       
    // })

    // const result=await APIServices.get('product-store/productdetail',productSlug,categorySlug)
    // const result=await APIServices.get('product-store/productdetail',productSlug)



   
  
    const result=await APIServices.getAll(`product-store/productdetail/${productSlug}?id=${productSlug}&categorySlug=${categorySlug===undefined?"":categorySlug}`)
   
    if(result&&result.data&&result.data.data){
       
            dispatch(getProductsById(result.data.data))
            setBreadCategory(result.data.data.Category)
            dispatch(getProductByLoading(false))
            setstarcoutid(result.data.data.productId)
            setPriceChartInfo(result.data.data.productTirePrices)

    }
}