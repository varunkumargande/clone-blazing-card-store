import APIServices from '../../services'

async function getStreamingShippmentDetail(setAddressList, setAddressLoader) {
  const result = await APIServices.getAll('CustomerAddress/get-address-list')
  
  if (result && result.data && result.data) {
    if(result.status == 200){
        setAddressList(result.data.data)
    }else{
        // error
    }
    setAddressLoader(false)
  }
}

export { getStreamingShippmentDetail };
