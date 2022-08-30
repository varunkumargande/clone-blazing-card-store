import { getBrands } from "../../store/product/action"
import APIServices from '../../services'
export async function ManufacturerApi(dispatch,setBrands,categorySlug) {
    
    // return await fetch(apiUrl+'/manufacturers/manufacturerlist?limit=0&offset=0&keyword=&categorySlug='+categorySlug,{
    //     method: 'GET',
    // })
    // .then(json => {
    
    //     dispatch(getBrands(json.data))
    //     setBrands(json.data)
    // })
    const result= await APIServices.getAll('manufacturers/manufacturerlist?limit=0&offset=0&keyword=&categorySlug='+categorySlug)
    if(result&&result.data&&result.data.data){
              dispatch(getBrands(result.data.data))
        setBrands(result.data.data)
    }


}
