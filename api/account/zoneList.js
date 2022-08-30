import APIServices from '../../services'

export async function zoneListApi(setZoneData) {

    // fetch(apiUrl + '/list/zone-list?limit=0&offset=0&keyword=&count=0', {
    //     method: 'GET',
    // })
        
    // .then(json => {
    //     if(json.data !=null){
    //         setZoneData(json.data)
            
    //     }
      
    // })

    const result= await APIServices.getAll('list/zone-list?limit=0&offset=0&keyword=&count=0')
        if(result&&result.data&&result.data.data !=null){
            setZoneData(result.data.data)
            
        }



} 