// import {getWidgets} from "../../store/collection/action"
import APIServices from '../../services'
export async function WidgetApi(dispatch,setDeals) {
 
    const result = await APIServices.getAll('list/widget-list')

    if(result && result.data && result.data.data){
        setDeals(result.data.data)
    }
} 
