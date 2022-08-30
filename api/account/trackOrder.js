import APIServices from '../../services'

export async function trackOrderApi(orderProductId,setOrderTrack,setTrackLoading) {

    // fetch(apiUrl + '/orders/track-order-product?orderProductId='+orderProductId, {
    //     method: 'GET',
    // })
    //     .then(json => {
    //         if(json.data){
    //             setOrderTrack(json.data)
    //             setTrackLoading(false)
    //         }
    //     })


        const result= await APIServices.getAll('orders/track-order-product?orderProductId='+orderProductId)
        if(result&&result.data&&result.data.data){
            setOrderTrack(result.data.data)
            setTrackLoading(false)
        }

}