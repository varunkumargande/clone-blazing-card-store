import APIServices from '../../services'

async function getStreamingCardDetail(setCardList) {
  const result = await APIServices.get('customer-card-details/listCard',JSON.parse(sessionStorage.getItem("spurtUser")).id)
  if (result && result.data && result.data) {
    if(result.status == 200){
        setCardList(result.data.data)
    }else{
        // error
    }
  }
}

export { getStreamingCardDetail };
