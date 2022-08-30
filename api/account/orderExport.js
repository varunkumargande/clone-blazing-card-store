import APIServices from '../../services'


export async function orderExportApi(id,setLoadImg) {

    // fetch(apiUrl + '/orders/order-export-pdf?orderProductId='+id, {
    //     method: 'GET',
    // })
    // .then(json => {
        // if(json){        
        //     var a = document.createElement("a"); //Create <a>
        //     a.href = json.data //Image Base64 Goes here
        //     a.download = "Invoice"; //File name Here
        //     a.click()
        //     setLoadImg(false)
        //     }
    // })

    const result =await APIServices.getAll(`orders/order-export-pdf?orderProductId=${id}`)
    if(result&&result.data){
        var a = document.createElement("a"); //Create <a>
            a.href = result.data.data //Image Base64 Goes here
            a.download = "Invoice"; //File name Here
            a.click()
            setLoadImg(false)
            }
    

}