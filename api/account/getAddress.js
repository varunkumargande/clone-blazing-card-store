import APIServices from '../../services'


export async function addressListApi(setAddressData,setAddressLoader) {


    // fetch(apiUrl + '/CustomerAddress/get-address-list?limit=0&offset=0&count=0', {

    //     method: 'GET',
    // })
    // .then(json => {
    //     if(json.status===1){
    //         setAddressData(json.data)
    //         setAddressLoader(false)
    //     }
    // })
    const result =await APIServices.getAll('CustomerAddress/get-address-list?limit=0&offset=0&count=0')
    if(result&&result.data&&result.data.status===1){
        setAddressData(result.data.data)
                setAddressLoader(false)

    }
    

}