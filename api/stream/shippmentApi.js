import APIServices from '../../services'

async function getStreamingShippmentDetail(setAddressList, setAddressLoader) {
  const result = await APIServices.getAll('CustomerAddress/get-address-list')
  console.log("addreslist", result)
  if (result && result.data && result.data) {
    if(result.status == 200){
        setAddressList(result.data.data)
        setAddressLoader(false)
    }else{
        // error
    }
  }
}

export { getStreamingShippmentDetail };
