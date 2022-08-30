import APIServices from '../../services'

export async function blogListApi(setPost) {

    // fetch(apiUrl + '/list/blog/blog-list?limit=10&offset=0&keyword=&count=', {
    //     method: 'GET',
    // })
    
    // .then(json => {    
    //     if(json.data){
    //         setBLogList(json.data)
    //     }             
    // })

    const result = await APIServices.getAll('list/blog/blog-list?limit=10&offset=0&keyword=&count=0')

       
        if(result && result.data&&result.data.data){
            setPost(result.data.data)
        }
}