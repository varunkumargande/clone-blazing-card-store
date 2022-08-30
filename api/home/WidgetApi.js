import {getWidgets} from "../../store/collection/action"
import APIServices from '../../services'
export async function WidgetApi(dispatch) {
    // return await fetch(apiUrl+'/list/widget-list', {
    //     method: 'GET',
    // })
    // .then(json => {
    //     dispatch(getWidgets(json.data))
    //     // setBanner(json.data)
    // })

    const result = await APIServices.getAll('list/widget-list')

    if(result && result.data && result.data.data){
        dispatch(getWidgets(result.data.data))
    }
} 
