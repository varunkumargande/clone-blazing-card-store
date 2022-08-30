import { changeCurrency, footerPage, maintenanceState } from "../../store/setting/action"
import APIServices from '../../services'
async function getProfileApi(dispatch) {
    
        // await fetch(apiUrl+'/settings/get-settings', {
        //     method: 'GET',
        // })
        // .then(json => {
        //     if(json.data){
        //         dispatch(footerPage(json.data[0]))
        //         dispatch(changeCurrency({symbol:json.data[0].symbolLeft,text:json.data[0].currencyCode}))
        //         dispatch(maintenanceState(json.data[0].maintenanceMode))
        //     }
         
        // })    

        const result = await APIServices.getAll('settings/get-settings')

        if(result && result.data && result.data.data){
            dispatch(footerPage(result.data.data[0]))
                    dispatch(changeCurrency({symbol:result.data.data[0].symbolLeft,text:result.data.data[0].currencyCode}))
                    dispatch(maintenanceState(result.data.data[0].maintenanceMode))
                
        }
}
export default getProfileApi