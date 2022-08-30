import APIServices from '../../services'

export async function cartListApi() {

    // fetch(apiUrl + '/customer-cart/customer-cart-list', {
    //     method: 'GET',
    // })   
    // .then(json => {
    //     if(json.data){
    //         sessionStorage.setItem("cartItem",JSON.stringify(json.data.cartList) )
    //         // setCartLoader(false)
    //     }            
    // })


    const result= await APIServices.getAll('customer-cart/customer-cart-list')
    if(result&&result.data&&result.data.data ){
       
        
        sessionStorage.setItem("cartItem",JSON.stringify(result.data.data.cartList) )
        
    }

}