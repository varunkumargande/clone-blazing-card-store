import {getWidgets} from "../../store/collection/action"
import APIServices from '../../services'
export async function GetattributeApi(categoryInitial,setgetAttribute) {
   

    // return await fetch(apiUrl+'/list/filter-detail/'+categoryInitial+'?categorySlug='+categoryInitial, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     setgetAttribute(json.data)
       
        
    // })

    const result= await APIServices.get('list/filter-detail/',categoryInitial+'?categorySlug='+categoryInitial)
    if(result&&result.data&&result.data.data){
        setgetAttribute(result.data.data)
    }

    
} 