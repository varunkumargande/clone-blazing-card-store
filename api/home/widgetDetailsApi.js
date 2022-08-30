import {getWidgets} from "../../store/collection/action"
import APIServices from '../../services'
export async function WidgetDetailsApi(widget,setWidgets) {
    let id = widget.widget
    // return await fetch(apiUrl+'/list/widget-detail/'+id, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     (setWidgets(json.data))
    //     // setBanner(json.data)
    // })

    const result = await APIServices.get('list/widget-detail/',id)
    if(result && result.data && result.data.data){
    setWidgets(result.data.data)
    }
} 