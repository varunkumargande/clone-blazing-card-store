import APIServices from '../../services'
export async function countryListApi(setCountryData) {
    const result = await APIServices.getAll('list/country-list?limit=0&offset=0&keyword=&count=0')
    if(result && result.data&&result.data.data){
        setCountryData(result.data.data)
        
    }
} 